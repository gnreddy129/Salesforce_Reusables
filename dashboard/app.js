const RELATIVE_A_PATH_FROM_B = '../../cucumber-reports/';  // path links will point here
let REPORT_FILES = []; // [{name, file, lastModified, url, relPath}]
const cacheText = new Map(); // name -> text
const cacheParsed = new Map(); // name -> { total, passed, failed, skipped, rows, features }

// Report Summary pagination state
let reportSummaryAllRows = []; // All report summary rows
let reportSummaryCurrentPage = 0; // Current page index (0-based)
const REPORT_SUMMARY_ITEMS_PER_PAGE = 5; // Show 10 items per page

document.getElementById('pickDirBtn').addEventListener('click', async () => {
  if (!('showDirectoryPicker' in window)) {
    document.getElementById('folderInput').click();
    return;
  }
  try {
    const dir = await window.showDirectoryPicker(); // HTTPS/localhost required
    const files = [];
    for await (const entry of dir.values()) {
      if (entry.kind === 'file' && /\.(html?|json)$/i.test(entry.name)) {
        const f = await entry.getFile();
        files.push(f);
      }
      if (entry.kind === 'directory') {
        for await (const sub of entry.values()) {
          if (sub.kind === 'file' && /\.(html?|json)$/i.test(sub.name)) {
            const f = await sub.getFile();
            files.push(f);
          }
        }
      }
    }
    onFilesChosen(files);
  } catch (e) {
    console.error(e);
  }
});

document.getElementById('folderInput').addEventListener('change', (e) => {
  const files = Array.from(e.target.files || []).filter(f => /\.(html?|json)$/i.test(f.name));
  onFilesChosen(files);
});

// Revoke URLs on unload
window.addEventListener('beforeunload', () => {
  REPORT_FILES.forEach(r => { if (r && r.url) try { URL.revokeObjectURL(r.url); } catch { } });
});

/* =====================================================
   Timestamp parsing from filename: YYYY-MM-DDTHH-mm-ss(-SSS)?Z
   ===================================================== */
function parseTimestampFromName(name) {
  const m = name.match(/(\d{4})-(\d{2})-(\d{2})T(\d{2})-(\d{2})-(\d{2})(?:-(\d{3}))?Z/);
  if (!m) return null;
  const [_, y, mo, d, h, mi, s, ms] = m;
  const dt = new Date(Date.UTC(+y, +mo - 1, +d, +h, +mi, +s, ms ? +ms : 0));
  return isNaN(dt.getTime()) ? null : dt;
}

/* =====================================================
   Read file text (cached)
   ===================================================== */
async function readFileTextByName(name) {
  if (cacheText.has(name)) return cacheText.get(name);
  const rec = REPORT_FILES.find(r => r.name === name);
  if (!rec) throw new Error('File not found: ' + name);
  const txt = await rec.file.text();
  cacheText.set(name, txt);
  return txt;
}

/* =====================================================
   Cucumber parsing (server-less, robust)
   ===================================================== */
function extractMessagesBlob(html) {
  let m = html.match(/CUCUMBER_MESSAGES\s*=\s*(\[[\s\S]*?\]);/);
  if (m) return m[1];
  m = html.match(/window\.__cucumber__messages\s*=\s*(\[[\s\S]*?\]);/);
  if (m) return m[1];
  m = html.match(/<script[^>]*id=["']cucumber-messages["'][^>]*type=["']application\/json["'][^>]*>([\s\S]*?)<\/script>/i);
  if (m) return m[1];
  throw new Error('CUCUMBER_MESSAGES not found');
}

// Resolve external JSON references (from the selected files)
async function extractExternalJsonFromLocalFiles(html) {
  const srcs = [...html.matchAll(/<script[^>]*src="'["'][^>]*>/gi)].map(m => m[1]);
  const hrefs = [...html.matchAll(/<link[^>]*href="'["'][^>]*>/gi)].map(m => m[1]);
  const candidates = [...new Set([...srcs, ...hrefs])];
  if (!candidates.length) return null;
  const norm = (p) => {
    try {
      const noQ = p.split('#')[0].split('?')[0];
      return decodeURIComponent(noQ).replace(/\\/g, '/').replace(/^\.\/+/, '');
    } catch { return p; }
  };
  const all = REPORT_FILES.map(r => ({ name: r.name, relPath: r.relPath, file: r.file }));
  for (const rawRef of candidates) {
    const ref = norm(rawRef);
    const refBase = ref.split('/').pop();
    let rec = all.find(x => x.name === refBase);
    if (!rec) rec = all.find(x => x.relPath.endsWith(ref));
    if (!rec) continue;
    const txt = await rec.file.text();
    let data;
    try { data = JSON.parse(txt); } catch { continue; }
    if (!Array.isArray(data)) continue;
    const looksLikeMessages = data.some(o => o && (o.testStepFinished || o.testCaseFinished || o.testCaseStarted || o.gherkinDocument || o.pickle || o.testCase));
    if (looksLikeMessages) return { type: 'messages', data };
    return { type: 'classic', data };
  }
  return null;
}

/* =====================================================
   Parsers: Messages blob → rows & stats
   ===================================================== */
function parseFeatureScenarioStatus(messagesBlob) {
  const featureByUri = new Map();       // uri -> featureName
  const pickleById = new Map();       // pickleId -> {name, uri}
  const testCaseToPickle = new Map();   // testCaseId -> pickleId
  const startedToCase = new Map();   // testCaseStartedId -> testCaseId
  const statusByStarted = new Map();   // testCaseStartedId -> { failed, allPassed, sawSkipped }
  for (const m of messagesBlob.matchAll(/"gherkinDocument"\s*:\s*\{[\s\S]*?"uri"\s*:\s*"([^"]+)"[\s\S]*?"feature"\s*:\s*\{[\s\S]*?"name"\s*:\s*"([^"]+)"/g)) {
    featureByUri.set(m[1], m[2]);
  }
  for (const m of messagesBlob.matchAll(/"pickle"\s*:\s*\{[\s\S]*?"id"\s*:\s*"([^"]+)"[\s\S]*?"name"\s*:\s*"([^"]+)"[\s\S]*?"uri"\s*:\s*"([^"]+)"/g)) {
    pickleById.set(m[1], { name: m[2], uri: m[3] });
  }
  for (const m of messagesBlob.matchAll(/"testCase"\s*:\s*\{[\s\S]*?"id"\s*:\s*"([^"]+)"[\s\S]*?"pickleId"\s*:\s*"([^"]+)"/g)) {
    testCaseToPickle.set(m[1], m[2]);
  }
  for (const m of messagesBlob.matchAll(/"testCaseStarted"\s*:\s*\{[\s\S]*?"id"\s*:\s*"([^"]+)"[\s\S]*?"testCaseId"\s*:\s*"([^"]+)"/g)) {
    startedToCase.set(m[1], m[2]);
  }
  const failing = new Set(['FAILED', 'AMBIGUOUS', 'UNDEFINED', 'PENDING', 'UNKNOWN']);
  for (const m of messagesBlob.matchAll(/"testStepFinished"\s*:\s*\{[\s\S]*?"testCaseStartedId"\s*:\s*"([^"]+)"[\s\S]*?"status"\s*:\s*"([A-Z]+)"/g)) {
    const sid = m[1], status = m[2];
    const agg = statusByStarted.get(sid) || { failed: false, allPassed: true, sawSkipped: false };
    if (status !== 'PASSED') agg.allPassed = false;
    if (failing.has(status)) agg.failed = true;
    if (status === 'SKIPPED') agg.sawSkipped = true;
    statusByStarted.set(sid, agg);
  }
  for (const m of messagesBlob.matchAll(/"testCaseFinished"\s*:\s*\{[\s\S]*?"testCaseStartedId"\s*:\s*"([^"]+)"[\s\S]*?"status"\s*:\s*"([A-Z]+)"/g)) {
    const sid = m[1], status = m[2];
    const agg = statusByStarted.get(sid) || { failed: false, allPassed: true, sawSkipped: false };
    if (status !== 'PASSED') agg.allPassed = false;
    if (failing.has(status)) agg.failed = true;
    if (status === 'SKIPPED') agg.sawSkipped = true;
    statusByStarted.set(sid, agg);
  }
  const rows = [];
  let passed = 0, failed = 0, skipped = 0;
  for (const [sid, agg] of statusByStarted.entries()) {
    const tcid = startedToCase.get(sid);
    const pid = testCaseToPickle.get(tcid);
    const pinfo = pid ? pickleById.get(pid) : null;
    const scenario = pinfo?.name || '(unknown scenario)';
    const uri = pinfo?.uri;
    const feature = uri ? (featureByUri.get(uri) || '(unknown feature)') : '(unknown feature)';
    let status;
    if (agg.failed) status = 'Failed';
    else if (agg.sawSkipped && !agg.failed) status = 'Skipped';
    else if (agg.allPassed) status = 'Passed';
    else status = 'Failed';
    if (status === 'Passed') passed++;
    else if (status === 'Failed') failed++;
    else if (status === 'Skipped') skipped++;
    rows.push({ feature, scenario, status });
  }
  const total = rows.length;
  return { total, passed, failed, skipped, rows, features: groupByFeature(rows) };
}

/* =====================================================
   Parsers: Messages ARRAY → rows & stats
   ===================================================== */
function parseFeatureScenarioStatusFromMessagesArray(messages) {
  const featureByUri = new Map();
  const pickleById = new Map();
  const testCaseToPickle = new Map();
  const startedToCase = new Map();
  const statusByStarted = new Map();
  const failing = new Set(['FAILED', 'AMBIGUOUS', 'UNDEFINED', 'PENDING', 'UNKNOWN']);
  for (const env of messages) {
    if (env.gherkinDocument) {
      const uri = env.gherkinDocument.uri;
      const name = env.gherkinDocument.feature?.name;
      if (uri && name) featureByUri.set(uri, name);
    }
    if (env.pickle) {
      const p = env.pickle;
      if (p.id) pickleById.set(p.id, { name: p.name, uri: p.uri });
    }
    if (env.testCase) {
      const t = env.testCase;
      if (t.id) testCaseToPickle.set(t.id, t.pickleId);
    }
    if (env.testCaseStarted) {
      const tcs = env.testCaseStarted;
      if (tcs.id) startedToCase.set(tcs.id, tcs.testCaseId);
    }
    if (env.testStepFinished) {
      const t = env.testStepFinished;
      const sid = t.testCaseStartedId;
      const status = t.testStepResult?.status || t.status;
      if (!sid || !status) continue;
      const agg = statusByStarted.get(sid) || { failed: false, allPassed: true, sawSkipped: false };
      if (status !== 'PASSED') agg.allPassed = false;
      if (failing.has(status)) agg.failed = true;
      if (status === 'SKIPPED') agg.sawSkipped = true;
      statusByStarted.set(sid, agg);
    }
    if (env.testCaseFinished) {
      const t = env.testCaseFinished;
      const sid = t.testCaseStartedId;
      const status = t.status;
      if (!sid || !status) continue;
      const agg = statusByStarted.get(sid) || { failed: false, allPassed: true, sawSkipped: false };
      if (status !== 'PASSED') agg.allPassed = false;
      if (failing.has(status)) agg.failed = true;
      if (status === 'SKIPPED') agg.sawSkipped = true;
      statusByStarted.set(sid, agg);
    }
  }
  const rows = [];
  let passed = 0, failed = 0, skipped = 0;
  for (const [sid, agg] of statusByStarted.entries()) {
    const tcid = startedToCase.get(sid);
    const pid = testCaseToPickle.get(tcid);
    const pinfo = pid ? pickleById.get(pid) : null;
    const scenario = pinfo?.name || '(unknown scenario)';
    const uri = pinfo?.uri;
    const feature = uri ? (featureByUri.get(uri) || '(unknown feature)') : '(unknown feature)';
    let status;
    if (agg.failed) status = 'Failed';
    else if (agg.sawSkipped) status = 'Skipped';
    else if (agg.allPassed) status = 'Passed';
    else status = 'Failed';
    if (status === 'Passed') passed++;
    else if (status === 'Failed') failed++;
    else if (status === 'Skipped') skipped++;
    rows.push({ feature, scenario, status });
  }
  const total = rows.length;
  return { total, passed, failed, skipped, rows, features: groupByFeature(rows) };
}

/* =====================================================
   Parsers: Classic Cucumber JSON → rows & stats
   ===================================================== */
function parseFeatureScenarioStatusFromClassicJson(arr) {
  const rows = [];
  let passed = 0, failed = 0, skipped = 0;
  const failing = new Set(['failed', 'ambiguous', 'undefined', 'pending', 'unknown']);
  const toLower = (s) => (s || '').toString().toLowerCase();
  for (const feature of arr) {
    const featureName = feature?.name || feature?.feature?.name || '(unknown feature)';
    const children = feature.elements || feature.scenarios || feature.children || [];
    const scenarios = [];
    for (const ch of children) {
      if (!ch) continue;
      if (ch.scenario) {
        scenarios.push(ch.scenario); // v7+ style
      } else if ((ch.type && toLower(ch.type) === 'scenario') || ch.keyword === 'Scenario' || ch.name) {
        scenarios.push(ch); // classic 'elements' style
      }
    }
    for (const sc of scenarios) {
      const scenarioName = sc?.name || '(unknown scenario)';
      const steps = Array.isArray(sc?.steps) ? sc.steps : [];
      let anyFailed = false, anySkipped = false, allPassed = steps.length > 0;
      for (const st of steps) {
        const status = toLower(st?.result?.status || st?.status);
        if (!status) { allPassed = false; continue; }
        if (status !== 'passed') allPassed = false;
        if (status === 'skipped') anySkipped = true;
        if (failing.has(status)) anyFailed = true;
      }
      let status;
      if (anyFailed) status = 'Failed';
      else if (anySkipped && !anyFailed) status = 'Skipped';
      else if (allPassed) status = 'Passed';
      else status = 'Failed';
      if (status === 'Passed') passed++;
      else if (status === 'Failed') failed++;
      else if (status === 'Skipped') skipped++;
      rows.push({ feature: featureName, scenario: scenarioName, status });
    }
  }
  const total = rows.length;
  return { total, passed, failed, skipped, rows, features: groupByFeature(rows) };
}

/* =====================================================
   Common helpers
   ===================================================== */
function groupByFeature(rows) {
  const map = new Map();
  for (const r of rows) {
    if (!map.has(r.feature)) map.set(r.feature, []);
    map.get(r.feature).push({ scenario: r.scenario, status: r.status });
  }
  return map;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
}

function badge(status) {
  if (status === 'Passed') return `<span class="status-badge status-pass">Passed</span>`;
  if (status === 'Failed') return `<span class="status-badge status-fail">Failed</span>`;
  if (status === 'Skipped') return `<span class="status-badge status-skip">Skipped</span>`;
  return status;
}

/* =====================================================
   Extract feature and scenario names from HTML (for overlay)
   ===================================================== */
function extractNamesFromHtml(html) {
  const featureMatches = [...html.matchAll(/"Feature","name":"([^"]+)"/g)];
  const scenarioMatches = [...html.matchAll(/"Scenario Outline","name":"([^"]+)"/g)];

  const features = featureMatches.map(m => (m[1] ?? '').trim()).filter(Boolean);
  const scenarios = scenarioMatches.map(m => (m[1] ?? '').trim()).filter(Boolean);

  return { features, scenarios };
}

/* =====================================================
   Parsing per file (cache + external JSON fallback)
   ===================================================== */
async function getParsedFor(name) {
  if (cacheParsed.has(name)) return cacheParsed.get(name);
  const html = await readFileTextByName(name);
  // Try inline messages first
  try {
    const blob = extractMessagesBlob(html);
    const parsed = parseFeatureScenarioStatus(blob);

    // Overlay names from HTML for better accuracy
    const { features, scenarios } = extractNamesFromHtml(html);
    for (let i = 0; i < parsed.rows.length; i++) {
      if (features[i]) parsed.rows[i].feature = features[i];
      if (scenarios[i]) parsed.rows[i].scenario = scenarios[i];
    }
    // Recompute features map after overlay
    parsed.features = groupByFeature(parsed.rows);

    cacheParsed.set(name, parsed);
    return parsed;
  } catch (e) {
    // Fallback to external JSON from selected files
    const ext = await extractExternalJsonFromLocalFiles(html);
    if (!ext) throw e;
    let parsed;
    if (ext.type === 'messages') {
      parsed = parseFeatureScenarioStatusFromMessagesArray(ext.data);
    } else if (ext.type === 'classic') {
      parsed = parseFeatureScenarioStatusFromClassicJson(ext.data);
    } else {
      throw new Error('Unsupported external JSON format');
    }

    // Overlay names from HTML for better accuracy
    const { features, scenarios } = extractNamesFromHtml(html);
    for (let i = 0; i < parsed.rows.length; i++) {
      if (features[i]) parsed.rows[i].feature = features[i];
      if (scenarios[i]) parsed.rows[i].scenario = scenarios[i];
    }
    // Recompute features map after overlay
    parsed.features = groupByFeature(parsed.rows);

    cacheParsed.set(name, parsed);
    return parsed;
  }
}

/* =====================================================
   UI section builders
   ===================================================== */
function fillTable(tbodyEl, rows) {
  tbodyEl.innerHTML = rows.map(r =>
    `<tr><td>${escapeHtml(r.feature)}</td><td>${escapeHtml(r.scenario)}</td><td>${badge(r.status)}</td></tr>`
  ).join('');
}

async function refreshCompare() {
  const r1Name = document.getElementById('report1').value;
  const r2Name = document.getElementById('report2').value;
  if (!r1Name || !r2Name) return;

  // If same report is selected for both, show warning and don't generate heatmap
  if (r1Name === r2Name) {
    document.querySelector('#compare-heatmap').innerHTML = '<tr><td colspan="3" style="text-align: center; padding: 16px; color: var(--muted);">Please select different reports to compare</td></tr>';
    return;
  }

  const [r1, r2] = await Promise.all([getParsedFor(r1Name), getParsedFor(r2Name)]);

  // Generate status heatmap
  generateComparisonHeatmap(r1.rows, r2.rows);
}

// Generate comparison heatmap
function generateComparisonHeatmap(r1Rows, r2Rows) {
  // Create lookup maps for quick access
  const r1Map = new Map();
  const r2Map = new Map();

  r1Rows.forEach(row => {
    const key = `${row.feature}|||${row.scenario}`;
    r1Map.set(key, row.status);
  });

  r2Rows.forEach(row => {
    const key = `${row.feature}|||${row.scenario}`;
    r2Map.set(key, row.status);
  });

  // Get all unique scenarios
  const allScenarios = new Set([...r1Map.keys(), ...r2Map.keys()]);
  const sortedScenarios = [...allScenarios].sort();

  // Helper function to get abbreviated status label
  const getStatusLabel = (status) => {
    if (!status || status === 'Not Executed') return 'NA';
    if (status.toLowerCase() === 'passed') return 'PASS';
    if (status.toLowerCase() === 'failed') return 'FAIL';
    if (status.toLowerCase() === 'skipped') return 'SKIP';
    return 'NA';
  };

  // Generate heatmap rows
  const heatmapRows = sortedScenarios.map(key => {
    const [feature, scenario] = key.split('|||');
    const r1Status = r1Map.get(key) || 'Not Executed';
    const r2Status = r2Map.get(key) || 'Not Executed';

    const getStatusColor = (status) => {
      if (!status || status === 'Not Executed') return '#666';
      if (status.toLowerCase() === 'passed') return 'var(--pass)';
      if (status.toLowerCase() === 'failed') return 'var(--fail)';
      if (status.toLowerCase() === 'skipped') return 'var(--skip)';
      return '#666';
    };

    return `
      <tr>
        <td style="padding: 8px; border: 1px solid var(--border); font-weight: 500;">
          <div style="font-size: 12px; color: var(--muted);">${escapeHtml(feature)}</div>
          <div style="font-size: 13px;">${escapeHtml(scenario)}</div>
        </td>
        <td style="padding: 8px; border: 1px solid var(--border); text-align: center;">
          <div style="width: 60px; height: 30px; margin: 0 auto; background: ${getStatusColor(r1Status)}; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: white; font-size: 11px; font-weight: 600;">
            ${getStatusLabel(r1Status)}
          </div>
        </td>
        <td style="padding: 8px; border: 1px solid var(--border); text-align: center;">
          <div style="width: 60px; height: 30px; margin: 0 auto; background: ${getStatusColor(r2Status)}; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: white; font-size: 11px; font-weight: 600;">
            ${getStatusLabel(r2Status)}
          </div>
        </td>
      </tr>
    `;
  }).join('');

  document.querySelector('#compare-heatmap tbody').innerHTML = heatmapRows;
}

function populateReportDropdowns() {
  const htmlFiles = REPORT_FILES.filter(r => /\.html?$/i.test(r.name));
  const r1 = document.getElementById('report1');
  const r2 = document.getElementById('report2');
  r1.innerHTML = htmlFiles.map(r => `<option value="${escapeHtml(r.name)}">${escapeHtml(r.name)}</option>`).join('');
  r2.innerHTML = htmlFiles.map(r => `<option value="${escapeHtml(r.name)}">${escapeHtml(r.name)}</option>`).join('');
  r1.value = htmlFiles[0]?.name || '';
  r2.value = htmlFiles[1]?.name || htmlFiles[0]?.name || '';
}

/* 
=====================================================
Section initializers
===================================================== 
*/
async function displayReportSummary() {
  const htmlFiles = REPORT_FILES.filter(r => /\.html?$/i.test(r.name));
  if (!htmlFiles.length) return;

  const allRows = [];
  let totalScenarios = 0;
  let totalPassed = 0;
  let totalFailed = 0;

  const reportNames = [];
  const passPercentages = [];
  const failPercentages = [];
  const skippedPercentages = [];
  const passCount = [];
  const failCount = [];

  // Process files in batches of 3 for better performance
  const BATCH_SIZE = 3;
  for (let i = 0; i < htmlFiles.length; i += BATCH_SIZE) {
    const batch = htmlFiles.slice(i, i + BATCH_SIZE);
    const parsedBatch = await Promise.all(batch.map(file => getParsedFor(file.name)));

    parsedBatch.forEach((parsed, idx) => {
      const file = batch[idx];
      const total = parsed.total;
      const passed = parsed.passed;
      const failed = parsed.failed;
      const skipped = parsed.skipped;

      const passPercent = total > 0 ? ((passed / total) * 100).toFixed(2) : 0;
      const failPercent = total > 0 ? ((failed / total) * 100).toFixed(2) : 0;
      const skipPercent = total > 0 ? ((skipped / total) * 100).toFixed(2) : 0;

      allRows.push({
        name: file.name,
        total: total,
        passPercent: passPercent,
        failPercent: failPercent
      });

      // Collect data for chart
      reportNames.push(file.name.replace(/\.html?$/, ''));
      passPercentages.push(parseFloat(passPercent));
      failPercentages.push(parseFloat(failPercent));
      skippedPercentages.push(parseFloat(skipPercent));
      passCount.push(passed);
      failCount.push(failed);

      totalScenarios += total;
      totalPassed += passed;
      totalFailed += failed;
    });

    // Allow UI to update between batches
    await new Promise(resolve => setTimeout(resolve, 0));
  }

  // Add total row
  allRows.push({
    name: 'TOTAL',
    total: totalScenarios,
    passPercent: totalScenarios > 0 ? ((totalPassed / totalScenarios) * 100).toFixed(2) : 0,
    failPercent: totalScenarios > 0 ? ((totalFailed / totalScenarios) * 100).toFixed(2) : 0,
    isTotal: true
  });

  // Store all rows for pagination
  reportSummaryAllRows = allRows;
  reportSummaryCurrentPage = 0;

  // Display first page
  displayReportSummaryPage();

  // Attach next button listener
  const nextBtn = document.getElementById('report-summary-next');
  if (!nextBtn.hasAttribute('data-listener-attached')) {
    nextBtn.addEventListener('click', () => {
      if (!nextBtn.disabled) {
        reportSummaryCurrentPage++;
        displayReportSummaryPage();
      }
    });
    nextBtn.setAttribute('data-listener-attached', 'true');
  }

  // Attach previous button listener
  const prevBtn = document.getElementById('report-summary-prev');
  if (!prevBtn.hasAttribute('data-listener-attached')) {
    prevBtn.addEventListener('click', () => {
      if (!prevBtn.disabled && reportSummaryCurrentPage > 0) {
        reportSummaryCurrentPage--;
        displayReportSummaryPage();
      }
    });
    prevBtn.setAttribute('data-listener-attached', 'true');
  }

  // Generate pass/fail stacked chart
  generatePassFailChart(reportNames, passPercentages, failPercentages, passCount, failCount);

  // Generate full-width pass/fail chart
  generatePassFailFullWidthChart(reportNames, passPercentages, failPercentages, passCount, failCount);
}

// Display current page of report summary
function displayReportSummaryPage() {
  const totalItems = reportSummaryAllRows.length;
  const startIndex = reportSummaryCurrentPage * REPORT_SUMMARY_ITEMS_PER_PAGE;
  const endIndex = startIndex + REPORT_SUMMARY_ITEMS_PER_PAGE;
  const pageRows = reportSummaryAllRows.slice(startIndex, endIndex);

  // Build table rows HTML
  const tableHTML = pageRows.map(row => {
    if (row.isTotal) {
      return `
        <tr style="background: var(--tile); font-weight: bold; border-top: 2px solid var(--accent);">
          <td style="padding: 10px; border: 1px solid var(--border);">${escapeHtml(row.name)}</td>
          <td style="padding: 10px; text-align: center; border: 1px solid var(--border);">${row.total}</td>
          <td style="padding: 10px; text-align: center; border: 1px solid var(--border); color: var(--pass);">${row.passPercent}%</td>
          <td style="padding: 10px; text-align: center; border: 1px solid var(--border); color: var(--fail);">${row.failPercent}%</td>
        </tr>
      `;
    }
    return `
      <tr>
        <td style="padding: 10px; border: 1px solid var(--border);">${escapeHtml(row.name)}</td>
        <td style="padding: 10px; text-align: center; border: 1px solid var(--border);">${row.total}</td>
        <td style="padding: 10px; text-align: center; border: 1px solid var(--border); color: var(--pass);">${row.passPercent}%</td>
        <td style="padding: 10px; text-align: center; border: 1px solid var(--border); color: var(--fail);">${row.failPercent}%</td>
      </tr>
    `;
  }).join('');

  document.querySelector('#report-summary-table tbody').innerHTML = tableHTML;

  // Update previous button state
  const prevBtn = document.getElementById('report-summary-prev');
  if (reportSummaryCurrentPage > 0) {
    prevBtn.disabled = false;
  } else {
    prevBtn.disabled = true;
  }

  // Update next button state
  const nextBtn = document.getElementById('report-summary-next');
  if (endIndex < totalItems) {
    nextBtn.disabled = false;
  } else {
    nextBtn.disabled = true;
  }
}

function generatePassFailChart(reportNames, passPercentages, failPercentages, passCount, failCount) {
  const ctx = document.getElementById('passFailChart');
  if (!ctx) return;

  // Destroy existing chart if it exists
  if (window.passFailChartInstance) {
    window.passFailChartInstance.destroy();
  }

  window.passFailChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: reportNames,
      datasets: [
        {
          label: 'Fail %',
          data: failPercentages,
          backgroundColor: 'rgba(239, 68, 68, 0.8)',
          borderColor: 'rgb(239, 68, 68)',
          borderWidth: 1,
          borderRadius: 4
        },
        {
          label: 'Pass %',
          data: passPercentages,
          backgroundColor: 'rgba(16, 185, 129, 0.8)',
          borderColor: 'rgb(16, 185, 129)',
          borderWidth: 1,
          borderRadius: 4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: '#e5e7eb',
            font: {
              size: 13,
              family: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica, Arial, sans-serif'
            }
          }
        },
        tooltip: {
          backgroundColor: '#111827',
          borderColor: '#334155',
          borderWidth: 1,
          titleColor: '#e5e7eb',
          bodyColor: '#e5e7eb',
          padding: 12,
          cornerRadius: 8,
          callbacks: {
            label: function (context) {
              const datasetIndex = context.datasetIndex;
              const dataIndex = context.dataIndex;

              if (datasetIndex === 0) {
                // Fail dataset
                return `Fail: ${failCount[dataIndex]} (${context.parsed.y.toFixed(2)}%)`;
              } else {
                // Pass dataset
                return `Pass: ${passCount[dataIndex]} (${context.parsed.y.toFixed(2)}%)`;
              }
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          stacked: true,
          ticks: {
            color: '#9ca3af',
            font: {
              size: 12,
              family: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica, Arial, sans-serif'
            },
            callback: function (value) {
              return value + '%';
            }
          },
          grid: {
            color: 'rgba(51, 65, 85, 0.3)',
            drawBorder: false
          }
        },
        x: {
          stacked: true,
          ticks: {
            color: '#9ca3af',
            font: {
              size: 12,
              family: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica, Arial, sans-serif'
            }
          },
          grid: {
            display: false,
            drawBorder: false
          }
        }
      }
    }
  });
}

function generatePassFailFullWidthChart(reportNames, passPercentages, failPercentages, passCount, failCount) {
  const ctx = document.getElementById('passFailFullWidthChart');
  if (!ctx) return;

  // Destroy existing chart if it exists
  if (window.passFailFullWidthChartInstance) {
    window.passFailFullWidthChartInstance.destroy();
  }

  // Extract dates in yyyy-mm-dd format from report names
  const formattedDates = reportNames.map(name => {
    const match = name.match(/(\d{4})-(\d{2})-(\d{2})/);
    return match ? `${match[1]}-${match[2]}-${match[3]}` : name;
  });

  // Reverse arrays to show latest report first (leftmost)
  const reversedDates = [...formattedDates].reverse();
  const reversedPassPercentages = [...passPercentages].reverse();
  const reversedPassCount = [...passCount].reverse();

  window.passFailFullWidthChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: reversedDates,
      datasets: [
        {
          label: 'Pass %',
          data: reversedPassPercentages,
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          borderColor: 'rgb(16, 185, 129)',
          borderWidth: 3,
          fill: true,
          tension: 0,
          pointRadius: 5,
          pointHoverRadius: 7,
          pointBackgroundColor: 'rgb(16, 185, 129)',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointHoverBackgroundColor: 'rgb(16, 185, 129)',
          pointHoverBorderColor: '#fff'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          labels: {
            color: '#e5e7eb',
            font: {
              size: 14,
              family: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica, Arial, sans-serif'
            }
          }
        },
        tooltip: {
          backgroundColor: '#111827',
          borderColor: '#334155',
          borderWidth: 1,
          titleColor: '#e5e7eb',
          bodyColor: '#e5e7eb',
          padding: 12,
          cornerRadius: 8,
          callbacks: {
            label: function (context) {
              const dataIndex = context.dataIndex;
              // Use reversed index to get correct pass count
              const reversedIndex = reversedPassCount.length - 1 - dataIndex;
              return `Pass: ${reversedPassCount[dataIndex]} (${context.parsed.y.toFixed(2)}%)`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: {
            color: '#9ca3af',
            font: {
              size: 13,
              family: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica, Arial, sans-serif'
            },
            callback: function (value) {
              return value + '%';
            }
          },
          grid: {
            color: 'rgba(51, 65, 85, 0.3)',
            drawBorder: false
          }
        },
        x: {
          ticks: {
            color: '#9ca3af',
            font: {
              size: 11,
              family: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica, Arial, sans-serif'
            },
            maxRotation: 45,
            minRotation: 45,
            display: true
          },
          grid: {
            display: false,
            drawBorder: false
          }
        }
      }
    }
  });
}

function initCompare() {
  populateReportDropdowns();
  refreshCompare().catch(console.error);
  document.getElementById('report1').addEventListener('change', () => refreshCompare().catch(console.error));
  document.getElementById('report2').addEventListener('change', () => refreshCompare().catch(console.error));
}

function populateHistory() {
  const dropdown = document.getElementById('history-dropdown');
  const viewBtn = document.getElementById('history-view-btn');

  const htmlReports = REPORT_FILES.filter(r => /\.html?$/i.test(r.name));

  // Clear existing options
  dropdown.innerHTML = '<option value="">-- Select a report --</option>';

  // Populate dropdown with reports
  htmlReports.forEach(r => {
    const ts = parseTimestampFromName(r.name) ?? new Date(r.lastModified);
    const label = ts ? ts.toISOString().replace('T', ' ').replace('Z', ' UTC') : '(no timestamp)';
    const option = document.createElement('option');
    option.value = r.name;
    option.textContent = `${r.name} - ${label}`;
    dropdown.appendChild(option);
  });

  // Enable/disable view button based on selection
  dropdown.addEventListener('change', () => {
    viewBtn.disabled = !dropdown.value;
  });

  // View button click handler
  viewBtn.addEventListener('click', () => {
    const selectedReport = dropdown.value;
    if (!selectedReport) return;

    const report = REPORT_FILES.find(r => r.name === selectedReport);
    if (report && report.url) {
      window.open(report.url, '_blank');
    }
  });

  // Initialize button state
  viewBtn.disabled = true;
}

/* =====================================================
   Flaky Tests & Failing Steps Analysis
   ===================================================== */
async function displayFlakyTestsAnalysis() {
  try {
    const flakyData = await analyzeFlakyTests();
    const failingStepsMap = await buildFailingStepsMapWithDetails();

    displayFlakyTestsTable(flakyData, failingStepsMap);
  } catch (e) {
    console.error('Error analyzing flaky tests:', e);
  }
}

async function analyzeFlakyTests() {
  const scenarioFailures = new Map(); // key: "feature|||scenario" -> { count, status, failedReports }

  // Process reports in batches for better performance
  const BATCH_SIZE = 5;
  for (let i = 0; i < REPORT_FILES.length; i += BATCH_SIZE) {
    const batch = REPORT_FILES.slice(i, i + BATCH_SIZE);
    const parsedBatch = await Promise.all(
      batch.map(async report => {
        try {
          const parsed = await getParsedFor(report.name);
          return { report, parsed };
        } catch (e) {
          console.error('Error parsing report:', report.name, e);
          return null;
        }
      })
    );

    parsedBatch.forEach(item => {
      if (!item || !item.parsed || !item.parsed.rows) return;

      for (const row of item.parsed.rows) {
        const key = `${row.feature}|||${row.scenario}`;
        if (!scenarioFailures.has(key)) {
          scenarioFailures.set(key, { feature: row.feature, scenario: row.scenario, failCount: 0, totalCount: 0, failedReports: [] });
        }
        const data = scenarioFailures.get(key);
        data.totalCount++;
        if (row.status === 'Failed') {
          data.failCount++;
          data.failedReports.push({ name: item.report.name, url: item.report.url });
        }
      }
    });

    // Allow UI to breathe
    await new Promise(resolve => setTimeout(resolve, 0));
  }

  // Calculate failure percentage and sort by flakiness and print only 5
  const flakyTests = Array.from(scenarioFailures.values())
    .filter(test => test.failCount > 0)
    .map(test => ({
      ...test,
      failPercentage: Math.round((test.failCount / test.totalCount) * 100)
    }))
    .sort((a, b) => {
      // Sort by failure percentage (descending), then by fail count
      if (b.failPercentage !== a.failPercentage) {
        return b.failPercentage - a.failPercentage;
      }
      return b.failCount - a.failCount;
    })
    .slice(0, 5); // Top 5

  return flakyTests;
}

async function buildFailingStepsMapWithDetails() {
  const stepsMap = new Map(); // key: "feature|||scenario" -> { step, screenshots, errorReason }

  // Iterate through all reports
  for (const report of REPORT_FILES) {
    try {
      const text = await readFileTextByName(report.name);
      const extracted = extractErrorsFromCucumberMessages(extractMessagesBlob(text));

      for (const item of extracted) {
        const key = `${item.feature}|||${item.scenario}`;
        if (!stepsMap.has(key)) {
          stepsMap.set(key, { step: item.step, errorReason: 'Unknown error', screenshots: [] });
        }
      }
    } catch (e) {
      // Silently continue
    }
  }

  return stepsMap;
}

function displayFlakyTestsTable(flakyTests, failingStepsMap) {
  const tbody = document.getElementById('flaky-tests-tbody');
  if (!tbody) return;

  if (flakyTests.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="3" style="padding: 20px; text-align: center; color: var(--muted);">
          No flaky tests detected
        </td>
      </tr>
    `;
    return;
  }

  const html = flakyTests.map((test, idx) => {
    const mapKey = `${test.feature}|||${test.scenario}`;
    const stepData = failingStepsMap.get(mapKey) || {
      step: 'Test execution',
      screenshots: [],
      errorReason: 'Unknown error'
    };

    const errorReason = stepData.errorReason || 'Unknown error';

    return `
      <tr>
        <!-- Column 1: Scenario & Feature -->
        <td style="padding: 10px; border: 1px solid var(--border);">
          <div style="font-weight: 600; color: var(--text); font-size: 13px; word-break: break-word;">
            ${escapeHtml(test.scenario)}
          </div>
          <div style="font-size: 11px; color: var(--muted); margin-top: 4px;">
            ${escapeHtml(test.feature)}
          </div>
        </td>
        
        <!-- Column 2: Failures Count -->
        <td style="padding: 10px; text-align: center; border: 1px solid var(--border);">
          <div style="background: rgba(239, 68, 68, 0.2); color: var(--fail); padding: 6px 12px; border-radius: 6px; font-weight: 600; font-size: 12px; display: inline-block;">
            ${test.failCount}/${test.totalCount}
          </div>
          <div style="font-size: 11px; color: var(--muted); margin-top: 4px;">
            ${test.failPercentage}% fail rate
          </div>
        </td>
        
        <!-- Column 3: Error Reason -->
        <td style="padding: 10px; border: 1px solid var(--border);">
          <div style="font-size: 12px; color: var(--text); word-break: break-word; background: var(--tile); padding: 10px; border-radius: 6px; border-left: 3px solid var(--fail);">
            <div style="color: #fecaca; font-size: 12px; line-height: 1.5; display: flex; flex-wrap: wrap; gap: 8px;">
              ${test.failedReports ? test.failedReports.map((report, i) =>
      `<a href="#" style="color: #ef4444; text-decoration: underline; font-weight: 500; cursor: pointer;" title="Open ${escapeHtml(report.name)} and navigate to scenario" onclick="openReportAndNavigate('${report.url}', '${escapeHtml(test.scenario).replace(/'/g, "\\'").replace(/"/g, '&quot;')}', '${escapeHtml(test.feature).replace(/'/g, "\\'").replace(/"/g, '&quot;')}'); return false;">Report${i + 1}</a>`
    ).join('') : ''}
            </div>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  tbody.innerHTML = html;
}

/* =====================================================
   File handling and UI bootstrap
   ===================================================== */
async function onFilesChosen(files) {
  if (!files.length) return;

  // Show loading indicator
  showLoadingIndicator();

  // Revoke previous URLs
  if (Array.isArray(REPORT_FILES) && REPORT_FILES.length) {
    REPORT_FILES.forEach(r => { if (r && r.url) try { URL.revokeObjectURL(r.url); } catch { } });
  }

  // Build REPORT_FILES with object URLs (for "Open (Local)")
  REPORT_FILES = files.map(f => ({
    name: f.name,
    file: f,
    lastModified: f.lastModified || Date.now(),
    url: URL.createObjectURL(f),
    relPath: (f.webkitRelativePath || f.name || '').replace(/\\/g, '/')
  }));

  // Sort newest first by timestamp (fallback: lastModified)
  REPORT_FILES.sort((a, b) => {
    const ta = parseTimestampFromName(a.name)?.getTime() || a.lastModified || 0;
    const tb = parseTimestampFromName(b.name)?.getTime() || b.lastModified || 0;
    return tb - ta;
  });

  try {
    // Load sections progressively with status updates
    updateLoadingStatus('Loading report summary...');
    await displayReportSummary();

    updateLoadingStatus('Initializing comparison...');
    await Promise.resolve(initCompare());

    updateLoadingStatus('Loading history...');
    await Promise.resolve(populateHistory());

    updateLoadingStatus('Analyzing flaky tests...');
    await displayFlakyTestsAnalysis();

    hideLoadingIndicator();
  } catch (error) {
    console.error('Error loading reports:', error);
    hideLoadingIndicator();
    alert('Error loading reports. Please check console for details.');
  }
}

function showLoadingIndicator() {
  let indicator = document.getElementById('loading-indicator');
  if (!indicator) {
    indicator = document.createElement('div');
    indicator.id = 'loading-indicator';
    indicator.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(15, 23, 42, 0.95);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      color: var(--text);
    `;
    indicator.innerHTML = `
      <div style="text-align: center;">
        <div style="font-size: 24px; margin-bottom: 16px;">Loading Reports...</div>
        <div id="loading-status" style="font-size: 14px; color: var(--muted);"></div>
        <div style="margin-top: 20px; width: 300px; height: 4px; background: var(--border); border-radius: 2px; overflow: hidden;">
          <div id="loading-progress" style="width: 0%; height: 100%; background: var(--accent); transition: width 0.3s;"></div>
        </div>
      </div>
    `;
    document.body.appendChild(indicator);
  }
  indicator.style.display = 'flex';
}

function updateLoadingStatus(message) {
  const status = document.getElementById('loading-status');
  if (status) {
    status.textContent = message;
  }
  const progress = document.getElementById('loading-progress');
  if (progress) {
    const currentWidth = parseFloat(progress.style.width) || 0;
    progress.style.width = Math.min(currentWidth + 25, 90) + '%';
  }
}

function hideLoadingIndicator() {
  const indicator = document.getElementById('loading-indicator');
  if (indicator) {
    const progress = document.getElementById('loading-progress');
    if (progress) progress.style.width = '100%';
    setTimeout(() => {
      indicator.style.display = 'none';
    }, 300);
  }
}

/* =====================================================
   Navigate to specific scenario in report
   ===================================================== */
function openReportAndNavigate(url, scenarioName, featureName) {
  const encodedScenario = encodeURIComponent(scenarioName);
  const encodedFeature = featureName ? encodeURIComponent(featureName) : '';
  const hash = encodedFeature ? `#feature=${encodedFeature}&scenario=${encodedScenario}` : `#scenario=${encodedScenario}`;
  const newWindow = window.open(url + hash, '_blank');

  if (newWindow) {
    newWindow.focus();

    // Poll until document is loaded
    const pollInterval = setInterval(() => {
      try {
        if (newWindow.document && newWindow.document.readyState === 'complete') {
          clearInterval(pollInterval);

          // Inject navigation script
          const script = newWindow.document.createElement('script');
          script.textContent = `
            (function() {
              try {
                const hash = window.location.hash;
                console.log('Hash:', hash);
                if (!hash || !hash.includes('scenario=')) {
                  console.warn('No scenario in hash');
                  return;
                }
                
                // Parse hash manually (format: #feature=xxx&scenario=yyy)
                const hashContent = hash.substring(1); // Remove #
                const params = {};
                hashContent.split('&').forEach(pair => {
                  const [key, value] = pair.split('=');
                  if (key && value) {
                    params[key] = decodeURIComponent(value);
                  }
                });
                
                const scenarioName = params.scenario;
                const featureName = params.feature;
                console.log('Navigating to scenario:', scenarioName, 'in feature:', featureName);
                
                if (!scenarioName) {
                  console.warn('No scenario name found');
                  return;
                }
                
                // Helper function to get all text content of an element (direct children only)
                function getDirectText(el) {
                  return Array.from(el.childNodes)
                    .filter(node => node.nodeType === Node.TEXT_NODE)
                    .map(node => node.textContent.trim())
                    .join(' ');
                }
                
                // Helper function to check if element matches
                function matchesScenario(el, name) {
                  const fullText = el.textContent.trim();
                  const directText = getDirectText(el);
                  
                  // Check for exact match only
                  return fullText === name || 
                         directText === name || 
                         fullText === 'Scenario: ' + name ||
                         fullText === 'Scenario Outline: ' + name ||
                         directText === 'Scenario: ' + name ||
                         directText === 'Scenario Outline: ' + name;
                }
                
                // Find target element
                let targetElement = null;
                let featureElement = null;
                
                // Strategy 1: Try to find by traversing all elements
                const allElements = document.querySelectorAll('*');
                
                // First pass: Find feature if provided (exact match only)
                if (featureName) {
                  for (const el of allElements) {
                    const text = el.textContent.trim();
                    const directText = getDirectText(el);
                    const tag = el.tagName.toLowerCase();
                    const classes = String(el.className || '');
                    
                    if ((text === featureName || 
                         directText === featureName ||
                         text === 'Feature: ' + featureName ||
                         directText === 'Feature: ' + featureName) &&
                        (tag === 'h1' || tag === 'h2' || 
                         classes.includes('feature') || 
                         classes.includes('cucumber-feature'))) {
                      featureElement = el;
                      console.log('Found feature element:', el);
                      break;
                    }
                  }
                }
                
                // Second pass: Find scenario (within feature context if found)
                const searchElements = featureElement ? 
                  featureElement.querySelectorAll('*') : 
                  allElements;
                
                for (const el of searchElements) {
                  const tag = el.tagName.toLowerCase();
                  const classes = String(el.className || '');
                  const elId = String(el.getAttribute('id') || '');
                  
                  // Check if it's a likely scenario container
                  const isLikelyScenario = 
                    tag === 'h3' || tag === 'h4' || tag === 'summary' || tag === 'li' ||
                    classes.includes('scenario') || 
                    classes.includes('test') ||
                    classes.includes('cucumber-scenario') ||
                    elId.includes('scenario');
                  
                  if (isLikelyScenario && matchesScenario(el, scenarioName)) {
                    targetElement = el;
                    console.log('Found scenario element:', el);
                    break;
                  }
                }
                
                // Fallback: Search more broadly if not found (exact match only)
                if (!targetElement) {
                  console.log('Fallback search with exact match...');
                  for (const el of allElements) {
                    const text = el.textContent.trim();
                    const directText = getDirectText(el);
                    
                    // Only exact matches in fallback
                    if (text === scenarioName || 
                        directText === scenarioName ||
                        text === 'Scenario: ' + scenarioName ||
                        text === 'Scenario Outline: ' + scenarioName) {
                      targetElement = el;
                      console.log('Found via fallback (exact match):', el);
                      break;
                    }
                  }
                }
                
                if (!targetElement) {
                  console.error('Scenario not found:', scenarioName);
                  alert('Could not locate scenario: ' + scenarioName + '\\n\\nThe scenario may not be present in this report or may have a different name.');
                  return;
                }
                
                console.log('Found target element:', targetElement);
                
                // Expand all parent details elements
                let parent = targetElement.parentElement;
                while (parent) {
                  if (parent.tagName.toLowerCase() === 'details') {
                    parent.setAttribute('open', '');
                    console.log('Opened details:', parent);
                  }
                  parent = parent.parentElement;
                }
                
                // Scroll to element with delay to allow details to expand
                setTimeout(() => {
                  targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  console.log('Scrolled to element');
                  
                  // Highlight with animation
                  targetElement.style.transition = 'background-color 0.5s ease-in-out';
                  targetElement.style.backgroundColor = 'rgba(239, 68, 68, 0.4)';
                  targetElement.style.outline = '3px solid rgba(239, 68, 68, 0.6)';
                  targetElement.style.outlineOffset = '2px';
                  
                  setTimeout(() => {
                    targetElement.style.backgroundColor = '';
                    targetElement.style.outline = '';
                  }, 3000);
                }, 500);
                
              } catch (error) {
                console.error('Navigation error:', error);
                alert('Error navigating to scenario: ' + error.message);
              }
            })();
          `;
          newWindow.document.body.appendChild(script);
        }
      } catch (e) {
        clearInterval(pollInterval);
        console.warn('Could not access window:', e);
      }
    }, 100);

    // Stop polling after 10 seconds
    setTimeout(() => clearInterval(pollInterval), 10000);
  }
}

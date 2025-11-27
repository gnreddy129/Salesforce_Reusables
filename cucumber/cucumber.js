// cucumber.js
const config = `
  --require-module ts-node/register
  --require cucumber-hooks.js
  --format json:cucumber-reports/cucumber-html-reporter.json
  --format message:cucumber-reports/cucumber-html-reporter.ndjson
  --format html:cucumber-reports/report.html
  --publish-quiet
  --format @cucumber/pretty-formatter
  `;

export default config;

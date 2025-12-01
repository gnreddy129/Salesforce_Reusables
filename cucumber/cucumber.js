// cucumber.js
const config = `
  --require-module ts-node/register
  --require cucumber/cucumber-hooks.js
  --format json:cucumber-reports/cucumber-report.json
  --format @cucumber/pretty-formatter
  `;

export default config;

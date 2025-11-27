#!/usr/bin/env node

// Demo preview of the CLI without actually running tests
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
};

const colorize = (text, color) => `${colors[color]}${text}${colors.reset}`;

const banner = `
${colors.cyan}╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║   ${colors.bright}🚀 SALESFORCE TEST RUNNER CLI 🚀${colors.cyan}                    ║
║                                                               ║
║   ${colors.yellow}Run your Playwright & Cucumber tests with style!${colors.cyan}        ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝${colors.reset}
`;

function showPreview() {
  console.clear();
  console.log(banner);

  console.log(
    colorize(
      "\n📋 INTERACTIVE MENU PREVIEW - Use ↑↓ arrows to navigate, Enter to select:",
      "bright"
    )
  );
  console.log(colorize("═".repeat(70), "dim"));

  const directories = [
    {
      icon: "👥",
      name: "CustomerData",
      count: 15,
      available: true,
      selected: true,
    },
    { icon: "💰", name: "Finance", count: 2, available: true, selected: false },
    {
      icon: "📦",
      name: "Inventory",
      count: 4,
      available: true,
      selected: false,
    },
    {
      icon: "📢",
      name: "Marketing",
      count: 2,
      available: true,
      selected: false,
    },
    {
      icon: "⚙️",
      name: "OtherFunctionality",
      count: 11,
      available: true,
      selected: false,
    },
    {
      icon: "🏗️",
      name: "Platform",
      count: 4,
      available: true,
      selected: false,
    },
    { icon: "💼", name: "Sales", count: 7, available: true, selected: false },
    { icon: "🛠️", name: "Service", count: 6, available: true, selected: false },
    {
      icon: "🎯",
      name: "All Tests",
      count: 51,
      available: true,
      selected: false,
    },
  ];

  directories.forEach((dir) => {
    const status = dir.available ? "✅" : "❌";
    const prefix = dir.selected ? colorize("❯", "cyan") : " ";
    const highlight = dir.selected ? colors.cyan : colors.reset;
    console.log(
      `${prefix} ${highlight}${dir.icon} ${dir.name} ${status} (${dir.count} tests)${colors.reset}`
    );
  });

  console.log(colorize("\n  🚪 Exit", "red"));

  // Show run options preview
  setTimeout(() => {
    console.log(
      colorize("\n⚡ RUN OPTIONS MENU - Arrow navigation:", "bright")
    );
    console.log(colorize("═".repeat(45), "dim"));

    const runOptions = [
      { icon: "🏃", name: "Run All Tests in Directory", selected: false },
      { icon: "�", name: "Run Specific Test File", selected: true },
      {
        icon: "📊",
        name: "Run All Tests in Directory + Reports",
        selected: false,
      },
      { icon: "📝", name: "Run Specific Test + Reports", selected: false },
      { icon: "🌐", name: "Run All + Reports + Open Browser", selected: false },
      { icon: "🎮", name: "Open Playwright UI Mode", selected: false },
      { icon: "📈", name: "View Existing Reports", selected: false },
      { icon: "⬅️", name: "Back to Main Menu", selected: false },
    ];

    runOptions.forEach((option) => {
      const prefix = option.selected ? colorize("❯", "cyan") : " ";
      const highlight = option.selected ? colors.green : colors.reset;
      console.log(
        `${prefix} ${highlight}${option.icon} ${option.name}${colors.reset}`
      );
    });

    // Show spinner demo
    setTimeout(() => {
      console.log(colorize("\n🚀 Test Execution Preview:", "bright"));
      console.log(colorize("═".repeat(30), "dim"));

      const spinner = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
      let spinnerIndex = 0;
      let count = 0;

      const spinnerInterval = setInterval(() => {
        process.stdout.write(
          `\r${colors.cyan}${spinner[spinnerIndex]} Running tests...${colors.reset}`
        );
        spinnerIndex = (spinnerIndex + 1) % spinner.length;
        count++;

        if (count > 20) {
          clearInterval(spinnerInterval);
          process.stdout.write("\r" + " ".repeat(30) + "\r");
          console.log(colorize("✅ Tests completed successfully!", "green"));
          console.log(colorize("📊 Generating reports...", "yellow"));
          console.log(colorize("🌐 Opening reports in browser...", "cyan"));
          console.log(colorize("✅ All done!", "green"));

          console.log(colorize("\n🎯 This was just a preview!", "bright"));
          console.log(
            colorize("To run the actual CLI, use: npm run cli", "yellow")
          );
        }
      }, 100);
    }, 2000);
  }, 1000);
}

showPreview();

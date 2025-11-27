// CLI Configuration and utilities
const config = {
  version: "1.0.0",
  author: "Salesforce Test Team",
  description: "Interactive CLI for Salesforce Test Automation",

  // Terminal width for formatting
  terminalWidth: process.stdout.columns || 80,

  // Animation settings
  spinnerSpeed: 100,

  // Report settings
  reportTimeout: 5000,

  // Color themes
  themes: {
    default: {
      primary: "cyan",
      secondary: "yellow",
      success: "green",
      error: "red",
      warning: "yellow",
      info: "blue",
      dim: "dim",
    },
    dark: {
      primary: "white",
      secondary: "magenta",
      success: "green",
      error: "red",
      warning: "yellow",
      info: "cyan",
      dim: "dim",
    },
  },

  // Test environments
  environments: {
    dev: { name: "Development", icon: "🔧" },
    staging: { name: "Staging", icon: "🎭" },
    prod: { name: "Production", icon: "🚀" },
  },
};

// Utility functions
const utils = {
  // Format duration in human readable format
  formatDuration(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) {
      return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    } else {
      return `${seconds}s`;
    }
  },

  // Center text in terminal
  centerText(text, width = config.terminalWidth) {
    const padding = Math.max(0, Math.floor((width - text.length) / 2));
    return " ".repeat(padding) + text;
  },

  // Create a separator line
  separator(char = "═", width = 50) {
    return char.repeat(width);
  },

  // Get current timestamp
  timestamp() {
    return new Date().toLocaleString();
  },

  // Validate directory exists and has features
  validateDirectory(dirPath) {
    const fs = require("fs");
    const path = require("path");

    if (!fs.existsSync(dirPath)) {
      return { valid: false, reason: "Directory does not exist" };
    }

    const files = fs.readdirSync(dirPath);
    const featureFiles = files.filter((file) => file.endsWith(".feature"));

    if (featureFiles.length === 0) {
      return { valid: false, reason: "No .feature files found" };
    }

    return { valid: true, count: featureFiles.length, files: featureFiles };
  },

  // Check if npm command exists
  checkNpmCommand(command) {
    const { execSync } = require("child_process");
    try {
      execSync(`npm run ${command} --silent`, { stdio: "ignore" });
      return true;
    } catch {
      return false;
    }
  },

  // Get system information
  getSystemInfo() {
    const os = require("os");
    return {
      platform: os.platform(),
      arch: os.arch(),
      nodeVersion: process.version,
      memory: Math.round(os.totalmem() / 1024 / 1024 / 1024) + "GB",
      cpus: os.cpus().length,
    };
  },
};

// Export for use in main CLI
module.exports = { config, utils };

const http = require("http");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

let PORT = 5500;
// Go up one level from cucumber folder to project root, then into cucumber-reports
const ROOT_DIR = path.join(__dirname, "..", "cucumber-reports");

const mimeTypes = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

function openBrowser(url) {
  console.log(`Opening browser: ${url}`);
  if (process.platform === "win32") {
    exec(`cmd /c start "" "${url}"`);
  } else if (process.platform === "darwin") {
    exec(`open "${url}"`);
  } else {
    exec(`xdg-open "${url}"`);
  }
}

function startServer(port) {
  const server = http.createServer((req, res) => {
    let filePath = path.join(
      ROOT_DIR,
      req.url === "/" ? "advanced-dashboard-v2.html" : req.url
    );
    filePath = decodeURIComponent(filePath);

    const extname = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[extname] || "application/octet-stream";

    fs.readFile(filePath, (err, content) => {
      if (err) {
        if (err.code === "ENOENT") {
          res.writeHead(404, { "Content-Type": "text/html" });
          res.end("<h1>404 - File Not Found</h1>", "utf-8");
        } else {
          res.writeHead(500);
          res.end(`Server Error: ${err.code}`);
        }
      } else {
        res.writeHead(200, { "Content-Type": contentType });
        res.end(content, "utf-8");
      }
    });
  });

  server.listen(port, () => {
    const url = `http://localhost:${port}/advanced-dashboard-v2.html`;
    console.log(`\n🚀 Dashboard server running at ${url}\n`);
    console.log("Press Ctrl+C to stop the server\n");

    // Small delay before opening browser
    setTimeout(() => openBrowser(url), 500);
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.log(`Port ${port} is in use, trying ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error("Server error:", err);
    }
  });
}

startServer(PORT);

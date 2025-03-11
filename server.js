import { createRequestHandler } from "@remix-run/node";
import { installGlobals } from "@remix-run/node";
import * as fs from "node:fs";
import * as path from "node:path";
import * as url from "node:url";
import { createServer } from "node:http";

// Install Remix globals
installGlobals();

// Define the port to run on
const PORT = process.env.PORT || 3000;

// Get the directory name of the current module
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

// Create a request handler for the Remix app
const createDevRequestHandler = () => {
  const buildPath = path.resolve(__dirname, "build/index.js");
  
  return createRequestHandler({
    build: {
      serverBuildPath: buildPath,
      serverModuleFormat: "esm",
    },
    mode: "development",
  });
};

// Create an HTTP server
const server = createServer(async (req, res) => {
  // Handle requests to the Remix app
  try {
    const handler = createDevRequestHandler();
    await handler(req, res);
  } catch (error) {
    console.error("Error handling request:", error);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

// Watch for changes and restart the server
const { spawn } = await import("node:child_process");

// Run Remix in watch mode
const remixDev = spawn("npx", ["remix", "watch"], {
  stdio: "inherit",
  shell: true,
});

remixDev.on("error", (error) => {
  console.error("Failed to start Remix watch process:", error);
});

console.log("Remix watch process started");

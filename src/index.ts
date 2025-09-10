#!/usr/bin/env node

// stdout is used to send messages to the client
// we redirect everything else to stderr to make sure it doesn't interfere with ACP
console.log = console.error;
console.info = console.error;
console.warn = console.error;
console.debug = console.error;

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

// Parse command line arguments for Claude path
const claudePathIndex = process.argv.indexOf('--claude-path');
const claudePath = claudePathIndex !== -1 && claudePathIndex + 1 < process.argv.length 
  ? process.argv[claudePathIndex + 1] 
  : undefined;

import { runAcp as runAcp } from "./acp-agent.js";
runAcp(claudePath);

// Keep process alive
process.stdin.resume();

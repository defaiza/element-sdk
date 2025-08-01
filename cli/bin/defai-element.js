#!/usr/bin/env node

const path = require('path');
const { spawn } = require('child_process');

// Check if we're in development (running from source)
const isDev = __filename.includes('element-sdk/cli/bin');

let cliPath;
if (isDev) {
  // Development: run TypeScript directly
  cliPath = path.resolve(__dirname, '../src/index.ts');
  const child = spawn('npx', ['ts-node', cliPath, ...process.argv.slice(2)], {
    stdio: 'inherit',
    cwd: path.resolve(__dirname, '..')
  });
  
  child.on('exit', (code) => {
    process.exit(code);
  });
} else {
  // Production: run compiled JavaScript
  cliPath = path.resolve(__dirname, '../lib/index.js');
  require(cliPath);
} 
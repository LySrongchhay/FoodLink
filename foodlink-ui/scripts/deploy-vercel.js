#!/usr/bin/env node

/**
 * Cross-platform Vercel Deployment Runner for FoodLink
 * Supports both dedicated Customer and Merchant portal deployments.
 */

import { execSync, spawnSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const args = process.argv.slice(2);
const portalArg = args.find((a) => a.startsWith('--portal='));
const isDryRun = args.includes('--dry-run');

const portal = portalArg ? portalArg.split('=')[1].toLowerCase() : 'customer';

if (portal !== 'customer' && portal !== 'merchant') {
  console.error('[Deploy Error] Invalid portal specified. Must be "customer" or "merchant".');
  process.exit(1);
}

const projectName = portal === 'customer' ? 'foodlink-customer' : 'foodlink-merchant';
const buildCommand = portal === 'customer' ? 'build:customer' : 'build:merchant';

console.log(`\n======================================================`);
console.log(`FoodLink Vercel Deployment`);
console.log(`Portal Target : ${portal.toUpperCase()}`);
console.log(`Project Name  : ${projectName}`);
console.log(`Build Command : npm run ${buildCommand}`);
console.log(`======================================================\n`);

// 1. Build Portal
console.log(`[1/3] Building ${portal} production bundle...`);
try {
  const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  execSync(`${npmCmd} run ${buildCommand}`, {
    cwd: rootDir,
    stdio: 'inherit',
    env: { ...process.env, VITE_PORTAL_MODE: portal }
  });
  console.log(`[1/3] Successfully built ${portal} bundle.\n`);
} catch (err) {
  console.error(`[Build Error] Failed to build ${portal} bundle.`);
  process.exit(1);
}

// 2. Prepare Vercel Arguments
console.log(`[2/3] Configuring Vercel deployment parameters...`);
const vercelToken = process.env.VERCEL_TOKEN;
const vercelOrgId = process.env.VERCEL_ORG_ID;
const vercelProjectId = process.env.VERCEL_PROJECT_ID;

const vercelCmd = process.platform === 'win32' ? 'npx.cmd' : 'npx';
const vercelArgs = [
  'vercel',
  'deploy',
  '--prod',
  '--yes',
  '--name',
  projectName
];

if (vercelToken) {
  vercelArgs.push('--token', vercelToken);
  console.log(`[2/3] VERCEL_TOKEN detected and attached.`);
} else {
  console.log(`[2/3] Using local Vercel CLI credentials (if logged in).`);
}

if (isDryRun) {
  console.log(`\n[DRY RUN] Would execute: ${vercelCmd} ${vercelArgs.join(' ')}`);
  console.log(`[DRY RUN] Build verified. Exiting without deploying.`);
  process.exit(0);
}

// 3. Execute Deployment
console.log(`[3/3] Deploying to Vercel production...`);
try {
  const deployProcess = spawnSync(vercelCmd, vercelArgs, {
    cwd: rootDir,
    stdio: 'inherit',
    env: process.env
  });

  if (deployProcess.status !== 0) {
    console.error(`\n[Deploy Notice] Vercel CLI exited with status ${deployProcess.status}.`);
    console.log(`If authentication is needed, set $env:VERCEL_TOKEN="<your-token>" or run "npx vercel login".`);
    process.exit(deployProcess.status || 1);
  }

  console.log(`\nDeployment of ${projectName} complete!`);
} catch (err) {
  console.error(`[Deploy Error]`, err.message);
  process.exit(1);
}


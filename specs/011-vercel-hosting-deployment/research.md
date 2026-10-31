# Research & Technical Decisions: Automated Vercel Deployment Pipeline

**Feature Branch**: `011-vercel-hosting-deployment`  
**Date**: 2026-10-31  
**Spec Reference**: [specs/011-vercel-hosting-deployment/spec.md](file:///d:/DGIY/foodlink-2/specs/011-vercel-hosting-deployment/spec.md)

---

## 1. Objectives & Requirements

The user requested: *"hosting in vercel for me"*.
We need a robust, automated deployment pipeline that:
1. Deploys two dedicated sites from `foodlink-ui`:
   - **Customer Portal**: `foodlink-customer`
   - **Merchant Portal**: `foodlink-merchant`
2. Supports **local one-command deployment** via `npm run deploy:customer` and `npm run deploy:merchant`.
3. Supports an automated Node deployment script (`foodlink-ui/scripts/deploy-vercel.js`) that automatically checks for `VERCEL_TOKEN` or active Vercel login, builds the corresponding Vite mode, and runs `vercel deploy --prod`.
4. Supports continuous automated deployment via **GitHub Actions** (`.github/workflows/deploy-vercel.yml`) so any git push automatically deploys both links.

---

## 2. Technical Evaluation & Decisions

### Decision 1: Direct Vercel CLI Integration vs. Prebuilt Artifacts
- **Option A (Vercel builds in cloud)**: Push raw code to Vercel and let Vercel run `npm run build`.
  - *Risk*: Cloud build environment must match local Node versions and environment variables.
- **Option B (Local Build & Prebuilt Deploy with Vercel CLI) [RECOMMENDED]**:
  - Run `npm run build:customer` (producing `dist/`).
  - Deploy with `npx vercel --prod --cwd dist --yes` or `npx vercel deploy --prebuilt`.
  - *Advantage*: Guarantees that what was verified locally is 100% identical to what is served on Vercel, bypassing cloud build differences.

### Decision 2: Deployment Script Architecture (`foodlink-ui/scripts/deploy-vercel.js`)
We will create a cross-platform deployment script in Node.js that:
1. Accepts `--portal=customer` or `--portal=merchant`.
2. Sets `VITE_PORTAL_MODE` accordingly.
3. Runs the corresponding Vite build (`vite build --mode <portal>`).
4. Checks if `VERCEL_TOKEN` environment variable is set (or passes `--token $VERCEL_TOKEN`).
5. Invokes `npx vercel deploy --prod` targeting the specific project name (`foodlink-customer` or `foodlink-merchant`).
6. Outputs the live production URL.

### Decision 3: GitHub Actions Workflow (`.github/workflows/deploy-vercel.yml`)
- Trigger on `push` to `main` when paths in `foodlink-ui/**` change.
- Matrix jobs or sequential jobs for:
  - `deploy-customer`: runs `npm run build:customer`, deploys to `foodlink-customer`.
  - `deploy-merchant`: runs `npm run build:merchant`, deploys to `foodlink-merchant`.
- Uses GitHub Secrets (`VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`).

---

## 3. Constitutional Compliance

- **Principle II (Two-Sided Domain Separation & Dedicated Dual-Hosting)**: Strictly maintains separate deployment artifacts for Customer and Merchant without leaked switchers.
- **Principle IV (Offline-First Demo Reliability)**: Both deployments require zero backend to function.
- **Repository Isolation Gate**: Changes isolated to `foodlink-ui/` and `.github/workflows/`.


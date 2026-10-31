# Implementation Plan: Automated Vercel Hosting & Deployment Pipeline

**Branch**: `011-vercel-hosting-deployment` | **Date**: 2026-10-31 | **Spec**: [specs/011-vercel-hosting-deployment/spec.md](file:///d:/DGIY/foodlink-2/specs/011-vercel-hosting-deployment/spec.md)

**Input**: Feature specification from `specs/011-vercel-hosting-deployment/spec.md`

---

## Summary

Implement an automated Vercel deployment pipeline for Foodlink. Add `npm run deploy:customer` and `npm run deploy:merchant` commands powered by a cross-platform deployment runner script (`foodlink-ui/scripts/deploy-vercel.js`), configure GitHub Actions CI/CD workflow (`.github/workflows/deploy-vercel.yml`) for automated deployments on git push, and provide turn-key token and interactive authentication support.

---

## Technical Context

**Language/Version**: JavaScript (Node.js 18+), React 18, Vite  
**Primary Dependencies**: Vercel CLI (`vercel`), Vite, GitHub Actions  
**Target Platform**: Vercel Platform (Production Hosting)  
**Project Type**: React Single Page Application (`foodlink-ui/`)  
**Performance Goals**: < 30s deployment time, automated prebuilt artifact verification  
**Constraints**: Zero backend required for demo deployments. Strict adherence to Foodlink Constitution v1.2.0. Repository isolation: `customer/`, `merchant/`, and `server/` remain 100% untouched.

---

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Principle I (UI-First & Decoupled Architecture)**: Self-contained frontend demo architecture.
- [x] **Principle II (Two-Sided Domain Separation & Dedicated Dual-Hosting Strategy)**: Separate Vercel projects for Customer (`foodlink-customer`) and Merchant (`foodlink-merchant`) with zero leaked switchers.
- [x] **Principle III (Design System Consistency & Minimalist UX)**: Zero emojis; clean tokens.
- [x] **Principle IV (Contract-First Mock Data & Offline-First Demo Reliability)**: Deployments operate 100% offline-first with zero external database dependencies.
- [x] **Principle V (Simplicity & Incremental Delivery / YAGNI)**: Lightweight scripts and GitHub Actions; zero bloated CI overhead.
- [x] **Operational Constraint (Zero-Backend Mandate)**: High-fidelity Demo UI showcase.
- [x] **Repository Isolation Gate**: Work strictly confined to `foodlink-ui/` and `.github/workflows/`.

---

## Project Structure

### Documentation (this feature)

```text
specs/011-vercel-hosting-deployment/
├── spec.md              # Feature specification
├── plan.md              # Implementation plan (this file)
├── research.md          # Technical research & decision records
└── quickstart.md        # Deployment runbook & token guide
```

### Source Code (`foodlink-ui/` & `.github/`)

```text
.github/
└── workflows/
    └── deploy-vercel.yml                    # Automated GitHub Actions CI/CD for dual-portal Vercel deploy

foodlink-ui/
├── scripts/
│   └── deploy-vercel.js                     # Cross-platform automated deployment runner
└── package.json                             # deploy:customer and deploy:merchant scripts
```

---

## Implementation Phases

### Phase 1: Automated Vercel Deployment Runner
- Create `foodlink-ui/scripts/deploy-vercel.js`:
  - Parses `--portal=customer` or `--portal=merchant`.
  - Runs corresponding build (`npm run build:customer` or `npm run build:merchant`).
  - Spawns `npx vercel` with appropriate project name (`foodlink-customer` or `foodlink-merchant`), `--prod`, `--yes`, and optional `--token`.

### Phase 2: Package Deployment Scripts
- In `foodlink-ui/package.json`:
  - Add script `"deploy:customer": "node scripts/deploy-vercel.js --portal=customer"`.
  - Add script `"deploy:merchant": "node scripts/deploy-vercel.js --portal=merchant"`.

### Phase 3: GitHub Actions CI/CD Workflow
- Create `.github/workflows/deploy-vercel.yml`:
  - Configured with `push` trigger on `main`.
  - Jobs for deploying Customer and Merchant portals to Vercel.

### Phase 4: Verification & Quality Gate
- Verify script builds and executes cleanly.
- Verify Foodlink Constitution v1.2.0 compliance.
- Confirm `git status --porcelain customer merchant server` produces zero output.

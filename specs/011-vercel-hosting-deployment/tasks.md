---
description: "Task list for feature 011-vercel-hosting-deployment"
---

# Tasks: Automated Vercel Hosting & Deployment Pipeline

**Input**: Design documents from `specs/011-vercel-hosting-deployment/`  
**Prerequisites**: [plan.md](file:///d:/DGIY/foodlink-2/specs/011-vercel-hosting-deployment/plan.md), [spec.md](file:///d:/DGIY/foodlink-2/specs/011-vercel-hosting-deployment/spec.md), [research.md](file:///d:/DGIY/foodlink-2/specs/011-vercel-hosting-deployment/research.md), [quickstart.md](file:///d:/DGIY/foodlink-2/specs/011-vercel-hosting-deployment/quickstart.md)

## Format: `[ID] [P?] [Story] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Mapped to User Story (US1 = Deployment Runner & Scripts, US2 = GitHub Actions CI/CD, US3 = Build & Health Verification)
- Strict adherence to Constitution v1.2.0 (zero emojis, isolated to `foodlink-ui/` and `.github/`)

---

## Phase 1: Setup & Baseline

**Purpose**: Validate repository isolation and verify baseline build

- [x] T001 Verify git working tree isolation and ensure `customer/`, `merchant/`, and `server/` remain untouched
- [x] T002 Inspect `foodlink-ui/` build baseline with `npm.cmd run build`

---

## Phase 2: Foundational (Deployment Runner Script)

**Purpose**: Cross-platform Node.js deployment script for Vercel CLI execution

- [x] T003 [US1] Create `foodlink-ui/scripts/deploy-vercel.js` to build and deploy customer/merchant portals with token or interactive login support

**Checkpoint**: Deployment script can run locally or in automated pipelines.

---

## Phase 3: User Story 1 - One-Command Package Deploy Scripts (Priority: P1) [MVP]

**Goal**: Enable `npm run deploy:customer` and `npm run deploy:merchant` directly from `foodlink-ui/package.json`.

**Independent Test**: Run `node foodlink-ui/scripts/deploy-vercel.js --dry-run --portal=customer` and verify proper build and Vercel command construction.

### Implementation for User Story 1
- [x] T004 [US1] Add `"deploy:customer"` and `"deploy:merchant"` scripts to `foodlink-ui/package.json`

**Checkpoint**: User Story 1 (MVP) is functional and testable independently.

---

## Phase 4: User Story 2 - GitHub Actions Automated CI/CD Pipeline (Priority: P2)

**Goal**: Configure continuous dual-portal deployment to Vercel upon every push to `main`.

**Independent Test**: Validate `.github/workflows/deploy-vercel.yml` syntax and job definitions.

### Implementation for User Story 2
- [x] T005 [US2] Create `.github/workflows/deploy-vercel.yml` for automated GitHub Actions deployment to `foodlink-customer` and `foodlink-merchant`

**Checkpoint**: User Story 2 is configured for continuous cloud delivery.

---

## Phase 5: User Story 3 - Health & Persona Verification (Priority: P3)

**Goal**: Verify prebuilt artifacts for both portals and validate SPA routing.

**Independent Test**: Test customer and merchant build outputs and confirm `vercel.json` rewrite configuration.

### Implementation for User Story 3
- [x] T006 [US3] Verify customer and merchant build outputs and confirm `vercel.json` SPA rewrite rules

---

## Phase 6: Polish & Quality Gate Verification

**Purpose**: Cross-cutting verification against Foodlink Constitution v1.2.0

- [x] T007 [P] Verify Foodlink Constitution Principle III (Zero Emojis) across all created deployment scripts and workflows
- [x] T008 Execute production build verification for both portal targets (`npm.cmd run build:customer`, `npm.cmd run build:merchant`)
- [x] T009 Verify repository isolation gate: confirm `git status --porcelain customer merchant server` produces zero output

---

## Dependencies & Execution Order

### Phase Dependencies
- **Setup (Phase 1)**: Independent - runs first.
- **Foundational (Phase 2)**: Builds deployment runner script.
- **User Story 1 (Phase 3 - MVP)**: Wires package.json commands.
- **User Story 2 (Phase 4)**: Adds GitHub Actions CI/CD workflow.
- **User Story 3 (Phase 5)**: Validates prebuilt health.
- **Polish (Phase 6)**: Validates constitutional compliance and repository isolation.

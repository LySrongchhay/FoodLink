---
description: "Task list for feature 010-dual-hosting-links"
---

# Tasks: Dual Separate Hosting Links for Demo UI (Customer & Merchant)

**Input**: Design documents from `specs/010-dual-hosting-links/`  
**Prerequisites**: [plan.md](file:///d:/DGIY/foodlink-2/specs/010-dual-hosting-links/plan.md), [spec.md](file:///d:/DGIY/foodlink-2/specs/010-dual-hosting-links/spec.md), [research.md](file:///d:/DGIY/foodlink-2/specs/010-dual-hosting-links/research.md), [quickstart.md](file:///d:/DGIY/foodlink-2/specs/010-dual-hosting-links/quickstart.md)

## Format: `[ID] [P?] [Story] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Mapped to User Story (US1 = Portal Locking & Root Route, US2 = Switcher Removal, US3 = Build Scripts & Vercel Config)
- Strict adherence to Constitution v1.2.0 (zero emojis, persona isolation, isolated to `foodlink-ui/`)

---

## Phase 1: Setup & Baseline

**Purpose**: Validate repository isolation and verify baseline build

- [x] T001 Verify git working tree isolation and ensure `customer/`, `merchant/`, and `server/` remain untouched
- [x] T002 Inspect `foodlink-ui/` dependencies and verify clean build with `npm.cmd run build`

---

## Phase 2: Foundational (Mode Configuration & Router Auto-Detection)

**Purpose**: Core routing infrastructure that enables dual-link hosting across Vercel deployments

- [x] T003 [P] Create `foodlink-ui/.env.customer` with `VITE_PORTAL_MODE=customer`
- [x] T004 [P] Create `foodlink-ui/.env.merchant` with `VITE_PORTAL_MODE=merchant`
- [x] T005 Update `foodlink-ui/src/router/usePortalRouter.js` to support `VITE_PORTAL_MODE`, hostname auto-detection (`merchant` / `customer`), and export `hideRoleSwitchers` flag

**Checkpoint**: Routing engine can determine portal mode based on environment variables and domain hostnames.

---

## Phase 3: User Story 1 - Dedicated Demo Portals at Root URL `/` (Priority: P1) [MVP]

**Goal**: When accessing a dedicated link (e.g. `foodlink-customer.vercel.app` or `foodlink-merchant.vercel.app`), the appropriate portal mounts directly at `/` without launcher or query strings.

**Independent Test**: Run `npm run dev:customer` -> visit `http://localhost:5173/` -> mounts `CustomerApp`. Run `npm run dev:merchant` -> visit `http://localhost:5173/` -> mounts `MerchantApp`.

### Implementation for User Story 1
- [x] T006 [US1] Ensure `foodlink-ui/src/router/usePortalRouter.js` and `foodlink-ui/src/App.jsx` mount the locked portal immediately at root `/` with zero launcher flash

**Checkpoint**: User Story 1 (MVP) is functional and testable independently.

---

## Phase 4: User Story 2 - Complete Removal of Cross-Portal Switchers on Dedicated Links (Priority: P2)

**Goal**: Enforce Foodlink Constitution v1.2.0 Dedicated Persona Isolation Gate by completely omitting cross-role switchers on dedicated links.

**Independent Test**: Load Merchant portal under `mode=merchant` -> verify "Customer View" button is absent from top header. Load Customer portal under `mode=customer` -> verify "Merchant Operations Hub" card is absent from profile tab.

### Implementation for User Story 2
- [x] T007 [US2] Update `foodlink-ui/src/components/merchant/MerchantApp.jsx` to omit the "Customer View" toggle button when `hideRoleSwitchers` is true
- [x] T008 [US2] Update `foodlink-ui/src/components/customer/CustomerProfile.jsx` to omit the "Merchant Operations Hub" switcher card when `hideRoleSwitchers` is true

**Checkpoint**: User Stories 1 and 2 are functional together. Each portal is 100% focused on its persona.

---

## Phase 5: User Story 3 - Production-Ready Vercel Configuration & Build Scripts (Priority: P3)

**Goal**: Provide turn-key npm build scripts and `vercel.json` SPA configuration for 2-minute Vercel deployment.

**Independent Test**: Run `npm run build:customer` and `npm run build:merchant` inside `foodlink-ui/` and verify clean, error-free output.

### Implementation for User Story 3
- [x] T009 [US3] Add `"build:customer": "vite build --mode customer"` and `"build:merchant": "vite build --mode merchant"` scripts to `foodlink-ui/package.json`
- [x] T010 [US3] Create `foodlink-ui/vercel.json` with SPA rewrite rules (`"rewrites": [{"source": "/(.*)", "destination": "/index.html"}]`)

---

## Phase 6: Polish & Quality Gate Verification

**Purpose**: Cross-cutting verification against Foodlink Constitution v1.2.0

- [x] T011 [P] Verify Foodlink Constitution Principle III (Zero Emojis, clean minimalist typography) across all modified files
- [x] T012 [P] Verify Dedicated Persona Isolation Gate: confirm 0 switchers when testing customer/merchant modes
- [x] T013 Execute production build verification for all 3 targets (`npm.cmd run build:customer`, `npm.cmd run build:merchant`, `npm.cmd run build`) inside `foodlink-ui/`
- [x] T014 Verify repository isolation gate: confirm `git status --porcelain customer merchant server` produces zero output

---

## Dependencies & Execution Order

### Phase Dependencies
- **Setup (Phase 1)**: Independent - runs first.
- **Foundational (Phase 2)**: Sets up router and env modes - blocks user stories.
- **User Story 1 (Phase 3 - MVP)**: Verifies root route mounting.
- **User Story 2 (Phase 4)**: Purges cross-role switchers on dedicated links.
- **User Story 3 (Phase 5)**: Adds build commands and `vercel.json`.
- **Polish (Phase 6)**: Validates constitutional compliance and isolation.

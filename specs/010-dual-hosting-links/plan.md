# Implementation Plan: Dual Separate Hosting Links for Demo UI (Customer & Merchant)

**Branch**: `010-dual-hosting-links` | **Date**: 2026-10-31 | **Spec**: [specs/010-dual-hosting-links/spec.md](file:///d:/DGIY/foodlink-2/specs/010-dual-hosting-links/spec.md)

**Input**: Feature specification from `specs/010-dual-hosting-links/spec.md`

---

## Summary

Implement dual-link hosting support in `foodlink-ui/` for Vercel demo deployments. Enable environment variable portal locking (`VITE_PORTAL_MODE=customer` and `VITE_PORTAL_MODE=merchant`) and hostname auto-detection, completely remove cross-role switcher buttons on dedicated links per Foodlink Constitution v1.2.0, provide dedicated build scripts (`build:customer`, `build:merchant`), and generate a production `vercel.json` SPA configuration.

---

## Technical Context

**Language/Version**: JavaScript (ES2022+), React 18  
**Primary Dependencies**: React, Lucide React, Tailwind CSS, Vite  
**Target Platform**: Vercel (Production Hosting), Evergreen Mobile/Desktop Browsers  
**Project Type**: React Single Page Application (`foodlink-ui/`)  
**Performance Goals**: < 1000ms production build time, 60fps smooth touch interaction  
**Constraints**: 100% self-contained offline-first Demo UI (zero backend or database servers required). Strict adherence to Foodlink Constitution v1.2.0 (zero emojis, zero cross-portal switchers on dedicated links). Absolute isolation: `customer/`, `merchant/`, and `server/` remain 100% untouched.

---

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Principle I (UI-First & Decoupled Architecture)**: Self-contained frontend demo architecture powered by deterministic mock stores; zero backend dependencies.
- [x] **Principle II (Two-Sided Domain Separation & Dedicated Dual-Hosting Strategy)**: Strict separation of Customer and Merchant into two dedicated Vercel hosting links from a single codebase; complete removal of cross-role switchers on dedicated links.
- [x] **Principle III (Design System Consistency & Minimalist UX)**: Zero emojis; clean Inter typography; standardized design tokens.
- [x] **Principle IV (Contract-First Mock Data & Offline-First Demo Reliability)**: 100% offline-first reliability for presentation and evaluation without server timeouts.
- [x] **Principle V (Simplicity & Incremental Delivery / YAGNI)**: Single-codebase multi-target Vercel configuration; no heavy monorepo tooling or code duplication.
- [x] **Operational Constraint (Zero-Backend Mandate)**: Runs cleanly without cloud databases or live network APIs.
- [x] **Quality Gate (Dedicated Persona Isolation Gate)**: Verified complete omission of "Customer View" in Merchant and "Merchant Hub" in Customer on dedicated links.
- [x] **Repository Isolation Gate**: Changes strictly confined to `foodlink-ui/`.

---

## Project Structure

### Documentation (this feature)

```text
specs/010-dual-hosting-links/
├── spec.md              # Feature specification
├── plan.md              # Implementation plan (this file)
├── research.md          # Technical research & decision records
├── quickstart.md        # Step-by-step Vercel deployment guide & testing
└── tasks.md             # Tasks checklist (generated in next step)
```

### Source Code (`foodlink-ui/`)

```text
foodlink-ui/
├── .env.customer                         # VITE_PORTAL_MODE=customer
├── .env.merchant                         # VITE_PORTAL_MODE=merchant
├── vercel.json                           # SPA rewrite rule for Vercel
├── package.json                          # build:customer and build:merchant scripts
└── src/
    ├── router/
    │   └── usePortalRouter.js            # Portal locking, hostname detection & hideRoleSwitchers flag
    ├── components/
    │   ├── merchant/
    │   │   └── MerchantApp.jsx           # Conditionally omit "Customer View" toggle when hideRoleSwitchers is true
    │   └── customer/
    │       └── CustomerProfile.jsx       # Conditionally omit "Merchant Operations Hub" card when hideRoleSwitchers is true
```

---

## Implementation Phases

### Phase 1: Environment Modes & Router Auto-Detection
- In `foodlink-ui/src/router/usePortalRouter.js`:
  - Read `import.meta.env.VITE_PORTAL_MODE`. If `'customer'` or `'merchant'`, lock default portal immediately.
  - Auto-detect hostname: if hostname includes `'merchant'`, default to `'merchant'`; if hostname includes `'customer'`, default to `'customer'`.
  - Export `isLockedPortal` and `hideRoleSwitchers`:
    ```javascript
    export const isLockedPortal = import.meta.env.VITE_PORTAL_MODE === 'customer' || import.meta.env.VITE_PORTAL_MODE === 'merchant';
    export const hideRoleSwitchers = isLockedPortal || (typeof window !== 'undefined' && (window.location.hostname.includes('merchant') || window.location.hostname.includes('customer')));
    ```
- Create `foodlink-ui/.env.customer` (`VITE_PORTAL_MODE=customer`).
- Create `foodlink-ui/.env.merchant` (`VITE_PORTAL_MODE=merchant`).

### Phase 2: Complete Removal of Role Switchers on Dedicated Links
- In `foodlink-ui/src/components/merchant/MerchantApp.jsx`:
  - Import `hideRoleSwitchers` from `../../router/usePortalRouter`.
  - Wrap the "Customer View" header button in `{!hideRoleSwitchers && (...)}`.
- In `foodlink-ui/src/components/customer/CustomerProfile.jsx`:
  - Import `hideRoleSwitchers` from `../../router/usePortalRouter`.
  - Wrap the "Merchant Operations Hub" switcher card in `{!hideRoleSwitchers && (...)}`.

### Phase 3: Package Build Scripts & Vercel SPA Configuration
- In `foodlink-ui/package.json`:
  - Add script `"build:customer": "vite build --mode customer"`.
  - Add script `"build:merchant": "vite build --mode merchant"`.
- Create `foodlink-ui/vercel.json`:
  - Add rewrite rules so subroutes rewrite to `/index.html` on Vercel.

### Phase 4: Verification & Quality Gate
- Verify `npm.cmd run build:customer` builds cleanly.
- Verify `npm.cmd run build:merchant` builds cleanly.
- Verify universal `npm.cmd run build` builds cleanly.
- Audit for Constitution v1.2.0 compliance (0 emojis, zero switchers when mode is set).
- Confirm `git status --porcelain customer merchant server` produces zero output.

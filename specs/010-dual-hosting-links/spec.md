# Feature Specification: Dual Separate Hosting Links for Demo UI (Customer & Merchant)

**Feature Branch**: `010-dual-hosting-links`  
**Created**: 2026-10-31  
**Status**: Specified & Clarified  
**Input**: User query: "I want to seperate the project into two spereate hosting link, is that feasible? ... our project purpose for just demo UI only"

---

## Executive Summary & Feasibility Verdict

**Verdict**: **100% FEASIBLE, PERFECT FOR DEMOS, AND ZERO BACKEND REQUIRED.**

Because the purpose of the project is **Demo UI showcase**, separating Foodlink into two dedicated Vercel hosting links:
- **Customer Demo Link** (e.g., `https://foodlink-customer.vercel.app`)
- **Merchant Demo Link** (e.g., `https://foodlink-merchant.vercel.app`)

is the cleanest, most impressive way to present the project to stakeholders, reviewers, and users:
1. **Zero Backend Maintenance**: No external Node/Express cloud servers, databases, or API maintenance needed. Both links run entirely on self-contained, offline-first client mock data.
2. **Dedicated Persona Immersion**: When presenting the customer experience, the audience sees a pure consumer food rescue app. When presenting the merchant experience, the audience sees a pure kitchen management portal.
3. **Strict Separation (No Switchers)**: As requested, role switcher buttons are **completely removed** from both production links. There is no "Customer View" button in the Merchant header and no "Merchant Hub" card in the Customer profile.
4. **Single Codebase**: Both links deploy from the exact same GitHub repository using Vercel environment variables or subdomain detection.

---

## Architecture for Demo Deployments

```
                          ┌──────────────────────────┐
                          │   Shared Git Repository  │
                          │      (foodlink-ui)       │
                          └─────────────┬────────────┘
                                        │
                 ┌──────────────────────┴──────────────────────┐
                 ▼                                             ▼
  ┌─────────────────────────────┐               ┌─────────────────────────────┐
  │   Vercel Project 1:         │               │   Vercel Project 2:         │
  │   Customer Demo Link        │               │   Merchant Demo Link        │
  │   (e.g., foodlink-customer) │               │   (e.g., foodlink-merchant) │
  │                             │               │                             │
  │   • VITE_PORTAL_MODE=customer│               │   • VITE_PORTAL_MODE=merchant│
  │   • Customer Discovery & Map│               │   • Kitchen Queue & Dashboard│
  │   • Zero Merchant Switchers │               │   • Zero Customer Switchers │
  │   • Self-contained Mock Data│               │   • Self-contained Mock Data│
  └─────────────────────────────┘               └─────────────────────────────┘
```

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Dedicated Demo Portals at Root URL `/` (Priority: P1) [MVP]

As an evaluator or reviewer opening either the Customer Demo link or Merchant Demo link,  
I want to arrive directly at that specific persona's interface at the root URL `/` without needing path extensions (`/customer`, `/merchant`) or query strings (`?portal=merchant`),  
So that the demo link feels like a real, standalone production product.

**Why this priority**: Essential for presentation quality. Stakeholders can be given a direct customer link or merchant link without confusion.

**Independent Test**:
1. Run with `VITE_PORTAL_MODE=merchant` -> Root path `/` directly mounts `MerchantApp`.
2. Run with `VITE_PORTAL_MODE=customer` -> Root path `/` directly mounts `CustomerApp`.
3. In browser with hostname containing `merchant` (e.g. `foodlink-merchant.vercel.app`) -> Automatically resolves to `MerchantApp`.
4. In browser with hostname containing `customer` (e.g. `foodlink-customer.vercel.app`) -> Automatically resolves to `CustomerApp`.

**Acceptance Scenarios**:
1. **Given** `VITE_PORTAL_MODE=merchant` or host includes `merchant`, **When** the site loads at `/`, **Then** `MerchantApp` mounts immediately.
2. **Given** `VITE_PORTAL_MODE=customer` or host includes `customer`, **When** the site loads at `/`, **Then** `CustomerApp` mounts immediately.
3. **Given** local development on generic `localhost:5173` without `VITE_PORTAL_MODE`, **When** loaded, **Then** query parameter (`?portal=merchant`) and path routing remain functional for local dual-role testing.

---

### User Story 2 - Complete Removal of Cross-Portal Switchers (Priority: P2)

As a presenter demonstrating the customer or merchant flow,  
I want the UI to be strictly isolated without any switcher buttons to the opposite role,  
So that the interface remains clean, focused, and free of confusing developer toggles.

**Why this priority**: Directly requested by the user. Prevents persona leakage during demos.

**Independent Test**:
1. Open Merchant Demo -> Top header contains CAD Bakery branding, Store status, and Notifications. The "Customer View" button is **completely absent**.
2. Open Customer Demo -> Profile tab contains User stats, Impact counter, and Preferences. The "Merchant Operations Hub" card is **completely absent**.

**Acceptance Scenarios**:
1. **Given** `VITE_PORTAL_MODE=merchant` or host includes `merchant`, **When** viewing the merchant header, **Then** the "Customer View" button is not rendered.
2. **Given** `VITE_PORTAL_MODE=customer` or host includes `customer`, **When** viewing the customer profile, **Then** the "Merchant Operations Hub" card is not rendered.
3. **Given** local development with `VITE_PORTAL_MODE=universal` or unset, **When** testing, **Then** switchers can optionally display for developer convenience.

---

### User Story 3 - Production-Ready Vercel Configuration & Build Scripts (Priority: P3)

As a developer deploying the project to Vercel,  
I want pre-configured build commands (`build:customer`, `build:merchant`, and `build`) and a `vercel.json` SPA configuration,  
So that deploying both links to Vercel takes under 2 minutes with zero build or 404 reload errors.

**Why this priority**: Zero-friction deployment for demo links.

**Independent Test**: Execute `npm run build:customer` and `npm run build:merchant` inside `foodlink-ui/`. Verify both build cleanly without warnings or errors.

**Acceptance Scenarios**:
1. **Given** `npm run build:customer` is executed, **When** inspected, **Then** the build succeeds and outputs a production customer bundle locked to Customer mode.
2. **Given** `npm run build:merchant` is executed, **When** inspected, **Then** the build succeeds and outputs a production merchant bundle locked to Merchant mode.
3. **Given** `vercel.json` is present in `foodlink-ui/`, **When** deployed to Vercel, **Then** refreshing any page or route renders smoothly without 404 errors.

---

## Edge Cases

- **Page Reloads on Subroutes**: If a presenter refreshes while viewing a sub-view, `vercel.json` rewrite (`"rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]`) must route back to `index.html` cleanly.
- **Independent Mock Storage**: When both demo links are opened on the same laptop in different tabs, the mock data ensures seamless demonstration of reservations and pick-up handovers.
- **Zero Backend Errors**: Since this is demo UI, zero red console errors regarding failed backend/socket connections should appear on screen. The app gracefully defaults to its rich mock state.

---

## Functional Requirements

- **FR-001**: System MUST support `VITE_PORTAL_MODE` (`'customer'`, `'merchant'`, `'universal'`) in `foodlink-ui`.
- **FR-002**: System MUST auto-detect hostname in `usePortalRouter.js` (hostnames containing `'merchant'` lock to `'merchant'`; hostnames containing `'customer'` lock to `'customer'`).
- **FR-003**: System MUST completely omit the "Customer View" button in `MerchantApp.jsx` when running in locked merchant mode or when `VITE_PORTAL_MODE === 'merchant'`.
- **FR-004**: System MUST completely omit the "Merchant Operations Hub" card in `CustomerProfile.jsx` when running in locked customer mode or when `VITE_PORTAL_MODE === 'customer'`.
- **FR-005**: System MUST provide dedicated npm scripts in `foodlink-ui/package.json`:
  - `"build:customer": "vite build --mode customer"`
  - `"build:merchant": "vite build --mode merchant"`
  - `"build": "vite build"`
- **FR-006**: System MUST provide a production-ready `vercel.json` in `foodlink-ui/` with SPA rewrite rules for smooth browser reloads.
- **FR-007**: System MUST provide clean, zero-error fallback when no backend URL is provided, guaranteeing 100% flawless Demo UI presentation.
- **FR-008**: System MUST maintain 100% adherence to Foodlink Constitution v1.1.0, keeping `customer/`, `merchant/`, and `server/` untouched.

---

## Success Criteria

- **SC-001**: Opening the Merchant Demo link displays exclusively the Merchant Portal at root `/` with zero customer switcher buttons.
- **SC-002**: Opening the Customer Demo link displays exclusively the Customer App at root `/` with zero merchant switcher cards.
- **SC-003**: Both `npm run build:customer` and `npm run build:merchant` compile cleanly in < 1000ms with zero errors.
- **SC-004**: Both demo links function 100% offline-first and zero-backend, providing an instant, flawless presentation.
- **SC-005**: All code modifications are strictly isolated to `foodlink-ui/`.

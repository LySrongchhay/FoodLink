# Research & Feasibility Analysis: Dual Vercel Hosting for Demo UI

**Feature Branch**: `010-dual-hosting-links`  
**Date**: 2026-10-31  
**Spec Reference**: [specs/010-dual-hosting-links/spec.md](file:///d:/DGIY/foodlink-2/specs/010-dual-hosting-links/spec.md)

---

## 1. Problem Statement & Objectives

Foodlink currently has two distinct functional sides:
- **Customer Portal**: Surplus food discovery, closing-hour discount feeds, active pickup pass, order checkout.
- **Merchant Portal**: Bakery dashboard, kitchen reservation queue, stock management, counter pickup verification.

For presentations, academic reviews, and stakeholder demos, the user wants **two separate hosting links** (e.g. on Vercel) instead of forcing reviewers to navigate through query parameters or shared launchers:
- **Link 1**: `https://foodlink-customer.vercel.app` (Pure consumer demo)
- **Link 2**: `https://foodlink-merchant.vercel.app` (Pure bakery/kitchen demo)

Additionally, the user requested that **all cross-portal role switchers be completely removed** on dedicated links so the two links look and behave as 100% distinct, professional production products.

---

## 2. Architecture Analysis & Technical Decisions

### Decision 1: Single Monorepo with Multi-Target Deployment vs. Monorepo Forking
- **Option A (Separate Repositories/Directories)**: Duplicate the code into two repos or folders.
  - *Drawback*: Violates DRY. Huge maintenance overhead. Two places to fix bugs.
- **Option B (Single Monorepo with Vercel Environment Variables & Mode Build) [RECOMMENDED]**:
  - Keep a single `foodlink-ui` codebase.
  - In Vercel, create two separate projects pointing to the same GitHub repo:
    - **Project 1 (Customer)**: Root directory `foodlink-ui`, Build Command `npm run build:customer` (or env `VITE_PORTAL_MODE=customer`).
    - **Project 2 (Merchant)**: Root directory `foodlink-ui`, Build Command `npm run build:merchant` (or env `VITE_PORTAL_MODE=merchant`).
  - *Verdict*: High maintainability, zero duplicate code, automated continuous deployment for both links on every git push.

### Decision 2: Hostname Auto-Detection & Fallback
- Even if a reviewer accesses the link on a custom domain (e.g. `merchant.foodlink.app` or `foodlink-merchant.vercel.app`), the client router in `usePortalRouter.js` checks `window.location.hostname`:
  ```javascript
  const hostname = window.location.hostname.toLowerCase();
  if (hostname.includes('merchant')) return 'merchant';
  if (hostname.includes('customer')) return 'customer';
  ```
- If the environment variable `VITE_PORTAL_MODE` is set, it overrides and locks the portal unconditionally.
- If running locally on generic `localhost:5173` without `VITE_PORTAL_MODE`, path-based routing (`/customer`, `/merchant`), query parameters (`?portal=merchant`), or universal fallback continue to work for developer convenience.

### Decision 3: Role Switcher Removal Strategy
- In Constitution v1.2.0 Principle II, dedicated production links MUST strictly omit cross-role switchers.
- Implementation:
  - In `usePortalRouter.js`:
    ```javascript
    export const isLockedPortal = import.meta.env.VITE_PORTAL_MODE === 'customer' || import.meta.env.VITE_PORTAL_MODE === 'merchant';
    export const hideRoleSwitchers = isLockedPortal || (typeof window !== 'undefined' && (window.location.hostname.includes('merchant') || window.location.hostname.includes('customer')));
    ```
  - In `MerchantApp.jsx`: Only render the "Customer View" button if `!hideRoleSwitchers`.
  - In `CustomerProfile.jsx`: Only render the "Merchant Operations Hub" card if `!hideRoleSwitchers`.

### Decision 4: Vercel SPA Routing Configuration
- Single Page Applications on Vercel return a 404 error if a user refreshes a subroute (e.g., `/orders` or `/profile`).
- We provide a standardized `vercel.json` in `foodlink-ui/`:
  ```json
  {
    "rewrites": [
      { "source": "/(.*)", "destination": "/index.html" }
    ]
  }
  ```
- This guarantees smooth page refreshes on both Vercel links.

---

## 3. Zero-Backend Demo Reliability
- Foodlink is engineered with rich, self-contained mock datasets for stores, active listings, order passes, and kitchen reservations.
- When `VITE_API_URL` is empty, API services in `foodlink-ui/src/services/api.js` use offline-first local storage and broadcast mechanisms without throwing uncaught errors.
- Both demo links run smoothly offline, fast, and crash-proof.


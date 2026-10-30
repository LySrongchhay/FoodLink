# Implementation Plan: Unified Dual-Role Foodlink UI Application

**Branch**: `001-unified-role-ui` | **Date**: 2026-10-30 | **Spec**: [specs/001-unified-role-ui/spec.md](file:///d:/DGIY/foodlink-2/specs/001-unified-role-ui/spec.md)

**Input**: "do not change @[customer] and @[merchant] make another directory impletement the ui only as the this 2 user"

---

## 1. Summary

Implement a new, isolated frontend application in `foodlink-ui/` hosting both **Customer** (surplus food discovery, KHQR checkout, pickup voucher) and **Merchant** (KPI dashboard, surplus listing creation, order pickup verification) user experiences in a single interactive preview with an instant role-switching shell. The existing `customer/` and `merchant/` directories will not be modified in any way.

---

## 2. Technical Context

- **Directory**: `d:\DGIY\foodlink-2\foodlink-ui/`
- **Language/Framework**: React 19 (`react: ^19.2.8`, `react-dom: ^19.2.8`)
- **Bundler**: Vite 8 (`@vitejs/plugin-react: ^6.1.1`)
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite: ^4.3.3`, `clsx`, `tailwind-merge`)
- **Icons**: `lucide-react: ^1.47.0`
- **Port**: `5175` (preventing collisions with `customer` on 5173 and `merchant` on 5174)
- **State Architecture**: Pure client-side React Context (`RoleContext` + `StoreContext`) with deterministic mock datasets; zero hard backend or database dependencies required to run the preview.

---

## 3. Constitution Check

*GATE: Evaluation against Foodlink Constitution principles.*

| Principle | Evaluation | Status |
|---|---|---|
| **I. UI-First & Decoupled** | The app runs independently on mock data with zero dependency on `server/`. | **PASS** |
| **II. Two-Sided Separation** | Clear component domains for `customer/` and `merchant/` under a shared switcher. | **PASS** |
| **III. Design System** | Implements exact tokens: `#2E7D32` (Primary), `#FF8A3D` (Urgency), `#FAFAFA`, `#FFF8F0`. | **PASS** |
| **IV. Contract Mock Data** | Implements formal typed mock schemas (`ui-contracts.json`). | **PASS** |
| **V. Simplicity (YAGNI)** | Standalone Vite SPA; no unnecessary microservices or heavy state libraries. | **PASS** |
| **Isolation Constraint** | `customer/` and `merchant/` are untouched; all new files reside in `foodlink-ui/`. | **PASS** |

---

## 4. Project Structure

### Documentation (Spec Kit Feature)
```text
specs/001-unified-role-ui/
├── spec.md              # Feature specification
├── plan.md              # This implementation plan
├── research.md          # Technical research & decisions
├── data-model.md        # Domain entities & store interface
├── quickstart.md        # Setup & testing guide
├── contracts/
│   └── ui-contracts.json# JSON schema definitions
└── tasks.md             # Implementation tasks (generated via /speckit-tasks)
```

### Source Code (`foodlink-ui/`)
```text
foodlink-ui/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   │   ├── RoleSwitcherBar.jsx
│   │   │   ├── Badge.jsx
│   │   │   └── Modal.jsx
│   │   ├── customer/
│   │   │   ├── CustomerNavbar.jsx
│   │   │   ├── ExploreFeed.jsx
│   │   │   ├── ListingCard.jsx
│   │   │   ├── ListingDetailModal.jsx
│   │   │   └── KhqrCheckoutModal.jsx
│   │   └── merchant/
│   │       ├── MerchantNavbar.jsx
│   │       ├── MerchantDashboardView.jsx
│   │       ├── CreateListingModal.jsx
│   │       ├── MerchantOrdersView.jsx
│   │       └── VerifyPickupModal.jsx
│   ├── context/
│   │   ├── RoleContext.jsx
│   │   └── StoreContext.jsx
│   ├── data/
│   │   ├── mockListings.js
│   │   └── mockMerchants.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
```

---

## 5. Implementation Sequence

1. **Scaffold `foodlink-ui/` Workspace**: Set up `package.json`, Vite configuration, and Tailwind CSS v4 styling matching the project's design system.
2. **Build Shared Foundation**:
   - `RoleContext.jsx` with persistent top role-switching bar (`Customer` vs `Merchant`).
   - `StoreContext.jsx` with shared in-memory listings, cart, orders, and reactive mutations.
3. **Build Customer Role View**:
   - Filter bar (Bakery, Prepared Meals, Fresh Produce).
   - Feed cards with discount percentages and countdown timers.
   - Interactive detail modal and simulated KHQR payment flow.
4. **Build Merchant Role View**:
   - KPI metrics cards (Revenue, Surplus Meals Saved, Active Items).
   - Inventory listing manager with "Create Surplus Listing" modal.
   - Order management and pickup code verification modal.
5. **Cross-Role Verification**: Test live synchronization between merchant listing creation and customer feed display.

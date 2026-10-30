# Phase 0 Research: Unified Dual-Role UI Application (`foodlink-ui`)

**Feature**: `001-unified-role-ui`  
**Date**: 2026-10-30  

---

## 1. Directory Structure & App Naming

### Decision: Name the new directory `foodlink-ui/`
- **Context**: The user specified: *"do not change @[customer] and @[merchant] make another directory impletement the ui only as the this 2 user"*.
- **Options Considered**:
  1. `showcase-ui/` - Good for demos, but sounds temporary.
  2. `unified-ui/` - Accurate, but generic.
  3. `foodlink-ui/` - Clean, self-explanatory, and professional.
- **Selection**: `foodlink-ui/` as the dedicated standalone frontend workspace.

---

## 2. Technology Stack Selection

- **Build Tool**: Vite 8 with `@vitejs/plugin-react`
- **Frontend Framework**: React 19 (`react`, `react-dom`) matching the existing ecosystem
- **Styling**: Tailwind CSS v4 with `@tailwindcss/vite`
- **Icons**: `lucide-react`
- **Port**: Port `5175` by default (leaving `5173` for `customer/` and `5174` for `merchant/` completely conflict-free)

---

## 3. Architecture & Role Switching Strategy

### Architecture Pattern: Unified Context with Sub-Domain Shells
```
foodlink-ui/
├── public/
├── src/
│   ├── assets/              # Icons and logos
│   ├── components/
│   │   ├── common/          # Shared UI primitives (Badges, Buttons, Modal)
│   │   ├── customer/        # Customer feed, filters, checkout, KHQR modal
│   │   └── merchant/        # Merchant dashboard, listings, order verification
│   ├── context/
│   │   ├── RoleContext.jsx  # Active role ('customer' | 'merchant') & role switcher bar
│   │   └── StoreContext.jsx # In-memory reactive store (listings, cart, orders)
│   ├── data/
│   │   ├── mockListings.js  # Rich surplus item contracts
│   │   ├── mockMerchants.js # Partner stores (Cad Bakery, etc.)
│   │   └── mockOrders.js    # Active and past pickup orders
│   ├── App.jsx              # Role router + top bar switcher
│   ├── main.jsx             # React root mount
│   └── index.css            # Tailwind CSS v4 theme variables
├── package.json
└── vite.config.js
```

### Dynamic Cross-Role State Sharing:
Because both views exist in the same app shell via `StoreContext`:
1. When a user in **Merchant** view creates a new surplus listing (e.g. "Croissant Box 50% OFF"), it automatically updates the reactive store.
2. When the user switches to **Customer** view, that newly created listing is instantly visible in the Customer Feed!
3. When the user places an order as a **Customer**, switching back to **Merchant** immediately displays that order under "Pending Pickups".

This creates a high-fidelity interactive experience without needing backend infrastructure.

---

## 4. Constraint & Non-Interference Verification
- **Customer Directory**: `d:\DGIY\foodlink-2\customer` will have 0 modifications.
- **Merchant Directory**: `d:\DGIY\foodlink-2\merchant` will have 0 modifications.
- **Server Directory**: `d:\DGIY\foodlink-2\server` will have 0 modifications.
- All new code is strictly confined to `d:\DGIY\foodlink-2\foodlink-ui/`.


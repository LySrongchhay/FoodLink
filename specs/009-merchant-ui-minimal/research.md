# Research & UI/UX Audit: Minimalist Merchant Portal

**Feature**: `009-merchant-ui-minimal`  
**Date**: 2026-10-31  

---

## 1. Component Audit & Findings

### A. Navigation & Shell (`MerchantApp.jsx`)
- **Current State**: Bottom navigation renders 4 tabs: Dashboard, Listings, Orders, Insights.
- **The Issue**: When the user opens the Store Profile (`MerchantProfile.jsx`), it completely unmounts the app shell and shows an isolated top dark bar (`Return to Merchant Hub`), breaking navigation flow and trapping mobile users.
- **Resolution**:
  - Add a 5th tab to the fixed bottom navigation bar: **Store** (`Store` icon) that switches `activeTab = 'profile'`.
  - Keep the app shell and bottom nav persistent across all 5 tabs.
  - In the top header, remove the fake ASCII dropdown `▲ ▼` next to CAD Bakery.
  - Add a clean "Customer View" pill button in the top right of the header for instantaneous role switching during reviews.

---

### B. Dashboard Cleanliness & Tokens (`MerchantDashboard.jsx`)
- **Current State**:
  - Daily highlights cards have desktop-specific hover transformations: `hover:-translate-y-1`, `group-hover:rotate-6`, `group-hover:scale-110`. On mobile touchscreens, these hover states stick, causing visual stutter and uneven layout shifts.
  - Card 3 has a stray emoji: `<span>⌛</span> $14.20 pending`.
  - Toast strings have broken placeholders: `showToast(isRestock ? '?? Restocked ...' : ...)` and `showToast('?? New Order!')`.
  - Primary CTA buttons ("Create New Bag" and "Scan Pickup Code") are stacked full-width, taking up over 120px of vertical height above the fold.
- **Resolution**:
  - Convert the two primary buttons into a sleek 2-column action grid:
    - Left: `+ New Surplus Batch` (Primary `#2E7D32` with `Plus` icon)
    - Right: `Verify PIN` (White card with `QrCode` / `KeyRound` icon)
  - Remove all hover rotations, translate lifts, and stray emojis (`⌛`, `??`).
  - Standardize stat badges with semantic color tokens (`bg-[#EAF7ED] text-[#2E7D32] border-emerald-200/60`).

---

### C. Kitchen Orders Queue (`MerchantOrders.jsx`)
- **Current State**:
  - Hardcoded date badge: `Today, Nov 14`.
  - Hardcoded filter tabs: `All 14`.
  - Sub-heading pickup window: hardcoded `Pickup Window: 6:30 PM – 7:30 PM`.
- **Resolution**:
  - Dynamic date badge: `Today, ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`.
  - Dynamic filter pills:
    - `All (${pendingOrders.length + completedOrders.length})`
    - `Pending Pickup (${pendingOrders.length})`
    - `Completed (${completedOrders.length})`
  - Dynamic pickup window extracted from orders or active store schedule (`6:30 PM – 8:30 PM`).

---

### D. Counter PIN Verification UX (`VerifyPickupPage.jsx`)
- **Current State**: Basic text input with backend lookup.
- **Resolution**:
  - Provide a clean, high-contrast monospace digit input box styled for 6 digits.
  - Auto-lookup and immediately display the matched customer name, surplus item title, bag quantity, and total paid.
  - One-tap "Confirm Handover" button that immediately completes the order and triggers cross-app reactivity.

---

## 2. Foodlink Constitution v1.1.0 Compliance Checklist
- [x] **Minimalist UX**: Clean whitespace, scannable typographic hierarchy, 2-column mobile action grid.
- [x] **Zero Emojis**: Removed `⌛`, `??`, and all unicode emoji characters.
- [x] **Intentional Iconography**: Purposeful Lucide SVG icons only (`Package`, `DollarSign`, `TrendingUp`, `Plus`, `KeyRound`, `Store`).
- [x] **Mobile Touch Targets**: All buttons, tabs, and switches provide at least 44px tap area.


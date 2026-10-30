---
description: "Task list for Unified Dual-Role Foodlink UI Application"
---

# Tasks: Unified Dual-Role Foodlink UI Application

**Input**: Design documents from `/specs/001-unified-role-ui/`  
**Prerequisites**: [plan.md](file:///d:/DGIY/foodlink-2/specs/001-unified-role-ui/plan.md), [spec.md](file:///d:/DGIY/foodlink-2/specs/001-unified-role-ui/spec.md), [research.md](file:///d:/DGIY/foodlink-2/specs/001-unified-role-ui/research.md), [data-model.md](file:///d:/DGIY/foodlink-2/specs/001-unified-role-ui/data-model.md), [contracts/ui-contracts.json](file:///d:/DGIY/foodlink-2/specs/001-unified-role-ui/contracts/ui-contracts.json)

**Strict Boundary Constraint**: The existing `customer/` and `merchant/` directories MUST remain 100% untouched. All source code resides in `d:\DGIY\foodlink-2\foodlink-ui/`.

---

## Phase 1: Setup (Standalone Project Initialization)

**Purpose**: Initialize the self-contained `foodlink-ui/` directory with Vite 8, React 19, and Tailwind CSS v4.

- [x] T001 Initialize `foodlink-ui/package.json` with React 19, Vite 8, Tailwind CSS v4, and Lucide React
- [x] T002 [P] Create `foodlink-ui/vite.config.js` with React plugin, Tailwind plugin, and port 5175 configuration
- [x] T003 [P] Create `foodlink-ui/index.html` with viewport meta tags, Inter font import, and root mount container
- [x] T004 [P] Create `foodlink-ui/src/index.css` configured with Tailwind CSS v4 and Foodlink design system tokens (`#2E7D32`, `#FF8A3D`, `#FAFAFA`, `#FFF8F0`)

---

## Phase 2: Foundational (Blocking Infrastructure & Mock Data Store)

**Purpose**: Shared mock datasets and reactive state providers that power both Customer and Merchant roles without a live backend.

**CRITICAL**: Foundational tasks must be completed before implementing specific user stories.

- [x] T005 Create standard mock datasets in `foodlink-ui/src/data/mockData.js` matching `ui-contracts.json` (Merchants, Surplus Listings, Sample Orders)
- [x] T006 [P] Create shared UI badge primitive `foodlink-ui/src/components/common/Badge.jsx` for discount % and status tags
- [x] T007 [P] Create shared modal container primitive `foodlink-ui/src/components/common/Modal.jsx` with backdrop and exit handlers
- [x] T008 Implement `foodlink-ui/src/context/StoreContext.jsx` managing reactive in-memory state:
  - `listings` (with `addListing` and stock decrement)
  - `orders` (with `createOrder` and `verifyPickup`)
  - `metrics` (live calculation of meals saved, revenue, and pending counts)
- [x] T009 Implement `foodlink-ui/src/context/RoleContext.jsx` managing active role state (`'customer' | 'merchant'`) and switcher actions

**Checkpoint**: Core data layer and context providers ready.

---

## Phase 3: User Story 1 - Instant Role Switching & Navigation Shell (Priority: P1) [MVP]

**Goal**: Deliver the primary application shell allowing instant switching between Customer and Merchant roles without page reloads.

**Independent Test**: Load `http://localhost:5175`, verify the top bar displays role badges, toggle between "Customer" and "Merchant", and observe view transitions with preserved session data.

- [x] T010 [US1] Create persistent role switcher component `foodlink-ui/src/components/common/RoleSwitcherBar.jsx` with visual role indicators and quick stats
- [x] T011 [US1] Build top-level application container in `foodlink-ui/src/App.jsx` switching dynamically between Customer view and Merchant view
- [x] T012 [US1] Create entry point in `foodlink-ui/src/main.jsx` wrapping `<App />` with `<RoleProvider>` and `<StoreProvider>`

**Checkpoint**: User Story 1 complete. Role switching shell is fully operational.

---

## Phase 4: User Story 2 - Complete Customer Experience (Priority: P1)

**Goal**: Enable customer surplus food discovery, category filtering, countdown deal inspection, and simulated KHQR checkout with pickup code generation.

**Independent Test**: In Customer mode, apply category filters (Bakery, Meals), click on a surplus listing, open the detail view, proceed to checkout, confirm KHQR payment, and receive a 4-digit pickup voucher code.

- [x] T013 [P] [US2] Create customer header & navigation in `foodlink-ui/src/components/customer/CustomerNavbar.jsx`
- [x] T014 [P] [US2] Create category filter chips in `foodlink-ui/src/components/customer/CategoryFilters.jsx` (All, Bakery, Meals, Groceries, Cafe)
- [x] T015 [US2] Create surplus item card in `foodlink-ui/src/components/customer/ListingCard.jsx` displaying original price, discount badge, savings amount, and closing-hour countdown timer
- [x] T016 [US2] Build the customer discovery feed in `foodlink-ui/src/components/customer/ExploreFeed.jsx` with search, filter handling, and empty state
- [x] T017 [US2] Build listing detail modal in `foodlink-ui/src/components/customer/ListingDetailModal.jsx` displaying pickup window, store address, and "Reserve & Rescue" action
- [x] T018 [US2] Build checkout & simulated KHQR payment modal in `foodlink-ui/src/components/customer/KhqrCheckoutModal.jsx` that commits order to `StoreContext` and displays the pickup QR/PIN voucher

**Checkpoint**: User Story 2 complete. Customer food rescue journey is end-to-end functional.

---

## Phase 5: User Story 3 - Complete Merchant Operations Experience (Priority: P1)

**Goal**: Enable merchant partners to view store KPIs (meals saved, revenue), create new surplus listings with discount tiers, and verify customer pickup codes.

**Independent Test**: Switch to Merchant mode, view updated KPI cards, click "New Listing" to publish a new surplus item, verify it appears in inventory, and use "Verify Pickup" to redeem an order code generated in Customer mode.

- [x] T019 [P] [US3] Create merchant navigation sidebar/header in `foodlink-ui/src/components/merchant/MerchantNavbar.jsx` with tabs (Dashboard, Listings, Orders)
- [x] T020 [US3] Build the KPI metrics overview in `foodlink-ui/src/components/merchant/MerchantDashboardView.jsx` showing today's rescued meals, earnings, and active items
- [x] T021 [US3] Build merchant inventory manager in `foodlink-ui/src/components/merchant/MerchantListingsView.jsx` displaying active surplus items, stock counts, and status
- [x] T022 [US3] Create surplus listing creation modal in `foodlink-ui/src/components/merchant/CreateListingModal.jsx` with input validation (title, prices, discount calculation, quantity, pickup window) that posts directly to `StoreContext`
- [x] T023 [US3] Build incoming order queue in `foodlink-ui/src/components/merchant/MerchantOrdersView.jsx` showing reserved orders and fulfillment status
- [x] T024 [US3] Create pickup verification modal in `foodlink-ui/src/components/merchant/VerifyPickupModal.jsx` allowing the merchant to input a customer's pickup code, validate it against `StoreContext`, and mark the order as completed

**Checkpoint**: User Story 3 complete. Merchant operational loop is end-to-end functional.

---

## Phase 6: Polish, Cross-Role Integration & Verification

**Purpose**: End-to-end validation, responsive styling, and verification of strict directory boundaries.

- [x] T025 Cross-Role Sync Verification: Create a listing in Merchant view -> Switch to Customer view -> Verify new listing appears -> Purchase it -> Switch back to Merchant view -> Verify order appears in queue and stock decreases
- [x] T026 Responsive UI Check: Validate mobile drawer/views for Customer mode and desktop/tablet layout for Merchant mode
- [x] T027 Run build verification: `npm run build` in `foodlink-ui/` to ensure zero compilation or styling errors
- [x] T028 Git status sanity check: Confirm that `customer/`, `merchant/`, and `server/` remain 100% untouched

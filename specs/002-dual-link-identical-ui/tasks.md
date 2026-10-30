---
description: "Task list for Dual-Link Portals with QR Hosting"
---

# Tasks: Full-Fidelity Portals with Dual-Link QR Hosting

**Input**: Design documents from `/specs/002-dual-link-identical-ui/`  
**Prerequisites**: [plan.md](file:///d:/DGIY\foodlink-2\specs\002-dual-link-identical-ui\plan.md), [spec.md](file:///d:/DGIY\foodlink-2\specs\002-dual-link-identical-ui\spec.md), [research.md](file:///d:/DGIY\foodlink-2\specs\002-dual-link-identical-ui\research.md), [data-model.md](file:///d:/DGIY\foodlink-2\specs\002-dual-link-identical-ui\data-model.md), [contracts/portal-contracts.json](file:///d:/DGIY\foodlink-2\specs\002-dual-link-identical-ui\contracts\portal-contracts.json)

**Strict Boundary Constraint**: The existing `customer/`, `merchant/`, and `server/` directories MUST remain 100% untouched. All source code resides in `d:\DGIY\foodlink-2\foodlink-ui/`.

---

## Phase 1: Setup & Public Assets

**Purpose**: Sync public brand assets (`cad-bakery-logo.png`, `hero-illustration.jpg`, `favicon.svg`) to `foodlink-ui/public/` so both portals render images identical to reference designs.

- [x] T001 Copy public brand assets (`cad-bakery-logo.png`, `hero-illustration.jpg`, `favicon.svg`) to `foodlink-ui/public/`
- [x] T002 [P] Verify `foodlink-ui/index.html` title and viewport meta tags for responsive mobile customer app and desktop merchant dashboard

---

## Phase 2: Foundational (Hybrid Router & Multi-Tab LocalStorage Sync)

**Purpose**: Core infrastructure supporting dedicated URLs for two distinct QR codes and cross-tab data synchronization.

**CRITICAL**: Foundational tasks must be completed before implementing specific user stories.

- [x] T003 Implement `foodlink-ui/src/router/usePortalRouter.js` supporting:
  - Direct paths: `/customer` and `/merchant`
  - Fallback queries: `?role=customer` and `?role=merchant`
  - Fallback hashes: `#/customer` and `#/merchant`
  - Root route `/`: Renders Split Landing Launcher
  - `navigateTo(portal)` method with zero-reload browser history synchronization
- [x] T004 Implement multi-tab reactive state in `foodlink-ui/src/context/StoreContext.jsx`:
  - `localStorage` serialization under `foodlink_demo_store_v2`
  - Cross-tab `storage` event listener to keep separate customer and merchant tabs in real-time sync
  - `resetDemoData()` function to reset Cad Bakery inventory and orders anytime

---

## Phase 3: User Story 1 - Dedicated Link Access for Two Distinct QR Codes (Priority: P1) [MVP]

**Goal**: Deliver direct independent URLs (`/customer` and `/merchant`) for separate QR code scanning, plus a clean Split Landing Launcher at root (`/`) with scannable QR code previews.

**Independent Test**:
- Open `/` -> Displays the Split Launcher with scannable QR code graphics for both portals.
- Open `/customer` -> Directly renders Customer App in full screen.
- Open `/merchant` -> Directly renders Cad Bakery Merchant Hub in full screen.

- [x] T005 [US1] Create Split Landing Launcher in `foodlink-ui/src/components/common/SplitLauncher.jsx`:
  - Dual welcome cards for Customer and Merchant
  - Live SVG scannable QR code previews linking to `/customer` and `/merchant`
  - One-click "Launch Customer App" and "Launch Merchant Hub" buttons
  - Copyable direct URL buttons for marketing/counter deployment
- [x] T006 [P] [US1] Create floating reviewer portal switcher in `foodlink-ui/src/components/common/PortalSwitcherFloating.jsx` (collapsible pill allowing testers to toggle links or copy URLs)
- [x] T007 [US1] Update `foodlink-ui/src/App.jsx` to dynamically render `SplitLauncher`, `CustomerApp`, or `MerchantApp` based on `usePortalRouter`

**Checkpoint**: User Story 1 complete. Both QR URLs and root launcher are independently accessible and testable.

---

## Phase 4: User Story 2 - Identical Customer UI Experience (Priority: P1)

**Goal**: Deliver pixel-perfect parity with `customer/src/`, including bottom navigation, ending-soon deals countdown, popular hubs, multi-item cart, simulated Bakong KHQR checkout, and active pickup vouchers.

**Independent Test**: Navigate to `/customer`, explore ending-soon countdowns, open listing modal, add to cart, pay with KHQR, and inspect the 4-digit pickup code voucher.

- [x] T008 [P] [US2] Create customer header in `foodlink-ui/src/components/customer/CustomerHeader.jsx` with location pill ("BKK1 & Daun Penh"), search bar, and notification bell
- [x] T009 [P] [US2] Create promotional banner in `foodlink-ui/src/components/customer/HeroPromoBanner.jsx` with 60% OFF headline and illustration
- [x] T010 [P] [US2] Create flash deals carousel in `foodlink-ui/src/components/customer/EndingSoonSection.jsx` with real-time countdown timer
- [x] T011 [P] [US2] Create partner store badges in `foodlink-ui/src/components/customer/PopularRescueHubs.jsx` with CAD Bakery and partner logos
- [x] T012 [P] [US2] Create categorized surplus feed in `foodlink-ui/src/components/customer/DealsNearYou.jsx` with original price crossed out, discount %, and savings badge
- [x] T013 [P] [US2] Create listing detail view in `foodlink-ui/src/components/customer/CustomerListingDetail.jsx` with allergen indicators and portion controls
- [x] T014 [US2] Create simulated Bakong KHQR checkout flow in `foodlink-ui/src/components/customer/CustomerCheckoutFlow.jsx` with QR scan graphic and payment simulation
- [x] T015 [US2] Create active pickup voucher in `foodlink-ui/src/components/customer/CustomerActivePickup.jsx` with large 4-digit PIN, QR code, and directions
- [x] T016 [P] [US2] Create interactive map view in `foodlink-ui/src/components/customer/CustomerMapView.jsx` displaying store pins and distance
- [x] T017 [P] [US2] Create customer impact profile in `foodlink-ui/src/components/customer/CustomerProfile.jsx` with meals rescued and CO2 metrics
- [x] T018 [P] [US2] Create bottom navigation bar in `foodlink-ui/src/components/customer/BottomNavBar.jsx` with tabs (Discover, Explore/Map, Pickups, Profile)
- [x] T019 [US2] Assemble the full customer mobile application shell in `foodlink-ui/src/components/customer/CustomerApp.jsx` managing screen transitions

**Checkpoint**: User Story 2 complete. Customer food rescue experience is identical to reference app.

---

## Phase 5: User Story 3 - Identical Merchant Operations Experience (Priority: P1)

**Goal**: Deliver pixel-perfect parity with `merchant/src/`, including Cad Bakery top bar, store open/closed toggle, order notification audio controls, inventory manager, incoming order queue, and 4-digit PIN pickup verification.

**Independent Test**: Navigate to `/merchant`, toggle store status, create a surplus listing with allergen tags, view incoming orders, and verify customer pickup codes.

- [x] T020 [P] [US3] Create Cad Bakery top bar in `foodlink-ui/src/components/merchant/MerchantTopBar.jsx` with logo, store open/closed toggle, notification audio chime menu, and Store Profile link
- [x] T021 [P] [US3] Create navigation tab bar in `foodlink-ui/src/components/merchant/MerchantTabBar.jsx` (Dashboard, Listings, Orders, Insights, Profile)
- [x] T022 [US3] Create full dashboard in `foodlink-ui/src/components/merchant/MerchantDashboard.jsx` with KPI cards (Revenue, Meals Rescued, Inventory, Pickups) and quick action triggers
- [x] T023 [US3] Create surplus listing manager in `foodlink-ui/src/components/merchant/MerchantListings.jsx` displaying active inventory and stock counts
- [x] T024 [US3] Create listing creation page in `foodlink-ui/src/components/merchant/CreateListingPage.jsx` with photo upload, original vs discount price calculations, portion controls, and allergen selection
- [x] T025 [US3] Create incoming order queue in `foodlink-ui/src/components/merchant/MerchantOrders.jsx` with status tabs (Pending Pickups, Completed, Cancelled)
- [x] T026 [US3] Create 4-digit pickup code verifier in `foodlink-ui/src/components/merchant/VerifyPickupPage.jsx` with numeric PIN keypad, audio chime, and instant fulfillment validation
- [x] T027 [P] [US3] Create environmental impact analytics in `foodlink-ui/src/components/merchant/MerchantAnalytics.jsx` showing kg CO2 saved and surplus trends
- [x] T028 [P] [US3] Create store profile page in `foodlink-ui/src/components/merchant/MerchantProfile.jsx` with CAD Bakery story, opening hours, and sustainability badge
- [x] T029 [US3] Assemble the full merchant application shell in `foodlink-ui/src/components/merchant/MerchantApp.jsx` managing tab and sub-view navigation

**Checkpoint**: User Story 3 complete. Merchant operations portal is identical to reference app.

---

## Phase 6: Polish, Cross-Role Integration & Verification

**Purpose**: Verify dual-link routing, scannable QR codes, multi-tab live sync, and clean build.

- [x] T030 Cross-Tab Live Sync Test: Open `/customer` in tab 1 and `/merchant` in tab 2 -> Create listing in Merchant -> Verify instant update in Customer tab -> Order in Customer tab -> Verify instant appearance in Merchant queue
- [x] T031 Direct URL Navigation Test: Verify `/customer`, `/merchant`, `/?role=customer`, and root `/` all load without errors or 404s
- [x] T032 Production build verification: Run `npm.cmd run build` in `foodlink-ui/` and ensure zero errors
- [x] T033 Git boundary sanity check: Confirm that `customer/`, `merchant/`, and `server/` remain 100% untouched

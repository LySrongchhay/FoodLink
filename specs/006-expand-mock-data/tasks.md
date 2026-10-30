# Tasks: Expanded Mock Data for Foodlink Marketplace

**Input**: Design documents from `specs/006-expand-mock-data/`  
**Prerequisites**: [plan.md](file:///d:/DGIY\foodlink-2/specs/006-expand-mock-data/plan.md), [spec.md](file:///d:/DGIY/foodlink-2/specs/006-expand-mock-data/spec.md), [research.md](file:///d:/DGIY/foodlink-2/specs/006-expand-mock-data/research.md), [data-model.md](file:///d:/DGIY/foodlink-2/specs/006-expand-mock-data/data-model.md), [contracts/mock-data-contracts.json](file:///d:/DGIY/foodlink-2/specs/006-expand-mock-data/contracts/mock-data-contracts.json), [quickstart.md](file:///d:/DGIY/foodlink-2/specs/006-expand-mock-data/quickstart.md)

**Tests**: Tests are not explicitly requested; verification is conducted via quickstart manual validation scenarios and production build compilation (`npm.cmd run build`).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Verify repository boundaries and audit mock data structures.

- [X] T001 Verify workspace isolation and ensure reference directories (`customer/`, `merchant/`, `server/`) remain 100% untouched
- [X] T002 [P] Audit existing mock data collections and schemas in `foodlink-ui/src/services/api.js`, `foodlink-ui/src/data/mockData.js`, `foodlink-ui/src/data/phnomPenhStores.js`, and `foodlink-ui/src/utils/userSession.js`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core data harmonization required across all user stories.

- [X] T003 Harmonize category taxonomy (`Pastry`, `Asian`, `Italian`, `Healthy`, `Food`, `Dessert`, `Drinks`) and discount calculation helpers across `foodlink-ui/src/data/mockData.js` and `foodlink-ui/src/services/api.js`
- [X] T004 [P] Harmonize store IDs and merchant profiles (`CAD Bakery & Cafe` / `st_cad` / `m-01`, `Green Garden Organics` / `m-02`, `Mama Heng`, `Eric Kayser`) across `foodlink-ui/src/data/mockData.js` and `foodlink-ui/src/data/phnomPenhStores.js`

**Checkpoint**: Foundational store constants and category taxonomies harmonized. User story implementation can proceed.

---

## Phase 3: User Story 1 - Rich Customer Discover Experience Across Categories (Priority: P1) 🎯 MVP

**Goal**: Deliver 16+ diverse surplus rescue items spanning 7 categories with authentic Unsplash food photography and mathematically consistent pricing ($1.50–$4.50 rescue, 50%–70% OFF).

**Independent Test**: Navigate to `/customer` → scroll Discover feed → verify >= 16 cards appear; tap category filter pills (`Pastry`, `Asian`, `Italian`, `Healthy`, `Food`, `Dessert`, `Drinks`) → verify each returns >= 2 items with valid prices, photos, and pickup hours.

- [X] T005 [P] [US1] Expand `DEFAULT_MERCHANT_LISTINGS` in `foodlink-ui/src/services/api.js` to 16+ surplus items across categories `Pastry`, `Asian`, `Italian`, `Healthy`, `Food`, `Dessert`, `Drinks` featuring CAD Bakery flagship deals and local Khmer/international eateries (Mama Heng, Chea Noodle, Sovan Dim Sum, Malis Kitchen, Brown Coffee, Eric Kayser, Napoli Pizza)
- [X] T006 [P] [US1] Expand `initialListings` in `foodlink-ui/src/data/mockData.js` to match the 16+ surplus food items with valid `merchantId`, `status: 'ACTIVE'`, `pickupStartTime`, `pickupEndTime`, and `badge` strings
- [X] T007 [US1] Align category filtering and search handling in `foodlink-ui/src/components/customer/CustomerExploreFeed.jsx` to ensure each category pill returns >= 2 items and search queries match dish titles, store names, and Phnom Penh districts

**Checkpoint**: User Story 1 is fully functional and testable independently on the Customer Discover feed.

---

## Phase 4: User Story 2 - Populated Phnom Penh Map with Verified Hubs (Priority: P1)

**Goal**: Populate Google Maps Explore view with 14+ verified partner pins across 5 key Phnom Penh districts (BKK1, Daun Penh, Tuol Kouk, Tonle Bassac, Russian Market).

**Independent Test**: Navigate to the Explore (Compass) tab in `/customer` → observe map canvas → verify >= 14 teardrop pins distributed across Phnom Penh; tap pins to inspect distance, district address, and place drawer.

- [X] T008 [US2] Expand `PHNOM_PENH_STORES` in `foodlink-ui/src/data/phnomPenhStores.js` to 14+ verified partner store pins with accurate coordinates in BKK1, Daun Penh, Tuol Kouk, Tonle Bassac, and Tuol Tompoung (Russian Market)
- [X] T009 [US2] Update category filtering and pin selection in `foodlink-ui/src/components/customer/CustomerMapView.jsx` to ensure interactive place cards in `MapBottomDrawer.jsx` display accurate distance, district addresses, and rescue CTA

**Checkpoint**: User Story 2 is fully functional and testable independently on the Google Maps view.

---

## Phase 5: User Story 3 - Realistic Merchant Orders & Kitchen Fulfillment (Priority: P1)

**Goal**: Populate the Merchant Kitchen queue with 8+ orders (awaiting pickup and completed) with multi-item bags, customer avatars, and pickup verification for code `849201`.

**Independent Test**: Navigate to `/merchant` → open the Orders tab → verify at least 5 pending pickup orders and 3 completed orders are displayed; verify entering code `849201` successfully completes the order.

- [X] T010 [P] [US3] Expand `DEFAULT_MERCHANT_ORDERS` in `foodlink-ui/src/services/api.js` to 8+ realistic orders with statuses `PENDING` and `COMPLETED`, customer avatars, multi-item arrays, and pickup codes (including `#FS-849201` with code `849201`)
- [X] T011 [P] [US3] Expand `initialOrders` and `initialMerchants` in `foodlink-ui/src/data/mockData.js` to populate `StoreContext` with 5 pending orders and 3 completed orders for CAD Bakery (`m-01`), including order `#FS-849201` with code `849201`
- [X] T012 [US3] Wire offline fallback in `getMerchantOrders()` inside `foodlink-ui/src/services/api.js` to return `DEFAULT_MERCHANT_ORDERS` or local storage orders when API backend is offline
- [X] T013 [US3] Verify and test pickup code verification logic in `foodlink-ui/src/services/api.js` and `foodlink-ui/src/context/StoreContext.jsx` ensuring code `849201` transitions the order to `COMPLETED` with verified timestamp

**Checkpoint**: User Story 3 is fully functional and testable independently in the Merchant Portal.

---

## Phase 6: User Story 4 - Customer Order History, Active Pickup Pass & Notification Feed (Priority: P2)

**Goal**: Provide a pre-reserved active pickup pass with code `849201`, instant cross-tab verification sync via `BroadcastChannel`, post-fulfillment impact summary, and realistic notification alerts.

**Independent Test**: Navigate to the Reserved tab in `/customer` → verify active pass with code `849201` is shown; verify code `849201` in the Merchant tab → observe customer pass instantly transitions to "Order Rescued! 🎉" completion card with CO2 stats; open notification bell → verify 4+ alerts.

- [X] T014 [P] [US4] Seed active pre-reserved order fallback for order `#FS-849201` (code `849201`, CAD Bakery, $4.99) in `foodlink-ui/src/utils/userSession.js` when no order exists for the customer session
- [X] T015 [US4] Implement reactive cross-tab synchronization in `foodlink-ui/src/components/customer/CustomerActivePickup.jsx` and `foodlink-ui/src/components/customer/CustomerApp.jsx` using `BroadcastChannel` and storage events when verified by merchant
- [X] T016 [US4] Implement green fulfillment summary card in `foodlink-ui/src/components/customer/CustomerActivePickup.jsx` upon order completion showing verified timestamp, environmental impact (`0.8 kg CO2 saved`), and a "Rescue Another Meal" button returning to Discover
- [X] T017 [P] [US4] Expand `initialNotifications` in `foodlink-ui/src/data/mockData.js` and `foodlink-ui/src/services/api.js` with restock notifications, urgency reminders, and verified receipts

**Checkpoint**: User Story 4 is fully functional and testable independently.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: End-to-end verification and build validation.

- [X] T018 [P] Execute end-to-end quickstart validation scenarios from `specs/006-expand-mock-data/quickstart.md`
- [X] T019 Run production build compilation (`npm.cmd run build`) in `foodlink-ui/` and verify 0 errors and 0 warnings
- [X] T020 Verify reference directories isolation (`git status --porcelain customer merchant server` is completely clean)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately.
- **Foundational (Phase 2)**: Depends on Phase 1 completion — blocks User Stories.
- **User Stories (Phases 3–6)**: Depend on Phase 2 completion.
  - User Story 1 (P1) delivers MVP on the Discover feed.
  - User Story 2 (P1) delivers map density.
  - User Story 3 (P1) delivers merchant order queue.
  - User Story 4 (P2) completes the pickup verification loop.
- **Polish (Phase 7)**: Depends on all user story tasks being completed.

### User Story Dependencies

- **US1 (P1)**: Independent after Phase 2.
- **US2 (P1)**: Independent after Phase 2 (shares store names from US1).
- **US3 (P1)**: Independent after Phase 2 (seeds order `#FS-849201`).
- **US4 (P2)**: Pairs with US3 (matches pre-reserved pass with code `849201`).

---

## Parallel Execution Opportunities

- **Phase 1 & 2**: `T002` and `T004` can run in parallel.
- **Phase 3 (US1)**: `T005` (api.js) and `T006` (mockData.js) can run in parallel.
- **Phase 5 (US3)**: `T010` (api.js) and `T011` (mockData.js) can run in parallel.
- **Phase 6 (US4)**: `T014` (userSession.js) and `T017` (notifications) can run in parallel.

---

## Implementation Strategy

### MVP First (User Story 1 Only)
1. Complete Phase 1 (Setup) and Phase 2 (Foundational).
2. Complete Phase 3 (User Story 1: 16+ listings, 7 categories).
3. Validate Discover feed independently (`/customer`).

### Incremental Delivery
1. Foundation Ready → Phase 1 & 2.
2. MVP Feed Delivery → Phase 3 (US1).
3. Map Density Delivery → Phase 4 (US2).
4. Kitchen Queue Delivery → Phase 5 (US3).
5. Verification & Active Pass Delivery → Phase 6 (US4).
6. Build & Isolation Verification → Phase 7.

---
description: "Task list for feature 007-fix-reserve-confirm"
---

# Tasks: Fix Reserve & Confirm Checkout & 6-Digit Code Generation

**Input**: Design documents from `specs/007-fix-reserve-confirm/`  
**Prerequisites**: [plan.md](file:///d:/DGIY/foodlink-2/specs/007-fix-reserve-confirm/plan.md), [spec.md](file:///d:/DGIY/foodlink-2/specs/007-fix-reserve-confirm/spec.md), [research.md](file:///d:/DGIY/foodlink-2/specs/007-fix-reserve-confirm/research.md), [data-model.md](file:///d:/DGIY/foodlink-2/specs/007-fix-reserve-confirm/data-model.md), [contracts/reserve-order.json](file:///d:/DGIY/foodlink-2/specs/007-fix-reserve-confirm/contracts/reserve-order.json)

## Format: `[ID] [P?] [Story] Description`
- **[P]**: Can run in parallel (different files or independent logic)
- **[Story]**: Mapped to User Story (US1 = 6-digit reservation flow, US2 = merchant queue sync & verification, US3 = socket resilience)
- Strict adherence to Constitution v1.1.0 (zero emojis, isolated to `foodlink-ui/`)

---

## Phase 1: Setup & Environment

**Purpose**: Validate workspace baseline and ensure strict directory isolation

- [x] T001 Verify git working tree isolation and ensure `customer/`, `merchant/`, and `server/` are clean
- [x] T002 Inspect `foodlink-ui/` dependencies and verify clean build with `npm.cmd run build`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core communication and network resilience required by all user stories

- [x] T003 [P] [US3] Configure safe socket fallback in `foodlink-ui/src/services/socket.js` to silence blind `ws://localhost:5000` connection errors when `VITE_SOCKET_URL` is omitted
- [x] T004 [P] [US3] Align `foodlink-ui/src/services/api.js` socket initialization to use safe quiet mode when running locally without a live backend server
- [x] T005 [US1] Implement abort timeout (400ms) and comprehensive offline demo order generator in `foodlink-ui/src/services/api.js` `reserveListing` adhering to `contracts/reserve-order.json`

**Checkpoint**: Foundation ready - socket spam eliminated, API fallback deterministic.

---

## Phase 3: User Story 1 - 100% Reliable Reserve & Confirm with 6-Digit Code (Priority: P1) [MVP]

**Goal**: Enable customer to click "Reserve Now", confirm reservation, and immediately receive a digital pickup pass displaying their unique 6-digit code.

**Independent Test**: Navigate to any listing in Customer view, click "Reserve Now", click "Confirm & Reserve". The active pickup pass must display immediately with 6 monospace digit blocks (e.g., `7 4 2 9 1 8`), store address, countdown timer, and no console errors.

### Implementation for User Story 1
- [x] T006 [US1] Update `foodlink-ui/src/services/api.js` `reserveListing` to populate complete store attributes (`storeName`, `storeAddress`, `pickupWindow`, `co2SavedKg`, `totalPrice`) in the generated order
- [x] T007 [US1] Update `foodlink-ui/src/components/customer/CustomerApp.jsx` `handleConfirmPayment` to guarantee instant order state activation and navigation to the `reserved` screen
- [x] T008 [US1] Update `foodlink-ui/src/components/customer/CustomerActivePickup.jsx` to reactively reset `isVerified` on order ID/pickupCode changes (`useEffect`) so newly placed orders are never hidden behind stale completed views
- [x] T009 [US1] Clean up broken icon placeholders (`??`) in `foodlink-ui/src/components/customer/CustomerActivePickup.jsx` and ensure clean Lucide SVG icons and monospace digit rendering

**Checkpoint**: User Story 1 (MVP) is completely functional and testable independently.

---

## Phase 4: User Story 2 - Instant Sync to Merchant Kitchen & Counter Verification (Priority: P2)

**Goal**: Automatically sync newly placed customer orders to the Merchant Kitchen queue and allow merchants to verify the 6-digit code to complete the pass.

**Independent Test**: Reserve an item in Customer view; open Merchant view in another tab or role switch. The order must be listed under Pending orders. Entering the 6-digit code in "Verify Pickup" marks the order completed and immediately updates the Customer pass to "Completed / Rescued".

### Implementation for User Story 2
- [x] T010 [US2] Update `foodlink-ui/src/services/api.js` `reserveListing` to broadcast `{ type: 'ORDER_CREATED', order: demoOrder }` over `liveDropChannel` and dispatch `storage` events
- [x] T011 [US2] Update `foodlink-ui/src/context/StoreContext.jsx` to listen for `ORDER_CREATED` messages on `liveDropChannel` and append incoming customer orders into `state.orders`
- [x] T012 [US2] Verify `foodlink-ui/src/context/StoreContext.jsx` `verifyPickup` broadcasts `ORDER_VERIFIED` with clean code string and order details
- [x] T013 [US2] Verify `foodlink-ui/src/components/customer/CustomerActivePickup.jsx` channel listener reacts to `ORDER_VERIFIED` for the active order code, transitioning UI to "Completed / Rescued" with impact metrics

**Checkpoint**: End-to-end two-sided loop (Customer reservation -> Merchant verification -> Customer completion) works in real-time.

---

## Phase 5: User Story 3 - Clean Socket & Network Resilience (Priority: P3)

**Goal**: Verify complete absence of unhandled network errors, console exceptions, or failed WebSocket reconnect logs.

**Independent Test**: Open browser DevTools Console in Chrome/Firefox. Perform a complete reservation and verification loop. Verify zero red network error messages.

### Implementation for User Story 3
- [x] T014 [US3] Audit `foodlink-ui/src/services/api.js` and `foodlink-ui/src/services/socket.js` to ensure zero uncaught promises or runaway reconnect loops occur on `localhost`
- [x] T015 [US3] Add defensive error catching around all BroadcastChannel and LocalStorage operations to prevent browser storage quota crashes

---

## Phase 6: Polish & Quality Gate Verification

**Purpose**: Cross-cutting verification against Foodlink Constitution v1.1.0

- [x] T016 [P] Verify Foodlink Constitution Principle III (Zero Emojis, intentional Lucide React icons only, clean minimalist typography) across all modified files
- [x] T017 Execute production build verification via `npm.cmd run build` inside `foodlink-ui/`
- [x] T018 Verify repository isolation gate: confirm `git status --porcelain customer merchant server` produces zero output

---

## Dependencies & Execution Order

### Phase Dependencies
- **Setup (Phase 1)**: Independent - runs first.
- **Foundational (Phase 2)**: Depends on Setup. Blocks User Stories.
- **User Story 1 (Phase 3 - MVP)**: Depends on Phase 2. Delivers the core reservation & 6-digit code pass.
- **User Story 2 (Phase 4)**: Depends on Phase 3. Adds cross-app sync and merchant counter verification.
- **User Story 3 (Phase 5)**: Depends on Phase 2 & 3. Verifies zero console noise.
- **Polish (Phase 6)**: Runs after implementation to certify constitutional compliance.

---

## Implementation Strategy

### MVP First (User Story 1 Only)
1. Complete Phase 1 & 2 (Safe socket + API fallback).
2. Complete Phase 3 (Reserve & Confirm generates 6-digit code and shows Active Pickup Pass).
3. Validate Customer can place reservations reliably without error or hanging.

### Full Delivery
1. Add Phase 4 (Merchant Hub synchronizes orders and verifies 6-digit PIN).
2. Add Phase 5 & 6 (Zero console errors + Constitution verification + clean build).

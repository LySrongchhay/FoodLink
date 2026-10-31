---
description: "Task list for feature 009-merchant-ui-minimal"
---

# Tasks: Minimalist Merchant UI & UX Enhancement

**Input**: Design documents from `specs/009-merchant-ui-minimal/`  
**Prerequisites**: [plan.md](file:///d:/DGIY/foodlink-2/specs/009-merchant-ui-minimal/plan.md), [spec.md](file:///d:/DGIY/foodlink-2/specs/009-merchant-ui-minimal/spec.md), [research.md](file:///d:/DGIY/foodlink-2/specs/009-merchant-ui-minimal/research.md), [quickstart.md](file:///d:/DGIY/foodlink-2/specs/009-merchant-ui-minimal/quickstart.md)

## Format: `[ID] [P?] [Story] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Mapped to User Story (US1 = Dashboard & Navigation, US2 = Kitchen Queue & Dynamic Counters, US3 = Counter PIN Verification)
- Strict adherence to Constitution v1.1.0 (zero emojis, isolated to `foodlink-ui/`)

---

## Phase 1: Setup & Baseline

**Purpose**: Validate repository isolation and verify baseline build

- [x] T001 Verify git working tree isolation and ensure `customer/`, `merchant/`, and `server/` remain untouched
- [x] T002 Inspect `foodlink-ui/` dependencies and verify clean build with `npm.cmd run build`

---

## Phase 2: User Story 1 - Clean Minimalist Dashboard & Persistent 5-Tab Navigation (Priority: P1) [MVP]

**Goal**: Upgrade `MerchantApp.jsx` to a 5-tab persistent bottom navigation bar (`Dashboard`, `Listings`, `Orders`, `Insights`, `Store`), remove header ASCII artifacts (`▲ ▼`), add a header "Customer View" toggle, and layout dashboard actions in a compact 2-column mobile grid.

**Independent Test**: Load `http://localhost:5173/?portal=merchant` on mobile viewport (390px). Verify that 5 persistent tabs exist, the top header has a "Customer View" button without `▲ ▼`, and primary dashboard actions sit in a sleek 2-column grid.

### Implementation for User Story 1
- [x] T003 [US1] Update `foodlink-ui/src/components/merchant/MerchantApp.jsx` to render a 5-tab persistent bottom navigation bar (`Dashboard`, `Listings`, `Orders`, `Insights`, `Store` with `Store` icon) and remove isolated dark header escape
- [x] T004 [US1] Clean up top header in `foodlink-ui/src/components/merchant/MerchantApp.jsx` to remove raw ASCII `▲ ▼` dropdown symbols and add a dedicated "Customer View" toggle button
- [x] T005 [US1] Reorganize primary actions in `foodlink-ui/src/pages/Dashboard/MerchantDashboard.jsx` into a 2-column mobile action grid (`+ New Batch` and `Verify PIN`)
- [x] T006 [US1] Remove desktop hover wobbles (`group-hover:rotate-6`, `hover:-translate-y-1`) and strip emojis/broken placeholders (`⌛`, `??`) in `foodlink-ui/src/pages/Dashboard/MerchantDashboard.jsx`

**Checkpoint**: User Story 1 (MVP) is functional and testable independently.

---

## Phase 3: User Story 2 - Real-Time Kitchen Orders Queue with Dynamic Counters (Priority: P2)

**Goal**: Replace hardcoded dates (`Nov 14`) and counts (`All 14`) in `MerchantOrders.jsx` with real live calendar dates and dynamic order lengths.

**Independent Test**: Open Orders tab in Merchant Portal. Verify that date header shows today's real date, filter tabs show exact counts (`All (X)`, `Pending Pickup (Y)`, `Completed (Z)`), and zero hardcoded dates/counts remain.

### Implementation for User Story 2
- [x] T007 [US2] Update `foodlink-ui/src/pages/Orders/MerchantOrders.jsx` to render dynamic calendar date badge (`Today, ${current date}`) using `Intl.DateTimeFormat`
- [x] T008 [US2] Update `foodlink-ui/src/pages/Orders/MerchantOrders.jsx` filter pill labels to show dynamic counts: `All (${total})`, `Pending Pickup (${pending})`, `Completed (${completed})`
- [x] T009 [US2] Standardize order cards in `foodlink-ui/src/pages/Orders/MerchantOrders.jsx` with clean token borders (`border-stone-200/80`) and verified pickup time stamps

**Checkpoint**: User Story 2 is functional and testable independently.

---

## Phase 4: User Story 3 - High-Efficiency Counter PIN Verification UX (Priority: P3)

**Goal**: Provide a frictionless 6-digit PIN input with instant order lookup feedback and one-touch confirmation in `VerifyPickupPage.jsx`.

**Independent Test**: Enter `742918` in "Verify Pickup". Verify that matching order details appear instantly and clicking "Confirm Handover" marks the order completed in < 300ms.

### Implementation for User Story 3
- [x] T010 [US3] Refine PIN input in `foodlink-ui/src/pages/Orders/VerifyPickupPage.jsx` with high-contrast monospace styling and auto-sanitization for 6-digit codes
- [x] T011 [US3] Ensure matched order details card clearly presents customer name, bag quantity, item title, and paid price with clean green success state upon confirmation

---

## Phase 5: Polish & Quality Gate Verification

**Purpose**: Cross-cutting verification against Foodlink Constitution v1.1.0

- [x] T012 [P] Verify Foodlink Constitution Principle III (Zero Emojis, clean minimalist typography, intentional Lucide SVG icons only) across all modified merchant files
- [x] T013 Execute production build verification via `npm.cmd run build` inside `foodlink-ui/`
- [x] T014 Verify repository isolation gate: confirm `git status --porcelain customer merchant server` produces zero output

---

## Dependencies & Execution Order

### Phase Dependencies
- **Setup (Phase 1)**: Independent - runs first.
- **User Story 1 (Phase 2 - MVP)**: Modernizes shell, navigation, and dashboard.
- **User Story 2 (Phase 3)**: Dynamizes kitchen orders queue.
- **User Story 3 (Phase 4)**: Refines PIN verification tool.
- **Polish (Phase 5)**: Runs after implementation to certify constitutional compliance.

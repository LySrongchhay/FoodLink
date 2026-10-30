---
description: "Task list for feature 005-mobile-ui-consistency"
---

# Tasks: Mobile-First UX & UI Consistency Refinement

**Input**: Design documents from `/specs/005-mobile-ui-consistency/` (`spec.md`, `plan.md`, `research.md`, `data-model.md`, `contracts/mobile-ui-contracts.json`, `quickstart.md`)  
**Prerequisites**: `spec.md`, `plan.md`, `research.md`, `data-model.md`, `contracts/mobile-ui-contracts.json`  
**Boundary Constraint**: `customer/`, `merchant/`, and `server/` are strict reference folders and MUST remain 100% untouched. All changes are strictly inside `foodlink-ui/`.

---

## Phase 1: Setup (Shared Infrastructure & CSS Hardening)

**Purpose**: Establish standardized design tokens, 44px touch ergonomics, and mobile layout constraints

- [X] T001 Configure mobile viewport utilities, `.touch-target-44`, and overflow containment in `foodlink-ui/src/index.css`
- [X] T002 [P] Verify `index.html` viewport meta tag configuration for mobile scale in `foodlink-ui/index.html`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core mobile container containment and shared icon hygiene rules

- [X] T003 [P] Enforce mobile shell layout (`max-w-md mx-auto w-full min-h-screen bg-[#FAFAFA]`) and overflow-x containment in `foodlink-ui/src/components/customer/CustomerApp.jsx`
- [X] T004 Implement global `shrink-0` rule and remove decorative emojis from category filter pills in `foodlink-ui/src/components/customer/CustomerExploreFeed.jsx`

**Checkpoint**: Foundation ready - mobile shell boundaries established without horizontal scrollbars.

---

## Phase 3: User Story 1 - Clean, Stable Customer Food Rescue Feed (Priority: P1) 🎯 MVP

**Goal**: Transform Discover feed into uniform single-column food cards with zero text wrapping, single-line price rows, clean text category pills, and uniform 16:9 imagery.

**Independent Test**: Open `/customer` on mobile device emulation (375px width) -> verify all food cards render with uniform aspect ratio, identical heights, single-line price and savings badges, and zero icon squishing.

- [X] T005 [US1] Refactor category filter pills to clean, text-only chips without decorative emojis in `foodlink-ui/src/components/customer/CustomerExploreFeed.jsx`
- [X] T006 [US1] Refactor horizontal card carousel into responsive single-column full-width food rescue cards in `foodlink-ui/src/components/customer/CustomerExploreFeed.jsx`
- [X] T007 [US1] Standardize price and discount rows (`$3.50`, `$8.50`, `Save $5.00`) with `whitespace-nowrap` and flex alignment in `foodlink-ui/src/components/customer/CustomerExploreFeed.jsx`
- [X] T008 [US1] Enforce single-line text truncation on secondary tags (`max-w-[120px] truncate`) and add `shrink-0` on card icons in `foodlink-ui/src/components/customer/CustomerExploreFeed.jsx`

**Checkpoint**: User Story 1 delivers a clean, balanced, and stable Discover feed on all smartphone viewports.

---

## Phase 4: User Story 2 - Ergonomic Bottom Navigation & Sticky Top App Bar (Priority: P1)

**Goal**: Deliver a fixed bottom navigation bar with 20px icons, 10px text labels, active green indicator, 44px tap targets, and a sticky compact header.

**Independent Test**: Switch between tabs on mobile -> verify bottom nav is 100% accessible by thumb with 44px tap targets, active indicator is clear, and top header remains sticky and compact.

- [X] T009 [P] [US2] Refactor compact sticky top header with brand logo, location selector, and notification/cart icons in `foodlink-ui/src/components/customer/CustomerHeader.jsx`
- [X] T010 [US2] Refactor fixed bottom navigation bar tabs with 20px icons, 10px labels, active green color `#2E7D32`, and 44px minimum tap targets in `foodlink-ui/src/components/customer/CustomerApp.jsx`
- [X] T011 [US2] Harmonize safe-area bottom padding (`pb-24`) to prevent listing cards from being covered by the bottom nav in `foodlink-ui/src/components/customer/CustomerApp.jsx`

**Checkpoint**: User Story 2 provides effortless one-thumb mobile navigation.

---

## Phase 5: User Story 3 - Mobile-Optimized Merchant Portal (Priority: P1)

**Goal**: Ensure merchant dashboard metrics cards, active listings, and order verification rows fit naturally on mobile screens with clean 44px buttons and uncrowded status pills.

**Independent Test**: Open `/merchant` on mobile emulation (375px) -> check Dashboard metrics, Orders tab, and Listings tab -> verify metrics stack cleanly without number overflow, order rows fit comfortably, and verify buttons are 44px high.

- [X] T012 [P] [US3] Refactor merchant dashboard metric cards (Revenue, Bags Saved, Pickups) into a responsive mobile grid with `shrink-0` icons in `foodlink-ui/src/pages/Dashboard/MerchantDashboard.jsx`
- [X] T013 [US3] Streamline merchant order verification rows with single-line status pills and 44px action buttons in `foodlink-ui/src/pages/Orders/MerchantOrders.jsx`
- [X] T014 [US3] Optimize active listing cards and restock stepper controls for thumb ergonomics in `foodlink-ui/src/pages/Listings/MerchantListings.jsx`

**Checkpoint**: User Story 3 delivers a smooth mobile operational experience for store merchants.

---

## Phase 6: User Story 4 - Mobile Map & Place Card Usability (Priority: P2)

**Goal**: Ensure Google Maps explore view, search pill, and bottom place drawer fit comfortably on mobile viewports without obscuring touch controls.

**Independent Test**: Open Explore tab on mobile (375px) -> verify search pill, category chips, and bottom place card display cleanly with comfortable touch spacing and zero horizontal overflow.

- [X] T015 [P] [US4] Optimize Google Maps category chips and search pill padding for mobile widths in `foodlink-ui/src/components/customer/CustomerMapView.jsx`
- [X] T016 [US4] Refine `MapBottomDrawer.jsx` place card padding and "Rescue Deal" button touch area for compact mobile screens in `foodlink-ui/src/components/customer/MapBottomDrawer.jsx`

**Checkpoint**: User Story 4 ensures the Google Maps view is fully harmonized with mobile ergonomics.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Multi-device viewport validation, production build, and boundary check

- [X] T017 [P] Audit all mobile interactive buttons for 44px touch targets across Customer and Merchant screens in `foodlink-ui/src/`
- [X] T018 Run production build (`npm.cmd run build`) in `foodlink-ui/` and ensure 0 errors and 0 warnings
- [X] T019 Verify strict isolation constraint: ensure `customer/`, `merchant/`, and `server/` directories remain 100% untouched

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately.
- **Foundational (Phase 2)**: Depends on Phase 1 completion — BLOCKS all user stories.
- **User Story 1 (Phase 3)**: Depends on Phase 2 — MVP milestone.
- **User Story 2 (Phase 4)**: Depends on Phase 2.
- **User Story 3 (Phase 5)**: Depends on Phase 2.
- **User Story 4 (Phase 6)**: Depends on Phase 2.
- **Polish (Phase 7)**: Runs after all user stories are complete.

### Parallel Opportunities

- `T002` can run in parallel with `T001`.
- `T003` can run in parallel with `T004`.
- `T009` (Header) can run in parallel with `T010` (Bottom nav).
- `T012` (Merchant metrics) can run in parallel with `T013` (Merchant orders).
- `T015` (Map search pill) can run in parallel with `T016` (Map drawer).
- `T017` can run in parallel with `T018`.

---

## Implementation Strategy

### MVP First (User Story 1 Only)
1. Complete Setup (`T001`, `T002`)
2. Complete Foundational (`T003`, `T004`)
3. Complete User Story 1 (`T005`-`T008`)
4. Validate single-column food cards render cleanly on 375px mobile screens.

### Incremental Delivery
1. Discover Feed (US1) -> Clean single-column cards with no price wrapping.
2. Shell & Navigation (US2) -> 44px bottom navigation and sticky compact header.
3. Merchant Mobile (US3) -> Responsive metrics and thumb-friendly order verification.
4. Mobile Map (US4) -> Ergonomic Google Maps search pill and place card.
5. Polish & Build -> 0 errors, strict isolation guaranteed.

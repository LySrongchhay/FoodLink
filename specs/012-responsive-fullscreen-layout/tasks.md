---
description: "Task list for feature 012-responsive-fullscreen-layout"
---

# Tasks: Fullscreen Laptop & Responsive Desktop Layout

**Input**: Design documents from `specs/012-responsive-fullscreen-layout/`  
**Prerequisites**: [plan.md](file:///d:/DGIY/foodlink-2/specs/012-responsive-fullscreen-layout/plan.md), [spec.md](file:///d:/DGIY/foodlink-2/specs/012-responsive-fullscreen-layout/spec.md), [research.md](file:///d:/DGIY/foodlink-2/specs/012-responsive-fullscreen-layout/research.md), [quickstart.md](file:///d:/DGIY/foodlink-2/specs/012-responsive-fullscreen-layout/quickstart.md)

## Format: `[ID] [P?] [Story] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Mapped to User Story (US1 = Customer Responsive Grid, US2 = Merchant Panoramic Dashboard, US3 = Desktop Modals & Floating Dock)
- Strict adherence to Constitution v1.2.0 (zero emojis, isolated to `foodlink-ui/`)

---

## Phase 1: Setup & Baseline

**Purpose**: Validate repository isolation and verify baseline build

- [x] T001 Verify git working tree isolation and ensure `customer/`, `merchant/`, and `server/` remain untouched
- [x] T002 Inspect `foodlink-ui/` build baseline with `npm.cmd run build`

---

## Phase 2: User Story 1 - Responsive Fullscreen Customer Discovery Experience (Priority: P1) [MVP]

**Goal**: Transform the Customer Portal from a narrow 448px column into an expansive, responsive 2-to-3 column discovery grid on laptop screens (`lg:grid-cols-3 xl:max-w-7xl`).

**Independent Test**: Load Customer App on a laptop viewport (>= 1024px). Verify that the food listing feed renders in a 3-column responsive grid with widescreen map and comfortable margins.

### Implementation for User Story 1
- [x] T003 [US1] Expand main content container and top header in `foodlink-ui/src/components/customer/CustomerApp.jsx` from `max-w-md` to responsive `max-w-md sm:max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- [x] T004 [US1] Convert food discovery listings and store card feeds in `foodlink-ui/src/components/customer/CustomerApp.jsx` from vertical stack into responsive multi-column grid (`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5`)
- [x] T005 [US1] Expand map explore container in `foodlink-ui/src/components/customer/CustomerMapView.jsx` into widescreen format (`max-w-7xl mx-auto h-[500px] lg:h-[620px] rounded-3xl`)

**Checkpoint**: User Story 1 (MVP) is functional and testable independently.

---

## Phase 3: User Story 2 - Panoramic Merchant Dashboard & Kitchen Queue (Priority: P2)

**Goal**: Expand the Merchant Portal from `max-w-3xl` to `max-w-7xl`, scaling Daily Highlights and arranging quick actions and kitchen orders into a balanced desktop layout.

**Independent Test**: Load Merchant Portal on a laptop screen (>= 1024px). Verify that the dashboard uses screen width naturally, Daily Highlights are spacious, and kitchen orders queue leverages multi-column layout.

### Implementation for User Story 2
- [x] T006 [US2] Expand Merchant top header and main canvas in `foodlink-ui/src/components/merchant/MerchantApp.jsx` from `max-w-3xl` to `max-w-md sm:max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- [x] T007 [US2] Update `foodlink-ui/src/pages/Dashboard/MerchantDashboard.jsx` Daily Highlights and primary layout for wide viewports (`lg:grid lg:grid-cols-12 lg:gap-8`)
- [x] T008 [US2] Adapt Kitchen Orders Queue in `foodlink-ui/src/pages/Orders/MerchantOrders.jsx` to render active orders in a balanced 2-column grid on laptop viewports (`grid grid-cols-1 lg:grid-cols-2 gap-4`)

**Checkpoint**: User Story 2 is functional and testable independently.

---

## Phase 4: User Story 3 - Desktop-Adaptive Dialogs & Centered Navigation Docks (Priority: P3)

**Goal**: Center modal dialogs on desktop viewports and transition bottom navigation into a sleek, floating glassmorphic dock.

**Independent Test**: Open Checkout Flow or Listing Details on laptop. Verify they render as centered floating modal dialogs with backdrop blur instead of stretched bottom sheets. Verify bottom navigation floats as a centered dock.

### Implementation for User Story 3
- [x] T009 [US3] Adapt bottom drawers in `foodlink-ui/src/components/customer/CustomerListingDetail.jsx` and `CustomerCheckoutFlow.jsx` to center as floating desktop modal dialogs on large screens (`sm:max-w-lg md:max-w-xl mx-auto sm:my-8 sm:rounded-3xl shadow-2xl`)
- [x] T010 [US3] Transition fixed bottom navigation bars in `foodlink-ui/src/components/customer/CustomerApp.jsx` and `foodlink-ui/src/components/merchant/MerchantApp.jsx` into centered floating glassmorphic docks (`sm:max-w-md sm:bottom-4 sm:rounded-3xl sm:border sm:shadow-lg sm:bg-white/95 sm:backdrop-blur-md`)

---

## Phase 5: Polish & Quality Gate Verification

**Purpose**: Cross-cutting verification against Foodlink Constitution v1.2.0

- [x] T011 [P] Verify Foodlink Constitution Principle III (Zero Emojis, clean minimalist typography) across all modified files
- [x] T012 [P] Verify responsive viewport behavior from 360px up to 1920px with zero horizontal scrollbars or touch target regressions
- [x] T013 Execute production build verification via `npm.cmd run build` inside `foodlink-ui/`
- [x] T014 Verify repository isolation gate: confirm `git status --porcelain customer merchant server` produces zero output

---

## Dependencies & Execution Order

### Phase Dependencies
- **Setup (Phase 1)**: Independent - runs first.
- **User Story 1 (Phase 2 - MVP)**: Customer responsive grid & container expansion.
- **User Story 2 (Phase 3)**: Merchant panoramic dashboard & kitchen layout.
- **User Story 3 (Phase 4)**: Desktop modals & centered floating docks.
- **Polish (Phase 5)**: Validates constitutional compliance and repository isolation.

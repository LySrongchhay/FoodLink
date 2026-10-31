---
description: "Task list for feature 008-remove-floating-switch-link"
---

# Tasks: Remove Floating Switch Link Button for Clean Mobile UX

**Input**: Design documents from `specs/008-remove-floating-switch-link/`  
**Prerequisites**: [plan.md](file:///d:/DGIY/foodlink-2/specs/008-remove-floating-switch-link/plan.md), [spec.md](file:///d:/DGIY/foodlink-2/specs/008-remove-floating-switch-link/spec.md), [research.md](file:///d:/DGIY/foodlink-2/specs/008-remove-floating-switch-link/research.md), [quickstart.md](file:///d:/DGIY/foodlink-2/specs/008-remove-floating-switch-link/quickstart.md)

## Format: `[ID] [P?] [Story] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Mapped to User Story (US1 = remove floating overlay, US2 = profile navigation & routing)
- Strict adherence to Constitution v1.1.0 (zero emojis, isolated to `foodlink-ui/`)

---

## Phase 1: Setup & Environment

**Purpose**: Validate workspace baseline and ensure strict directory isolation

- [x] T001 Verify git working tree isolation and ensure `customer/`, `merchant/`, and `server/` are clean

---

## Phase 2: User Story 1 - Remove Floating Switch Link Pill (Priority: P1) [MVP]

**Goal**: Completely remove the floating `Switch Link` pill from the viewport so mobile bottom bars and action buttons have 100% unobstructed clearance.

**Independent Test**: Load the app at mobile viewport (390px wide). Verify that the floating `Switch Link ^` button is nowhere on the screen, and all bottom navigation tabs are 100% visible and tappable.

### Implementation for User Story 1
- [x] T002 [US1] Remove `<PortalSwitcherFloating />` component render and its import from `foodlink-ui/src/App.jsx`
- [x] T003 [US1] Inspect mobile bottom clearance in `foodlink-ui/src/components/customer/BottomNavBar.jsx` and `foodlink-ui/src/components/customer/CustomerApp.jsx` to ensure clean safe area padding

**Checkpoint**: User Story 1 (MVP) is functional and testable independently.

---

## Phase 3: User Story 2 - Account Profile Role Navigation & Routing (Priority: P2)

**Goal**: Provide a clean, non-intrusive role switcher link inside the Customer Profile settings tab and Merchant Hub, preserving URL navigation (`?portal=merchant` / `?portal=customer`).

**Independent Test**: Navigate to Customer Profile tab. Click "Switch to Merchant Hub". Verify smooth transition to Merchant view without floating buttons. In Merchant view, navigate back to Customer view.

### Implementation for User Story 2
- [x] T004 [US2] Add a minimalist "Merchant Portal Access" / "Switch to Merchant Hub" action card in `foodlink-ui/src/components/customer/CustomerProfile.jsx` utilizing `usePortalRouter().navigateTo('merchant')`
- [x] T005 [US2] Verify `foodlink-ui/src/components/merchant/MerchantNavbar.jsx` contains a clean link or button to navigate back to Customer App

---

## Phase 4: Polish & Quality Gate Verification

**Purpose**: Cross-cutting verification against Foodlink Constitution v1.1.0

- [x] T006 [P] Verify Foodlink Constitution Principle III (Zero Emojis, intentional Lucide React icons only, clean minimalist typography) across modified files
- [x] T007 Execute production build verification via `npm.cmd run build` inside `foodlink-ui/`
- [x] T008 Verify repository isolation gate: confirm `git status --porcelain customer merchant server` produces zero output

---

## Dependencies & Execution Order

### Phase Dependencies
- **Setup (Phase 1)**: Independent - runs first.
- **User Story 1 (Phase 2 - MVP)**: Removes floating widget from `App.jsx`.
- **User Story 2 (Phase 3)**: Adds clean Profile tab entry for role switching.
- **Polish (Phase 4)**: Runs after implementation to certify constitutional compliance.

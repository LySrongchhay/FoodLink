# Feature Specification: Remove Floating "Switch Link" Pill for Clean Mobile Experience

**Feature Branch**: `008-remove-floating-switch-link`  
**Created**: 2026-10-31  
**Status**: Specified  
**Input**: User description: "I think we should remove this button since we focus on mobile" (referencing floating `Switch Link` pill widget)

---

## Overview & Background

The application currently renders a floating utility pill button (`Switch Link ^`, implemented in `PortalSwitcherFloating.jsx`) anchored to the bottom-right corner (`fixed bottom-4 right-4 z-50`) across both Customer and Merchant views. 

While originally added as a desktop preview helper, in a mobile-focused application this floating button:
1. Overlaps with the mobile bottom navigation bar (`BottomNavBar.jsx`), obscuring touch targets such as the "Profile" or "Reserves" tab.
2. Collides with sticky checkout action buttons, filter drawers, and bottom sheet dialogs.
3. Violates **Foodlink Constitution Principle III** (Clean Modern Minimalism: "Elements must never feel crowded or visually chaotic").

Removing this persistent floating widget restores 100% of the mobile viewport space to core food rescue and merchant workflows, relying on standard mobile navigation patterns and URL routing.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Clean Mobile Experience Without Floating Overlays (Priority: P1)

As a customer or merchant using Foodlink on a mobile screen,  
I want the bottom area of my screen to be completely clear of floating development widgets,  
So that I can comfortably tap bottom navigation tabs, checkout buttons, and interactive maps without visual obstruction or accidental mis-clicks.

**Why this priority**: Directly impacts mobile usability and touch target accessibility across all screens in the app.

**Independent Test**: Load the app in Customer view (`/` or `?portal=customer`) and Merchant view (`?portal=merchant`) at a mobile viewport (375px - 430px wide). Verify that the `Switch Link` button is nowhere on the screen, and bottom navigation tabs are 100% visible and tappable without interference.

**Acceptance Scenarios**:
1. **Given** any screen in Customer App, **When** rendered on mobile or desktop viewports, **Then** zero floating `Switch Link` pill buttons appear on screen.
2. **Given** any screen in Merchant App, **When** rendered on mobile or desktop viewports, **Then** zero floating `Switch Link` pill buttons appear on screen.
3. **Given** sticky bottom bars (such as Customer checkout or bottom nav), **When** scrolling to the bottom of the page, **Then** content and buttons have full clearance without any overlapping UI elements.

---

### User Story 2 - Preserved Portal Navigation via Standard Routing (Priority: P2)

As a tester or stakeholder reviewing both Customer and Merchant experiences,  
I want to navigate between Customer, Merchant, and Split Launcher portals using clean URL query parameters or hash routes,  
So that I can switch roles easily without needing a permanent floating widget pinned over the interface.

**Why this priority**: Ensures multi-role testability remains intact without degrading user-facing mobile UX.

**Independent Test**: Access `http://localhost:5173/?portal=customer`, `http://localhost:5173/?portal=merchant`, and `http://localhost:5173/?portal=launcher`. Verify that each portal renders directly and correctly.

**Acceptance Scenarios**:
1. **Given** `?portal=customer` or root `/`, **When** the URL is loaded, **Then** the Customer App loads without floating artifacts.
2. **Given** `?portal=merchant`, **When** the URL is loaded, **Then** the Merchant App loads without floating artifacts.
3. **Given** `?portal=launcher`, **When** the URL is loaded, **Then** the Split Launcher renders all portal selection cards.

---

## Edge Cases

- **Mobile Safe Area**: Ensure bottom padding on mobile screens (`pb-20` / `pb-24`) continues to provide adequate clearance for native browser bars and bottom navigation tabs without the floating pill.
- **Component Cleanliness**: Ensure removing the component does not break tests, bundler imports, or router state management.

---

## Functional Requirements

- **FR-001**: System MUST NOT render the floating `Switch Link` pill (`PortalSwitcherFloating`) on Customer, Merchant, or Launcher screens.
- **FR-002**: System MUST retain the `usePortalRouter` hook and URL-driven routing (`customer`, `merchant`, `launcher`).
- **FR-003**: System MUST provide unobstructed touch targets of at least 44px for all bottom navigation items on mobile devices.
- **FR-004**: System MUST preserve Foodlink Constitution Principle III (clean modern minimalism, zero emojis, intentional iconography).

---

## Success Criteria

- **SC-001**: Zero floating pill buttons (`Switch Link`) rendered anywhere in the application DOM.
- **SC-002**: 100% unobstructed touch accessibility for bottom navigation items and floating drawer sheets on mobile screens (viewport width <= 430px).
- **SC-003**: Clean production build (`npm.cmd run build`) with zero unused component warnings.

---

## Assumptions

- Developers and reviewers switch between portals via the Split Launcher (`?portal=launcher`), URL query parameters (`?portal=customer` / `?portal=merchant`), or hash routing.
- `customer/`, `merchant/`, and `server/` remain 100% untouched.

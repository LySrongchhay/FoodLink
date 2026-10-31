# Feature Specification: Fullscreen Laptop & Responsive Desktop Layout

**Feature Branch**: `012-responsive-fullscreen-layout`  
**Created**: 2026-10-31  
**Status**: Specified  
**Input**: User query: "imprvoe the layout display in fullscreen laptop , responesive, on both merchant and costumer,"

---

## Executive Summary & Background

Currently, Foodlink is optimized almost exclusively for mobile viewports:
- In [`CustomerApp.jsx`](file:///d:/DGIY/foodlink-2/foodlink-ui/src/components/customer/CustomerApp.jsx), the main content container is hard-locked to `max-w-md` (448px).
- In [`MerchantApp.jsx`](file:///d:/DGIY/foodlink-2/foodlink-ui/src/components/merchant/MerchantApp.jsx), the main content container is hard-locked to `lg:max-w-3xl` (768px).

When opened on a **fullscreen laptop, desktop, or external monitor (1280px, 1440px, 1920px)**:
1. Both portals appear as narrow, cramped mobile columns centered in the middle of a vast screen with 60–75% wasted empty whitespace on the left and right.
2. Store cards and surplus surprise bags remain stacked in a single narrow column rather than utilizing a clean responsive multi-column grid.
3. Merchant operational cards (kitchen orders, daily highlights, inventory table) are squished vertically rather than presenting a rich, panoramic operational dashboard.
4. Drawers and bottom sheets (checkout, listing details, QR passes) feel awkward when stretched on desktop screens.

This specification redesigns the layout architecture so that **both Customer and Merchant portals feel like world-class, responsive, desktop-grade web applications on laptop screens** while maintaining **100% mobile-first perfection on smartphones**.

---

## Architecture & Layout Strategy

```
  MOBILE VIEWPORT (< 768px)                   FULLSCREEN LAPTOP VIEWPORT (>= 1024px)
 ┌─────────────────────────┐     ┌─────────────────────────────────────────────────────────────┐
 │ Top App Bar             │     │ [Logo] FoodLink Discovery       [Search]       [Cart] [User]│
 ├─────────────────────────┤     ├─────────────────────────────────────────────────────────────┤
 │ Search Bar & Filters    │     │ [ Hero Banner / Environmental Impact Dashboard ]            │
 ├─────────────────────────┤     ├─────────────────────────────────────────────────────────────┤
 │ [Card 1 (Full width)]   │     │ ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
 │ [Card 2 (Full width)]   │     │ │ Card 1       │  │ Card 2       │  │ Card 3       │        │
 │ [Card 3 (Full width)]   │     │ │ (Image)      │  │ (Image)      │  │ (Image)      │        │
 │ [Card 4 (Full width)]   │     │ │ $4.99 (-70%) │  │ $5.49 (-65%) │  │ $3.99 (-72%) │        │
 ├─────────────────────────┤     │ └──────────────┘  └──────────────┘  └──────────────┘        │
 │ Fixed Bottom 4-Tab Nav  │     ├─────────────────────────────────────────────────────────────┤
 └─────────────────────────┘     │ Centered Navigation Bar / Desktop App Header                │
                                 └─────────────────────────────────────────────────────────────┘
```

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Responsive Fullscreen Customer Discovery Experience (Priority: P1) [MVP]

As a customer browsing surplus food on my laptop or desktop browser,  
I want the food discovery feed, store cards, and category sections to expand into a balanced responsive grid (2-3 columns on laptop),  
So that I can comfortably scan available surprise bags, pricing, and bakery distances across my full screen without awkward empty margins.

**Why this priority**: Directly solves the primary user request for the customer experience. Transforms the laptop view from a narrow mobile simulation into a spacious, premium discovery experience.

**Independent Test**: Load Customer App on a laptop viewport (>= 1024px or 1440px). Verify that:
1. The canvas expands comfortably with `max-w-6xl` or `max-w-7xl` containment.
2. Surplus listings and store cards display in a multi-column responsive grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3`).
3. Hero promo banner, search bar, and filter tabs span gracefully across the viewport.

**Acceptance Scenarios**:
1. **Given** a laptop browser (viewport width $\ge$ 1024px), **When** viewing the Customer Home feed, **Then** surprise bag cards render in a 3-column responsive grid with consistent card heights and zero text clipping.
2. **Given** a mobile phone (viewport width $\le$ 640px), **When** viewing the Customer feed, **Then** the layout gracefully collapses back to a full-width mobile card stack with 100% fidelity.
3. **Given** the customer map view, **When** viewed on a laptop screen, **Then** the map expands to a generous widescreen container (`h-[500px]` or split-pane) with interactive store markers.

---

### User Story 2 - Panoramic Merchant Dashboard & Kitchen Queue (Priority: P2)

As a bakery manager or kitchen staff member running CAD Bakery on a store laptop or counter tablet,  
I want the merchant portal to leverage the full laptop screen width with an organized 2-column or 3-column operational layout,  
So that I can see daily highlights, active inventory, and live orders queue simultaneously without excessive vertical scrolling.

**Why this priority**: Store operators often work on laptops or counter POS tablets. A panoramic view increases operational efficiency during busy pickup hours.

**Independent Test**: Load Merchant Portal on a laptop viewport ($\ge$ 1024px). Verify that:
1. Daily Highlights (Bags Listed, Bags Sold, Today's Revenue) display as prominent horizontal cards with spacious metric typography.
2. The primary actions (`+ New Batch` and `Verify PIN`) and Kitchen Queue utilize a 2-column split view (e.g. Left column: Operational highlights & stock controls; Right column: Live orders reservation queue).
3. The store profile and analytics screens expand into desktop-grade analytical cards.

**Acceptance Scenarios**:
1. **Given** the Merchant Dashboard on a laptop screen, **When** loaded, **Then** content spans `max-w-6xl` with Daily Highlights cleanly laid out across the grid.
2. **Given** the Kitchen Queue (Orders tab) on a laptop screen, **When** orders are present, **Then** pending reservations and completed earlier pickups can be viewed side-by-side or in a 2-column grid.
3. **Given** mobile screens, **When** viewed on a phone, **Then** all merchant cards and 2-column mobile action grids remain perfectly touch-optimized with $\ge$ 44px tap targets.

---

### User Story 3 - Desktop-Adaptive Dialogs, Modals & Navigation (Priority: P3)

As a desktop user interacting with checkout, listing details, or pickup verification,  
I want dialogs and modals to appear as centered, polished floating modal windows (instead of stretched full-width bottom sheets),  
And navigation to stay elegantly positioned,  
So that interactive workflows feel natural and focused on large screens.

**Why this priority**: Stretched mobile bottom sheets look amateurish on wide screens. Centered modal dialogs deliver an authentic desktop UX.

**Independent Test**: Open Checkout Flow or Listing Details on laptop (1440px). Verify that the drawer renders as a centered floating modal dialog with backdrop blur (`sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto rounded-3xl`).

**Acceptance Scenarios**:
1. **Given** a customer clicks a listing card on a laptop, **When** the detail view opens, **Then** it renders as an elegant centered desktop modal dialog with smooth fade-in.
2. **Given** a customer enters checkout, **When** reviewing payment & KHQR, **Then** the checkout modal is centered with crisp spacing.
3. **Given** the bottom navigation bar on laptop viewports, **When** displayed, **Then** it is constrained to a sleek, centered floating dock (`max-w-md sm:max-w-lg mx-auto`) with subtle shadow and border, rather than stretching across the entire 1920px screen edge.

---

## Edge Cases

- **Ultra-Wide Desktop Displays (2560px+)**: Enforce strict max-width boundaries (`max-w-6xl` or `max-w-7xl`) so containers never stretch into unreadable horizontal ribbons.
- **Fluid Window Resizing**: Resizing the browser window between 375px (mobile) and 1440px (laptop) must transition smoothly without element overflow, horizontal scrollbars, or broken flex wrapping.
- **Backdrop Blur & Fixed Elements**: Ensure headers and floating navigation bars do not hide content behind sticky top/bottom bars on shorter laptop screens (e.g., 1366x768).

---

## Functional Requirements

- **FR-001**: System MUST expand customer main canvas from static `max-w-md` to responsive `max-w-md sm:max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.
- **FR-002**: System MUST render customer listing feeds in a responsive grid: 1 column on mobile (`grid-cols-1`), 2 columns on tablet (`sm:grid-cols-2`), and 3 columns on laptop/desktop (`lg:grid-cols-3 xl:grid-cols-3`).
- **FR-003**: System MUST expand merchant main canvas from static `max-w-3xl` to responsive `max-w-md sm:max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.
- **FR-004**: System MUST arrange merchant dashboard elements into a multi-column desktop layout on large viewports (`lg:grid lg:grid-cols-12 lg:gap-8`).
- **FR-005**: System MUST adapt customer drawer modals (Listing Detail, Checkout, Notifications) into centered desktop dialog windows (`sm:max-w-lg md:max-w-xl mx-auto sm:my-8 sm:rounded-3xl`).
- **FR-006**: System MUST constrain floating bottom navigation docks to centered max-width bounds (`max-w-md sm:max-w-lg mx-auto`) on large screens with subtle glassmorphic styling.
- **FR-007**: System MUST maintain 100% zero-emoji guarantee (Constitution v1.2.0) and keep `customer/`, `merchant/`, and `server/` untouched.

---

## Success Criteria

- **SC-001**: On laptop screens ($\ge$ 1024px), Customer and Merchant portals utilize screen width naturally without excessive empty margins.
- **SC-002**: Zero horizontal scrolling across any viewport width from 360px up to 2560px.
- **SC-003**: Mobile touch experience remains 100% intact with minimum 44px tap targets.
- **SC-004**: Production build (`npm.cmd run build`) passes cleanly with zero errors.
- **SC-005**: All modifications are strictly isolated to `foodlink-ui/`.

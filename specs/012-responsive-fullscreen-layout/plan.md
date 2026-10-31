# Implementation Plan: Fullscreen Laptop & Responsive Desktop Layout

**Branch**: `012-responsive-fullscreen-layout` | **Date**: 2026-10-31 | **Spec**: [specs/012-responsive-fullscreen-layout/spec.md](file:///d:/DGIY/foodlink-2/specs/012-responsive-fullscreen-layout/spec.md)

**Input**: Feature specification from `specs/012-responsive-fullscreen-layout/spec.md`

---

## Summary

Modernize the layout architecture of both Customer and Merchant portals in `foodlink-ui` to deliver a responsive, widescreen experience on fullscreen laptops and desktop monitors (1280px–1920px). Expand canvas containers to `max-w-6xl` / `max-w-7xl`, convert single-column listing stacks into 2-to-3 column responsive grids (`sm:grid-cols-2 lg:grid-cols-3`), adapt merchant dashboard and kitchen queue for wide screens, center modal dialogs, and transition bottom navbars into sleek floating docks on large screens while maintaining 100% mobile-first perfection on phones.

---

## Technical Context

**Language/Version**: JavaScript (ES2022+), React 18  
**Primary Dependencies**: React, Lucide React, Tailwind CSS 4, Vite  
**Target Platform**: Responsive Web (Mobile 360px+ to Fullscreen Laptops 1920px+)  
**Project Type**: React Single Page Application (`foodlink-ui/`)  
**Performance Goals**: 60fps smooth touch/mouse interaction, < 1000ms production build  
**Constraints**: Zero layout regressions on mobile (375px/390px). 100% offline-first capable. Strict adherence to Foodlink Constitution v1.2.0 (zero emojis, design token fidelity). Isolation gate: `customer/`, `merchant/`, and `server/` remain 100% untouched.

---

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Principle I (UI-First & Decoupled Architecture)**: Self-contained responsive layout enhancements built with pure Tailwind CSS.
- [x] **Principle II (Two-Sided Domain Separation & Dedicated Dual-Hosting)**: Distinct responsive layouts tailored to customer shopping habits vs. merchant operational dashboard.
- [x] **Principle III (Design System Consistency & Minimalist UX)**: Zero emojis; consistent `#2E7D32`, `#FF8A3D`, `#FAFAFA`, and `border-stone-200/80` tokens.
- [x] **Principle IV (Contract-First Mock Data & Offline-First Demo Reliability)**: All responsive views leverage existing structured mock data without backend dependencies.
- [x] **Principle V (Simplicity & Incremental Delivery / YAGNI)**: Standard Tailwind utility classes (`sm:`, `md:`, `lg:`, `xl:`); no redundant CSS libraries or heavyweight layout packages.
- [x] **Operational Constraint (Zero-Backend Mandate)**: Fully self-contained.
- [x] **Repository Isolation Gate**: Work strictly confined to `foodlink-ui/`.

---

## Project Structure

### Documentation (this feature)

```text
specs/012-responsive-fullscreen-layout/
├── spec.md              # Feature specification
├── plan.md              # Implementation plan (this file)
├── research.md          # Technical research & breakpoint decisions
├── quickstart.md        # Viewport testing guide & verification checklist
└── tasks.md             # Task breakdown (generated in next step)
```

### Source Code (`foodlink-ui/`)

```text
foodlink-ui/src/
├── components/
│   ├── customer/
│   │   ├── CustomerApp.jsx                  # Expanded main canvas & 3-column discovery grid
│   │   ├── CustomerMapView.jsx              # Widescreen interactive map container
│   │   ├── CustomerListingDetail.jsx        # Desktop-centered floating modal dialog
│   │   └── CustomerCheckoutFlow.jsx         # Desktop-centered checkout dialog
│   └── merchant/
│       └── MerchantApp.jsx                  # Expanded main canvas & centered floating dock
└── pages/
    ├── Dashboard/
    │   └── MerchantDashboard.jsx            # Widescreen daily highlights & 2-column operational grid
    ├── Orders/
    │   └── MerchantOrders.jsx               # Widescreen kitchen reservations queue
    └── StoreProfile/
        └── MerchantProfile.jsx              # Desktop-adapted store profile & analytics
```

---

## Implementation Phases

### Phase 1: Customer Portal Responsive Grid & Container Expansion
- In `foodlink-ui/src/components/customer/CustomerApp.jsx`:
  - Upgrade `<main>` container from `max-w-md` to `max-w-md sm:max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.
  - Upgrade top app bar and search section to scale gracefully (`max-w-7xl mx-auto`).
  - Upgrade food discovery listings from `space-y-3.5` single-column stack into `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4`.
  - Adapt hero banner, category pills, and filter chips for multi-column layout.
- In `foodlink-ui/src/components/customer/CustomerMapView.jsx`:
  - Expand map container to widescreen dimensions (`w-full max-w-7xl mx-auto rounded-3xl overflow-hidden h-[550px] lg:h-[650px]`).

### Phase 2: Merchant Portal Panoramic Dashboard & Kitchen Layout
- In `foodlink-ui/src/components/merchant/MerchantApp.jsx`:
  - Upgrade `<header>` and `<main>` containers from `max-w-3xl` to `max-w-md sm:max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.
- In `foodlink-ui/src/pages/Dashboard/MerchantDashboard.jsx`:
  - Upgrade Daily Highlights cards to scale with generous padding and prominent metric typography on wide screens.
  - Implement a 2-column operational desktop layout on large viewports (`lg:grid lg:grid-cols-12 lg:gap-8`):
    - Left column (4–5 cols): Quick actions (`+ New Batch`, `Verify PIN`), Store availability toggle, Daily Highlights.
    - Right column (7–8 cols): Today's Active Listings & Kitchen queue preview.
- In `foodlink-ui/src/pages/Orders/MerchantOrders.jsx`:
  - Allow order cards to display in a balanced 2-column grid on laptop screens (`grid grid-cols-1 lg:grid-cols-2 gap-4`).

### Phase 3: Desktop-Adaptive Dialogs & Centered Navigation Docks
- In `foodlink-ui/src/components/customer/CustomerListingDetail.jsx` and `CustomerCheckoutFlow.jsx`:
  - Add desktop centering classes (`sm:max-w-lg md:max-w-xl mx-auto sm:my-8 sm:rounded-3xl shadow-2xl`) with backdrop blur.
- In `foodlink-ui/src/components/customer/CustomerApp.jsx` and `MerchantApp.jsx`:
  - Style the fixed bottom navigation into a sleek, centered floating dock on large screens (`sm:max-w-md sm:bottom-4 sm:rounded-3xl sm:border sm:shadow-lg sm:bg-white/95 sm:backdrop-blur-md`).

### Phase 4: Verification & Quality Gate
- Verify mobile viewport (390px) retains 100% touch targets and layout fidelity.
- Verify tablet (768px) and laptop (1440px) viewports expand cleanly without horizontal scrolling.
- Verify Foodlink Constitution v1.2.0 compliance (0 emojis, design tokens).
- Verify clean build (`npm.cmd run build`).
- Verify repository isolation (`customer/`, `merchant/`, and `server/` untouched).

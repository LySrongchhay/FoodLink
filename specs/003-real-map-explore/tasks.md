---
description: "Task list for feature 003-real-map-explore"
---

# Tasks: Real Interactive Geographic Map for Customer Explore

**Input**: Design documents from `/specs/003-real-map-explore/` (`spec.md`, `plan.md`, `research.md`, `data-model.md`, `contracts/map-contracts.json`, `quickstart.md`)  
**Prerequisites**: `spec.md`, `plan.md`, `research.md`, `data-model.md`, `contracts/map-contracts.json`  
**Boundary Constraint**: `customer/`, `merchant/`, and `server/` are strict reference folders and MUST remain 100% untouched. All changes are strictly inside `foodlink-ui/`.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Dependency installation and stylesheet configuration

- [X] T001 Install `leaflet` (`^1.9.4`) package in `foodlink-ui/package.json`
- [X] T002 [P] Import Leaflet stylesheet (`leaflet/dist/leaflet.css`) and configure custom map marker / pulse animation CSS in `foodlink-ui/src/index.css`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core geographic data and Leaflet map lifecycle management

- [X] T003 [P] Define verified Phnom Penh partner store coordinates and metadata matching `data-model.md` and `contracts/map-contracts.json` in `foodlink-ui/src/data/phnomPenhStores.js`
- [X] T004 Create Leaflet container structure, map lifecycle hooks, and cleanup logic in `foodlink-ui/src/components/customer/CustomerMapView.jsx`

**Checkpoint**: Foundation ready - Leaflet container mounts cleanly without memory leaks or duplicate DOM instances.

---

## Phase 3: User Story 1 - Real Geographic Navigation & Exploration (Priority: P1) 🎯 MVP

**Goal**: Render genuine CartoDB Voyager raster tiles centered on Phnom Penh BKK1 with fluid 60fps zoom/pan, street labels, search bar, and Locate Me GPS recentering.

**Independent Test**: Open `/customer` -> tap Explore (Compass) tab -> verify actual Phnom Penh streets (Norodom, Monivong, Sihanouk, St. 310) and rivers render crisply, and clicking "Locate Me" smoothly recenters to BKK1.

- [X] T005 [US1] Initialize Leaflet tile layer with CartoDB Voyager (`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`) centered at `[11.5514, 104.9255]` with zoom 15 in `foodlink-ui/src/components/customer/CustomerMapView.jsx`
- [X] T006 [US1] Implement custom map navigation controls (Floating Zoom In/Out and Recenter buttons) styled with Foodlink green in `foodlink-ui/src/components/customer/CustomerMapView.jsx`
- [X] T007 [US1] Implement "Locate Me" button with browser Geolocation API fallback to BKK1 simulated coordinates `[11.5540, 104.9240]` in `foodlink-ui/src/components/customer/CustomerMapView.jsx`
- [X] T008 [US1] Implement floating search bar and category filter chips (All, Bakery, Meals, Groceries) in `foodlink-ui/src/components/customer/CustomerMapView.jsx`

**Checkpoint**: User Story 1 delivers an authentic, responsive map of Phnom Penh ready for pin rendering.

---

## Phase 4: User Story 2 - Branded Food Rescue Pins with Live Discounts (Priority: P1)

**Goal**: Render custom HTML markers using `L.divIcon` displaying store logos, green border rings, and vibrant discount badges (`59% OFF`, `50% OFF`), plus a pulsing blue customer location radar marker.

**Independent Test**: Inspect map markers -> confirm CAD Bakery (St. 310) shows bakery logo, `59% OFF` badge, and pulsing blue user dot is visible 400m away in BKK1.

- [X] T009 [P] [US2] Implement custom `L.divIcon` customer location marker with pulsing radar animation at `[11.5540, 104.9240]` in `foodlink-ui/src/components/customer/CustomerMapView.jsx`
- [X] T010 [US2] Implement custom branded store pins with Foodlink Green border (`#2E7D32`), store avatar, and discount badges (`59% OFF`) using `L.divIcon` in `foodlink-ui/src/components/customer/CustomerMapView.jsx`
- [X] T011 [US2] Implement category filter reactivity and marker click focus/glow animation in `foodlink-ui/src/components/customer/CustomerMapView.jsx`

**Checkpoint**: User Story 2 brings the map to life with branded store locations and surplus discounts.

---

## Phase 5: User Story 3 - Bottom Store Drawer & Seamless Rescue (Priority: P1)

**Goal**: Tapping any store pin smoothly pans the map and slides up an interactive bottom drawer card with store image, distance, ratings, surplus price, and direct "Rescue Deal" button.

**Independent Test**: Click CAD Bakery pin -> bottom drawer slides up displaying `$3.50` (save `$5.00`), `0.4 km away`, and clicking "Rescue Deal" opens the listing detail/checkout flow.

- [X] T012 [P] [US3] Create slide-up store preview drawer component `MapBottomDrawer` with store image, rating, distance, price chip, and closing pickup window in `foodlink-ui/src/components/customer/MapBottomDrawer.jsx`
- [X] T013 [US3] Integrate `MapBottomDrawer` with pin click events and `onSelectListing` callback to bridge directly into checkout in `foodlink-ui/src/components/customer/CustomerMapView.jsx`
- [X] T014 [US3] Add touch-swipe-to-dismiss and backdrop click handlers to close drawer in `foodlink-ui/src/components/customer/MapBottomDrawer.jsx`

**Checkpoint**: User Story 3 connects map exploration directly into the checkout and order flow.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Optimization, build validation, and boundary verification

- [X] T015 [P] Verify responsive layout across mobile viewport (375px) and desktop, preventing touch scroll conflicts in `foodlink-ui/src/components/customer/CustomerMapView.jsx`
- [X] T016 Run production build (`npm.cmd run build`) in `foodlink-ui/` and ensure 0 errors and 0 warnings
- [X] T017 Verify strict isolation constraint: ensure `customer/`, `merchant/`, and `server/` directories remain 100% untouched

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately.
- **Foundational (Phase 2)**: Depends on Phase 1 completion — BLOCKS all user stories.
- **User Story 1 (Phase 3)**: Depends on Phase 2 — MVP milestone.
- **User Story 2 (Phase 4)**: Depends on Phase 3 tile setup.
- **User Story 3 (Phase 5)**: Depends on Phase 4 pin interaction.
- **Polish (Phase 6)**: Runs after all user stories are complete.

### Parallel Opportunities

- `T002` (CSS styles) can run in parallel with `T001` (Package install).
- `T003` (Store coordinates dataset) can run in parallel with `T004` (Leaflet container).
- `T009` (Customer location pulse) can run in parallel with `T010` (Store pins).
- `T012` (`MapBottomDrawer.jsx` component) can run in parallel with `T011`.
- `T015` (Responsive verification) can run in parallel with `T016`.

---

## Implementation Strategy

### MVP First (User Story 1 Only)
1. Complete Setup (`T001`, `T002`)
2. Complete Foundational (`T003`, `T004`)
3. Complete User Story 1 (`T005`-`T008`)
4. Validate genuine Phnom Penh cartography renders smoothly.

### Incremental Delivery
1. Foundation & Map Tiles (US1) -> Genuine cartography verified.
2. Branded Pins & Pulse Indicator (US2) -> Visual deals and location verified.
3. Bottom Store Drawer & Quick Rescue (US3) -> Direct path to checkout verified.
4. Polish & Build Verification -> 0 errors, strict isolation guaranteed.

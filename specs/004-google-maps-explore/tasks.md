---
description: "Task list for feature 004-google-maps-explore"
---

# Tasks: Google Maps Style Interactive Explore

**Input**: Design documents from `/specs/004-google-maps-explore/` (`spec.md`, `plan.md`, `research.md`, `data-model.md`, `contracts/google-map-contracts.json`, `quickstart.md`)  
**Prerequisites**: `spec.md`, `plan.md`, `research.md`, `data-model.md`, `contracts/google-map-contracts.json`  
**Boundary Constraint**: `customer/`, `merchant/`, and `server/` are strict reference folders and MUST remain 100% untouched. All changes are strictly inside `foodlink-ui/`.

---

## Phase 1: Setup (Shared Infrastructure & CSS Hardening)

**Purpose**: Ensure guaranteed Leaflet CSS loading and Google Maps styling across the application

- [X] T001 Import Leaflet stylesheet directly in `foodlink-ui/src/main.jsx` to prevent deferred CSS evaluation
- [X] T002 [P] Configure Google Maps UI styling, teardrop pins, crosshair controls, and radar pulse keyframes in `foodlink-ui/src/index.css`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Store data preparation and robust map container lifecycle

- [X] T003 [P] Verify and update Phnom Penh store dataset with Google Maps coordinates and discount metadata in `foodlink-ui/src/data/phnomPenhStores.js`
- [X] T004 Implement container dimension hardening and `ResizeObserver` lifecycle with `map.invalidateSize()` in `foodlink-ui/src/components/customer/CustomerMapView.jsx`

**Checkpoint**: Foundation ready - Leaflet container guarantees non-zero pixel height and eliminates blank/grey map rendering.

---

## Phase 3: User Story 1 - Instant Map Visibility & Authentic Google Maps Cartography (Priority: P1) 🎯 MVP

**Goal**: Load genuine Google Maps Roadmap raster tiles (`lyrs=m`) centered on Phnom Penh BKK1 with Khmer and English labels, instant rendering, and automatic fallback to OpenStreetMap.

**Independent Test**: Open `/customer` -> tap Explore (Compass icon) -> verify genuine Google Maps roadmap tiles render immediately without blank or grey boxes, displaying Phnom Penh streets (Norodom, Monivong, Sihanouk, St. 310) and rivers.

- [X] T005 [US1] Initialize Google Maps Roadmap tile layer (`https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}`) with subdomains `['0','1','2','3']` centered at `[11.5514, 104.9255]` with zoom 15 in `foodlink-ui/src/components/customer/CustomerMapView.jsx`
- [X] T006 [US1] Implement automatic error fallback to OpenStreetMap tiles (`https://tile.openstreetmap.org/{z}/{x}/{y}.png`) if tile network errors occur in `foodlink-ui/src/components/customer/CustomerMapView.jsx`
- [X] T007 [US1] Implement floating top Google Maps search pill and horizontal category filter chips in `foodlink-ui/src/components/customer/CustomerMapView.jsx`

**Checkpoint**: User Story 1 delivers an authentic, reliable Google Maps view of Phnom Penh that never renders blank.

---

## Phase 4: User Story 2 - Google Maps Control Cluster & User Location Crosshair (Priority: P1)

**Goal**: Provide authentic Google Maps navigation controls: bottom-right circular white crosshair "My Location" button and stacked square `+` / `−` zoom buttons, plus customer blue location dot.

**Independent Test**: Pan away from BKK1 -> tap the circular crosshair button on the bottom-right -> verify camera smoothly flies to BKK1 customer marker (`11.5540, 104.9240`).

- [X] T008 [P] [US2] Implement Google Maps floating control stack at bottom-right with square stacked `+` / `−` zoom buttons in `foodlink-ui/src/components/customer/CustomerMapView.jsx`
- [X] T009 [US2] Implement circular white "My Location" crosshair button with browser Geolocation API and BKK1 fallback in `foodlink-ui/src/components/customer/CustomerMapView.jsx`
- [X] T010 [US2] Implement customer location marker with pulsing accuracy halo in `foodlink-ui/src/components/customer/CustomerMapView.jsx`

**Checkpoint**: User Story 2 provides the intuitive Google Maps interaction model.

---

## Phase 5: User Story 3 - Google-Style Teardrop Pins & Bottom Place Card (Priority: P1)

**Goal**: Render Google Maps style teardrop pins with Foodlink green branding and discount tags (`59% OFF`), and slide up a Google Maps place card on tap that links directly to checkout.

**Independent Test**: Tap CAD Bakery teardrop pin -> camera smoothly centers and Google place card slides up with store photo, rating, distance, price, and "Rescue Deal" button opening checkout.

- [X] T011 [P] [US3] Implement Google Maps teardrop HTML markers with store category icons and floating discount tags (`59% OFF`) using `L.divIcon` in `foodlink-ui/src/components/customer/CustomerMapView.jsx`
- [X] T012 [P] [US3] Create Google Maps style bottom place card component `MapBottomDrawer` with store image, rating, pickup window, and savings breakdown in `foodlink-ui/src/components/customer/MapBottomDrawer.jsx`
- [X] T013 [US3] Connect pin click events to center the selected store and slide up `MapBottomDrawer` with direct "Rescue Deal" checkout trigger in `foodlink-ui/src/components/customer/CustomerMapView.jsx`

**Checkpoint**: User Story 3 connects Google Maps discovery seamlessly into food rescue checkout.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Responsive layout verification, production build, and boundary verification

- [X] T014 [P] Verify touch gestures, zoom wheel responsiveness, and mobile viewport ergonomics in `foodlink-ui/src/components/customer/CustomerMapView.jsx`
- [X] T015 Run production build (`npm.cmd run build`) in `foodlink-ui/` and ensure 0 errors and 0 warnings
- [X] T016 Verify strict isolation constraint: ensure `customer/`, `merchant/`, and `server/` directories remain 100% untouched

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately.
- **Foundational (Phase 2)**: Depends on Phase 1 completion — BLOCKS all user stories.
- **User Story 1 (Phase 3)**: Depends on Phase 2 — MVP milestone.
- **User Story 2 (Phase 4)**: Depends on Phase 3 map initialization.
- **User Story 3 (Phase 5)**: Depends on Phase 4 marker layers.
- **Polish (Phase 6)**: Runs after all user stories are complete.

### Parallel Opportunities

- `T002` (CSS styles) can run in parallel with `T001` (main.jsx import).
- `T003` (Store data check) can run in parallel with `T004` (Container lifecycle).
- `T008` (Zoom controls) can run in parallel with `T007` (Search pill).
- `T011` (Teardrop pins) can run in parallel with `T012` (Place card component).
- `T014` (Ergonomics check) can run in parallel with `T015` (Build test).

---

## Implementation Strategy

### MVP First (User Story 1 Only)
1. Complete Setup (`T001`, `T002`)
2. Complete Foundational (`T003`, `T004`)
3. Complete User Story 1 (`T005`-`T007`)
4. Confirm Google Maps Roadmap renders visibly and reliably without blank screens.

### Incremental Delivery
1. Google Maps Tiles & Visibility (US1) -> Map renders with 100% reliability.
2. Google Controls & Geolocation (US2) -> Familiar Google Maps controls active.
3. Teardrop Pins & Place Card (US3) -> Complete deal discovery and checkout flow.
4. Polish & Build -> 0 errors, strict isolation guaranteed.

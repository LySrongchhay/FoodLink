# Feature Specification: Real Interactive Geographic Map for Customer Explore

**Feature Branch**: `003-real-map-explore`  
**Created**: 2026-10-30  
**Status**: Clarified  
**Input**: "make the explore in the customer look real, like the real map"

---

## Clarifications

### Session 2026-10-30
- Q: Which visual cartography theme should the Phnom Penh map use? → A: CartoDB Voyager / Positron: Clean, high-contrast, modern raster tiles that match Foodlink's brand green (#2E7D32) and display Phnom Penh streets, landmarks, and rivers crisply.
- Q: How should store details be presented when a customer taps a pin on the map? → A: Slide-Up Bottom Drawer: Smoothly centers the selected pin and slides up an interactive preview card with photo, discount price, distance, and "Rescue Deal" button.
- Q: How should the customer's current location be represented on the map? → A: BKK1 Demo Location with GPS Option: Default to a simulated customer marker in BKK1 (400m from CAD Bakery) with a pulsing blue dot, plus a "Locate Me" button to request live browser GPS.

---

## 1. Objective & Scope

Replace the existing artificial dark-SVG placeholder in the Customer **Explore (Map)** tab with a **genuine interactive geographic map** powered by **Leaflet & CartoDB Voyager** tiles, centered on Phnom Penh (BKK1, Daun Penh, Tuol Kouk, and Tonle Bassac).

### Key Upgrades:
1. **Real Geographic Cartography**: Real streets (Norodom Blvd, Monivong Blvd, Sihanouk Blvd, St. 310), actual water bodies (Mekong & Tonle Sap rivers), and district landmarks rendered via high-contrast CartoDB Voyager tiles.
2. **Interactive Store Pins with Food Rescue Badges**: Verified partner stores (CAD Bakery & Cafe, Green Garden Organics, Bao Kitchen, One More Restaurant) rendered as custom branded map pins displaying live discount % and stock counts.
3. **Pulsing User Location Marker**: Realistic customer location marker in BKK1 (~400m from CAD Bakery) with a soft pulsing radar ring and a "Locate Me" button to access live device GPS.
4. **Slide-Up Bottom Store Drawer**: Tapping any pin smoothly highlights the store, centers the map, and slides up a rich interactive preview card with store photo, rating, distance (e.g. `0.4 km away`), surplus pricing, and a direct "Rescue Deal" button.
5. **Zero API Key Dependency**: Uses high-performance CartoDB Voyager tiles requiring zero billing accounts or credit cards.
6. **Strict Isolation**: Reference repositories `customer/`, `merchant/`, and `server/` remain 100% untouched; implementation is contained in `foodlink-ui/`.

---

## 2. User Scenarios & Testing *(mandatory)*

### User Story 1 - Real Geographic Navigation & Exploration (Priority: P1)
As a food-rescue Customer in Phnom Penh, I want to explore a real geographic map with actual streets, neighborhoods, and bridges so that I can see exactly where surplus deals are located relative to my home or office.

- **Why this priority**: Essential to replace the current artificial SVG grid with a high-trust, believable map interface.
- **Independent Test**: Open the Customer App, tap the "Explore" (Compass) tab in the bottom bar, and verify real Phnom Penh streets and landmarks render with interactive zoom and pan controls.
- **Acceptance Scenarios**:
  1. **Given** the customer switches to the Explore tab, **When** the view mounts, **Then** real CartoDB Voyager map tiles of Phnom Penh load smoothly with street names and district geography.
  2. **Given** the map is displayed, **When** the user drags to pan or uses the zoom controls (+ / -), **Then** the map responds fluidly at 60fps with continuous tile loading.
  3. **Given** the user is exploring other areas, **When** clicking the "Recenter / Locate Me" button, **Then** the map smoothly flies back to BKK1 / CAD Bakery hub.

---

### User Story 2 - Branded Food Rescue Pins with Live Discounts (Priority: P1)
As a Customer, I want to see clearly marked partner bakery and restaurant pins on the map displaying their discount badge so that I can spot the best nearby food rescue opportunities at a glance.

- **Why this priority**: Core value proposition—visualizing closing-hour surplus discounts geographically.
- **Independent Test**: Inspect the map to verify CAD Bakery pin (St. 310, BKK1) and other partner pins are positioned accurately with discount badges (e.g. `59% OFF`).
- **Acceptance Scenarios**:
  1. **Given** the map view is active, **When** examining store markers, **Then** CAD Bakery displays a distinct green verified pin with the CAD Bakery logo and active surplus count badge.
  2. **Given** category filters (All, Bakery, Meals, Groceries) are clicked, **When** selecting a filter, **Then** the pins update to display matching partner stores.

---

### User Story 3 - Bottom Store Drawer & Seamless Rescue (Priority: P1)
As a Customer, I want to tap on any map pin to see the store's details and surplus bag in a bottom slide-up drawer without leaving the map, so that I can quickly decide whether to claim it.

- **Why this priority**: Connects map exploration directly into the checkout and order flow.
- **Independent Test**: Click CAD Bakery pin on the map -> verify bottom drawer slides up with photo, `$3.50` price (save `$5.00`), pickup time, and "Rescue Deal" button.
- **Acceptance Scenarios**:
  1. **Given** pins are displayed on the map, **When** the user taps a store pin, **Then** the pin scales up with a glow ring and the bottom preview drawer appears with full store info.
  2. **Given** the store drawer is open, **When** the user taps "Rescue Deal", **Then** it opens the checkout modal with Bakong KHQR payment.

---

## 3. Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST integrate **Leaflet** with **CartoDB Voyager** raster tiles (`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`) for realistic Phnom Penh cartography without API keys.
- **FR-002**: Map MUST default center to coordinates `[11.5514, 104.9255]` (BKK1 district near CAD Bakery & Cafe, St. 310) with initial zoom level `15`.
- **FR-003**: System MUST render custom HTML markers with branded avatars (CAD Bakery logo), price chips, and discount badges (`59% OFF`).
- **FR-004**: System MUST render a pulsing blue customer location dot representing the user in BKK1 (`11.5540, 104.9240`).
- **FR-005**: System MUST include a floating search bar above the map allowing users to search stores by name or street address.
- **FR-006**: System MUST include category filter chips (All, Bakery, Meals, Groceries) allowing instant pin filtering.
- **FR-007**: System MUST provide map navigation controls: Zoom In (+), Zoom Out (-), and a "Recenter / Locate Me" GPS button.
- **FR-008**: System MUST render an interactive slide-up bottom drawer on pin selection featuring store photo, rating, distance, price, pickup window, and a direct "Rescue Deal" button.
- **FR-009**: System MUST support responsive touch interactions: pinch-to-zoom, single-finger drag on mobile, and wheel zoom on desktop.
- **FR-010**: System MUST preserve existing legacy directories `customer/`, `merchant/`, and `server/` with **zero modifications**.

---

## 4. Key Entities

- **Map Coordinate**: Latitude, Longitude (e.g. `11.5514, 104.9255` for St. 310, BKK1).
- **Store Map Marker**: ID, Store Name, Logo, Address/Street, Latitude, Longitude, Category, Rating, Active Listing ID, Discounted Price, Original Price, Discount Percentage, Available Stock.
- **Customer Location**: Simulated latitude `11.5540`, longitude `104.9240` with optional browser GPS update.
- **Active Pin Selection**: ID of currently selected store pin, triggering the slide-up drawer.

---

## 5. Success Criteria *(mandatory)*

- **SC-001**: Opening the Explore tab renders genuine Phnom Penh map tiles (real streets, rivers, district outlines) in < 1 second.
- **SC-002**: Tapping CAD Bakery pin centers the pin and smoothly slides up the store drawer with exact pricing.
- **SC-003**: Filtering by "Bakery" displays bakery partner pins and hides non-matching stores.
- **SC-004**: Clicking "Recenter" button smoothly flies the camera back to BKK1.
- **SC-005**: Production build (`npm.cmd run build`) passes with 0 errors.
- **SC-006**: 100% boundary compliance: `git status` confirms zero files modified in `customer/` or `merchant/`.

---

## 6. Assumptions

- Leaflet (`leaflet` and `react-leaflet`) will be installed in `foodlink-ui/package.json` to deliver the real map engine.
- CartoDB Voyager tiles provide fast, modern vector-style tile rendering in Cambodia without requiring any secret tokens or API keys.

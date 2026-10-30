# Feature Specification: Google Maps Style Interactive Explore for Customer

**Feature Branch**: `004-google-maps-explore`  
**Created**: 2026-10-30  
**Status**: Clarified  
**Input**: User description: "I cannot see the map , mkae like google map,"

---

## Clarifications

### Session 2026-10-30
- Q: Which Google Maps cartography theme do you want to display? → A: Standard Google Roadmap (`lyrs=m`) - Classic clean pale yellow roads, blue rivers, green parks, and crisp Khmer/English bilingual labels.
- Q: How should the map handle fallback if tile requests encounter network restrictions? → A: Multi-layer auto-fallback: Google Maps roadmap primary, with automatic OpenStreetMap fallback if Google tiles are unreachable or blocked.
- Q: Which Google Maps layout style best fits your customer exploration experience? → A: Google Maps Mobile Card layout: rounded top card container, floating search bar pill at top, bottom slide-up store sheet, circular crosshair GPS button, and stacked square zoom buttons.

---

## 1. Objective & Problem Statement

### Problem
In the customer Explore view, users encounter a blank or unrendered map area due to container dimension race conditions (`0x0` paint timing) or CDN tile blockage, and requested the map to look and behave authentically **like Google Maps**.

### Solution
1. **Guaranteed Visual Rendering**: Implement a self-healing `ResizeObserver` lifecycle and explicit viewport height styling ensuring the Leaflet map container never collapses, and immediately triggers `map.invalidateSize()` to guarantee tiles load 100% of the time without blank or grey screens.
2. **Authentic Google Maps Cartography**: Switch map raster tiles to Google Maps Roadmap tiles (`https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}` with automatic OpenStreetMap tile fallback), delivering the globally recognized Google Maps visual aesthetic: pale yellow arterial roads, soft green parklands, distinct blue Mekong/Tonle Sap riverways, and bilingual Khmer/English street labels for Phnom Penh.
3. **Google Maps UI Design System**:
   - Floating white search bar pill at top with Google Maps styling.
   - Horizontal category filter pills (`All Deals`, `Bakery`, `Meals`, `Groceries`) matching Google Maps chip aesthetics.
   - Google Maps floating control stack on the bottom-right: circular crosshair "My Location" button and square stacked `+` / `−` zoom buttons.
   - Google Maps style teardrop pins with Foodlink green branding and prominent surplus discount tags (`59% OFF`).
   - Google Maps bottom place preview card sliding up smoothly on pin tap with store photo, rating stars, distance, pickup hours, and "Rescue Deal" action button.

---

## 2. User Scenarios & Testing *(mandatory)*

### User Story 1 - Instant Map Visibility & Authentic Google Maps Cartography (Priority: P1) 🎯 MVP

As a Foodlink customer in Phnom Penh, I want to tap the "Explore" tab and instantly see an authentic Google Maps view of Phnom Penh streets and neighborhoods, so that I immediately recognize my surroundings and feel confident navigating surplus food deals.

- **Why this priority**: Directly resolves the critical bug where users cannot see the map, and delivers the requested Google Maps cartography.
- **Independent Test**: Open `/customer`, tap "Explore" (Compass icon), verify the map renders instantly without blank/grey areas, displaying authentic Google Maps roadmap styling of Phnom Penh (BKK1, Norodom Blvd, Monivong Blvd, Tonle Sap/Mekong rivers).
- **Acceptance Scenarios**:
  1. **Given** the customer navigates to the Explore tab, **When** the screen mounts, **Then** Google Maps roadmap tiles load immediately with zero blank gray squares or collapsed container heights.
  2. **Given** the map is rendered, **When** the user pans across Phnom Penh or zooms in/out, **Then** tiles render smoothly with official Google Maps road shields, street names in English and Khmer, and district labels.
  3. **Given** network restrictions or Google tile drops occur, **When** tile error events trigger, **Then** the map automatically falls back to OpenStreetMap tiles smoothly without interruption.
  4. **Given** the viewport is resized or rotated, **When** the container dimensions change, **Then** the map automatically adjusts via `ResizeObserver` and retains full visibility.

---

### User Story 2 - Google Maps Control Cluster & User Location Crosshair (Priority: P1)

As a customer exploring nearby food deals, I want Google Maps style navigation controls and a location crosshair button so that I can easily orient myself and recenter on my current location.

- **Why this priority**: Provides the familiar Google Maps interaction model that millions of users expect.
- **Independent Test**: Click the crosshair location button on the bottom right -> verify camera smoothly flies to customer location in BKK1 with pulsing location dot.
- **Acceptance Scenarios**:
  1. **Given** the map view is open, **When** viewing the interface, **Then** Google Maps style floating controls appear: a circular white "My Location" crosshair button and stacked square `+` / `−` zoom buttons in the bottom-right corner.
  2. **Given** the user has panned away to another district, **When** tapping the crosshair location button, **Then** the map smoothly animates back to the user's location in BKK1 (`11.5540, 104.9240`).
  3. **Given** the user is viewing the map, **When** locating the user marker, **Then** a blue location dot with animated accuracy halo marks the user's position in BKK1.

---

### User Story 3 - Google-Style Teardrop Pins & Bottom Place Card (Priority: P1)

As a customer looking for surplus food, I want to see Google Maps style teardrop pins with store discount badges, and tap them to slide up a Google Maps style store place card with direct checkout action.

- **Why this priority**: Connects geographic exploration directly into deal discovery and purchase.
- **Independent Test**: Tap the CAD Bakery pin on St. 310 -> verify pin highlights with pulse effect, map smoothly centers, and Google Maps place card slides up displaying photo, rating, distance, price savings, and "Rescue Deal" button.
- **Acceptance Scenarios**:
  1. **Given** partner stores are on the map, **When** rendered, **Then** each store displays a Google Maps teardrop pin with a category icon and a floating orange discount badge (e.g., `59% OFF`).
  2. **Given** the user taps a store pin, **When** selected, **Then** the camera smoothly pans to the store and a Google Maps style place card slides up from the bottom showing photo, rating, address, hours, and surplus price.
  3. **Given** the place card is displayed, **When** the user taps "Rescue Deal", **Then** the app transitions directly to the checkout flow with Bakong KHQR.

---

## 3. Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Map container MUST implement a robust CSS sizing strategy (`height: 100%`, `min-height: 480px`, flex containment) and `ResizeObserver` lifecycle calling `map.invalidateSize()` after DOM mount to guarantee 100% visibility.
- **FR-002**: Leaflet tile engine MUST use Google Maps Roadmap tiles (`https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}`) with subdomains `mt0`, `mt1`, `mt2`, `mt3` as primary, and automatic fallback to OpenStreetMap tiles (`https://tile.openstreetmap.org/{z}/{x}/{y}.png`) if tile errors occur.
- **FR-003**: Map MUST default center to coordinates `[11.5514, 104.9255]` (St. 310, BKK1 near CAD Bakery & Cafe) with default zoom level `15`.
- **FR-004**: System MUST render Google Maps style floating controls: circular crosshair location button and stacked `+` / `−` zoom controls positioned at the bottom-right.
- **FR-005**: System MUST render a pulsing blue user location marker representing the customer at BKK1 (`11.5540, 104.9240`).
- **FR-006**: System MUST render custom Google Maps teardrop pins with Foodlink green styling, category icons, and high-contrast discount badges (`59% OFF`).
- **FR-007**: System MUST provide a top floating Google Maps style search pill supporting search by store name, food category, or street name.
- **FR-008**: System MUST provide horizontal category filter pills (`All Deals`, `Bakery`, `Meals`, `Groceries`) styled like Google Maps filter chips.
- **FR-009**: System MUST render a Google Maps style slide-up bottom place card on pin selection with store photo, rating, distance, closing pickup window, and direct "Rescue Deal" button.
- **FR-010**: System MUST maintain strict isolation: reference folders `customer/`, `merchant/`, and `server/` remain 100% untouched.

---

## 4. Key Entities

- **Google Map Tile Layer**: Google Roadmap tiles (`https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}`) with max zoom 20, auto-fallback to OpenStreetMap.
- **Store Map Pin**: ID, Name, Category, Coordinates (`lat`, `lng`), Street Address, Rating, Reviews, Distance, Discount %, Price, Pickup Window, Photo URL.
- **Customer User Location**: Coordinates (`11.5540, 104.9240`), accuracy halo indicator.
- **Google Place Card**: Active selected store model passed to bottom sheet and checkout trigger.

---

## 5. Success Criteria *(mandatory)*

- **SC-001**: 100% of map mounts render visible Google Maps tiles within 500ms without blank, grey, or collapsed viewports.
- **SC-002**: Map visually matches authentic Google Maps roadmap aesthetic (road colors, riverways, fonts, English + Khmer labels).
- **SC-003**: Tapping CAD Bakery pin opens the Google-style place card in < 200ms.
- **SC-004**: Tapping "Rescue Deal" directly opens the checkout modal with Bakong KHQR.

---

## 6. Assumptions

- Standard Google Maps tile service (`https://mt{0-3}.google.com/vt/lyrs=m...`) is accessible directly without billing accounts or API keys for raster roadmap display.
- Leaflet map instance lifecycle is wrapped with proper DOM element readiness and size invalidation hooks.
- All code changes are strictly confined to `foodlink-ui/`.

# Phase 0 Research: Real Geographic Map for Customer Explore

**Feature**: `003-real-map-explore`  
**Date**: 2026-10-30  

---

## 1. Map Technology & Cartography Selection

### Decision: Direct Leaflet Engine with CartoDB Voyager Tiles
- **Options Evaluated**:
  1. *Google Maps JS API*: Requires Google Cloud billing account, API keys, and quota limits.
  2. *Mapbox GL JS*: Requires Mapbox account token and adds a ~500kB WebGL runtime.
  3. *Static Mock SVG*: What was previously used; lacks real street data and user interactivity.
  4. *Leaflet + CartoDB Voyager*: Free, zero API keys, lightweight (~140kB), ultra-fast CDN tiles, modern aesthetic matching Foodlink's green/orange design tokens, and supports custom animated HTML divIcons.
- **Selection**: **`leaflet`** (v1.9.4) with **CartoDB Voyager** raster tiles (`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`).

---

## 2. Geographic Focus & Store Coordinates in Phnom Penh

### Center Coordinate: BKK1 (`11.5514, 104.9255`)
- **CAD Bakery & Cafe**:
  - Address: St. 310, Boeung Keng Kang 1 (BKK1), Phnom Penh
  - Lat/Lng: `11.5514, 104.9255`
  - Rating: 4.9 | Distance: 0.4 km | Active Deal: 59% OFF
- **Green Garden Organics**:
  - Address: St. 288, Tuol Sleng, Phnom Penh
  - Lat/Lng: `11.5450, 104.9180`
  - Rating: 4.7 | Distance: 1.1 km | Active Deal: 60% OFF
- **Bao & Noodle Kitchen**:
  - Address: St. 51, Daun Penh, Phnom Penh
  - Lat/Lng: `11.5620, 104.9290`
  - Rating: 4.8 | Distance: 1.6 km | Active Deal: 55% OFF
- **One More Restaurant**:
  - Address: St. 315, Tuol Kouk, Phnom Penh
  - Lat/Lng: `11.5720, 104.8980`
  - Rating: 4.7 | Distance: 2.3 km | Active Deal: 50% OFF
- **Simulated Customer Location**:
  - Address: St. 302 / Norodom Blvd, BKK1
  - Lat/Lng: `11.5540, 104.9240` (presents a realistic 400m walk to CAD Bakery)

---

## 3. UI & Interaction Architecture

### Custom Marker DOM Styling (`L.divIcon`)
- **Store Marker**: White pill with CAD Bakery logo, green badge border, price tag, and floating discount pill (`59% OFF`).
- **User Marker**: Pulsing blue dot with expanding radar wave animation.
- **Selection State**: Tapping a store marker scales the pin by 1.15x, plays a subtle focus animation, and centers the map camera.

### Bottom Drawer Architecture
- Floating slide-up card anchored to the bottom of the map view.
- Displays store banner photo, verified badge, rating, closing pickup window, discount pricing, and "Rescue Deal" button.
- Clicking "Rescue Deal" immediately opens the Checkout flow with Bakong KHQR.

---

## 4. Dependencies to Install

- `leaflet`: `^1.9.4`
- Install directly inside `foodlink-ui/package.json`.
- Zero changes to `customer/` and `merchant/`.


# Research: Google Maps Style Interactive Explore

**Feature**: `004-google-maps-explore`  
**Date**: 2026-10-30  

---

## 1. Root Cause Analysis: Why Map Was Not Visible

### Findings:
1. **Container Dimension Paint Timing**: In flex layouts (`flex-1 h-full`), Leaflet calculates its internal canvas size during component mount (`useEffect`), before the browser DOM layout engine has computed the container's final pixel height. If Leaflet initializes against a `0px` height container, it does not fetch map tiles.
2. **Missing Explicit Stylesheet Linking**: Tailwind v4 `@theme` handling in CSS can defer nested `@import "leaflet/dist/leaflet.css"` loading if placed inside sub-blocks.
3. **CartoDB CDN Connectivity**: CartoDB Voyager tiles occasionally face latency or connection resets in Southeast Asia depending on local ISP DNS.

### Resolution:
- **`ResizeObserver` Lifecycle**: Attach a `ResizeObserver` to the map container. Whenever the container acquires width/height, immediately trigger `map.invalidateSize()`.
- **Explicit Height Styles**: Enforce `style={{ width: '100%', height: '100%', minHeight: '520px' }}` on the map DOM container.
- **Direct CSS Import**: Ensure `leaflet/dist/leaflet.css` is imported directly at the top of `index.css` and `main.jsx` for guaranteed styling.

---

## 2. Cartography Decision: Google Maps Roadmap Raster Tiles

### Tile Service:
- **Primary**: Google Maps Roadmap raster tiles:
  `https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}`
  Subdomains: `mt0`, `mt1`, `mt2`, `mt3` (load balances tile requests)
- **Visual Aesthetic**:
  - Warm beige/yellow highways and arterial roads (Norodom, Monivong, Sihanouk Blvd).
  - Clear light-blue river rendering (Mekong & Tonle Sap).
  - Soft green parks and open areas.
  - Bilingual street and district labels (Khmer + English) natively provided by Google.
  - Familiar to 99% of smartphone users globally.
- **Auto-Fallback Layer**:
  - In the event of tile network error, Leaflet attaches an `error` listener that dynamically swaps in OpenStreetMap standard tiles (`https://tile.openstreetmap.org/{z}/{x}/{y}.png`), ensuring 100% uptime.

---

## 3. Google Maps UI Components

### 1. Floating Top Search Pill
- Rounded white pill (`rounded-full bg-white shadow-xl px-4 py-3 border border-stone-200`) with Google Maps search icon (`Search`), clear button (`X`), and place category search placeholder.

### 2. Category Filter Pills
- Horizontal scrollable chips (`All Deals`, `Bakery`, `Meals`, `Groceries`) with Google Maps styling: white background, subtle border, active state in Foodlink green (`#2E7D32`).

### 3. Google Maps Floating Controls (Bottom-Right)
- **Circular "My Location" Crosshair Button**: Pure white circle (`rounded-full shadow-lg p-3 bg-white`), crosshair icon, smoothly flies camera to user's BKK1 location.
- **Stacked Zoom Controls**: Square stacked buttons (`+` on top, `−` on bottom) separated by a clean 1px divider, classic Google Maps style.

### 4. Teardrop Pins & Floating Discount Badges
- Classic Google Maps teardrop marker silhouette.
- Red/Green gradient or Foodlink Green (`#2E7D32`) with store category white glyph.
- Floating Urgency Orange (`#FF8A3D`) discount chip: `59% OFF`.

### 5. Google Maps Place Card (Bottom Sheet)
- Slides up from bottom on pin selection.
- Store image, title, rating stars, distance from user (`0.4 km away`), pickup window, price comparison (`$3.50` save `$5.00`), and prominent green **"Rescue Deal"** button that bridges directly into checkout.


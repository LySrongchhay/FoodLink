# Implementation Plan: Real Interactive Geographic Map for Customer Explore

**Branch**: `003-real-map-explore` | **Date**: 2026-10-30 | **Spec**: [specs/003-real-map-explore/spec.md](file:///d:/DGIY/foodlink-2/specs/003-real-map-explore/spec.md)

**Input**: "make the explore in the customer look real, like the real map"

---

## 1. Summary

Replace the synthetic SVG canvas in `foodlink-ui/src/components/customer/CustomerMapView.jsx` with a real, high-performance geographic map engine using **Leaflet** and **CartoDB Voyager** raster tiles centered on Phnom Penh (BKK1 district near CAD Bakery & Cafe). Deliver custom branded HTML markers with live surplus discount badges, user location pulse indicator, zoom/pan navigation controls, and an interactive slide-up store drawer connecting directly to checkout. The reference folders `customer/` and `merchant/` remain 100% untouched.

---

## 2. Technical Context

- **Directory**: `d:\DGIY\foodlink-2\foodlink-ui/`
- **Dependencies to Add**: `leaflet: ^1.9.4`
- **Tile Layer**: CartoDB Voyager (`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`)
- **Center**: Phnom Penh BKK1 (`11.5514, 104.9255`), Zoom level `15`
- **Component**: `foodlink-ui/src/components/customer/CustomerMapView.jsx`
- **Styles**: `leaflet/dist/leaflet.css` imported into `CustomerMapView.jsx` or `index.css`

---

## 3. Constitution Check

*GATE: Evaluation against Foodlink Constitution principles.*

| Principle | Evaluation | Status |
|---|---|---|
| **I. UI-First & Decoupled** | Operates on client-side geographic coordinates and interactive mock data without requiring live GIS servers. | **PASS** |
| **II. Two-Sided Separation** | Geographic exploration is strictly a customer-side feature within `/customer`. | **PASS** |
| **III. Design System** | Retains Foodlink Green (`#2E7D32`), Urgency Orange (`#FF8A3D`), and rounded card surfaces (`16px`). | **PASS** |
| **IV. Contract Mock Data** | Valid store pin coordinates matching actual Phnom Penh districts. | **PASS** |
| **V. Simplicity (YAGNI)** | Pure Leaflet raster tiles; zero complex Mapbox API keys or billing overhead. | **PASS** |
| **Isolation Constraint** | `customer/`, `merchant/`, and `server/` remain 100% untouched. | **PASS** |

---

## 4. Project Structure & Architecture

```text
foodlink-ui/
├── package.json                               # Add "leaflet": "^1.9.4"
├── src/
│   ├── components/
│   │   └── customer/
│   │       ├── CustomerMapView.jsx            # Real interactive Leaflet map
│   │       ├── CustomerApp.jsx                # Connects pin checkout to flow
│   │       └── ...
│   └── index.css                              # Leaflet CSS & custom pin styles
```

---

## 5. Implementation Sequence

1. **Install Leaflet**: Add `leaflet: ^1.9.4` to `foodlink-ui/package.json` and install with `npm.cmd install`.
2. **Import Leaflet CSS**: Include `leaflet/dist/leaflet.css` in `index.css` or `CustomerMapView.jsx`.
3. **Rebuild `CustomerMapView.jsx`**:
   - Leaflet map initialization centered at `[11.5514, 104.9255]` (St. 310, BKK1).
   - CartoDB Voyager tile layer with retina `{r}` support.
   - Branded store pins (CAD Bakery, Green Garden Organics, Bao & Noodle Kitchen, One More Restaurant) using custom `L.divIcon`.
   - Pulsing blue user location marker in BKK1 (`11.5540, 104.9240`).
   - "Locate Me / Center" button to re-focus camera.
   - Interactive slide-up bottom drawer on pin selection with photo, price, distance, and "Rescue Deal" button.
4. **Build & Boundary Verification**:
   - Run `npm.cmd run build` to confirm 0 compilation errors.
   - Check `git status` to ensure `customer/`, `merchant/`, and `server/` remain untouched.

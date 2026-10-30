# Implementation Plan: Google Maps Style Interactive Explore

**Branch**: `004-google-maps-explore` | **Date**: 2026-10-30 | **Spec**: [specs/004-google-maps-explore/spec.md](file:///d:/DGIY/foodlink-2/specs/004-google-maps-explore/spec.md)

**Input**: User description: "I cannot see the map , mkae like google map,"

---

## 1. Summary

Resolve the blank/unrendered map issue by implementing a robust `ResizeObserver` lifecycle with explicit viewport sizing (`height: 100%`, `min-height: 480px`) and `map.invalidateSize()`. Switch raster cartography to **Google Maps Roadmap** tiles (`https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}` with automatic OpenStreetMap fallback) centered on Phnom Penh BKK1. Deliver an authentic Google Maps UI: floating search pill, category filter chips, bottom-right control stack (circular crosshair location button, stacked square `+` / `−` zoom buttons), Google teardrop pins with discount badges, and a slide-up Google place card connecting directly to checkout. The reference folders `customer/`, `merchant/`, and `server/` remain 100% untouched.

---

## 2. Technical Context

- **Target Directory**: `d:\DGIY\foodlink-2\foodlink-ui/`
- **Dependencies**: `leaflet: ^1.9.4`, `lucide-react`
- **Primary Tile Layer**: Google Maps Roadmap raster tiles (`https://mt{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}`, subdomains `['0','1','2','3']`)
- **Fallback Tile Layer**: OpenStreetMap Standard (`https://tile.openstreetmap.org/{z}/{x}/{y}.png`)
- **Initial Center**: `[11.5514, 104.9255]` (St. 310, BKK1, Phnom Penh), Zoom: `15`
- **Simulated Customer Location**: `[11.5540, 104.9240]` (BKK1, Phnom Penh)
- **Component File**: `foodlink-ui/src/components/customer/CustomerMapView.jsx`
- **Place Card Component**: `foodlink-ui/src/components/customer/MapBottomDrawer.jsx`
- **Styles**: `foodlink-ui/src/index.css` & direct CSS import in `main.jsx`

---

## 3. Constitution Check

*GATE: Evaluation against Foodlink Constitution principles.*

| Principle | Evaluation | Status |
|---|---|---|
| **I. UI-First & Decoupled** | Renders client-side geographic mock data and Google roadmap raster tiles with zero external GIS backend requirements. | **PASS** |
| **II. Two-Sided Separation** | Geographic exploration lives strictly within the customer domain (`/customer`). | **PASS** |
| **III. Design System** | Combines Google Maps layout with Foodlink design tokens (`#2E7D32` primary, `#FF8A3D` urgency orange, `16px` rounded corners). | **PASS** |
| **IV. Contract Mock Data** | Uses structured domain entities in `phnomPenhStores.js` matching `data-model.md` and `contracts/google-map-contracts.json`. | **PASS** |
| **V. Simplicity (YAGNI)** | Pure Leaflet raster tiles with Google roadmap URL; zero complex Mapbox/Google Cloud API key overhead or billing configuration. | **PASS** |
| **Isolation Constraint** | `customer/`, `merchant/`, and `server/` remain 100% untouched. | **PASS** |

---

## 4. Architecture & File Structure

```text
foodlink-ui/
├── src/
│   ├── main.jsx                               # Ensure leaflet.css is imported globally
│   ├── index.css                              # Teardrop pin styling, radar pulse, Google UI styles
│   ├── data/
│   │   └── phnomPenhStores.js                 # Verified store coordinates and deals
│   └── components/
│       └── customer/
│           ├── CustomerMapView.jsx            # Google Maps engine, controls & ResizeObserver
│           └── MapBottomDrawer.jsx            # Google Maps style slide-up place card
```

---

## 5. Implementation Phases

1. **Setup & Lifecycle Hardening**:
   - Ensure Leaflet CSS is imported in both `main.jsx` and `index.css`.
   - Wrap map container with `ResizeObserver` calling `map.invalidateSize()` after mount.
   - Enforce explicit height and flex containment preventing 0×0 collapse.

2. **Google Maps Cartography & Resilient Fallback**:
   - Configure Google Maps Roadmap tile layer with subdomains `mt0` - `mt3`.
   - Add error listener for seamless OpenStreetMap fallback.
   - Center on BKK1 St. 310 (`11.5514, 104.9255`) with zoom 15.

3. **Google Maps UI Control Stack**:
   - Build floating white search bar pill at top with search icon and clear button.
   - Horizontal category filter chips (`All Deals`, `Bakery`, `Meals`, `Groceries`).
   - Bottom-right control stack: circular crosshair location recenter button and square stacked `+` / `−` zoom buttons.

4. **Teardrop Pins & Place Card**:
   - Custom teardrop markers with category glyph and discount chips (`59% OFF`).
   - Pulsing blue dot for customer location.
   - Smooth slide-up Google place card with store photo, rating, distance, price, and "Rescue Deal" button.

5. **Build & Boundary Verification**:
   - Execute `npm.cmd run build` to confirm 0 compilation errors.
   - Verify `customer/`, `merchant/`, and `server/` remain 100% untouched.

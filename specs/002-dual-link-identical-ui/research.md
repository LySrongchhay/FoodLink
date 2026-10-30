# Phase 0 Research: Full-Fidelity Dual-Link Portals with QR Hosting

**Feature**: `002-dual-link-identical-ui`  
**Date**: 2026-10-30  

---

## 1. Routing Architecture for Dual QR Code Hosting

### Problem:
Different hosting environments handle direct deep-links differently:
- Modern SPAs with rewrite rules (e.g. Vercel, Netlify) can serve `index.html` for any path like `/customer` and `/merchant`.
- Basic static file hosts (e.g. GitHub Pages without 404 hacks, basic S3/Nginx without rewrites) return 404 for unknown sub-paths.

### Decision: Hybrid Multi-Mode Router
We implement a resilient hybrid router in `foodlink-ui/src/router/usePortalRouter.js`:
1. **Primary**: HTML5 pathname (`/customer`, `/merchant`, `/`)
2. **Query Fallback**: `/?role=customer`, `/?role=merchant`
3. **Hash Fallback**: `/#/customer`, `/#/merchant`
4. **Root Welcome (`/`)**: Split Landing Launcher featuring side-by-side cards with live scannable QR codes for both Customer and Merchant links.

This guarantees that physical printed QR codes (whether pointing to `/customer` or `/?role=customer`) will **never fail or 404** regardless of host configuration.

---

## 2. Component & Layout Parity Strategy

### Customer Application (`/customer`)
- Full port of all modules from `customer/src/`:
  - `CustomerHeader.jsx` with Phnom Penh location pill, search bar, and notification bell.
  - `HeroPromoBanner.jsx` with 60% OFF banner and background illustration.
  - `EndingSoonSection.jsx` with flash discount countdown timer.
  - `PopularRescueHubs.jsx` with CAD Bakery, Green Garden, and local partners.
  - `CategoryFilters.jsx` (All, Bakery, Meals, Groceries, Cafe).
  - `DealsNearYou.jsx` with original vs. discount pricing and savings badges.
  - `CustomerListingDetail.jsx` modal with portion selection and allergen info.
  - `CustomerCheckoutFlow.jsx` with simulated Bakong KHQR scan and instant payment confirmation.
  - `CustomerActivePickup.jsx` with large 4-digit PIN voucher and pickup QR code.
  - `CustomerMapView.jsx` interactive simulated map with rescue pins.
  - `CustomerProfile.jsx` with user impact stats (meals rescued, CO2 prevented, points).
  - `BottomNavBar.jsx` with Store (Discover), Compass (Explore/Map), ShoppingBag (Pickups/Cart), and User (Profile).

### Merchant Portal (`/merchant`)
- Full port of all modules from `merchant/src/`:
  - Top header with CAD Bakery branding, store open/closed status toggle, order notification audio chime menu, and Store Profile shortcut.
  - Tab navigation: `Dashboard`, `Listings`, `Orders`, `Insights` (Analytics), `Store Profile`.
  - `MerchantDashboard.jsx` with revenue, meals rescued, pending orders, and fast action triggers.
  - `CreateListingPage.jsx` with CAD Bakery photo uploader, pricing & discount calculation, available portions, pickup window, and allergen tags.
  - `VerifyPickupPage.jsx` with 4-digit numeric keypad, pickup code verification, and audio chime feedback.
  - `MerchantOrders.jsx` with tabs (Pending Pickups, Completed, Cancelled).
  - `MerchantAnalytics.jsx` with environmental metrics and sales breakdown.
  - `MerchantProfile.jsx` with CAD Bakery brand story, opening hours, and sustainability ratings.

---

## 3. Data Storage & Cross-Tab Synchronization

- Both portals interact with a unified `StoreContext`.
- State is serialized to `localStorage` under `foodlink_demo_store_v2`.
- `window.addEventListener('storage', ...)` ensures that opening `/customer` in one tab and `/merchant` in another tab keeps inventory and orders in **real-time synchronization**.
- A "Reset Demo Data" button is provided in both portals to restore initial CAD Bakery mock data at any time.

---

## 4. Assets & Zero-Modifications Guarantee

- Public assets (`cad-bakery-logo.png`, `hero-illustration.jpg`, `favicon.svg`) will be copied into `foodlink-ui/public/`.
- `customer/` and `merchant/` directories will not be edited or modified in any way.

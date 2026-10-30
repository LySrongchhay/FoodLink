# Implementation Plan: Full-Fidelity Portals with Dual-Link QR Hosting

**Branch**: `002-dual-link-identical-ui` | **Date**: 2026-10-30 | **Spec**: [specs/002-dual-link-identical-ui/spec.md](file:///d:/DGIY/foodlink-2/specs/002-dual-link-identical-ui/spec.md)

**Input**: "make the ui identical as @[merchant] and @[customer] to this first also our website should sperate the ui into 2 differente link for upcoming hostinf for 2 different qr"

---

## 1. Summary

Replicate the complete, full-fidelity UI layouts, assets, styles, and interactive flows of the original `customer/` and `merchant/` applications inside `foodlink-ui/`, and introduce independent URL routes (`/customer` and `/merchant`) engineered for dedicated QR code hosting, a Split Landing Launcher at root (`/`), and cross-tab `localStorage` state synchronization. The original `customer/` and `merchant/` folders remain 100% untouched.

---

## 2. Technical Context

- **Directory**: `d:\DGIY\foodlink-2\foodlink-ui/`
- **Frontend Stack**: React 19 (`react: ^19.2.8`, `react-dom: ^19.2.8`), Vite 8, Tailwind CSS v4, Lucide React
- **Routing**: Hybrid Router (`usePortalRouter.js`) supporting HTML5 History (`/customer`, `/merchant`), query parameters (`?role=customer`), and hash fragments (`#/customer`).
- **State Management**: Unified `StoreContext.jsx` with `localStorage` persistence and cross-tab `storage` event synchronization.
- **Port**: `5175`
- **Assets**: Public assets synced to `foodlink-ui/public/` (`cad-bakery-logo.png`, `hero-illustration.jpg`, `favicon.svg`).

---

## 3. Constitution Check

*GATE: Evaluation against Foodlink Constitution principles.*

| Principle | Evaluation | Status |
|---|---|---|
| **I. UI-First & Decoupled** | Both portals run in full-fidelity on interactive mock data without requiring a live backend. | **PASS** |
| **II. Two-Sided Separation** | Complete separation between Customer mobile experience and Merchant desktop operations hub under dedicated URLs. | **PASS** |
| **III. Design System** | Implements exact tokens: `#2E7D32` (Primary Green), `#FF8A3D` (Urgency Orange), `#FAFAFA`, `#FFF8F0`. | **PASS** |
| **IV. Contract Mock Data** | Implements typed schemas matching `portal-contracts.json`. | **PASS** |
| **V. Simplicity (YAGNI)** | Zero external routing dependencies (pure native lightweight router). | **PASS** |
| **Isolation Constraint** | `customer/`, `merchant/`, and `server/` remain 100% untouched. | **PASS** |

---

## 4. Project Structure & Architecture

```text
foodlink-ui/
├── public/
│   ├── cad-bakery-logo.png
│   ├── hero-illustration.jpg
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── SplitLauncher.jsx          # Root welcome with live QR code previews
│   │   │   ├── PortalSwitcherFloating.jsx # Discreet reviewer toggle for quick testing
│   │   │   ├── Badge.jsx
│   │   │   └── Modal.jsx
│   │   ├── customer/                      # 100% Identical to customer/src/
│   │   │   ├── CustomerHeader.jsx
│   │   │   ├── HeroPromoBanner.jsx
│   │   │   ├── EndingSoonSection.jsx
│   │   │   ├── PopularRescueHubs.jsx
│   │   │   ├── CategoryFilters.jsx
│   │   │   ├── DealsNearYou.jsx
│   │   │   ├── CustomerListingDetail.jsx
│   │   │   ├── CustomerCheckoutFlow.jsx
│   │   │   ├── CustomerActivePickup.jsx
│   │   │   ├── CustomerMapView.jsx
│   │   │   ├── CustomerProfile.jsx
│   │   │   ├── CustomerNotificationsModal.jsx
│   │   │   ├── BottomNavBar.jsx
│   │   │   └── CustomerApp.jsx            # Customer root shell
│   │   └── merchant/                      # 100% Identical to merchant/src/
│   │       ├── MerchantDashboard.jsx
│   │       ├── MerchantListings.jsx
│   │       ├── CreateListingPage.jsx
│   │       ├── MerchantOrders.jsx
│   │       ├── VerifyPickupPage.jsx
│   │       ├── MerchantAnalytics.jsx
│   │       ├── MerchantProfile.jsx
│   │       ├── OrderNotificationMenu.jsx
│   │       └── MerchantApp.jsx            # Merchant root shell
│   ├── context/
│   │   └── StoreContext.jsx               # Unified store with localStorage sync
│   ├── router/
│   │   └── usePortalRouter.js             # Hybrid path/query router
│   ├── data/
│   │   └── mockData.js                    # Full Cad Bakery datasets & orders
│   ├── App.jsx                            # Router switcher
│   ├── main.jsx
│   └── index.css
```

---

## 5. Implementation Sequence

1. **Asset & Router Foundation**:
   - Copy public assets (`cad-bakery-logo.png`, `hero-illustration.jpg`) to `foodlink-ui/public/`.
   - Implement `usePortalRouter.js` supporting `/customer`, `/merchant`, and root `/` with query/hash fallback.
   - Implement `SplitLauncher.jsx` for the root route with live scannable QR previews for both links.

2. **Full-Fidelity Customer Experience**:
   - Port the complete customer layout with `BottomNavBar` (Discover, Explore/Map, Pickups, Profile).
   - Implement `HeroPromoBanner`, `EndingSoonSection` (with live flash discount countdown), `PopularRescueHubs`, `CategoryFilters`, and `DealsNearYou`.
   - Implement interactive detail modal, multi-item cart, simulated Bakong KHQR checkout, and `CustomerActivePickup` voucher with 4-digit PIN.

3. **Full-Fidelity Merchant Operations Portal**:
   - Port Cad Bakery top bar with store open/closed toggle, audio chime menu, and Store Profile link.
   - Implement `MerchantDashboard` with KPI metrics and quick actions.
   - Implement `CreateListingPage` with image upload, discount calculations, and allergen tags.
   - Implement `VerifyPickupPage` with 4-digit PIN verification and fulfillment feedback.
   - Implement `MerchantOrders`, `MerchantAnalytics`, and `MerchantProfile`.

4. **Multi-Tab LocalStorage Reactive Sync**:
   - Upgrade `StoreContext.jsx` with `localStorage` serialization and cross-tab `storage` event listener.
   - Provide "Reset Demo Data" action.

5. **Build & Boundary Verification**:
   - Verify `npm.cmd run build` passes with 0 errors.
   - Confirm `customer/` and `merchant/` remain untouched.

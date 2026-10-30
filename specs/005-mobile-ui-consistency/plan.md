# Implementation Plan: Mobile-First UX & UI Consistency Refinement

**Branch**: `005-mobile-ui-consistency` | **Date**: 2026-10-30 | **Spec**: [specs/005-mobile-ui-consistency/spec.md](file:///d:/DGIY/foodlink-2/specs/005-mobile-ui-consistency/spec.md)

**Input**: User description: "Our the UI I mainly focus for mobile, make ux and ui better make sure icon does not make the layout break down, we can remove some unercessary icon, and make the UI consistency"

---

## 1. Summary

Refine and stabilize the user interface across both the **Customer App** and **Merchant Dashboard** to be mobile-first. Eliminate visual clutter by removing redundant decorative emojis and icons, enforcing `shrink-0` on all functional icons to prevent layout breaks, standardizing Foodlink design tokens (`#2E7D32` primary, `#FF8A3D` discount orange, `16px` rounded cards, `12px` buttons, `44px` minimum touch targets), and restructuring the Discover feed into full-width, single-column food rescue cards with uniform heights and single-line price rows. The reference folders `customer/`, `merchant/`, and `server/` remain 100% untouched.

---

## 2. Technical Context

- **Target Directory**: `d:\DGIY\foodlink-2\foodlink-ui/`
- **Customer Components**:
  - `CustomerApp.jsx` (Shell, sticky header, bottom navigation bar)
  - `CustomerHeader.jsx` (Compact mobile header with logo, location pill, notification/cart)
  - `CustomerExploreFeed.jsx` (Single-column food cards, clean text category pills, zero price wrapping)
  - `CustomerListingDetail.jsx` (Mobile-optimized listing sheet with thumb checkout button)
  - `CustomerMapView.jsx` / `MapBottomDrawer.jsx` (Google Maps mobile controls and place card)
- **Merchant Components**:
  - `MerchantApp.jsx` (Mobile layout containment)
  - `pages/Dashboard/MerchantDashboard.jsx` (Responsive mobile metric cards, quick actions)
  - `pages/Orders/MerchantOrders.jsx` (Mobile order rows with 44px verify buttons)
  - `pages/Listings/MerchantListings.jsx` (Mobile listing inventory cards)
- **Styles**: `foodlink-ui/src/index.css` (Design tokens, safe area padding, touch target utility)

---

## 3. Constitution Check

*GATE: Evaluation against Foodlink Constitution principles.*

| Principle | Evaluation | Status |
|---|---|---|
| **I. UI-First & Decoupled** | Pure client-side React UI enhancement using CSS utility classes and component refactoring without backend coupling. | **PASS** |
| **II. Two-Sided Separation** | Refines Customer and Merchant portals while preserving clean domain separation between both sides. | **PASS** |
| **III. Design System** | Rigorously unifies Foodlink tokens: `#2E7D32` primary green, `#FF8A3D` urgency orange, `16px` card radius, `44px` touch targets. | **PASS** |
| **IV. Contract Mock Data** | Preserves all mock data shapes while cleaning presentation layers and eliminating icon overflow. | **PASS** |
| **V. Simplicity (YAGNI)** | Removes redundant icons, simplifies DOM nesting, and prevents over-engineered layouts. | **PASS** |
| **Isolation Constraint** | `customer/`, `merchant/`, and `server/` remain 100% untouched. | **PASS** |

---

## 4. Architecture & File Structure

```text
foodlink-ui/
├── src/
│   ├── index.css                                # Design tokens, 44px touch targets, mobile utilities
│   ├── components/
│   │   ├── customer/
│   │   │   ├── CustomerApp.jsx                  # Sticky compact header, fixed 44px bottom nav
│   │   │   ├── CustomerHeader.jsx               # Compact single-row mobile header
│   │   │   ├── CustomerExploreFeed.jsx          # Single-column cards, text category pills
│   │   │   └── CustomerListingDetail.jsx        # Mobile thumb sheet
│   │   └── merchant/
│   │       └── MerchantApp.jsx                  # Mobile responsive shell
│   └── pages/
│       ├── Dashboard/MerchantDashboard.jsx      # Mobile metric cards, quick actions
│       ├── Orders/MerchantOrders.jsx            # Mobile order rows with 44px buttons
│       └── Listings/MerchantListings.jsx        # Mobile inventory list
```

---

## 5. Implementation Phases

1. **Phase 1: Setup & CSS Utility Hardening**:
   - Add `.touch-target-44` utility class and mobile layout constraints in `foodlink-ui/src/index.css`.
   - Audit and confirm responsive viewport meta tag in `index.html`.

2. **Phase 2: Customer Shell & Navigation Hardening**:
   - Refactor `CustomerApp.jsx` and `CustomerHeader.jsx` to render a sticky compact header without icon clutter.
   - Refactor fixed bottom navigation bar with 20px icons, clean 10px labels, 44px touch targets, and active green styling.

3. **Phase 3: Customer Discover Feed & Single-Column Cards**:
   - Refactor `CustomerExploreFeed.jsx` into clean, single-column full-width food rescue cards.
   - Prune redundant emojis from category pills; enforce `shrink-0` on all retained icons.
   - Guarantee single-line price and savings rows with `whitespace-nowrap`.

4. **Phase 4: Merchant Portal Mobile Ergonomics**:
   - Refactor `MerchantDashboard.jsx` metric cards into clean 2-column or 1-column mobile grids.
   - Streamline `MerchantOrders.jsx` pickup verification rows for one-thumb mobile operation.
   - Ensure all merchant action buttons meet 44px touch standards.

5. **Phase 5: Polish & Build Verification**:
   - Test across 360px, 375px, 393px, and 414px mobile viewport widths.
   - Run production build (`npm.cmd run build`) with 0 errors and 0 warnings.
   - Confirm legacy directories `customer/`, `merchant/`, and `server/` remain 100% untouched.

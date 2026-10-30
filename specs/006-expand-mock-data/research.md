# Research & Design Decisions: Expanded Mock Data for Foodlink Marketplace

**Feature Branch**: `006-expand-mock-data`  
**Date**: 2026-10-30  
**Status**: Completed  

---

## 1. Technical Context & Clarification Analysis

### Analysis of Existing Data Stores & Consumers
In `foodlink-ui`, data is consumed across four distinct contexts:
1. **Customer Discover Feed (`CustomerExploreFeed.jsx`)**:
   - Calls `getActiveListings(category, search)` from `src/services/api.js`.
   - When offline/local, falls back to `[...getCustomMerchantListings(), ...DEFAULT_MERCHANT_LISTINGS]`.
   - Normalizes items into the card shape with fields: `id`, `store`, `storeLogo`, `title`, `description`, `image`, `rating`, `distance`, `pickupTime`, `address`, `price`, `originalPrice`, `remaining`, `bagsAvailable`, `category`, `dietaryTags`.
2. **Google Maps Explore View (`CustomerMapView.jsx`)**:
   - Imports `PHNOM_PENH_STORES` from `src/data/phnomPenhStores.js`.
   - Renders interactive Google roadmap pins with categories (`Bakery`, `Meals`, `Groceries`, `Asian`, `Healthy`, `Italian`), discount chips, and place cards (`MapBottomDrawer.jsx`).
3. **Merchant Kitchen & Orders (`StoreContext.jsx`, `MerchantOrdersView.jsx`, `MerchantDashboardView.jsx`)**:
   - Consumes `orders`, `listings`, `merchants`, and `notifications` from `src/context/StoreContext.jsx`, which initializes from `src/data/mockData.js` (`initialOrders`, `initialListings`, `initialMerchants`, `initialNotifications`).
   - Also interacts with `getMerchantOrders()` and `verifyOrderPickup(code)` in `src/services/api.js`.
4. **Customer Active Pickup Pass (`CustomerActivePickup.jsx`, `CustomerApp.jsx`, `userSession.js`)**:
   - Consumes active order from `getCustomerActiveOrder(userId)` in `src/utils/userSession.js`.

---

## 2. Key Decisions & Rationale

### Decision 1: Harmonized Two-Tier Mock Data Architecture
- **Decision**: Update and harmonize mock data across both `src/services/api.js` (for customer discover and merchant API fallback) and `src/data/mockData.js` (for `StoreContext` state and merchant orders queue), while expanding `src/data/phnomPenhStores.js` (for Google Maps).
- **Rationale**: Foodlink uses `StoreContext` for merchant operations and `api.js` for customer feeds. Harmonizing the store IDs (`st_cad` / `m-01`), listings, and order codes ensures consistent cross-app testing, whether navigating `/customer` or `/merchant`.
- **Alternatives Considered**:
  - *Keep mockData.js small and only edit api.js*: Rejected because the Merchant Portal's orders tab and dashboard read directly from `StoreContext`, which initializes from `mockData.js`. If `mockData.js` is not updated, merchant orders would remain sparse.

### Decision 2: Store Mix & District Distribution Strategy
- **Decision**: Establish flagship **CAD Bakery & Cafe** (St. 310, BKK1) with multiple surplus offers, flanked by recognized Phnom Penh culinary staples and authentic Khmer eateries across 5 geographic districts:
  1. **BKK1 / BKK2**: CAD Bakery (Pastry & Sourdough), Green Garden Organics (Groceries), Eric Kayser Bakery (Pastry), Malis Kitchen (Khmer/Asian), Aroma Coffee (Drinks/Pastry).
  2. **Daun Penh / Riverside / Royal Palace**: Mama Heng Khmer Rice (Asian), Sovan Dim Sum & Buns (Asian), Riverside French Bistro (Meals).
  3. **Tuol Kouk (TK)**: One More Restaurant (Asian), Chea Noodle & Bao (Asian), Brown Coffee Roastery (Drinks/Pastry).
  4. **Tuol Tompoung (Russian Market / TTP)**: Phsar Toul Tompoung Bakery (Pastry/Dessert), Sundown Cafe & Bakery (Pastry/Drinks).
  5. **Tonle Bassac & Diamond Island (Koh Pich)**: Tokyo Bento Express (Asian), Napoli Pizza Co. (Italian).
- **Rationale**: Reflects realistic Phnom Penh daily life. Meets FR-001, FR-003, and SC-003.

### Decision 3: Seed Pre-Reserved Active Order (`849201`)
- **Decision**: In `src/utils/userSession.js`, if no active order is found in `localStorage` for the current customer session, initialize a default active pickup pass for CAD Bakery & Cafe:
  - Order Number: `#FS-849201`
  - Pickup Code: `849201` (digits `['8','4','9','2','0','1']`)
  - Items: 1x Artisan Sourdough & Croissant Surprise Box ($4.99, orig. $16.00)
  - Merchant: CAD Bakery & Cafe, St. 310, BKK1
  - Pickup Window: 18:30 - 20:30 (Today)
  - Status: `PENDING`
  - Total Price: `$4.99`
  - Corresponding merchant order `#FS-849201` seeded in `initialOrders` and `DEFAULT_MERCHANT_ORDERS`.
- **Rationale**: Enables immediate verification testing in the Merchant Portal (`Verify Pickup` modal) without requiring the tester to first place an order. Once verified by the merchant, it transitions to `COMPLETED`.

### Decision 4: Price & Discount Mathematical Consistency
- **Decision**: Standardize all listings to enforce:
  `originalPrice > price`
  `discountPercentage = Math.round(((originalPrice - price) / originalPrice) * 100)`
  `savings = (originalPrice - price).toFixed(2)`
  Categories mapped cleanly to: `Pastry`, `Asian`, `Italian`, `Healthy`, `Food`, `Dessert`, `Drinks`.
- **Rationale**: Prevents visual glitching, NaN discounts, or rounding discrepancies between badge labels and item detail cards.

### Decision 5: Curated High-Resolution Photography
- **Decision**: Use curated, fast-loading Unsplash CDN images formatted with `&auto=format&fit=crop&q=80` specific to each food type (warm sourdough, golden croissants, Khmer beef Lok Lak, steamed char siu bao, crisp garden salad bowls, stone-baked pizza, iced cold brew bottles).
- **Rationale**: Delivers a mouth-watering, premium user experience aligned with Foodlink's design system principles.

### Decision 6: Dual-Tab Instant Reactive Synchronization
- **Decision**: Leverage `BroadcastChannel('foodlink_live_channel')` and `window.addEventListener('storage', ...)` so when the merchant confirms pickup for order `849201`, the customer's open pass immediately transitions to `COMPLETED` without manual reload.
- **Rationale**: Provides interactive two-sided demo capabilities when testing customer and merchant views side-by-side.

### Decision 7: Post-Fulfillment Impact Card
- **Decision**: When the active reservation becomes `COMPLETED`, render a green verified summary card showing `0.8 kg CO2 saved`, verified timestamp, and a "Rescue Another Meal" CTA redirecting to Discover.
- **Rationale**: Completes the positive reinforcement loop of food rescue and prevents blank empty screens.

---

## 3. Risk Assessment & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| `localStorage` stale cache prevents new mock data from loading | Medium | Ensure storage version keys (`foodlink_app_version`, `foodlink_demo_store_v2`) trigger graceful fallback if data is missing or empty, or bump cache version key cleanly. |
| Category filter mismatch (e.g., lowercase vs uppercase) | Medium | Normalize filter queries case-insensitively (`cat.toLowerCase() === itemCategory.toLowerCase()`). |
| Reference directories modified | Critical | Maintain strict constraint: zero edits outside `foodlink-ui/`. Verify with `git status` after all writes. |


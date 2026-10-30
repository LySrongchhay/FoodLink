# Feature Specification: Expanded Mock Data for Foodlink Marketplace

**Feature Branch**: `006-expand-mock-data`  
**Created**: 2026-10-30  
**Status**: Clarified  
**Input**: User description: "provide more mock data for our app,"

---

## Clarifications

### Session 2026-10-30
- Q: How should CAD Bakery & Cafe be featured relative to other Phnom Penh partner stores? → A: **CAD Bakery Flagship + Local Khmer & Branded Mix**: CAD Bakery features multiple distinct surplus deals (morning bakery basket, sourdough loaves, cold brew & dessert pack), complemented by a balanced mix of recognized brands (Brown Coffee, Eric Kayser) and authentic local Cambodian neighborhood eateries (Mama Heng Khmer Rice, Chea Noodle & Bao, Sovan Dim Sum, Phsar Toul Tompoung Bakery, Malis Kitchen).
- Q: Should the customer "Reserved" tab start with a pre-existing active pickup pass? → A: **Include 1 pre-reserved active order in the Reserved tab**: Starts with a live digital pickup pass for CAD Bakery (6-digit code `849201`, countdown timer, store directions) ready to immediately test pickup code verification in the Merchant portal without requiring fresh checkout.
- Q: What image quality and photography source should be used for the expanded listings? → A: **Real high-resolution curated Unsplash food photography**: Crisp artisanal croissants, Khmer beef Lok Lak, steamed dim sum, wood-fired pizza, and fresh Mondulkiri farm produce.
- Q: When a merchant confirms pickup for order `849201` in the Merchant portal, how should the customer's active pickup pass react if both tabs are open simultaneously? → A: **Instant Live Sync via BroadcastChannel & Storage Events**: When the merchant verifies pickup code `849201`, the customer's active pickup pass immediately transitions from "Ready for Pickup" to "Completed / Rescued 🎉" with green checkmark and completed timestamp across tabs without requiring a manual page refresh.
- Q: After the customer's active pickup pass (`849201`) is verified and completed by the merchant, what should the customer "Reserved" tab display? → A: **Fulfillment Summary Card + Environmental Impact**: Shows a green verified completion card with CO2/meal impact stats (e.g. `0.8 kg CO2 saved`), verified completion timestamp, and a prominent "Rescue Another Meal" button redirecting back to the Discover feed.

---

## 1. Objective & Problem Statement

### Problem
The current application runs on a sparse mock dataset (~4-5 listings, 5 map pins, 2 merchant orders). When demoing, testing, or exploring the app, the Discover feed runs out of content quickly, category filters show 0 or 1 item, the map feels underpopulated outside of BKK1, and merchant order management lacks realistic edge cases (multi-item orders, varying pickup windows, diverse customer profiles, restock states).

### Solution
Provide a comprehensive, production-grade mock dataset for Phnom Penh surplus food rescue:
1. **Customer Discover Feed (16+ Diverse Listings)**: Spanning 6 distinct categories (Pastry/Bakery, Khmer/Asian Cuisine, Italian/Pizza, Healthy/Salads, Fresh Groceries, Specialty Coffee/Desserts) with authentic high-resolution food photography, realistic discount pricing ($1.50–$4.50 saving $3.50–$12.00), closing-hour pickup windows, and dietary tags.
2. **Geographic Store Network (14+ Verified Phnom Penh Map Pins)**: Covering major Phnom Penh food hubs:
   - **BKK1 / BKK2** (CAD Bakery Flagship, Green Garden Organics, Aroma Cafe, Eric Kayser Bakery, Malis Kitchen)
   - **Daun Penh / Riverside / Royal Palace** (Riverside French Bistro, Mama Heng Khmer Rice, Sovan Dim Sum)
   - **Tuol Kouk** (One More Restaurant, Chea Noodle & Bao, Brown Coffee Roastery)
   - **Russian Market (TTP / Tuol Tompoung)** (Sundown Cafe & Bakery, Phsar Toul Tompoung Bakery)
   - **Koh Pich / Diamond Island & Tonle Bassac** (Tokyo Bento Express, Napoli Pizza Co.)
3. **Merchant Kitchen Queue & Orders (8+ Orders)**: Pending pickups, multi-bag orders, completed pickups with timestamps, simulated customer avatars, and 6-digit verification codes.
4. **Merchant Listings & Inventory States**: Active surplus bags, almost sold out (1 bag left), scheduled evening restocks, and completed drops.
5. **Customer Pickup Pass & Notification Feed**: Active pre-reserved order with countdown timer, 6-digit verification code (`849201`), simulated Bakong KHQR receipt, and realistic drop notifications.

---

## 2. User Scenarios & Testing *(mandatory)*

### User Story 1 - Rich Customer Discover Experience Across Categories (Priority: P1) 🎯 MVP

As a customer opening the Foodlink app, I want to explore a diverse selection of surplus food rescue opportunities across multiple cuisine categories (Bakery, Asian, Italian, Healthy, Groceries) so that I always find exciting deals regardless of my diet or location.

- **Why this priority**: Core marketplace value—rich variety drives engagement and food rescue conversion.
- **Independent Test**: Open `/customer` -> click each category filter pill (`All`, `Pastry`, `Asian`, `Italian`, `Healthy`, `Food`, `Dessert`) -> verify each category returns 2 to 5 distinct surplus bags with realistic prices and photos.
- **Acceptance Scenarios**:
  1. **Given** the customer views the Discover feed, **When** scrolling, **Then** at least 16 unique surplus food cards are visible across bakeries, cafes, local eateries, and restaurants.
  2. **Given** category filter pills are tapped, **When** filtering by "Pastry", "Asian", or "Healthy", **Then** matching listings appear instantly with accurate photos, discount percentages (50% to 70% OFF), and pickup hours.
  3. **Given** searching for a cuisine, local shop, or district (e.g., "Tuol Kouk", "Mama Heng", "Croissant", "Bao", "Salad"), **When** typing in search bar, **Then** matching mock items are displayed immediately.

---

### User Story 2 - Populated Phnom Penh Map with Verified Hubs (Priority: P1)

As a customer exploring the map in Phnom Penh, I want to see store pins distributed across BKK1, Daun Penh, Tuol Kouk, and Russian Market, so that I can discover food rescue deals close to where I live or work.

- **Why this priority**: Geographic density makes the interactive Google Maps experience feel alive and believable.
- **Independent Test**: Open Explore (Compass) tab -> zoom and pan across Phnom Penh -> verify teardrop pins appear across BKK1, Daun Penh, Tuol Kouk, and Russian Market with authentic Phnom Penh street addresses.
- **Acceptance Scenarios**:
  1. **Given** the customer opens the Map tab, **When** viewing central Phnom Penh, **Then** 14+ teardrop pins are plotted with distinct category icons and discount chips (`50% OFF` to `70% OFF`).
  2. **Given** pins in different districts, **When** tapping a pin in Tuol Kouk or Riverside, **Then** the Google place card displays accurate distance (e.g. `1.8 km away`), district address, and "Rescue Deal" button.
  3. **Given** category filtering on the map, **When** switching to "Bakery" or "Meals", **Then** only matching partner stores remain visible on the map.

---

### User Story 3 - Realistic Merchant Orders & Kitchen Fulfillment (Priority: P1)

As a merchant managing evening pickups, I want to see a populated kitchen queue with pending pickups, multi-item customer orders, and completed pickups, so that I can test pickup code verification and fulfillment workflows.

- **Why this priority**: Demonstrates the operational capabilities of the Merchant Portal.
- **Independent Test**: Open `/merchant` -> navigate to Orders tab -> verify at least 5 pending pickup orders and 5 earlier completed orders with customer avatars, item counts, pickup codes, and "Confirm Pickup" buttons.
- **Acceptance Scenarios**:
  1. **Given** the merchant views the Orders tab, **When** inspecting pending orders, **Then** single-item and multi-item orders are listed with customer names, pickup time windows, and 6-digit codes.
  2. **Given** an order is confirmed, **When** clicking "Confirm Pickup", **Then** the order moves to completed with verified timestamp.
  3. **Given** the dashboard highlights, **When** viewing the metrics, **Then** numbers reflect realistic daily volume (`18 Bags Listed`, `14 Bags Sold`, `$124.50 Revenue`).

---

### User Story 4 - Customer Order History & Notification Feed (Priority: P2)

As a customer, I want to see my active pickup pass with 6-digit verification code and view real-time surplus drop notifications, so that I experience the complete order lifecycle.

- **Why this priority**: Completes the loop for demonstration and testing of customer pickup verification.
- **Independent Test**: Navigate to the "Reserved" tab -> verify an active pickup pass with 6-digit code `849201`, countdown timer, and pickup instructions. Tap notification bell -> see historical and live drop alerts.
- **Acceptance Scenarios**:
  1. **Given** the customer visits the Reserved tab, **When** viewing current order, **Then** a digital pickup pass shows order details, CAD Bakery location, pickup window, and 6-digit confirmation code `849201`.
  2. **Given** the active pickup pass is verified as COMPLETED by merchant, **When** viewing the Reserved tab, **Then** a green verified completion card displays environmental impact stats (`0.8 kg CO2 saved`), verified timestamp, and a "Rescue Another Meal" button returning to Discover.
  3. **Given** the notification modal is opened, **When** viewing notifications, **Then** at least 4 notifications are present (New Drop, Restock Alert, Pickup Verified).

---

## 3. Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST expand `DEFAULT_LISTINGS` in `foodlink-ui/src/services/api.js` to at least 16 realistic food rescue items spanning categories `Pastry`, `Asian`, `Italian`, `Healthy`, `Food`, `Dessert`, and `Drinks`, featuring CAD Bakery flagship deals and local Khmer/international eateries.
- **FR-002**: Every mock listing MUST include realistic Phnom Penh partner store names, high-quality Unsplash food imagery, original price ($4.00–$16.00), rescue price ($1.80–$5.50), discount percentage (50%–70%), available bags (1–6), pickup time window, and Phnom Penh street addresses.
- **FR-003**: System MUST expand `PHNOM_PENH_STORES` in `foodlink-ui/src/data/phnomPenhStores.js` to at least 14 geographically accurate store pins across BKK1, Daun Penh, Tuol Kouk, Tonle Bassac, and Tuol Tompoung (Russian Market).
- **FR-004**: System MUST expand `DEFAULT_MERCHANT_ORDERS` in `foodlink-ui/src/services/api.js` to at least 8 orders with varying statuses (`PENDING`, `COMPLETED`), multi-item bags, customer initials, pickup codes (including `849201`), and timestamps.
- **FR-005**: System MUST initialize customer active pickup state in `foodlink-ui/src/utils/userSession.js` so the "Reserved" tab demonstrates a ready-to-redeem digital pickup pass with code `849201`, and MUST reactively synchronize status transitions across browser tabs via `BroadcastChannel` and storage events when verified by the merchant.
- **FR-006**: System MUST expand mock notifications to include restock notifications, closing-hour urgency reminders, and order completion receipts.
- **FR-007**: System MUST ensure all mock coordinates resolve to actual geographic districts in Phnom Penh, Cambodia.
- **FR-008**: System MUST ensure mock price calculations are mathematically consistent (`savings = originalPrice - discountedPrice`, `discountPercentage = round((savings / originalPrice) * 100)`).
- **FR-009**: System MUST support client-side search across store names, dish titles, and district names.
- **FR-010**: System MUST maintain strict isolation: reference folders `customer/`, `merchant/`, and `server/` remain 100% untouched.
- **FR-011**: System MUST display a fulfillment summary card in the customer "Reserved" tab upon order completion showing verified timestamp, environmental impact metrics (`0.8 kg CO2 saved`), and a "Rescue Another Meal" action returning to Discover.

---

## 4. Key Mock Entities

- **Customer Listing Item**: ID, storeName, title, description, category, price, originalPrice, discount, remaining, pickupWindow, address, street, image, storeLogo, rating, distance.
- **Store Map Pin**: ID, storeName, category, position (`lat`, `lng`), address, street, rating, ratingCount, distanceKm, formattedDistance, pickupWindow, originalPrice, discountedPrice, discountPercentage, bagsAvailable, title, description, imageUrl, badgeText, isPartner.
- **Merchant Order**: ID, customer, orderNumber, code, items (array with title, qty, price, photoUrl), qty, co2, price, status, time, verifiedAt.
- **Customer Notification**: ID, type, title, message, time, isRead, listingId.

---

## 5. Success Criteria *(mandatory)*

- **SC-001**: Customer Discover feed displays >= 16 listings with zero broken images or NaN prices.
- **SC-002**: Every category filter pill (`Pastry`, `Asian`, `Italian`, `Healthy`, `Food`, `Dessert`) returns >= 2 matching items.
- **SC-003**: Google Maps Explore view displays >= 14 pins distributed across BKK1, Daun Penh, Tuol Kouk, and Russian Market.
- **SC-004**: Merchant Orders tab displays >= 5 pending orders and >= 3 completed orders with complete details.
- **SC-005**: Production build (`npm.cmd run build`) compiles with 0 errors and 0 warnings.

---

## 6. Assumptions

- Mock data is deterministic and runs client-side in memory and `localStorage` without requiring active database servers.
- All code changes reside exclusively inside `foodlink-ui/`.

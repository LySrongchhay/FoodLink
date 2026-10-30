# Quickstart & Verification Guide: Expanded Mock Data

**Feature Branch**: `006-expand-mock-data`  
**Date**: 2026-10-30  
**Status**: Ready for Validation  

---

## 1. Prerequisites & Setup

Ensure dependencies are installed and navigate to the project directory:

```bash
cd d:\DGIY\foodlink-2\foodlink-ui
npm.cmd run build
```

---

## 2. Validation Scenarios

### Scenario 1: Customer Discover Feed (>= 16 Listings & Category Filtering)
1. Launch or build the UI (`npm.cmd run dev` or preview).
2. Open `/customer` (or click "Launch Customer App" from `/`).
3. **Verify Listings Count**: Scroll down the feed; observe >= 16 distinct surplus food cards representing CAD Bakery, Mama Heng, Sovan Dim Sum, Eric Kayser, Chea Noodle, Brown Coffee, etc.
4. **Verify Category Filters**:
   - Tap `Pastry` → filters to CAD Bakery croissant/sourdough, Eric Kayser, Toul Tompoung Bakery (>= 3 items).
   - Tap `Asian` → filters to Mama Heng Khmer Rice, Chea Noodle & Bao, Sovan Dim Sum, Tokyo Bento (>= 3 items).
   - Tap `Healthy` → filters to Green Garden Organics, Backyard Cafe bowls (>= 2 items).
   - Tap `Italian` → filters to Napoli Pizza Co., Focaccia deals (>= 2 items).
   - Tap `Dessert` / `Drinks` → returns matching items.
5. **Verify Search**:
   - Type `Tuol Kouk` → matches Chea Noodle & One More.
   - Type `Lok Lak` or `Dim Sum` → matches corresponding Khmer/Asian food deals.

### Scenario 2: Google Maps Explore View (>= 14 Pins across Phnom Penh)
1. In Customer App, tap the **Explore** (Compass) bottom navigation tab.
2. Observe the interactive Google Maps roadmap view.
3. **Verify Pin Distribution**:
   - Teardrop pins are visible across BKK1, Daun Penh (Riverside), Tuol Kouk, Tonle Bassac, and Russian Market (TTP).
   - Pin count is >= 14.
4. **Verify Interactive Place Drawer**:
   - Tap a pin in Tuol Kouk (e.g. Chea Noodle) → slide-up drawer shows distance (`1.8 km away`), district address, pricing, and "Rescue Deal" button.
5. **Verify Filter Pills**:
   - Tap `Bakery` → only bakery pins remain visible.

### Scenario 3: Merchant Orders & Pickup Code Verification
1. Open `/merchant` (or click "Launch Merchant Hub" from `/`).
2. Navigate to the **Orders** tab (Customer Pickup Orders).
3. **Verify Orders Queue**:
   - Observe at least 5 pending/awaiting pickup orders and 3 completed orders.
   - Look for order `#FS-849201` for CAD Bakery with pickup code `849201`.
4. **Verify Pickup Code Verification Flow**:
   - Click "Verify Pickup" button or open the verification modal.
   - Enter `849201` and submit.
   - Order transitions to `COMPLETED` with verified timestamp.

### Scenario 4: Customer Pre-Reserved Active Pickup Pass & Completion Loop
1. In `/customer`, tap the **Reserved** bottom navigation tab.
2. **Verify Active Pickup Pass**:
   - A digital pickup pass is displayed for CAD Bakery & Cafe.
   - Order Number `#FS-849201` with 6-digit verification code `849201`.
   - Pickup window, store directions, and live countdown timer are present.
3. **Verify Post-Pickup Fulfillment Card**:
   - Once verified by merchant (or marked completed), pass transitions to green completion card.
   - Shows "Order Rescued! 🎉", environmental impact (`0.8 kg CO2 saved`), verified timestamp, and "Rescue Another Meal" button returning to Discover.

### Scenario 5: Build Integrity & Reference Isolation
1. Run `npm.cmd run build` inside `foodlink-ui/`. Output must compile with 0 errors.
2. Run `git status --porcelain customer merchant server` from repo root. Output must be completely empty (0 files modified).


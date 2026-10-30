# Quickstart Guide: Foodlink Unified Dual-Role UI (`foodlink-ui`)

**Feature**: `001-unified-role-ui`  
**Target Directory**: `d:\DGIY\foodlink-2\foodlink-ui`  

---

## 1. Quick Overview

`foodlink-ui/` is a self-contained, dual-role front-end application built with **React 19 + Vite + Tailwind CSS v4**. It allows seamless switching between:
- **Customer View**: Browse surplus foods, filter closing-hour discounts, view KHQR checkout modal, and collect pickup vouchers.
- **Merchant View**: Manage daily inventory, view KPI dashboard (meals saved & revenue), post new surplus batches, and verify customer pickup codes.

**Safety Guarantee**: The existing `customer/` and `merchant/` directories are completely untouched.

---

## 2. Installation & Running

From the repository root:

```bash
# 1. Navigate to the new UI directory
cd foodlink-ui

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

The application will start on **`http://localhost:5175`** (or next available port).

---

## 3. How to Test User Journeys

### Switch Roles:
Look at the persistent top navigation bar:
- Click **"Customer View"** to test food rescue discovery & ordering.
- Click **"Merchant View"** to manage store operations.

### Cross-Role Interaction Test:
1. In **Merchant View**: Go to "Listings" > "Create Listing", enter a surplus item (e.g. *"Fresh Artisan Baguettes"*, original \$5, discount \$2, quantity 6), and click **Publish Listing**.
2. Click **"Customer View"** in the top bar: Notice the new *"Fresh Artisan Baguettes"* immediately appears in the Customer Feed!
3. Click on the listing, proceed to checkout, and confirm order. Note down the 4-digit pickup code.
4. Click **"Merchant View"** > "Verify Pickup", enter the pickup code, and click **Verify**. The order status will immediately update to **Completed**!


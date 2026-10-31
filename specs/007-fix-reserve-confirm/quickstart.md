# Quickstart: Testing Reserve & Confirm with 6-Digit Code

**Feature**: `007-fix-reserve-confirm`  
**Date**: 2026-10-31  

---

## Prerequisites
- Node.js installed.
- Working directory: `foodlink-ui/`.

---

## 1. Start Development Server
```powershell
cd foodlink-ui
npm.cmd run dev
```
Open `http://localhost:5173` in two browser windows or tabs:
- **Tab 1 (Customer App)**: Select Customer role (`/customer` or default view).
- **Tab 2 (Merchant Hub)**: In top role switcher or navigate to `/merchant` -> Orders & Verify Pickup.

---

## 2. Reserve & Confirm Flow (Customer)
1. In Tab 1, browse the Explore feed or select any listing (e.g. "Artisan Sourdough Loaves" at CAD Bakery).
2. Click **Reserve Now** (or **Confirm & Reserve** in drawer).
3. Notice:
   - Zero console errors (`ws://localhost:5000` is completely gone).
   - Instant transition (< 300ms) to the **Active Pickup Pass**.
   - A unique 6-digit verification code appears in digit boxes (e.g., `[7][4][2][9][1][8]`).
   - Store address, map link, pickup window, and countdown timer are displayed.

---

## 3. Verify Code Flow (Merchant)
1. In Tab 2 (Merchant Hub), click the **Orders** tab.
2. Confirm the newly placed customer order appears at the top of the **Pending** orders list.
3. Switch to **Verify Pickup** (PIN input).
4. Enter the 6-digit code shown on the customer's pass (e.g., `742918`) and click **Verify Pickup**.
5. Result:
   - Merchant receives instant success toast: "Pickup verified! Order #FS-742918 marked completed".
   - Switch back to Tab 1 (Customer App): The digital pickup pass has reactively transitioned to **"Completed / Rescued"** with impact statistics.


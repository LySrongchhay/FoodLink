# Quickstart Guide: Dual-Link Portals with QR Hosting

**Feature**: `002-dual-link-identical-ui`  
**Target Directory**: `d:\DGIY\foodlink-2\foodlink-ui`  

---

## 1. Running the Application

```bash
cd foodlink-ui
npm.cmd run dev
```

App runs on: **`http://localhost:5175`**

---

## 2. Navigating the 2 Dedicated QR Links

| Destination | Direct URL Link | Purpose |
|---|---|---|
| **Root Launcher** | `http://localhost:5175/` | Split welcome page with live QR previews & links |
| **Customer QR Link** | `http://localhost:5175/customer` | Complete Customer food rescue mobile experience |
| **Merchant QR Link** | `http://localhost:5175/merchant` | Complete Cad Bakery store operations hub |

*(Static host fallbacks: `http://localhost:5175/?role=customer` and `http://localhost:5175/?role=merchant`)*

---

## 3. Testing the Dual QR Code Flow

1. Open `http://localhost:5175/` in your browser. You will see the **Split Landing Launcher** displaying:
   - **Customer Card** with scannable Customer QR code.
   - **Merchant Card** with scannable Merchant QR code.
2. Click **"Launch Customer App"** (or scan Customer QR):
   - Opens the full Customer view with bottom navigation (`Discover`, `Map`, `Pickups`, `Profile`).
   - Browse Ending Soon deals, open detail modal, checkout via Bakong KHQR, and receive a 4-digit pickup code.
3. Open a separate browser window or tab at `http://localhost:5175/merchant` (or scan Merchant QR):
   - Opens the Cad Bakery Merchant Hub.
   - You will see the customer's order in real-time in the orders queue!
   - Click "Verify Pickup", enter the customer's 4-digit PIN, and watch it instantly mark as fulfilled!

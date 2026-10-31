# Data Model: Order Reservation & Verification Lifecycle

**Feature**: `007-fix-reserve-confirm`  
**Date**: 2026-10-31  

---

## 1. Entity Schema: `Order`

```typescript
interface Order {
  id: string;                       // e.g. "ord_1730335200000"
  orderNumber: string;              // e.g. "#FS-742918"
  pickupCode: string;               // 6-digit numeric string, e.g. "742918"
  digits: string[];                 // Array of 6 single-digit strings: ["7", "4", "2", "9", "1", "8"]
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
  customerName: string;             // e.g. "Demo Customer"
  customerEmail: string;            // e.g. "customer@foodlink.com"
  avatarUrl?: string;
  storeId?: string;                 // e.g. "st_cad"
  storeName: string;                // e.g. "CAD Bakery & Cafe"
  storeAddress: string;             // e.g. "No. 42, Street 310, BKK1, Phnom Penh"
  pickupWindow: string;             // e.g. "18:30 - 20:30"
  totalPrice: string;               // e.g. "4.99"
  co2SavedKg: number;               // e.g. 0.8
  items: OrderItem[];
  createdAt: string;                // ISO 8601 string
  verifiedAt?: string;              // e.g. "19:15"
}

interface OrderItem {
  listingId: string;
  title: string;
  price: number;
  quantity: number;
  photoUrl: string;
}
```

---

## 2. Order Lifecycle State Transitions

```
[Customer Browses Listing]
          │
          ▼
[Clicks "Reserve Now" -> Opens Modal]
          │
          ▼
[Clicks "Confirm & Reserve"]
          │
          ├──> 1. Generate 6-digit code ("742918")
          ├──> 2. Create Order (status: "PENDING")
          ├──> 3. Store in localStorage ('foodlink_active_order_<userId>')
          ├──> 4. Broadcast 'ORDER_CREATED' on liveDropChannel
          │
          ▼
[Customer View: Active Pickup Pass]
  - Displays 6 monospace digit boxes: [7][4][2][9][1][8]
  - Subtitle: "SHOW PASS AT COUNTER"
  - Countdown timer & pickup window
  - Store address & directions
          │
          ▼
[Customer Arrives at Store & States 6-Digit Code]
          │
          ▼
[Merchant Opens "Verify Pickup" in Merchant Hub]
          │
          ├──> Merchant enters: 7 4 2 9 1 8
          ├──> StoreContext.verifyPickup("742918")
          ├──> Matches order in state.orders
          ├──> Updates order status to "COMPLETED"
          ├──> Broadcasts 'ORDER_VERIFIED' on liveDropChannel
          │
          ▼
[Customer Screen Reactively Responds to 'ORDER_VERIFIED']
  - Sets isVerified = true
  - Digit boxes turn emerald: "✓ VERIFIED BY MERCHANT"
  - Top card renders "Completed / Rescued" celebration
  - Shows impact stats: Meals Rescued, Money Saved, CO2 Avoided
```

---

## 3. Storage Keys & Communication Channels

| Mechanism | Name / Key | Purpose |
|---|---|---|
| **LocalStorage** | `foodlink_merchant_orders` | Array of all recent orders shared between Merchant and Customer tabs |
| **LocalStorage** | `foodlink_demo_store_v2` | Merchant store state (inventory listings, orders, metrics) |
| **LocalStorage** | `foodlink_active_order_<userId>` | Customer active order snapshot for instant reload persistence |
| **BroadcastChannel** | `foodlink_live_channel` | Cross-tab pub/sub channel for `ORDER_CREATED` and `ORDER_VERIFIED` events |


# Phase 1 Data Model: Full-Fidelity Portals & Multi-Route Architecture

**Feature**: `002-dual-link-identical-ui`  
**Date**: 2026-10-30  

---

## 1. Routing Model

```typescript
type PortalRoute = 'launcher' | 'customer' | 'merchant';

interface PortalRouterState {
  currentPortal: PortalRoute;
  navigateTo: (portal: PortalRoute, options?: { replace?: boolean }) => void;
  customerUrl: string; // Full URL for QR 1 (e.g. "https://example.com/customer")
  merchantUrl: string; // Full URL for QR 2 (e.g. "https://example.com/merchant")
}
```

---

## 2. Customer Navigation & Session Model

```typescript
type CustomerScreen = 
  | 'discover' 
  | 'explore' 
  | 'listing-detail' 
  | 'checkout' 
  | 'reserved' 
  | 'profile';

interface CustomerSessionState {
  screen: CustomerScreen;
  activeBottomTab: 'discover' | 'explore' | 'orders' | 'profile';
  selectedListing: SurplusListing | null;
  reserveQuantity: number;
  cart: {
    items: Array<{ listing: SurplusListing; quantity: number }>;
    totalAmount: number;
  };
  activeOrder: FoodlinkOrder | null;
  notifications: FoodlinkNotification[];
  unreadNotificationCount: number;
}
```

---

## 3. Merchant Navigation & Session Model

```typescript
type MerchantTab = 'dashboard' | 'listings' | 'orders' | 'insights' | 'profile';
type MerchantSubView = null | 'create-listing' | 'verify-pickup';

interface MerchantSessionState {
  activeTab: MerchantTab;
  subView: MerchantSubView;
  isStoreOpen: boolean; // Cad Bakery Open/Closed status
  audioAlertsEnabled: boolean;
  editingListing: SurplusListing | null;
  verificationCode: string | null;
}
```

---

## 4. Shared Persistent Store (`StoreContext`)

```typescript
interface UnifiedStoreState {
  // Inventory
  listings: SurplusListing[];
  addListing: (listing: NewListingInput) => SurplusListing;
  updateListing: (id: string, updates: Partial<SurplusListing>) => void;
  deleteListing: (id: string) => void;

  // Orders
  orders: FoodlinkOrder[];
  createOrder: (listingId: string, quantity: number) => FoodlinkOrder;
  verifyPickup: (pickupCode: string) => { success: boolean; message: string; order?: FoodlinkOrder };
  
  // Store status
  isStoreOpen: boolean;
  toggleStoreStatus: () => void;

  // Notifications
  notifications: FoodlinkNotification[];
  markNotificationRead: (id: string) => void;

  // Management
  resetDemoData: () => void;
}
```

---

## 5. LocalStorage Storage Contract

Key: `foodlink_demo_store_v2`
```json
{
  "version": 2,
  "lastUpdated": "2026-10-30T22:00:00.000Z",
  "isStoreOpen": true,
  "listings": [...],
  "orders": [...],
  "notifications": [...]
}
```
Cross-tab synchronization is triggered via the native `storage` event.

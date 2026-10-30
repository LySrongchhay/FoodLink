# Phase 1 Data Model: Unified Dual-Role UI

**Feature**: `001-unified-role-ui`  
**Date**: 2026-10-30  

---

## 1. Domain Entities

### 1.1 Role Entity
```typescript
type UserRole = 'customer' | 'merchant';

interface RoleState {
  currentRole: UserRole;
  switchRole: (role: UserRole) => void;
}
```

### 1.2 Merchant Profile
```typescript
interface MerchantProfile {
  id: string;
  name: string;
  category: 'Bakery' | 'Restaurant' | 'Grocery' | 'Cafe';
  address: string;
  rating: number;
  ratingCount: number;
  distance: string; // e.g. "0.8 km"
  closingTime: string; // e.g. "20:00"
  pickupWindow: string; // e.g. "19:00 - 20:30"
  logoUrl?: string;
  heroImageUrl?: string;
}
```

### 1.3 Surplus Food Listing
```typescript
interface SurplusListing {
  id: string;
  merchantId: string;
  merchantName: string;
  title: string;
  description: string;
  category: string;
  originalPrice: number;    // In USD, e.g. 8.00
  discountedPrice: number;  // In USD, e.g. 3.50
  discountPercentage: number; // e.g. 56
  quantityAvailable: number;
  unit: string; // e.g. "box", "portion", "bag"
  expiryDate: string; // ISO string or time countdown target
  pickupStartTime: string;
  pickupEndTime: string;
  status: 'ACTIVE' | 'SOLD_OUT' | 'EXPIRED';
  imageUrl: string;
}
```

### 1.4 Order & Pickup Voucher
```typescript
interface FoodlinkOrder {
  id: string;
  orderNumber: string; // e.g. "FL-8942"
  listingId: string;
  listingTitle: string;
  merchantId: string;
  merchantName: string;
  quantity: number;
  totalPrice: number;
  pickupCode: string; // e.g. "FL-3829" or 4-digit PIN "8912"
  qrValue: string;
  status: 'RESERVED' | 'READY_FOR_PICKUP' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
  pickupWindow: string;
}
```

---

## 2. Global State Store Interface (`StoreContext`)

```typescript
interface StoreContextType {
  // Listings
  listings: SurplusListing[];
  addListing: (listing: Omit<SurplusListing, 'id' | 'status'>) => void;
  updateListingStock: (id: string, newQuantity: number) => void;
  
  // Orders
  orders: FoodlinkOrder[];
  createOrder: (listingId: string, quantity: number) => FoodlinkOrder;
  verifyPickup: (pickupCode: string) => { success: boolean; message: string; order?: FoodlinkOrder };
  
  // Merchant Metrics
  merchantMetrics: {
    todayRevenue: number;
    mealsSaved: number;
    activeListingsCount: number;
    pendingOrdersCount: number;
  };
}
```


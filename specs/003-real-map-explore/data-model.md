# Phase 1 Data Model: Geographic Map Explore

**Feature**: `003-real-map-explore`  
**Date**: 2026-10-30  

---

## 1. Map Geographic Entities

```typescript
interface GeoPoint {
  lat: number;
  lng: number;
}

interface StoreMapPin {
  id: string;
  storeName: string;
  category: 'Bakery' | 'Meals' | 'Groceries' | 'Cafe';
  position: GeoPoint;
  address: string;
  rating: number;
  ratingCount: number;
  distanceKm: number;
  formattedDistance: string; // e.g. "0.4 km away"
  pickupWindow: string; // e.g. "18:30 - 20:00"
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  bagsAvailable: number;
  imageUrl: string;
  logoUrl?: string;
}
```

---

## 2. Customer Map Session State

```typescript
interface CustomerMapState {
  center: GeoPoint;
  zoom: number;
  selectedPin: StoreMapPin | null;
  activeCategory: string; // 'All' | 'Bakery' | 'Meals' | 'Groceries'
  searchQuery: string;
  userLocation: GeoPoint;
  isLocating: boolean;
}
```

---

## 3. Map View Drawer Contract

```typescript
interface MapBottomDrawerProps {
  pin: StoreMapPin | null;
  onClose: () => void;
  onRescueDeal: (pin: StoreMapPin) => void;
}
```


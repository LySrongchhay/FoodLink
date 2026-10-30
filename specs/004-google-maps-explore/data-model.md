# Data Model: Google Maps Style Interactive Explore

**Feature**: `004-google-maps-explore`  
**Date**: 2026-10-30  

---

## 1. Google Map Entities

```typescript
interface GeoLocation {
  lat: number;
  lng: number;
}

interface GoogleMapStorePin {
  id: string;
  storeName: string;
  category: 'Bakery' | 'Meals' | 'Groceries';
  position: GeoLocation;
  address: string;
  street: string;
  rating: number;
  ratingCount: number;
  distanceKm: number;
  formattedDistance: string; // "0.4 km away"
  pickupWindow: string;      // "18:30 - 20:30 Tonight"
  originalPrice: number;     // 8.50
  discountedPrice: number;   // 3.50
  discountPercentage: number;// 59
  bagsAvailable: number;     // 3
  title: string;             // "Surplus Pastry & Sourdough Surprise Bag"
  description: string;
  imageUrl: string;
  badgeText: string;         // "59% OFF"
  isPartner: boolean;
}
```

---

## 2. Customer Map Session State

```typescript
interface GoogleMapState {
  center: GeoLocation; // Default: [11.5514, 104.9255] (BKK1, Phnom Penh)
  zoom: number;         // Default: 15
  selectedStore: GoogleMapStorePin | null;
  activeCategory: string; // 'All' | 'Bakery' | 'Meals' | 'Groceries'
  searchQuery: string;
  userLocation: GeoLocation; // Default: [11.5540, 104.9240]
  isLocating: boolean;
  tileProvider: 'google' | 'osm_fallback';
}
```

---

## 3. Google Place Card Interface

```typescript
interface GooglePlaceCardProps {
  store: GoogleMapStorePin | null;
  onClose: () => void;
  onRescueDeal: (listing: any) => void;
}
```


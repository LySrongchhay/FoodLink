# Data Model & UI Component Constraints: Mobile-First Consistency

**Feature**: `005-mobile-ui-consistency`  
**Date**: 2026-10-30  

---

## 1. Mobile Design System Tokens

```typescript
interface DesignSystemConstraints {
  viewport: {
    mobileShellMaxWidth: '448px'; // max-w-md
    gutterPadding: '16px';       // px-4
    safeBottomPadding: '80px';   // pb-20
  };
  geometry: {
    cardRadius: '16px';          // rounded-2xl
    buttonRadius: '12px';        // rounded-xl
    chipRadius: '9999px';        // rounded-full
  };
  touchTargets: {
    minHeight: '44px';
    minWidth: '44px';
  };
  typography: {
    fontFamily: 'Inter, -apple-system, sans-serif';
    cardTitle: '16px font-bold';
    bodyText: '14px font-medium';
    metaText: '12px font-normal';
    microBadge: '10px font-extrabold uppercase';
  };
  colors: {
    primaryGreen: '#2E7D32';
    primaryHover: '#256628';
    urgencyOrange: '#FF8A3D';
    canvasBackground: '#FAFAFA';
    cardBackground: '#FFFFFF';
    textPrimary: '#1C1C1E';
    textSecondary: '#6E6E73';
  };
}
```

---

## 2. Card Layout Data Model

```typescript
interface MobileListingCardModel {
  id: string;
  storeName: string;
  storeLogoUrl?: string;
  title: string;
  imageUrl: string;
  rating: number;
  ratingCount?: number;
  pickupWindow: string;
  formattedDistance: string;
  discountedPrice: number;
  originalPrice: number;
  discountPercentage: number;
  savingsAmount: number;
  bagsAvailable: number;
  isAvailable: boolean;
}
```

---

## 3. Navigation Bar Tab Model

```typescript
interface MobileNavTab {
  id: 'discover' | 'explore' | 'reserved' | 'profile';
  label: string;
  iconName: string; // Lucide icon
  badgeCount?: number;
  minTouchSize: '44px';
}
```


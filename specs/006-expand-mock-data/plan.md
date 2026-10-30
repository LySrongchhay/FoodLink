# Implementation Plan: Expanded Mock Data for Foodlink Marketplace

**Branch**: `006-expand-mock-data` | **Date**: 2026-10-30 | **Spec**: [specs/006-expand-mock-data/spec.md](file:///d:/DGIY/foodlink-2/specs/006-expand-mock-data/spec.md)

**Input**: Feature specification from `specs/006-expand-mock-data/spec.md`

## Summary

Expand the mock dataset across the entire Foodlink application in `foodlink-ui/` so that the Customer Discover feed (>= 16 listings across 7 categories), Google Maps Explore view (>= 14 pins across BKK1, Daun Penh, Tuol Kouk, Tonle Bassac, and Russian Market), Merchant Kitchen Orders queue (>= 8 orders), and Customer "Reserved" tab (active CAD Bakery pickup pass with code `849201`) provide a vibrant, realistic surplus food rescue marketplace in Phnom Penh. All modifications remain strictly isolated to `foodlink-ui/` with zero backend server dependencies.

## Technical Context

**Language/Version**: JavaScript (ES2022+), React 18  
**Primary Dependencies**: React 18, Vite, Lucide React, Tailwind CSS, Leaflet / Google Tile layer  
**Storage**: Client-side in-memory mock datasets + browser `localStorage`  
**Testing**: Manual scenario testing + Vite production build compilation verification (`npm.cmd run build`)  
**Target Platform**: Mobile-responsive web (iOS Safari, Android Chrome, Desktop Chrome/Edge)  
**Project Type**: Standalone Single-Page Application (SPA) in `foodlink-ui/`  
**Performance Goals**: Instant initial paint (<100ms for Discover feed), 60fps smooth scrolling, zero NaN prices, zero broken images  
**Constraints**: Zero changes outside `foodlink-ui/` (`customer/`, `merchant/`, `server/` remain 100% untouched); zero external DB or active network backend required  
**Scale/Scope**: 16+ Discover listings, 14+ Map pins, 8+ Merchant orders, 4+ Notifications, 1 Pre-reserved customer active pass  

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Requirement | Compliance Analysis | Status |
|-----------|-------------|---------------------|--------|
| **I. UI-First & Decoupled** | UI works without live backend or database dependencies | All data is client-side mock data; runs offline with full fidelity. | PASS |
| **II. Two-Sided Domain Separation** | Cleanly delineate Customer and Merchant experiences | Customer listings and Merchant kitchen orders are clearly modeled with respective schemas. | PASS |
| **III. Design System Consistency** | Strict adherence to `#2E7D32`, `#FF8A3D`, 16px radius, Inter typography | All mock cards adhere to Foodlink tokens, discount percentages, and tags. | PASS |
| **IV. Contract-First Mock Data** | Valid domain shapes matching production contracts | Entities follow typed JSON contracts (`ListingItem`, `StoreMapPin`, `MerchantOrder`). | PASS |
| **V. Simplicity & YAGNI** | No premature complexity or heavy backend orchestration | Deterministic static arrays and local storage session synchronization. | PASS |

## Project Structure

### Documentation (this feature)

```text
specs/006-expand-mock-data/
├── plan.md              # This file (/speckit-plan output)
├── research.md          # Technical analysis & design decisions (/speckit-plan output)
├── data-model.md        # Entity schemas, validation rules, state transitions (/speckit-plan output)
├── quickstart.md        # End-to-end runnable verification scenarios (/speckit-plan output)
├── contracts/
│   └── mock-data-contracts.json # JSON schema definitions for mock entities
└── tasks.md             # Implementation tasks (/speckit-tasks command)
```

### Source Code (repository root)

```text
foodlink-ui/
├── src/
│   ├── data/
│   │   ├── mockData.js             # Initial merchants, listings, orders for StoreContext
│   │   ├── phnomPenhStores.js       # Geographic map pins & coordinates across Phnom Penh
│   │   └── customerMockData.js      # Customer fallback mock collections
│   ├── services/
│   │   └── api.js                   # DEFAULT_MERCHANT_LISTINGS, DEFAULT_MERCHANT_ORDERS, getActiveListings
│   ├── utils/
│   │   └── userSession.js           # Seed active pre-reserved order (code 849201)
│   └── components/
│       ├── customer/                # Discover feed, Google map explore, reserved pickup pass
│       └── merchant/                # Orders tab, kitchen queue, pickup verification
```

**Structure Decision**: Retain existing directory layout within `foodlink-ui/`. Update data sources at `src/services/api.js`, `src/data/mockData.js`, `src/data/phnomPenhStores.js`, and `src/utils/userSession.js` without altering component interfaces.

## Complexity Tracking

*No violations detected. Zero unnecessary dependencies or complexity introduced.*

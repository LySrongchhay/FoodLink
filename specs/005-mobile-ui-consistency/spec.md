# Feature Specification: Mobile-First UX & UI Consistency Refinement

**Feature Branch**: `005-mobile-ui-consistency`  
**Created**: 2026-10-30  
**Status**: Clarified  
**Input**: User description: "Our the UI I mainly focus for mobile, make ux and ui better make sure icon does not make the layout break down, we can remove some unercessary icon, and make the UI consistency"

---

## Clarifications

### Session 1 (2026-10-30)
- Q: Which portal should be the primary focus for this mobile UI/UX refinement? → A: **Both Customer App and Merchant Dashboard equally**: Refine mobile ergonomics, spacing, and icon hygiene across both Customer and Merchant portals.
- Q: What icon pruning approach do you prefer for badge chips and tags? → A: **Clean modern minimalism**: Strip decorative emojis and redundant icons from category tags and status pills; preserve icons strictly for functional actions (Search, Bag, Star, Navigation, Close, Chevron, Add, Filter).
- Q: What card feed presentation works best for your mobile customers? → A: **Single-column full-width food rescue cards**: Uniform card height, balanced 16:9 imagery, single-line price and savings row, 44px touch targets, zero text wrapping distortion.

### Session 2 (2026-10-30)
- Q: How should the Customer top app bar behave when scrolling the feed? → A: **Sticky compact header**: Always visible top bar with Logo, Location pill, and Cart/Notif icons for instantaneous navigation without blocking vertical feed flow.
- Q: How should the bottom navigation bar display its tabs on mobile? → A: **Icon + Compact Text Label**: Classic mobile app navigation with 20px icon, clean 10px text label, active Foodlink green (`#2E7D32`) indicator, and 44px minimum tap targets.

---

## 1. Objective & Problem Statement

### Problem
1. **Mobile Layout Fragility & Icon Overflow**: On mobile viewports (360px–414px width), overcrowded badge chips, nested icons, and long text tags cause uneven card heights, text wrapping, and broken line breaks in both the Customer and Merchant interfaces.
2. **Icon Noise & Visual Clutter**: Multiple redundant icons (e.g. decorative emojis next to text labels, duplicate icons inside category chips, repetitive decorative icons in merchant order rows) overwhelm visual hierarchy and distract from core food rescue tasks.
3. **Inconsistent UI Tokens & Spacing**: Subtle variations in padding, button corner radii (mixing 8px, 12px, 16px, 24px), font weights, and touch target heights create an unpolished mobile feel across both Customer and Merchant screens.

### Solution
1. **Dual-Portal Mobile Ergonomics**: Hardened mobile container constraints (`max-w-md mx-auto w-full min-h-screen bg-[#FAFAFA]` for Customer, responsive mobile/tablet layout for Merchant) with zero horizontal overflow (`overflow-x-hidden`).
2. **Icon Pruning & Layout Stabilization**:
   - Strip redundant, non-essential decorative icons and emojis across listing cards, navigation, and badges.
   - Enforce `shrink-0` on all retained functional icons (search, chevron, star, bag, close, plus/minus, status).
   - Constrain card badges to single-line truncation (`truncate max-w-[120px]`) with flex-wrap prevention so cards maintain consistent heights in grid/list views.
3. **Foodlink Design System Uniformity**:
   - Primary Action Color: `#2E7D32` (Green)
   - Urgency & Discount Color: `#FF8A3D` (Orange)
   - Surface Geometry: `16px` (`rounded-2xl`) for cards, `12px` (`rounded-xl`) for action buttons, `9999px` (`rounded-full`) for chips and status pills.
   - Minimum 44px touch targets on all interactive buttons and navigation tabs.
   - Clean typography hierarchy (Inter font with standard 16px/14px/12px scale).
   - Sticky compact header and fixed bottom navigation bar with 20px icons and 10px labels.

---

## 2. User Scenarios & Testing *(mandatory)*

### User Story 1 - Clean, Stable Customer Food Rescue Feed (Priority: P1) 🎯 MVP

As a customer on a compact mobile phone (e.g. 375px screen width), I want surplus food listing cards to look neat, balanced, and uniform, so that prices and discounts are instantly readable without awkward line breaks or layout shifts.

- **Why this priority**: Discover is the primary landing screen where customers browse and purchase food rescue deals.
- **Independent Test**: Open `/customer` on mobile device emulation (375px width) -> verify all food cards render with uniform aspect ratio images, consistent card heights, cleanly aligned price chips, and no text or icon clipping.
- **Acceptance Scenarios**:
  1. **Given** a user browses the Discover tab on a 375px screen, **When** cards are rendered, **Then** badges and tags remain single-line with ellipsis if needed, preserving identical card heights.
  2. **Given** multiple dietary or category tags exist on an item, **When** displayed, **Then** decorative emojis and redundant icons are omitted, leaving clean readable text pills (e.g. "Bakery", "Vegetarian").
  3. **Given** price and discount information, **When** viewed on small screens, **Then** the discounted price (`$3.50`), original price (`$8.50`), and savings pill (`Save $5.00`) stay on one cohesive line without wrapping onto the button.

---

### User Story 2 - Ergonomic Bottom Navigation & Sticky Top App Bar (Priority: P1)

As a mobile user navigating with one thumb, I want a clean, stable bottom navigation bar and sticky compact header that never overlap content or break layout on small screens.

- **Why this priority**: Navigation is omnipresent and sets the mobile app's core usability feel.
- **Independent Test**: Switch between tabs (Discover, Explore Map, Reserved, Profile) -> confirm bottom bar remains fixed with 44px minimum tap targets, active green indicator, clean 20px icons with 10px labels, and top app bar remains sticky and compact.
- **Acceptance Scenarios**:
  1. **Given** the bottom navigation bar on mobile, **When** switching tabs, **Then** each tab icon (20px) and label (10px) fits within the viewport width without horizontal scrolling or truncation.
  2. **Given** the top header bar, **When** scrolling, **Then** it remains fixed and presents the Foodlink logo, location selector, and notification/cart icons with consistent 16px horizontal padding.
  3. **Given** notification alerts or restock banners appear, **When** rendered, **Then** they float smoothly without pushing bottom navigation out of view.

---

### User Story 3 - Mobile-Optimized Merchant Portal (Priority: P1)

As a store merchant operating on a smartphone, I want my dashboard, active listings, order verification list, and analytics summary to fit naturally on a mobile screen with clean buttons and uncrowded status pills.

- **Why this priority**: Merchants frequently manage orders, restock inventory, and scan customer pickup QR codes from mobile phones.
- **Independent Test**: Open `/merchant` on mobile (375px) -> check Dashboard metrics cards, Orders tab, and Listings tab -> verify buttons are 44px high, metric numbers fit without overflow, and status tags are clean without decorative icon noise.
- **Acceptance Scenarios**:
  1. **Given** a merchant views the dashboard on mobile, **When** metric cards render (Revenue, Bags Saved, Pending Orders), **Then** they stack cleanly in a responsive grid without overlapping numbers or distorted icons.
  2. **Given** orders are displayed in the Orders tab, **When** examining an order row, **Then** customer name, surplus item, and status pill ("Pending", "Verified") fit horizontally with a direct 44px action button.
  3. **Given** the merchant creates or restocks a listing, **When** opening the form on mobile, **Then** input fields, stepper controls, and action buttons have comfortable thumb tap sizes.

---

### User Story 4 - Mobile Map & Place Card Usability (Priority: P2)

As a customer exploring the map on mobile, I want the Google Maps view, search pill, and bottom place drawer to fit comfortably within the mobile screen without obscuring touch controls.

- **Why this priority**: Ensures the Google Maps feature matches the refined mobile ergonomics.
- **Independent Test**: Open Explore tab on mobile (375px) -> search pill, filter chips, and bottom place card display cleanly with comfortable touch spacing and no horizontal viewport overflow.
- **Acceptance Scenarios**:
  1. **Given** the mobile Google Map view, **When** category filter chips are scrolled horizontally, **Then** icons and labels remain crisp without breaking line heights or covering the search input.
  2. **Given** a place pin is tapped, **When** the place card slides up, **Then** it occupies a comfortable bottom sheet height (< 45% of screen) with the "Rescue Deal" button easily reachable by thumb.

---

## 3. Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST enforce a mobile-optimized shell (`max-w-md mx-auto w-full min-h-screen bg-[#FAFAFA]`) for Customer App and responsive mobile flex/grid layout for Merchant Portal, preventing horizontal viewport overflow (`overflow-x-hidden`).
- **FR-002**: System MUST prune redundant decorative emojis and icons in listing cards, category pills, order status tags, and headers, preserving icons strictly for functional actions (Search, Chevron, Close, ShoppingBag, Star, Navigation, Plus/Minus, Camera/Scan).
- **FR-003**: System MUST enforce `shrink-0` on all SVG icons to prevent flexbox compression or aspect-ratio distortion when parent text wraps.
- **FR-004**: System MUST standardize component geometry across both portals: `rounded-2xl` (16px) for cards, `rounded-xl` (12px) for buttons, `rounded-full` for chips and status pills.
- **FR-005**: System MUST enforce minimum touch target dimensions of 44×44px for all mobile interactive buttons, bottom nav tabs, filter chips, and icon buttons.
- **FR-006**: System MUST ensure listing card price rows (`$3.50`, `$8.50`, `Save $5.00`) maintain a stable flex layout with `whitespace-nowrap` on monetary values.
- **FR-007**: System MUST provide single-line tag truncation (`max-w-[120px] truncate`) on secondary category tags to prevent card height jitter.
- **FR-008**: System MUST refine bottom navigation bar tabs with fixed spacing, consistent 20px icon sizes, 10px text labels, and active Foodlink green (`#2E7D32`) indicator.
- **FR-009**: System MUST ensure Merchant dashboard metrics, order verification rows, and listing cards adapt gracefully to 360px–414px mobile widths without horizontal scrollbars.
- **FR-010**: System MUST maintain strict isolation: reference folders `customer/`, `merchant/`, and `server/` remain 100% untouched.

---

## 4. Key Entities & UI Components in Scope

- **Customer Shell Container**: `foodlink-ui/src/components/customer/CustomerApp.jsx`
- **Customer Discover Feed**: `foodlink-ui/src/components/customer/CustomerDiscover.jsx`
- **Customer Listing Detail Sheet**: `foodlink-ui/src/components/customer/CustomerListingDetail.jsx`
- **Customer Map View & Drawer**: `foodlink-ui/src/components/customer/CustomerMapView.jsx`, `MapBottomDrawer.jsx`
- **Customer Checkout Flow**: `foodlink-ui/src/components/customer/CustomerCheckoutFlow.jsx`
- **Merchant Shell & Nav**: `foodlink-ui/src/components/merchant/MerchantPortal.jsx`
- **Merchant Dashboard & Metrics**: `foodlink-ui/src/components/merchant/MerchantDashboard.jsx`
- **Merchant Orders**: `foodlink-ui/src/components/merchant/MerchantOrders.jsx`
- **Merchant Listings**: `foodlink-ui/src/components/merchant/MerchantListings.jsx`

---

## 5. Success Criteria *(mandatory)*

- **SC-001**: Zero horizontal layout overflow across 360px, 375px, 390px, and 414px mobile viewport widths on both `/customer` and `/merchant`.
- **SC-002**: 100% of listing cards in the Customer Discover feed display uniform heights with single-column layout and zero wrapped price text.
- **SC-003**: All interactive buttons, chips, and nav items across both Customer and Merchant portals meet the 44px touch ergonomics threshold.
- **SC-004**: Production build (`npm.cmd run build`) succeeds with 0 errors and 0 warnings.

---

## 6. Assumptions

- Primary focus is mobile ergonomics on smartphone viewports (360px–414px width), while remaining fully responsive on larger screens.
- Design tokens align with Foodlink brand green (`#2E7D32`) and urgency discount orange (`#FF8A3D`).
- All changes are strictly confined to `foodlink-ui/`.

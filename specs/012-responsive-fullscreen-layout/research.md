# Research & Technical Decisions: Fullscreen Laptop & Responsive Desktop Layout

**Feature Branch**: `012-responsive-fullscreen-layout`  
**Date**: 2026-10-31  
**Spec Reference**: [specs/012-responsive-fullscreen-layout/spec.md](file:///d:/DGIY/foodlink-2/specs/012-responsive-fullscreen-layout/spec.md)

---

## 1. Problem Audit Across Existing Components

A thorough review of the current codebase in `foodlink-ui` reveals where mobile-locking occurs:

### A. Customer Portal
1. [`CustomerApp.jsx`](file:///d:/DGIY/foodlink-2/foodlink-ui/src/components/customer/CustomerApp.jsx):
   - Line 554: `<main className="flex-1 max-w-md mx-auto w-full px-3 sm:px-4 pt-1 pb-24">` $\rightarrow$ Constrains entire customer app to 448px (`max-w-md`).
   - Line 600–650: Listing feed is a vertical flex column (`space-y-3.5`). On wide viewports, cards stretch horizontally within the 448px tube, with empty vast margins on either side.
   - Line 655: Bottom navigation `<div className="max-w-md sm:max-w-xl mx-auto flex items-center justify-around">`.
2. [`CustomerMapView.jsx`](file:///d:/DGIY/foodlink-2/foodlink-ui/src/components/customer/CustomerMapView.jsx):
   - Map height is fixed to mobile proportions (`h-[62vh]` or `h-[70vh]`). On a laptop screen, it sits in the narrow center column instead of offering an immersive widescreen explore experience.
3. Drawers & Modals ([`CustomerListingDetail.jsx`](file:///d:/DGIY/foodlink-2/foodlink-ui/src/components/customer/CustomerListingDetail.jsx), [`CustomerCheckoutFlow.jsx`](file:///d:/DGIY/foodlink-2/foodlink-ui/src/components/customer/CustomerCheckoutFlow.jsx)):
   - Configured as mobile bottom sheets with fixed bottom pinning. On wide screens, they stretch awkwardly unless centered as desktop modal dialogs.

### B. Merchant Portal
1. [`MerchantApp.jsx`](file:///d:/DGIY/foodlink-2/foodlink-ui/src/components/merchant/MerchantApp.jsx):
   - Line 99: Header is capped at `max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl`.
   - Line 157: `<main className="max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto w-full px-3.5 sm:px-6 py-4">` $\rightarrow$ Constrained to 768px maximum.
   - Line 241: Bottom navigation capped at `max-w-xl`.
2. [`MerchantDashboard.jsx`](file:///d:/DGIY/foodlink-2/foodlink-ui/src/pages/Dashboard/MerchantDashboard.jsx):
   - Daily Highlights are in a 3-column grid, but squeezed into `max-w-3xl`.
   - Active listings and quick actions are strictly stacked in a vertical column.
3. [`MerchantOrders.jsx`](file:///d:/DGIY/foodlink-2/foodlink-ui/src/pages/Orders/MerchantOrders.jsx):
   - Orders list is a vertical stack. On wide screens, pending pickups and earlier pickups should leverage a 2-column layout or comfortable grid.

---

## 2. Responsive Breakpoint Strategy

We will apply Tailwind's proven mobile-first responsive breakpoints:
- **Mobile (`< 640px`)**: Full-width container (`max-w-md`), 1-column card stack, fixed bottom navbar, bottom sheet drawers. 100% preservation of mobile touch targets ($\ge 44px$).
- **Tablet (`sm:` 640px–768px, `md:` 768px–1024px)**: `max-w-4xl`, 2-column card grid (`sm:grid-cols-2`), comfortable touch margins.
- **Laptop / Desktop (`lg:` 1024px–1280px, `xl:` 1280px–1536px)**:
  - Container: `max-w-6xl` or `max-w-7xl` with generous padding (`px-6 lg:px-8`).
  - Listing Feed: 3 columns (`lg:grid-cols-3`).
  - Merchant Dashboard: 2-column operational layout (`lg:grid lg:grid-cols-12 lg:gap-8` with 5 cols for highlights/actions, 7 cols for active listings/kitchen queue, or 3-column stat cards).
  - Bottom Navigation: Transitions into an elegant centered floating dock (`sm:max-w-lg mx-auto sm:mb-4 sm:rounded-3xl sm:border sm:shadow-lg sm:bg-white/90 sm:backdrop-blur-md`).
  - Modals: Centered backdrop dialogs (`sm:max-w-lg md:max-w-xl mx-auto sm:my-8 sm:rounded-3xl`).

---

## 3. Constitutional Quality Review (v1.2.0)

- **Principle I (UI-First & Decoupled)**: Pure Tailwind CSS layout adaptations with zero added runtime dependencies.
- **Principle II (Two-Sided Domain Separation)**: Distinct responsive layouts tailored to customer shopping habits vs. merchant kitchen operations.
- **Principle III (Minimalist UX & Zero Emojis)**: Retains all clean design tokens (`#2E7D32`, `#FF8A3D`, `#FAFAFA`, `border-stone-200/80`), zero emojis, and disciplined typography.
- **Principle IV (Offline-First Demo Reliability)**: All responsive views operate on the existing mock data models.
- **Repository Isolation Gate**: Work strictly confined to `foodlink-ui/`.


# Research: Mobile Viewport Optimization & Floating Overlay Removal

**Feature**: `008-remove-floating-switch-link`  
**Date**: 2026-10-31  

---

## 1. Problem & Context

- **Current Implementation**: `PortalSwitcherFloating.jsx` is rendered at the root level in `App.jsx`:
  ```jsx
  <PortalSwitcherFloating />
  ```
- **Styling**: `fixed bottom-4 right-4 z-50`
- **Mobile Conflict**:
  - The Customer mobile view contains `BottomNavBar.jsx` fixed at `bottom-0 w-full z-40` with 4 primary tabs: **Discover**, **Explore (Map)**, **Reserves**, and **Profile**.
  - The floating pill (`Switch Link ^`) sits directly over the rightmost tab ("Profile") and checkout floating action buttons.
  - On viewports < 430px (standard iPhone and Android viewports), tapping the "Profile" tab or sticky reserve CTA accidentally opens the "Switch Link" drawer, causing extreme user frustration.
  - Furthermore, `fixed` overlays on iOS Safari often jitter during scroll or block the native URL search bar / home indicator.

---

## 2. Technical Decision & Solution

### Decision: Remove `PortalSwitcherFloating` from `App.jsx`
- Completely remove the component rendering from `App.jsx`.
- Clean up unused imports.

### Alternative Role Switching Navigation
Instead of an intrusive floating button over user-facing UI:
1. **URL-based Routing (Existing & Robust)**:
   - `usePortalRouter` already supports `/?portal=customer`, `/?portal=merchant`, `/?portal=launcher` (and hash routes `#customer`, `#merchant`).
2. **In-App Profile Entry**:
   - Provide a clean, non-intrusive "Switch to Merchant Hub" card at the bottom of the Customer Profile tab (`CustomerProfile.jsx`).
   - Provide a "Switch to Customer App" button in the Merchant Profile/Navbar.
   - This aligns with industry-standard mobile applications (e.g. Airbnb host/guest switch, Uber rider/driver switch, Grab user/merchant switch) where role switches are located inside Account / Profile settings, never as a persistent floating button on shopping feeds.

---

## 3. Constitution Principle III Check
- **Minimalist UX**: Layout is decluttered, whitespace restored.
- **Zero Emojis**: Preserved.
- **Intentional Iconography**: Clean `Store` and `User` Lucide SVG icons used in Profile settings.


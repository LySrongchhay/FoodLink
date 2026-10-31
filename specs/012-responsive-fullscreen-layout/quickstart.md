# Quickstart & Verification Guide: Responsive Desktop Layout

**Feature Branch**: `012-responsive-fullscreen-layout`

---

## 1. Local Testing Across Viewport Sizes

Run the local dev server:
```powershell
cd foodlink-ui
npm run dev
```

Open Chrome / Safari DevTools (`F12` or `Ctrl+Shift+I` / `Cmd+Option+I`) and test the following device presets:

### Viewport 1: Mobile Phone (390px × 844px — iPhone 13/14)
- Customer: Single column card stack, bottom pinned nav, full-width drawers.
- Merchant: 2-column mobile action grid, 5 persistent tabs, compact daily highlights.

### Viewport 2: Tablet (768px × 1024px — iPad Mini / Air)
- Customer: 2-column listing grid, wider search header, balanced padding.
- Merchant: Spacious metrics, 2-column active listing cards.

### Viewport 3: Fullscreen Laptop (1366px × 768px, 1440px × 900px, 1920px × 1080px)
- Customer:
  - Container spans `max-w-6xl` / `max-w-7xl`.
  - Surplus Surprise Bag cards display in a **3-column responsive grid**.
  - Hero banner and filter categories scale naturally across the full width.
  - Modals (Checkout, Listing Details) display as centered floating windows.
  - Bottom navigation sits as an elegant centered floating dock.
- Merchant:
  - Container spans `max-w-6xl` / `max-w-7xl`.
  - Daily highlights display spacious metric cards.
  - Active listings and orders queue take advantage of the wide screen.

---

## 2. Quality Gate Verification

```powershell
cd foodlink-ui
npm run build
```
Verify the production build completes in < 1 second with 0 errors.


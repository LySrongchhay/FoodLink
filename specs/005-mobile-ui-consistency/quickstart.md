# Quickstart Guide: Mobile-First UX & UI Consistency

**Feature**: `005-mobile-ui-consistency`  
**Target Directory**: `d:\DGIY\foodlink-2\foodlink-ui`  

---

## 1. How to Test on Mobile Viewports

1. Run the UI application:
   ```bash
   cd foodlink-ui
   npm.cmd run dev
   ```
2. Open Chrome DevTools (`F12` or `Ctrl+Shift+I`).
3. Click the Device Emulation icon (`Ctrl+Shift+M`).
4. Select mobile device presets:
   - **iPhone SE (375 × 667 px)**: Smallest common smartphone width.
   - **iPhone 14 / 15 Pro (393 × 852 px)**: Standard modern smartphone width.
   - **Samsung Galaxy S20 (360 × 800 px)**: Compact Android width.
5. Verify on `/customer`:
   - Single-column cards stack cleanly with uniform image heights.
   - Price row (`$3.50`, `$8.50`, `Save $5.00`) never breaks or wraps onto multiple lines.
   - Category filter pills scroll smoothly without emojis or bloated padding.
   - Bottom navigation tabs have comfortable 44px tap areas with 20px icons and 10px labels.
   - Zero horizontal overflow or scrollbar.
6. Verify on `/merchant`:
   - Metric cards stack cleanly on mobile viewports.
   - Order rows and action buttons are easy to tap with one thumb.


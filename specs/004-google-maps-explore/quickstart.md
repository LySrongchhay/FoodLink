# Quickstart Guide: Google Maps Style Interactive Explore

**Feature**: `004-google-maps-explore`  
**Target Directory**: `d:\DGIY\foodlink-2\foodlink-ui`  

---

## 1. How to Test

1. Start the UI development server:
   ```bash
   cd foodlink-ui
   npm.cmd run dev
   ```
2. Open your browser to `http://localhost:5175/customer`.
3. Tap the **"Explore" (Compass icon)** in the bottom navigation bar.
4. Verify:
   - Genuine **Google Maps** roadmap tiles render immediately (Phnom Penh streets, yellow arterial roads, blue rivers, Khmer + English labels).
   - Zero blank or grey screen on load.
   - Google Maps control cluster at bottom-right: circular crosshair location button and stacked `+` / `−` zoom buttons.
   - Teardrop pins with Foodlink green core and `59% OFF` discount badge.
   - Tap CAD Bakery -> camera smoothly pans and Google Maps place card slides up with photo, rating, price, and "Rescue Deal" button.
   - Tap "Rescue Deal" -> direct transition to checkout flow.


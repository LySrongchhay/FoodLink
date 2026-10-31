# Quickstart: Testing Clean Mobile Viewport

**Feature**: `008-remove-floating-switch-link`  
**Date**: 2026-10-31  

---

## 1. Start Development Server
```powershell
cd foodlink-ui
npm.cmd run dev
```
Open `http://localhost:5173` in Chrome / Edge.

---

## 2. Verify Mobile Viewport Clearance
1. Press `F12` to open DevTools, then press `Ctrl+Shift+M` (or click Toggle Device Toolbar) to enter Mobile Device Mode (e.g., iPhone 14 Pro, Pixel 7, 390x844px).
2. Look at the bottom right corner of the screen:
   - **Verification**: The black `Switch Link ^` pill button is completely gone.
   - **Verification**: Bottom navigation tabs (Discover, Explore, Reserves, Profile) are 100% visible, fully clear, and easy to tap without any overlay obstruction.
3. Tap **Profile** tab:
   - **Verification**: Scroll down to the bottom of the profile page.
   - Notice the clean "Merchant Hub Access" card with a "Switch to Merchant Hub" button.
4. Tap **"Switch to Merchant Hub"**:
   - The app transitions cleanly to the Merchant Hub without reloading.
   - In Merchant Hub, verify zero floating buttons exist.

---

## 3. Verify Direct URL Navigation
- `http://localhost:5173/?portal=customer` -> Loads Customer App directly.
- `http://localhost:5173/?portal=merchant` -> Loads Merchant App directly.
- `http://localhost:5173/?portal=launcher` -> Loads Split Launcher directly.


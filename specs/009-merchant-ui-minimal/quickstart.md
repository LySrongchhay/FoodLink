# Quickstart: Verifying Minimalist Merchant UI & UX

**Feature**: `009-merchant-ui-minimal`  
**Date**: 2026-10-31  

---

## Prerequisites
- Node.js installed.
- Working directory: `foodlink-ui/`.

---

## 1. Start Server & Open Merchant View
```powershell
cd foodlink-ui
npm.cmd run dev
```
Open `http://localhost:5173/?portal=merchant` in your browser.
Open DevTools Device Toolbar (`Ctrl+Shift+M`) at 390x844px (mobile viewport).

---

## 2. Verify Modernized Bottom Navigation (5 Tabs)
1. Observe the fixed bottom navigation bar:
   - Contains 5 balanced tabs: **Dashboard**, **Listings**, **Orders**, **Insights**, and **Store**.
2. Tap **Store**:
   - The Store Profile loads smoothly within the same shell with persistent bottom navigation.
   - Tap **Dashboard** to return seamlessly.

---

## 3. Verify Dashboard Minimalism & 2-Column Action Bar
1. On Dashboard:
   - Verify the top store title has zero raw ASCII symbols (`▲ ▼`).
   - Notice the top header has a clean **"Customer View"** button on the right.
   - The Daily Highlights stat cards have clean, non-wobbling borders and zero emojis (no `⌛`).
   - The primary action buttons sit in a compact 2-column grid (`+ New Batch` and `Verify PIN`).

---

## 4. Verify Kitchen Queue Dynamic Counters
1. Tap **Orders** tab:
   - Notice the date badge reads today's actual date (`Today, Oct 31` or current date).
   - Filter pills show dynamic counts: `All (X)`, `Pending Pickup (Y)`, `Completed (Z)`.
   - Zero hardcoded numbers or stale mock dates.

---

## 5. Verify Counter PIN Verification
1. Tap **Verify PIN** (or open from dashboard/orders).
2. Enter a 6-digit code (e.g. `742918`).
3. Notice the matched customer reservation appears instantly with clean summary details.
4. Tap **Confirm Handover** to mark completed.


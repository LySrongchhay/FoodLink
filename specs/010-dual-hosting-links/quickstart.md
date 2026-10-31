# Quickstart & Deployment Guide: Dual Vercel Hosting Links

**Feature Branch**: `010-dual-hosting-links`  
**Target Platform**: Vercel + Local Development

---

## 1. Local Testing & Verification

Inside `foodlink-ui/`, you can test both dedicated portal modes locally before deploying:

### A. Test Customer Demo Mode
```powershell
cd foodlink-ui
npm run dev -- --mode customer
```
- Open `http://localhost:5173`.
- **Result**: Boots directly into `CustomerApp` at root `/`.
- Go to Profile tab: Notice that the "Merchant Operations Hub" card is **completely absent**.

### B. Test Merchant Demo Mode
```powershell
cd foodlink-ui
npm run dev -- --mode merchant
```
- Open `http://localhost:5173`.
- **Result**: Boots directly into `MerchantApp` at root `/`.
- Look at the top header: Notice that the "Customer View" button is **completely absent**.

### C. Build Verification
```powershell
cd foodlink-ui
npm run build:customer
npm run build:merchant
npm run build
```
All three commands must build cleanly in under 1 second with zero errors.

---

## 2. Step-by-Step Vercel Deployment Guide

Deploying two separate links from your single GitHub repository to Vercel takes 2 minutes:

### Link 1: Customer Demo App (e.g. `foodlink-customer.vercel.app`)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New Project"**.
2. Select your GitHub repository (`foodlink-2`).
3. In the project configuration:
   - **Project Name**: `foodlink-customer` (or your preferred customer name).
   - **Root Directory**: Click "Edit" and choose `foodlink-ui`.
   - **Framework Preset**: `Vite` (auto-detected).
4. Under **Environment Variables**, add:
   - **Key**: `VITE_PORTAL_MODE`
   - **Value**: `customer`
5. Click **"Deploy"**.
6. **Done!** Your Customer Demo link is live.

---

### Link 2: Merchant Demo App (e.g. `foodlink-merchant.vercel.app`)

1. In Vercel, click **"Add New Project"** again.
2. Select the **same GitHub repository** (`foodlink-2`).
3. In the project configuration:
   - **Project Name**: `foodlink-merchant` (or your preferred merchant name).
   - **Root Directory**: Click "Edit" and choose `foodlink-ui`.
   - **Framework Preset**: `Vite`.
4. Under **Environment Variables**, add:
   - **Key**: `VITE_PORTAL_MODE`
   - **Value**: `merchant`
5. Click **"Deploy"**.
6. **Done!** Your Merchant Demo link is live.

---

## 3. Demo Presentation Checklist

- [ ] **Customer Link**: Accessing the root URL loads the consumer discovery feed and map view immediately.
- [ ] **Customer Link**: Opening the Profile tab shows user impact metrics without any merchant switcher card.
- [ ] **Merchant Link**: Accessing the root URL loads CAD Bakery kitchen dashboard and 5 persistent tabs immediately.
- [ ] **Merchant Link**: Top header shows bakery branding with zero "Customer View" toggle buttons.
- [ ] **SPA Reloads**: Refreshing deep pages (e.g., `/orders`) does not produce 404 errors (handled by `vercel.json`).
- [ ] **Offline-First**: Demo runs flawlessly without requiring any external backend server or database.


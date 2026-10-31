# Feature Specification: Minimalist Merchant UI & UX Enhancement

**Feature Branch**: `009-merchant-ui-minimal`  
**Created**: 2026-10-31  
**Status**: Specified  
**Input**: User description: "Improve the UI and UX in the merchant side make the ui clean minimal and follow the constitution"

---

## Overview & Background

The Merchant Portal (`MerchantApp.jsx` and its sub-pages: Dashboard, Listings, Orders, Analytics, Verify Pickup, Profile) serves store managers and kitchen staff rescuing surplus food. 

Currently, several UX and UI inconsistencies detract from a clean, professional, minimalist experience:
1. **Visual Artifacts & Lingering Symbols**: Broken `??` placeholders, unstyled ASCII arrows (`▲ ▼`), and stray emoji symbols (e.g., `⌛`) in dashboard stat cards and toast notifications.
2. **Navigation Disconnect**: `MerchantProfile.jsx` lacks a dedicated bottom navigation tab, isolating the user behind a disconnected dark banner when viewing store settings.
3. **Hardcoded Dates & Stale Counts**: `MerchantOrders.jsx` displays hardcoded labels (such as `Today, Nov 14` and `All 14`) regardless of the actual orders in queue or current date.
4. **Desktop-Centric Hover Animations on Mobile**: Excessive desktop hover effects (rotating icons, lifting cards, pinging badges) that cause visual clutter and touch stutter on mobile devices.
5. **Fast Counter PIN Verification UX**: Kitchen staff at the counter need a frictionless, high-contrast PIN verification tool for instant 6-digit code redemption.

This specification modernizes the Merchant UI to strictly uphold **Foodlink Constitution v1.1.0** (Clean Modern Minimalism, Zero Emojis, and Intentional Iconography).

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Clean, Minimalist Merchant Dashboard & Navigation (Priority: P1)

As a store operator managing daily surplus food at CAD Bakery,  
I want a clean, minimalist, responsive dashboard with a unified 5-tab mobile navigation bar (Dashboard, Listings, Orders, Insights, Store),  
So that I can effortlessly scan metrics, toggle store availability, and switch tabs without visual clutter or jarring layout shifts.

**Why this priority**: Core operational interface for the merchant. Eliminating noise and establishing disciplined layout hierarchy drives merchant efficiency and brand trust.

**Independent Test**: Load `http://localhost:5173/?portal=merchant` at mobile (390px) and desktop viewports. Verify that the top header, summary metric cards, and 5-tab bottom navigation render cleanly with zero stray symbols, no jittery hover effects, and disciplined Inter typography.

**Acceptance Scenarios**:
1. **Given** the Merchant Dashboard on mobile, **When** viewed on screen, **Then** all cards render with clean borders (`border-stone-200/80`), subtle shadows, consistent typography, and zero emoji/ASCII artifacts (`▲ ▼`, `??`, `⌛`).
2. **Given** the bottom navigation bar in Merchant App, **When** rendered, **Then** it presents 5 balanced tabs: Dashboard, Listings, Orders, Insights, and Store Profile, maintaining consistent navigation without isolated fullscreen escapes.
3. **Given** the merchant header, **When** viewed, **Then** it displays store branding (CAD Bakery) and a clean "Customer View" toggle for quick role previews.

---

### User Story 2 - Real-Time Kitchen Orders Queue with Dynamic Counters (Priority: P2)

As a kitchen staff member preparing reserved surprise bags for pickup,  
I want to view incoming orders with live counts, dynamic date headers, and one-tap pickup verification,  
So that I can fulfill customer orders accurately during peak closing hours without misleading hardcoded numbers.

**Why this priority**: Kitchen orders represent real physical meals and financial transactions. Counters and dates must accurately reflect real state.

**Independent Test**: Open Orders tab in Merchant Portal. Verify that the date header displays today's current date (e.g., `Today, Oct 31`), filter tabs dynamically count pending and completed orders (`All (X)`, `Pending (Y)`, `Completed (Z)`), and clicking "Verify Pickup PIN" opens the streamlined verification interface.

**Acceptance Scenarios**:
1. **Given** the Orders screen, **When** orders are loaded from storage/API, **Then** filter pill counts dynamically match active order lengths (`All (X)`, `Pending (Y)`, `Completed (Z)`) with zero hardcoded numbers.
2. **Given** the date badge, **When** displayed, **Then** it dynamically shows the current calendar date instead of hardcoded `Nov 14`.
3. **Given** an active customer order, **When** staff clicks "Verify Pickup PIN", **Then** the PIN input opens immediately with one-touch confirmation.

---

### User Story 3 - High-Efficiency Counter PIN Verification UX (Priority: P3)

As a counter cashier validating a customer's digital pickup pass,  
I want an instant, auto-focusing 6-digit code verification tool with clear feedback and quick lookup,  
So that pickup handovers take under 5 seconds at the counter.

**Why this priority**: Directly impacts customer and merchant handover speed at closing time.

**Independent Test**: Navigate to "Verify Pickup", enter a 6-digit code (e.g., `742918`), verify that the matched order preview highlights immediately, and tapping "Confirm Handover" marks the order completed with a clean green success state.

**Acceptance Scenarios**:
1. **Given** the Verify Pickup view, **When** the staff types or pastes the customer's 6-digit code, **Then** the matching order details (items, price, customer name) appear in real time without lag.
2. **Given** a valid matching order, **When** "Confirm Handover" is tapped, **Then** the order status transitions to `COMPLETED`, broadcasts across tabs, and returns to the orders queue.
3. **Given** an invalid code, **When** entered, **Then** a calm, minimalist inline error message ("No active reservation matching this code") displays without disruptive popups.

---

## Edge Cases

- **Zero active orders**: Empty states in Orders and Listings must render calm, minimalist cards with purposeful Lucide icons (`PackageOpen`, `ClipboardList`) and actionable prompts ("Create New Surplus Batch").
- **Long listing descriptions**: Text must truncate cleanly (`line-clamp-2`) without wrapping pricing or stock badges.
- **Mobile keyboard overlay**: Ensure numeric inputs in Verify Pickup and Create Listing do not obscure action buttons on mobile screens.

---

## Functional Requirements

- **FR-001**: System MUST render a clean 5-tab bottom navigation bar (`Dashboard`, `Listings`, `Orders`, `Insights`, `Store`) across the Merchant Portal.
- **FR-002**: System MUST eliminate all decorative emojis and broken artifact characters (`▲ ▼`, `??`, `⌛`) across all Merchant UI strings, badges, toasts, and components.
- **FR-003**: System MUST calculate dynamic date badges and filter counts (`All`, `Pending`, `Completed`) dynamically based on real active orders in `MerchantOrders.jsx`.
- **FR-004**: System MUST adhere to Foodlink Constitution v1.1.0 design tokens: `#2E7D32` (Primary), `#FF8A3D` (Urgency), `#FAFAFA` (Canvas), `#FFFFFF` (Card), `border-stone-200/80`.
- **FR-005**: System MUST provide a clean "Customer View" role switcher in the Merchant top header for seamless developer/tester preview.
- **FR-006**: System MUST ensure minimum 44px touch targets on all mobile merchant buttons, switches, and tabs.
- **FR-007**: System MUST provide instant 6-digit PIN lookup and handover confirmation in `VerifyPickupPage.jsx`.

---

## Key Entities

- **Merchant Navigation Tab**:
  - `id`: `'dashboard'` | `'listings'` | `'orders'` | `'insights'` | `'profile'`
  - `label`: Display string
  - `icon`: Lucide React icon component

- **Merchant Metrics Highlight**:
  - `bagsListed`: Total bags listed today
  - `bagsSold`: Total bags rescued today
  - `revenue`: Revenue generated ($)
  - `pendingPickups`: Count of orders awaiting pickup

---

## Success Criteria

- **SC-001**: 100% compliance with Foodlink Constitution v1.1.0 (strictly zero emojis, clean typography, intentional Lucide SVG icons).
- **SC-002**: Merchant navigation provides 5 consistent tabs without isolated fullscreen breaks.
- **SC-003**: Zero hardcoded dates or counts in Kitchen Queue order filters.
- **SC-004**: Counter verification completes order handover in < 300ms.
- **SC-005**: Clean production build (`npm.cmd run build`) with zero errors.

---

## Assumptions

- Store operations are configured for partner store "CAD Bakery & Cafe" in Phnom Penh.
- Changes remain strictly isolated to `foodlink-ui/`. Legacy directories `customer/`, `merchant/`, and `server/` remain 100% untouched.

# Feature Specification: Unified Dual-Role Foodlink UI Application

**Feature Branch**: `001-unified-role-ui`  
**Created**: 2026-10-30  
**Status**: Draft  
**Input**: "do not change @[customer] and @[merchant] make another directory impletement the ui only as the this 2 user"

---

## 1. Objective & Scope

Create a new, isolated standalone front-end application directory (`foodlink-ui/`) that implements the complete UI for both the **Customer** and **Merchant** user roles within a single seamless interface.

### Strict Boundaries & Constraints
- **Zero Modifications to Legacy Folders**: The existing `customer/` and `merchant/` directories MUST remain completely untouched and unmodified.
- **UI-Only / Decoupled**: The application operates independently as a UI-first preview/client using robust, realistic mock data and state providers. No dependency on a running `server/` backend is required for UI interaction.
- **Unified Role Switcher**: A persistent global UI role switcher allows instant toggling between the **Customer Discovery & Checkout View** and the **Merchant Store Operations View**.

---

## 2. User Scenarios & Testing *(mandatory)*

### User Story 1 - Instant Role Switching & Navigation (Priority: P1)
As a stakeholder, developer, or reviewer testing the Foodlink platform, I want a persistent role switcher so that I can seamlessly switch between experiencing the app as a food-rescue Customer and operating as a Merchant partner without changing ports or tabs.

- **Why this priority**: Core architectural capability enabling dual-role demonstration in a single isolated application.
- **Independent Test**: Navigate to the application root, toggle the role switcher from "Customer" to "Merchant" and back, verifying that the layout, navigation, and theme immediately switch to the selected role's experience without page reload.
- **Acceptance Scenarios**:
  1. **Given** the app is open on the Customer view, **When** the user clicks the "Switch to Merchant" toggle in the header/switcher bar, **Then** the UI transitions immediately into the Merchant Portal (Dashboard, Active Listings, Orders, Analytics).
  2. **Given** the app is in the Merchant view, **When** the user clicks "Switch to Customer", **Then** the UI returns to the Customer Mobile/Feed view with preserved session state.

---

### User Story 2 - Complete Customer Experience (Priority: P1)
As a Customer interested in surplus food rescue, I want to explore nearby bakeries and food partners, filter closing-hour deals, view listing details with discount countdowns, and execute a simulated reservation/checkout with KHQR payment.

- **Why this priority**: Directly delivers the customer value proposition—discovering discounted surplus food and reserving it before store closing.
- **Independent Test**: Open Customer mode, browse listings, apply category filters (Bakery, Meals, Groceries), open a listing detail modal, proceed to checkout, and complete a simulated KHQR claim.
- **Acceptance Scenarios**:
  1. **Given** the Customer view is active, **When** the user selects category filters or search, **Then** matching surplus food items are displayed with original vs. discounted prices, savings badges, and countdown timers.
  2. **Given** an item is selected, **When** the user initiates checkout, **Then** the KHQR payment modal displays with simulated instant confirmation and pickup voucher generation.

---

### User Story 3 - Complete Merchant Operations Experience (Priority: P1)
As a Merchant partner (e.g. Cad Bakery), I want a dashboard to view daily revenue/meals saved, manage active surplus listings, create a new surplus listing with discount tiers, and verify customer pickup orders.

- **Why this priority**: Delivers the merchant-side operational loop required for store managers to list surplus and verify customer pickups.
- **Independent Test**: Switch to Merchant mode, view KPI metrics, create a new surplus item listing, and verify a pending customer order.
- **Acceptance Scenarios**:
  1. **Given** the Merchant view is active, **When** navigating to Listings, **Then** the merchant can view active items, edit stock, or fill the "Create Listing" form to publish a new surplus batch.
  2. **Given** pending orders exist, **When** navigating to Orders, **Then** the merchant can view incoming orders, review pickup codes, and mark orders as "Completed/Picked Up".

---

## 3. Design System & Tokens
All components in the new directory strictly follow the Foodlink Design Language:
- **Primary Color**: `#2E7D32` (action buttons, savings badges, confirmed badges)
- **Urgency Accent Color**: `#FF8A3D` (countdown timers, closing discounts)
- **Canvas Background**: `#FAFAFA`
- **Card Background**: `#FFF8F0`
- **Typography**: Inter (600 bold headings, clean tabular numbers)
- **Geometry**: `16px` rounded cards, `12px` rounded interactive buttons

---

## 4. Requirements & Non-Functional Goals
- **Self-Contained**: Contains its own `package.json`, Vite configuration, and Tailwind CSS v4 styling.
- **Zero Breaking Changes**: Existing `customer/`, `merchant/`, and `server/` folders remain 100% untouched.
- **Deterministic Mock Store**: In-memory state and mock datasets enable testing all workflows (browsing, ordering, merchant listing creation, pickup verification) without live backend errors.

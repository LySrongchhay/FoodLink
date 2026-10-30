# Feature Specification: Full-Fidelity Customer & Merchant Portals with Dual-Link QR Hosting

**Feature Branch**: `002-dual-link-identical-ui`  
**Created**: 2026-10-30  
**Status**: Clarified  
**Input**: "make the ui identical as @[merchant] and @[customer] to this first also our website should sperate the ui into 2 differente link for upcoming hostinf for 2 different qr"

---

## Clarifications

### Session 2026-10-30
- Q: How should the two distinct URLs (`/customer` and `/merchant`) handle routing to ensure the two QR codes work on any web host? → A: Hybrid Path & Query/Hash: Support clean URLs (`/customer`, `/merchant`) with auto-fallback (`?role=customer` / `#/customer`) for 100% static hosting compatibility without 404 rewrite errors.
- Q: When a visitor accesses the bare root URL (`/`), what should the application display? → A: Split Landing / Launcher: Display a clean welcome page with two clear action cards ("Customer Food Rescue" vs "Cad Bakery Merchant Hub") and their respective QR codes.
- Q: How should cross-role data (created listings, placed orders, inventory changes) be persisted? → A: LocalStorage Multi-Tab Sync: Persist listings, cart, and orders in `localStorage` so scanning/testing on different tabs or refreshing preserves state, with a "Reset Demo Data" option.

---

## 1. Objective & Scope

Upgrade `foodlink-ui/` to achieve **pixel-perfect visual and functional parity** with the original reference applications in `customer/` and `merchant/`, while introducing **independent URL routes/links** (`/customer` and `/merchant`) engineered for dedicated QR code hosting.

### Key Deliverables:
1. **Full-Fidelity Customer Portal**: Complete port of all `customer/` UI modules (Discover Feed, Map View, Listing Detail, Multi-Item Cart, Bakong KHQR Checkout, Active Pickup Voucher with PIN, Profile, Notifications).
2. **Full-Fidelity Merchant Portal**: Complete port of all `merchant/` UI modules (Store Dashboard, Inventory/Listings with Create/Edit flow, Incoming Orders queue, 4-digit PIN Pickup Verifier, ESG Analytics, Store Profile for Cad Bakery).
3. **Dual-Link Routing for Two QR Codes**:
   - **Link 1 (`/customer`, `?role=customer`, or `#/customer`)**: Direct mobile-first destination for **Customer Food Rescue QR** (storefront posters, table tents, flyers).
   - **Link 2 (`/merchant`, `?role=merchant`, or `#/merchant`)**: Direct tablet/desktop destination for **Merchant Hub QR** (counter staff, kitchen tablets, partner store management).
   - Clean URL routing compatible with static hosting (Vercel, Netlify, GitHub Pages) without routing collisions.
4. **Split Landing Launcher at Root (`/`)**: Welcome launcher with two large portal preview cards, live scannable QR code graphics for both destinations, and copyable URLs.
5. **Multi-Tab LocalStorage Persistence**: Interactive store state (listings, orders, inventory changes) persists in `localStorage` so opening both QR links in separate tabs or phones remains in live sync, complete with a "Reset Demo Data" trigger.

---

## 2. User Scenarios & Testing *(mandatory)*

### User Story 1 - Dedicated Link Access for Two Distinct QR Codes (Priority: P1)
As a platform operator, I want two separate, direct web links (`/customer` and `/merchant`) so that I can print two different QR codes—one for hungry customers to find food, and one for merchant partners to run store operations.

- **Why this priority**: Essential architectural requirement for the dual-QR physical deployment strategy.
- **Independent Test**: 
  - Scan / navigate to `http://localhost:5175/customer` (or `/?role=customer`) -> Opens the Customer App directly in full screen.
  - Scan / navigate to `http://localhost:5175/merchant` (or `/?role=merchant`) -> Opens the Cad Bakery Merchant Portal directly in full screen.
  - Navigate to root `http://localhost:5175/` -> Displays the Split Launcher with both QR codes.
- **Acceptance Scenarios**:
  1. **Given** a user scans Customer QR 1 (`/customer`), **When** the page loads, **Then** the application immediately renders the mobile-optimized Customer Discover Feed without prompting to select a role.
  2. **Given** store staff scans Merchant QR 2 (`/merchant`), **When** the page loads, **Then** the application immediately renders the Cad Bakery Merchant Hub without exposing customer navigation.
  3. **Given** a user opens the bare domain root `/`, **When** the page loads, **Then** the Split Landing page renders with cards and QR codes for both Customer and Merchant destinations.

---

### User Story 2 - Identical Customer UI Experience (Priority: P1)
As a food-rescue Customer, I want the full, rich discovery experience identical to `customer/`—including bottom tab navigation, ending-soon deals countdown, interactive category filtering, multi-item cart, simulated Bakong KHQR payment, and active pickup vouchers with PINs.

- **Why this priority**: Replicates the complete customer journey with high emotional appeal and urgency.
- **Independent Test**: Navigate to `/customer`, browse Ending Soon deals, filter categories, view listing detail, add item to cart, complete KHQR checkout, and view the active pickup voucher with 4-digit code.
- **Acceptance Scenarios**:
  1. **Given** the customer is on the Discover tab, **When** reviewing deals, **Then** they see the Ending Soon carousel with live countdowns, Popular Rescue Hubs, and Deals Near You with Cad Bakery branding.
  2. **Given** the customer taps the bottom navigation tabs, **When** switching between Discover, Explore/Map, Cart/Pickups, and Profile, **Then** the respective full views render with zero errors.
  3. **Given** the customer completes checkout, **When** payment succeeds, **Then** an active pickup order is generated displaying the 4-digit PIN and pickup QR.

---

### User Story 3 - Identical Merchant Operations Experience (Priority: P1)
As a Cad Bakery store manager, I want the full operations dashboard identical to `merchant/`—including KPI metric cards, store open/closed toggle, order notification audio controls, inventory listing creation with allergen tags, incoming order management, and 4-digit PIN verification.

- **Why this priority**: Replicates the operational toolset required for store partners to run surplus clearance.
- **Independent Test**: Navigate to `/merchant`, toggle store open/close state, open "Create Listing" with photo and discount preview, review incoming orders, and verify customer pickup codes.
- **Acceptance Scenarios**:
  1. **Given** the merchant is on the Merchant Hub, **When** inspecting the dashboard, **Then** they see Cad Bakery metrics (Today's revenue, rescued meals, active inventory, pending pickups).
  2. **Given** the merchant creates a new surplus listing, **When** the form is saved, **Then** the item appears in the inventory list and is immediately discoverable on `/customer`.
  3. **Given** a customer arrives at the store with a 4-digit PIN, **When** the merchant enters the code in Verify Pickup, **Then** the order is validated and marked fulfilled.

---

## 3. Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST support hybrid routing: clean paths (`/customer` and `/merchant`), query parameters (`?role=customer` and `?role=merchant`), and hash fragments (`#/customer` and `#/merchant`) to ensure 100% compatibility across static hosts and local dev.
- **FR-002**: System MUST render the complete Customer bottom navigation bar with 4 tabs: **Discover** (Feed & Carousels), **Explore** (Interactive Map / Radius View), **Pickups** (Active Vouchers & Cart), and **Profile** (Environmental impact & user stats).
- **FR-003**: Customer portal MUST include the complete **EndingSoonSection**, **PopularRescueHubs**, **DealsNearYou**, and **HeroPromoBanner** components identical to `customer/src/components/customer/`.
- **FR-004**: Customer portal MUST include the simulated **Bakong KHQR payment flow** and **CustomerActivePickup** voucher with big 4-digit PIN and QR code.
- **FR-005**: System MUST render the complete Merchant Hub navigation tabs: **Dashboard**, **Listings**, **Orders**, **Analytics/Insights**, and **Store Profile**.
- **FR-006**: Merchant portal MUST include **CreateListingPage** supporting title, description, category, original vs discount price calculation, quantity, unit, pickup window, and allergen tags.
- **FR-007**: Merchant portal MUST include **VerifyPickupPage** with numeric PIN input and validation feedback.
- **FR-008**: System MUST maintain cross-portal reactive state synchronization in `StoreContext`: listings created in Merchant mode appear on Customer feed; orders placed by Customer appear in Merchant order queue.
- **FR-009**: System MUST preserve existing legacy directories `customer/`, `merchant/`, and `server/` with **zero modifications**.
- **FR-010**: System MUST include a collapsible "Dual QR Demo Assistant" pill allowing reviewers to inspect both direct QR links and copy their standalone URLs.
- **FR-011**: System MUST render a Split Landing Launcher at root (`/`) featuring side-by-side portal preview cards with live scannable QR codes for both Customer and Merchant destinations.
- **FR-012**: System MUST synchronize store state (listings, cart, orders) with browser `localStorage` across open tabs and provide a "Reset Demo Data" action.

---

## 4. Key Entities

- **Customer Session**: Active screen (`discover` | `explore` | `listing-detail` | `checkout` | `reserved` | `profile`), cart items, active pickup orders, notifications.
- **Merchant Session**: Active tab (`dashboard` | `listings` | `orders` | `insights` | `profile`), sub-view (`create-listing` | `verify-pickup`), store open/closed status.
- **Surplus Listing**: ID, merchant ID/name/logo, title, description, category, original price, discount price, quantity available, pickup window, allergens, image URL.
- **Rescue Order**: Order number, listing details, customer ID, quantity, total price, 4-digit pickup code, status (`RESERVED` | `COMPLETED` | `CANCELLED`), timestamps.

---

## 5. Success Criteria *(mandatory)*

- **SC-001**: Direct URL navigation to `/customer` or `?role=customer` loads the customer experience in under 1 second without showing merchant UI.
- **SC-002**: Direct URL navigation to `/merchant` or `?role=merchant` loads the merchant hub in under 1 second without showing customer UI.
- **SC-003**: Accessing the root URL `/` renders the Split Launcher with scannable QR codes for both portals.
- **SC-004**: Visual inspection confirms component and layout parity with `customer/` and `merchant/` reference designs.
- **SC-005**: Production build (`npm.cmd run build`) passes with 0 errors.
- **SC-006**: 100% boundary compliance: `git status` confirms zero files modified in `customer/` or `merchant/`.

---

## 6. Assumptions

- Both portals run off a unified reactive state provider (`StoreContext`) synchronized through `localStorage` for interactive multi-device / multi-tab previewing.
- URL routing will use lightweight browser history and URLSearchParams detection so that any web host (Vercel, Netlify, GitHub Pages, or local Vite) supports both direct links without 404 rewrite issues.

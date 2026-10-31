# Feature Specification: Reliable Reserve & Confirm with 6-Digit Verification Code

**Feature Branch**: `007-fix-reserve-confirm`  
**Created**: 2026-10-31  
**Status**: Specified  
**Input**: User description: "Fix customer reserve and confirm checkout, generate 6-digit pickup verification code, prevent websocket offline failure"

---

## Overview & Background

When a customer clicks "Reserve Now" and proceeds to "Confirm & Reserve" on a listing checkout in Foodlink, the checkout currently attempts an unhandled HTTP/WebSocket connection to `http://localhost:5000`. In offline/mock mode (or when no local backend server is running on port 5000), this causes:
1. Console error spam: `WebSocket connection to 'ws://localhost:5000/socket.io/?EIO=4&transport=websocket' failed: websocket.js:119`.
2. Checkout button hanging or failing to transition to the reserved pickup pass.
3. If an order does transition, stale state in `CustomerActivePickup.jsx` causes `isVerified` to stay `true` from previous orders, hiding the newly generated 6-digit code behind the "Completed" screen.
4. Newly reserved orders are not instantly visible in the Merchant kitchen queue for verification.

This specification defines the complete end-to-end checkout, verification code generation, resilient socket handling, and merchant kitchen synchronization.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - 100% Reliable Reserve & Confirm with 6-Digit Code (Priority: P1)

As a customer browsing surplus food listings,  
I want to click "Reserve Now", confirm my reservation, and immediately receive a digital pickup pass with a unique 6-digit pickup verification code (e.g., `742918`),  
So that I can present this code at the store counter to collect my food without delays or server errors.

**Why this priority**: Core value proposition of Foodlink. Customers must be able to claim meals and receive a pickup code 100% reliably, even when running fully offline or in demo mode.

**Independent Test**: Navigate to Explore or Home tab, click on any listing (e.g., "Artisan Sourdough Loaves"), click "Reserve Now", click "Confirm & Reserve". The app must immediately (within 300ms) transition to the Active Pickup screen displaying the unique 6-digit code in dedicated monospace digit blocks.

**Acceptance Scenarios**:
1. **Given** any surplus listing with available quantity, **When** the user clicks "Reserve Now" and confirms in the checkout modal, **Then** a new order is created with a freshly generated 6-digit numeric pickup code (e.g., `839201`).
2. **Given** a newly created order, **When** the Active Pickup screen opens, **Then** it resets any previous completion state (`isVerified = false`), displays the 6-digit pickup code prominently in monospace digit blocks, displays the store name, store address, pickup window, countdown timer, and "Show pass at counter".
3. **Given** the backend server on `localhost:5000` is offline or unreachable, **When** the customer clicks "Confirm & Reserve", **Then** the reservation does NOT hang, does NOT fail, and falls back seamlessly to offline local storage order creation within 300ms.

---

### User Story 2 - Instant Sync to Merchant Kitchen & Counter Verification (Priority: P2)

As a merchant using the Merchant Hub in another tab or role switch,  
I want newly reserved customer orders to appear immediately in my Kitchen Orders queue with their 6-digit code and item details,  
So that when the customer arrives and reads out their 6-digit code, I can verify it in the "Verify Pickup" counter tool.

**Why this priority**: The 6-digit code must be actionable by both parties. The merchant must see the customer's reservation in their queue and be able to verify the 6-digit code.

**Independent Test**: Reserve an item in the Customer App. Switch to Merchant Hub -> Orders tab. The new order must appear at the top of the "Pending" orders list. In "Verify Pickup", entering the 6-digit code must successfully verify the order.

**Acceptance Scenarios**:
1. **Given** a newly reserved order in the customer app, **When** the reservation completes, **Then** the order is broadcast via `liveDropChannel` (BroadcastChannel) and saved into `foodlink_merchant_orders` and `foodlink_demo_store_v2`.
2. **Given** the merchant enters the matching 6-digit code into `VerifyPickupPage.jsx`, **When** they click "Verify Pickup", **Then** the order status changes to `COMPLETED`, marked as picked up, and a success confirmation displays.
3. **Given** the merchant completes verification, **When** the customer looks at their Active Pickup screen, **Then** the screen reactively transitions to "Completed / Rescued" with impact statistics (CO2 saved, meals rescued).

---

### User Story 3 - Clean Socket & Network Resilience (Priority: P3)

As a developer and user of Foodlink,  
I want the application to suppress noisy failed WebSocket connection retries to `localhost:5000` when no backend server is active,  
So that the browser console remains clean and CPU/network resources are not wasted on infinite reconnection loops.

**Why this priority**: Fulfills Constitution Principle I (Zero External Dependency Gate: system must run 100% offline without errors).

**Independent Test**: Open browser DevTools Console on fresh launch on `localhost:5173`. There should be zero `ws://localhost:5000` connection failure errors logged.

**Acceptance Scenarios**:
1. **Given** `VITE_SOCKET_URL` is not defined and no backend server is responding, **When** `socket.js` initializes, **Then** it does not attempt blind aggressive auto-connects to port 5000.
2. **Given** no backend server is running, **When** `reserveListing` is invoked, **Then** it aborts any unreachable HTTP fetch within 600ms or detects offline mode immediately and serves the reservation locally.

---

## Edge Cases

- **Existing completed order in state**: When switching between previous demo orders (which may already be marked `COMPLETED`) and a newly placed reservation, `CustomerActivePickup.jsx` must re-evaluate `isVerified` on order ID/code change and never get stuck on the "Completed" screen for a pending order.
- **Duplicate reservation attempts**: Rapid double-clicks on "Confirm & Reserve" button must be disabled while reservation is processing.
- **Offline / Tab disconnect**: If BroadcastChannel is unsupported in legacy webviews, fallback to `localStorage` event listener ensures cross-tab synchronization.
- **Invalid pickup code entered by merchant**: Entering a non-matching code displays a clear, minimalist error message ("Invalid pickup code. Check digits with customer.") without breaking app state.

---

## Functional Requirements

- **FR-001**: System MUST generate a unique 6-digit numeric pickup code (random string of 6 digits from `000000` to `999999`) for every newly created reservation.
- **FR-002**: System MUST immediately update Customer state with the new reservation and navigate to the Active Pickup view upon confirmation.
- **FR-003**: System MUST reset `CustomerActivePickup` verification status whenever a new order is received as props, displaying the 6-digit pass until verified.
- **FR-004**: System MUST store the newly created reservation in `foodlink_merchant_orders` and dispatch real-time events (`liveDropChannel`) so the Merchant Orders list updates without manual page reload.
- **FR-005**: System MUST wrap API reservation calls with an immediate fallback/timeout mechanism to guarantee sub-300ms reservation completion in offline mode.
- **FR-006**: System MUST disable automatic WebSocket reconnections to `localhost:5000` unless an explicit backend URL is provided or server availability is confirmed.
- **FR-007**: System MUST adhere to Foodlink Constitution v1.1.0: minimalist UI, strictly zero emojis, and purposeful Lucide SVG iconography.

---

## Key Entities

- **Order / Reservation**:
  - `id`: Unique identifier (e.g., `ord-1730335200000-742918`).
  - `orderNumber`: Human-readable identifier (e.g., `#FL-74291`).
  - `listingId`: ID of the reserved surplus listing.
  - `title` / `item`: Listing name (e.g., `Artisan Sourdough Loaves`).
  - `storeName`: Merchant store name (e.g., `Backyard Cafe`).
  - `storeAddress`: Physical pickup location in Phnom Penh.
  - `pickupCode`: 6-digit numeric string (e.g., `742918`).
  - `pickupWindow`: Pickup hours (e.g., `18:00 - 20:30`).
  - `quantity`: Quantity reserved.
  - `totalPrice`: Reservation price (USD).
  - `co2SavedKg`: Estimated CO2 emissions avoided.
  - `status`: `PENDING` | `COMPLETED` | `CANCELLED`.
  - `createdAt`: ISO timestamp.

---

## Success Criteria

- **SC-001**: 100% of reservations clicked in the Customer app transition to the Digital Pickup Pass in < 300ms without errors.
- **SC-002**: The 6-digit pickup code is prominently visible in individual digit boxes with monospace styling.
- **SC-003**: DevTools Console logs zero unhandled `ws://localhost:5000` WebSocket connection failures.
- **SC-004**: Verifying the 6-digit code in Merchant Hub immediately marks the customer pickup pass as `COMPLETED`.
- **SC-005**: 100% compliance with Foodlink Constitution v1.1.0 (zero emojis, clean typography, minimalist design).

---

## Assumptions

- Foodlink runs primarily in client-only demo/prototype mode using Vite on port 5173.
- All persistent state between customer and merchant tabs uses browser `localStorage` and `BroadcastChannel`.
- Backend server integration remains supported when `VITE_API_URL` and `VITE_SOCKET_URL` environment variables are explicitly configured.
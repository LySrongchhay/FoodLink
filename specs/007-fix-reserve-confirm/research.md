# Research & Root Cause Resolution: Fix Reserve & Confirm Checkout

**Feature**: `007-fix-reserve-confirm`  
**Date**: 2026-10-31  

---

## 1. Problem Diagnosis & Root Causes

### Root Cause 1: WebSocket Flooding to `localhost:5000`
- **Location**: `foodlink-ui/src/services/api.js` (lines 26-39) and `foodlink-ui/src/services/socket.js` (lines 3-14).
- **Issue**: `const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || (isLocalhost ? 'http://localhost:5000' : '');`
  When testing locally on Vite (`http://localhost:5173`), `isLocalhost` evaluates to `true`. This assigns `http://localhost:5000` as the socket URL and executes `io(SOCKET_URL, { autoConnect: true })`.
- **Symptom**: Because no Node.js backend server is running on port 5000, `socket.io-client` initiates an aggressive, infinite reconnection loop to `ws://localhost:5000/socket.io/?EIO=4&transport=websocket`, logging red console errors every second.
- **Resolution**:
  - Only initiate `io(...)` if `import.meta.env.VITE_SOCKET_URL` is explicitly defined in environment or if configured to connect.
  - When `VITE_SOCKET_URL` is omitted, supply an immediate, safe mock socket object (`{ on: () => {}, off: () => {}, emit: () => {}, connected: false }`) that absorbs calls cleanly without network attempts.
  - In `api.js` and `socket.js`, unify the socket instance to prevent duplicate connections.

---

### Root Cause 2: Unhandled / Hanging Remote HTTP Fetch in `reserveListing`
- **Location**: `foodlink-ui/src/services/api.js` (lines 1403-1413).
- **Issue**: `const res = await fetch(`${API_BASE_URL}/orders`, ...)`
  `API_BASE_URL` also defaults to `http://localhost:5000/api` on localhost. Unlike quick HTTP failure, browser `fetch` against an unallocated localhost port in some environments waits up to 20-30 seconds for TCP connection timeout before throwing, locking the UI in a loading/hanging state.
- **Symptom**: User clicks "Confirm & Reserve" or "Reserve Now", and the button hangs or throws an unhandled error, failing to transition to the digital pickup pass.
- **Resolution**:
  - Add an `AbortController` with a fast 400ms timeout for network requests when running against localhost.
  - If `VITE_API_URL` is not set or network fails/times out, immediately generate the deterministic local order with a unique 6-digit code, persist it to localStorage, and broadcast across tabs.

---

### Root Cause 3: Stale Verification State in `CustomerActivePickup.jsx`
- **Location**: `foodlink-ui/src/components/customer/CustomerActivePickup.jsx` (lines 33-35).
- **Issue**:
  ```javascript
  const currentActiveOrder = order;
  const [isVerified, setIsVerified] = useState(currentActiveOrder?.status === 'COMPLETED');
  ```
  `isVerified` is initialized once when the component mounts. When a customer places a new reservation, `order` prop changes with status `PENDING`, but `isVerified` remains `true` from a previous completed order.
- **Symptom**: The customer immediately sees the "Completed / Rescued" celebration screen instead of the active 6-digit pickup pass!
- **Resolution**:
  - Add a reactive `useEffect`:
    ```javascript
    useEffect(() => {
      setIsVerified(order?.status === 'COMPLETED');
    }, [order?.id, order?.pickupCode, order?.status]);
    ```
  - Whenever a new order is passed in, `isVerified` resets to `false`, displaying the monospace 6-digit code pass until the merchant explicitly verifies it.

---

### Root Cause 4: Order Payload Missing Store Details for Pass Display
- **Location**: `foodlink-ui/src/services/api.js` fallback order creation (lines 1414-1440).
- **Issue**: The fallback `demoOrder` only included `id`, `orderNumber`, `pickupCode`, `digits`, `customerName`, `customerEmail`, `items`, `totalPrice`. It omitted `storeName`, `storeAddress`, `pickupWindow`, `co2SavedKg`.
- **Symptom**: The digital pickup pass card displayed empty or missing store address and pickup time details.
- **Resolution**:
  - Resolve store details from the first reserved item's listing (or store registry), populating:
    - `storeName`: e.g., `"CAD Bakery & Cafe"`
    - `storeAddress`: e.g., `"No. 42, Street 310, BKK1, Phnom Penh"`
    - `pickupWindow`: e.g., `"18:30 - 20:30"`
    - `co2SavedKg`: e.g., `0.8`

---

### Root Cause 5: Merchant Kitchen Queue Synchronization
- **Location**: `foodlink-ui/src/context/StoreContext.jsx`.
- **Issue**: `StoreContext` maintains merchant state in `foodlink_demo_store_v2`. When customer creates an order, `reserveListing` saves to `foodlink_merchant_orders`. But `StoreContext` was not listening to `liveDropChannel` for `ORDER_CREATED` events.
- **Symptom**: When switching from Customer to Merchant Hub in another tab or viewport, the merchant order list did not immediately contain the new order.
- **Resolution**:
  - In `reserveListing`, broadcast `{ type: 'ORDER_CREATED', order: demoOrder }` over `liveDropChannel`.
  - In `StoreContext.jsx`, add a listener on `liveDropChannel` for `ORDER_CREATED` to prepend the incoming order to `state.orders` and decrement listing stock.
  - When merchant verifies the code in `VerifyPickupPage.jsx`, `StoreContext` broadcasts `ORDER_VERIFIED` (already implemented), which triggers `CustomerActivePickup.jsx` to transition to "Completed / Rescued".

---

## 2. Minimalist UX & Constitution Alignment
- Remove broken `??` placeholders from `CustomerActivePickup.jsx`.
- Ensure clean Lucide SVG icons (`Clock`, `MapPin`, `CheckCircle2`, `Leaf`).
- Zero emojis per Constitution v1.1.0.


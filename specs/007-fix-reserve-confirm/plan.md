# Implementation Plan: Fix Reserve & Confirm Checkout & 6-Digit Code Generation

**Branch**: `007-fix-reserve-confirm` | **Date**: 2026-10-31 | **Spec**: [specs/007-fix-reserve-confirm/spec.md](file:///d:/DGIY/foodlink-2/specs/007-fix-reserve-confirm/spec.md)

**Input**: Feature specification from `specs/007-fix-reserve-confirm/spec.md`

## Summary

Resolve the Customer checkout reservation failure, generate a deterministic 6-digit verification code pass, remove aggressive WebSocket reconnection errors when offline, and establish instant cross-tab synchronization between Customer Active Pickup and Merchant Kitchen queue.

## Technical Context

**Language/Version**: JavaScript (ES2022+), React 18  
**Primary Dependencies**: React, Lucide React, Tailwind CSS, socket.io-client (optional/safe mode)  
**Storage**: Browser LocalStorage (`foodlink_merchant_orders`, `foodlink_demo_store_v2`, `foodlink_active_order_*`)  
**Communication**: BroadcastChannel (`foodlink_live_channel`), window storage events  
**Testing**: Manual cross-role interaction testing, automated build verification (`npm.cmd run build`)  
**Target Platform**: Desktop and Mobile modern evergreen browsers (Chrome, Edge, Safari, Firefox)  
**Project Type**: React Single Page Application (`foodlink-ui/`)  
**Performance Goals**: Sub-300ms reservation transition, 0ms idle socket reconnect overhead  
**Constraints**: 100% offline-first capable without live backend requirement. Zero modifications to legacy `customer/`, `merchant/`, or `server/` directories. Strict adherence to Foodlink Constitution v1.1.0 (minimalist UX, strictly zero emojis).

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Principle I (UI-First & Decoupled Architecture)**: Operates on deterministic local mock and reactive BroadcastChannel without hard backend server dependencies.
- [x] **Principle II (Two-Sided Domain Separation)**: Customer reservation updates customer pickup state; Merchant kitchen verifies code; distinct viewports and decoupled contexts.
- [x] **Principle III (Design System Consistency & Minimalist UX)**: Zero emojis; intentional Lucide React icons only; clear monospace 6-digit code boxes; clean card hierarchy.
- [x] **Principle IV (Contract-First Mock Data)**: Follows `contracts/reserve-order.json` schema.
- [x] **Principle V (Simplicity & Incremental Delivery / YAGNI)**: Lightweight browser pub/sub and state synchronization, no complex external services.
- [x] **Isolation Gate**: Changes strictly isolated to `foodlink-ui/`.

## Project Structure

### Documentation (this feature)

```text
specs/007-fix-reserve-confirm/
├── spec.md              # Feature specification
├── plan.md              # Implementation plan
├── research.md          # Problem root causes and resolutions
├── data-model.md        # Entity definitions and state lifecycle
├── quickstart.md        # End-to-end verification steps
├── contracts/
│   └── reserve-order.json # Schema contract for order creation
└── checklists/
    └── requirements.md  # Quality checklist
```

### Source Code (`foodlink-ui/`)

```text
foodlink-ui/src/
├── services/
│   ├── api.js           # Socket quiet mode, fast timeout, full demo order generation & broadcast
│   └── socket.js        # Safe mock fallback when VITE_SOCKET_URL is not configured
├── components/customer/
│   ├── CustomerApp.jsx  # Reserve flow, instant transition, active order state
│   └── CustomerActivePickup.jsx # Reactive isVerified sync on order change, digit boxes, clean icons
└── context/
    └── StoreContext.jsx # BroadcastChannel listener for ORDER_CREATED, order addition, verifyPickup
```

## Implementation Phases

### Phase 1: Socket & API Resilience
- Modify `foodlink-ui/src/services/socket.js` and `foodlink-ui/src/services/api.js`:
  - Only auto-connect `io()` if `import.meta.env.VITE_SOCKET_URL` is explicitly set.
  - Return a safe no-op mock socket object when no socket URL is provided, preventing `ws://localhost:5000` console spam.
  - In `reserveListing`, add a 400ms `AbortController` timeout for network requests, falling back immediately to local order creation.
  - Ensure the fallback order contains all necessary pass fields: `id`, `orderNumber`, `pickupCode`, `digits`, `storeName`, `storeAddress`, `pickupWindow`, `co2SavedKg`, `totalPrice`, `items`.
  - Broadcast `{ type: 'ORDER_CREATED', order: demoOrder }` over `liveDropChannel`.

### Phase 2: Reactive Digital Pickup Pass
- In `foodlink-ui/src/components/customer/CustomerActivePickup.jsx`:
  - Add `useEffect` on `[order?.id, order?.pickupCode, order?.status]` to reset `isVerified` to `order?.status === 'COMPLETED'`.
  - Fix any broken `??` placeholders, replacing them with clean Lucide icons (`MapPin`, `Clock`).
  - Maintain the monospace 6-digit box layout (`w-10 h-13` border boxes) with "SHOW PASS AT COUNTER".

### Phase 3: Merchant Queue & Verification Sync
- In `foodlink-ui/src/context/StoreContext.jsx`:
  - Add `useEffect` listener on `liveDropChannel` for `ORDER_CREATED` to prepend new orders to `state.orders` and decrement listing stock.
  - Maintain `ORDER_VERIFIED` broadcast on verification to complete the customer pass.

### Phase 4: Validation & Quality Gate Verification
- Run `npm.cmd run build` inside `foodlink-ui/`.
- Verify zero changes in `customer/`, `merchant/`, `server/`.
- Verify zero emojis in new/updated code.

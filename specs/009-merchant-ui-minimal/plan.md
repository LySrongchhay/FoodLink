# Implementation Plan: Minimalist Merchant UI & UX Enhancement

**Branch**: `009-merchant-ui-minimal` | **Date**: 2026-10-31 | **Spec**: [specs/009-merchant-ui-minimal/spec.md](file:///d:/DGIY/foodlink-2/specs/009-merchant-ui-minimal/spec.md)

**Input**: Feature specification from `specs/009-merchant-ui-minimal/spec.md`

## Summary

Modernize the Foodlink Merchant Portal (`MerchantApp.jsx`, `MerchantDashboard.jsx`, `MerchantOrders.jsx`, `VerifyPickupPage.jsx`, `MerchantProfile.jsx`) to adhere strictly to Foodlink Constitution v1.1.0. Implement a 5-tab persistent bottom navigation bar, eliminate stray symbols and desktop hover stutter, introduce dynamic kitchen queue date/order counts, add a header "Customer View" toggle, and arrange primary dashboard actions in a compact 2-column mobile grid.

## Technical Context

**Language/Version**: JavaScript (ES2022+), React 18  
**Primary Dependencies**: React, Lucide React, Tailwind CSS  
**Target Platform**: Mobile-first evergreen browsers (iOS Safari, Android Chrome, Desktop)  
**Project Type**: React Single Page Application (`foodlink-ui/`)  
**Performance Goals**: 60fps smooth touch interaction, sub-300ms verification lookup  
**Constraints**: 100% offline-first capable. Zero modifications to `customer/`, `merchant/`, or `server/` legacy directories. Strict adherence to Foodlink Constitution v1.1.0 (minimalist UX, strictly zero emojis).

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Principle I (UI-First & Decoupled Architecture)**: Self-contained merchant UI improvements driven by local reactive store state.
- [x] **Principle II (Two-Sided Domain Separation)**: Distinct merchant operational workflow, decoupled from customer discovery.
- [x] **Principle III (Design System Consistency & Minimalist UX)**: Zero emojis; clean Inter typography; 2-column mobile action bar; no gratuitous hover wobbles; standard design tokens.
- [x] **Principle IV (Contract-First Mock Data)**: Uses existing order contracts and dynamic dates.
- [x] **Principle V (Simplicity & Incremental Delivery / YAGNI)**: Eliminates unreferenced orphan components (`MerchantNavbar.jsx`, `MerchantView.jsx`) and consolidates navigation into `MerchantApp.jsx`.
- [x] **Isolation Gate**: Changes strictly isolated to `foodlink-ui/`.

## Project Structure

### Documentation (this feature)

```text
specs/009-merchant-ui-minimal/
├── spec.md              # Feature specification
├── plan.md              # Implementation plan
├── research.md          # Component audit and findings
├── quickstart.md        # Verification guide
└── checklists/
    └── requirements.md  # Quality checklist
```

### Source Code (`foodlink-ui/`)

```text
foodlink-ui/src/
├── components/merchant/
│   └── MerchantApp.jsx                      # 5-tab persistent bottom nav, header cleanup & Customer View button
└── pages/
    ├── Dashboard/
    │   └── MerchantDashboard.jsx            # 2-column action bar, clean tokens, remove emojis & hover stutter
    ├── Orders/
    │   ├── MerchantOrders.jsx               # Dynamic current date, dynamic filter counts (All, Pending, Completed)
    │   └── VerifyPickupPage.jsx             # 6-digit PIN input styling and instant order lookup feedback
    └── StoreProfile/
        └── MerchantProfile.jsx              # Seamless inline profile within app shell
```

## Implementation Phases

### Phase 1: Shell & Navigation Modernization
- In `foodlink-ui/src/components/merchant/MerchantApp.jsx`:
  - Upgrade bottom navigation bar to 5 persistent tabs: **Dashboard**, **Listings**, **Orders**, **Insights**, **Store Profile** (`Store` icon).
  - Keep bottom navigation persistent when viewing Store Profile (`activeTab === 'profile'`).
  - In header, remove raw ASCII dropdown `▲ ▼` next to CAD Bakery.
  - Add a clean "Customer View" toggle in the top header.

### Phase 2: Dashboard Cleanliness & 2-Column Action Bar
- In `foodlink-ui/src/pages/Dashboard/MerchantDashboard.jsx`:
  - Replace vertical stacked buttons with a 2-column action bar:
    - `+ New Batch` (Primary `#2E7D32`)
    - `Verify PIN` (White card with `KeyRound` / `QrCode`)
  - Remove all stray emojis (`⌛`), broken `??` placeholders, and desktop hover rotations/lifts (`group-hover:rotate-6`, `hover:-translate-y-1`).
  - Standardize cards with `border-stone-200/80` and Inter typography.

### Phase 3: Dynamic Kitchen Orders Queue & PIN Verification
- In `foodlink-ui/src/pages/Orders/MerchantOrders.jsx`:
  - Calculate dynamic date badge (`Today, ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`).
  - Dynamically calculate filter counts: `All (${total})`, `Pending Pickup (${pending})`, `Completed (${completed})`.
  - Replace hardcoded pickup window with dynamic order schedule.
- In `foodlink-ui/src/pages/Orders/VerifyPickupPage.jsx`:
  - Refine 6-digit PIN input with high-contrast monospace boxes and instant match preview.

### Phase 4: Polish & Quality Gate Verification
- Clean up or delete unreferenced orphan components (`foodlink-ui/src/components/merchant/MerchantNavbar.jsx`, `MerchantView.jsx`) if confirmed unused.
- Execute `npm.cmd run build` inside `foodlink-ui/`.
- Verify `git status --porcelain customer merchant server` produces zero output.
- Verify 100% absence of emojis in modified merchant files.

# Implementation Plan: Remove Floating Switch Link Pill for Clean Mobile UX

**Branch**: `008-remove-floating-switch-link` | **Date**: 2026-10-31 | **Spec**: [specs/008-remove-floating-switch-link/spec.md](file:///d:/DGIY/foodlink-2/specs/008-remove-floating-switch-link/spec.md)

**Input**: Feature specification from `specs/008-remove-floating-switch-link/spec.md`

## Summary

Remove the floating `Switch Link ^` overlay widget (`PortalSwitcherFloating.jsx`) from `foodlink-ui/src/App.jsx` to prevent it from overlapping mobile navigation bars, bottom sheets, and checkout CTA buttons. Rehome role switching into standard mobile Profile tab settings and URL query parameter routing.

## Technical Context

**Language/Version**: JavaScript (ES2022+), React 18  
**Primary Dependencies**: React, Lucide React, Tailwind CSS  
**Target Platform**: Mobile-first evergreen browsers (iOS Safari, Android Chrome, Desktop)  
**Project Type**: React Single Page Application (`foodlink-ui/`)  
**Performance Goals**: 0 DOM nodes for unused overlays, 100% unobstructed touch accessibility  
**Constraints**: Zero modifications to `customer/`, `merchant/`, or `server/` legacy directories. Strict adherence to Foodlink Constitution v1.1.0 (minimalist UX, strictly zero emojis).

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Principle I (UI-First & Decoupled Architecture)**: Eliminates UI layout collisions and preserves modularity.
- [x] **Principle II (Two-Sided Domain Separation)**: Moves role-switching to account settings rather than a global overlapping widget.
- [x] **Principle III (Design System Consistency & Minimalist UX)**: Eliminates intrusive floating overlays; restores clean whitespace and touch clearance.
- [x] **Principle IV (Contract-First Mock Data)**: Preserves existing router hooks (`usePortalRouter`).
- [x] **Principle V (Simplicity & Incremental Delivery / YAGNI)**: Eliminates unnecessary floating widget logic.
- [x] **Isolation Gate**: Changes strictly isolated to `foodlink-ui/`.

## Project Structure

### Documentation (this feature)

```text
specs/008-remove-floating-switch-link/
├── spec.md              # Feature specification
├── plan.md              # Implementation plan
├── research.md          # Mobile viewport analysis and decision
├── quickstart.md        # Mobile clearance verification steps
└── checklists/
    └── requirements.md  # Quality checklist
```

### Source Code (`foodlink-ui/`)

```text
foodlink-ui/src/
├── App.jsx                                  # Remove <PortalSwitcherFloating />
├── components/customer/
│   └── CustomerProfile.jsx                  # Add clean "Switch to Merchant Hub" account setting
└── components/merchant/
    └── MerchantNavbar.jsx                   # Add clean "Switch to Customer App" link
```

## Implementation Phases

### Phase 1: Core Overlay Removal
- In `foodlink-ui/src/App.jsx`:
  - Remove `<PortalSwitcherFloating />` component render.
  - Remove `import PortalSwitcherFloating from './components/common/PortalSwitcherFloating';`.

### Phase 2: Natural Role Switching Placement
- In `foodlink-ui/src/components/customer/CustomerProfile.jsx`:
  - Add a minimalist "Merchant Portal Access" / "Switch to Merchant Hub" action item at the bottom of the profile settings utilizing `usePortalRouter().navigateTo('merchant')`.
- In `foodlink-ui/src/components/merchant/MerchantNavbar.jsx`:
  - Ensure standard navigation to Customer view (`navigateTo('customer')`) is available.

### Phase 3: Validation & Build Verification
- Execute `npm.cmd run build` inside `foodlink-ui/`.
- Verify `git status --porcelain customer merchant server` produces zero output.
- Verify mobile clearance at 390px viewport.

<!--
Sync Impact Report:
- Version change: 1.0.0 → 1.1.0
- List of modified principles:
  - PRINCIPLE_3: Expanded from "III. Design System Consistency" to "III. Design System Consistency & Minimalist UX" with explicit No-Emoji mandate, intentional iconography constraint (icons only when needed for UX), and clean layout rules.
- Added sections:
  - Minimalist UX & Iconography Gate in Development Workflow & Quality Gates
- Removed sections: None
- Follow-up TODOs: None
-->

# Foodlink Constitution

## Core Principles

### I. UI-First & Decoupled Architecture
All user-facing workflows MUST be developed, prototyped, and validated UI-first in React.js before coupling with backend services or databases. UI components MUST operate on deterministic mock data stores without hard dependencies on live backend endpoints. Rationale: Rapid customer and merchant UX iteration requires zero barrier to preview and test layouts, state transitions, and interactive flows.

### II. Two-Sided Domain Separation
The platform MUST cleanly delineate the Customer experience (surplus food discovery, closing-hour discount feeds, reserve/order) from the Merchant experience (store operations, inventory management, discount pricing controls, pickup fulfillment). Shared logic or design tokens MUST live in designated shared modules without creating circular dependencies. Rationale: Customers and merchants operate with distinct mental models, viewports, and performance expectations.

### III. Design System Consistency & Minimalist UX
All user interfaces MUST strictly adhere to the Foodlink minimalist design language and high-fidelity UX standards:
- **Clean Modern Minimalism**: Layouts MUST prioritize whitespace, scannability, and typographic hierarchy over ornamental noise. Elements must never feel crowded or visually chaotic.
- **Strict No-Emoji Mandate**: Emojis (e.g., 🔥, ⏰, 🍲, ✅, 🎉, 🛍, 🧺, 🏬) MUST NOT be used in UI copy, badges, titles, buttons, notifications, or layout elements. Professional typographic hierarchy, semantic status badges, and deliberate token styling replace decorative emojis.
- **Intentional Iconography (Need-Only Placement)**: Icons from Lucide React MUST only be placed when they directly enhance comprehension, affordance, or navigation (e.g., search bar glass, back navigation arrow, clock for closing-hour countdown, pin for location). Gratuitous, redundant, or layout-breaking icons that compress touch targets or force price wrapping MUST be omitted.
- **Design Tokens**:
  - Primary Action & Savings: `#2E7D32`
  - Urgency & Timer Accent: `#FF8A3D`
  - Base Surfaces: `#FAFAFA` (canvas background), `#FFFFFF` (elevated cards and drawers), with subtle border contrast (`border-stone-200/80` or `border-gray-100`)
  - Typography: Inter typeface with disciplined weight hierarchy (400 regular body, 600 semi-bold labels, 700+ headings)
  - Geometry: `16px` border radius for cards, `12px` border radius for action buttons, minimum `44px` touch targets for mobile accessibility
  - Responsive Integrity: Mobile cards MUST render full width with zero price label wrapping or awkward horizontal clipping.

Rationale: Visual consistency, disciplined restraint, and purposeful iconography build brand trust, elevate UX clarity, and ensure conversion-focused surplus food rescue without visual clutter.

### IV. Contract-First Mock Data
Mock datasets (originating from `customer` and `merchant` references) MUST represent valid domain models matching anticipated production contracts: realistic merchant profiles, surplus items, stock counts, closing times, and discount tiers. Ad-hoc, unstructured component states MUST NOT be used in place of structured schemas. Rationale: UI components built on realistic contract shapes can connect to real APIs and database schemas later with minimal refactoring.

### V. Simplicity & Incremental Delivery (YAGNI)
Premature complexity—such as unneeded backend microservices, real-time database sync, or heavy state orchestration—MUST NOT be introduced during the UI consolidation phase. Features MUST be implemented in their simplest, clearest form using idiomatic React.js patterns and standard component composition. Rationale: Validating business value and user journey clarity takes precedence over speculative infrastructure.

## Technology Stack & Operational Constraints

- Frontend Framework: React.js with a modern bundler (Vite).
- State & Data: Local component state and lightweight context providers driven by structured mock data; no database or backend servers required to run or build the client UI.
- Browser & Device Support: Customer views MUST be mobile-first and fully responsive; Merchant portal MUST support desktop, tablet, and mobile viewports.
- Isolation: The target production UI project directory MUST remain clean and self-contained, copying and adapting proven UI patterns from reference mock workspaces without altering legacy reference code.

## Development Workflow & Quality Gates

- Minimalist UX & Iconography Gate: Every screen MUST pass a minimalism review verifying zero emojis in text/UI elements and confirming that all present icons serve a necessary UX function without breaking layout geometry.
- UI Fidelity Check: Every screen and interaction MUST reflect the surplus food rescue platform goals (discount before closing, high-quality food preservation, clear savings display).
- Component Reusability: Common UI elements (buttons, badges, modals, cards) MUST be modularized into reusable React components.
- Zero External Dependency Gate: The application MUST successfully build and run locally without requiring any external database instance or active network backend.

## Governance

This Constitution is the primary governance authority for the Foodlink codebase and supersedes informal conventions. All code changes, feature specifications, architecture plans, and pull requests MUST comply with these principles.

- Amendments require an explicit constitution update specifying version bump rationale.
- SemVer tracking applies to all changes:
  - MAJOR: Backward incompatible governance/principle removals or redefinitions.
  - MINOR: Adding new principles, sections, or materially expanding existing constraints.
  - PATCH: Clarifications, formatting, and non-semantic adjustments.

**Version**: 1.1.0 | **Ratified**: 2026-10-30 | **Last Amended**: 2026-10-31

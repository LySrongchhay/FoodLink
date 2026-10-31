<!--
Sync Impact Report:
- Version change: 1.1.0 → 1.2.0
- List of modified principles:
  - PRINCIPLE_2: Expanded from "II. Two-Sided Domain Separation" to "II. Two-Sided Domain Separation & Dedicated Dual-Hosting Strategy". Formally enshrines separate hosting links for Customer and Merchant portals (deployed from a single codebase) and strictly mandates the removal of cross-portal role switchers on dedicated production links.
- Added sections & operational constraints:
  - Demo UI Showcase & Zero-Backend Mandate: Formally enshrines that the project's primary operational mode is a high-fidelity, self-contained Demo UI powered by offline-first deterministic mock data, requiring zero external databases or live cloud servers to run or showcase.
  - Dedicated Persona Isolation Gate: Quality gate verifying that dedicated deployment links contain zero leaked cross-role switchers or navigation shortcuts.
- Removed sections: None
- Follow-up TODOs: None
-->

# Foodlink Constitution

## Core Principles

### I. UI-First & Decoupled Architecture
All user-facing workflows MUST be developed, prototyped, and validated UI-first in React.js before coupling with backend services or databases. UI components MUST operate on deterministic mock data stores without hard dependencies on live backend endpoints. Rationale: Rapid customer and merchant UX iteration requires zero barrier to preview and test layouts, state transitions, and interactive flows.

### II. Two-Sided Domain Separation & Dedicated Dual-Hosting Strategy
The platform MUST cleanly delineate the Customer experience (surplus food discovery, closing-hour discount feeds, reserve/order) from the Merchant experience (store operations, inventory management, discount pricing controls, pickup fulfillment):
- **Distinct Domain Models**: Customers and merchants operate with separate mental models, viewports, and interaction flows. Logic and components for both sides MUST remain strictly decoupled.
- **Dedicated Dual-Hosting Deployments**: The project MUST support deployment as two distinct hosting links (e.g., Customer Demo Link and Merchant Demo Link on Vercel) from a single unified codebase, resolved via build-time modes (`VITE_PORTAL_MODE`) or hostname inspection.
- **Strict Role Isolation (Zero Switchers in Production)**: On dedicated production hosting links, all cross-portal role switchers (such as "Customer View" in the merchant portal and "Merchant Hub" in the customer profile) MUST be completely omitted. Each link MUST function as an immersive, standalone application for that specific persona with zero cross-role distraction.

Rationale: Presenting and deploying dedicated links reinforces authentic user journeys, prevents persona confusion during stakeholder demos, and ensures strict security boundaries between consumers and store operators.

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

### IV. Contract-First Mock Data & Offline-First Demo Reliability
Mock datasets MUST represent valid domain models matching anticipated production contracts: realistic merchant profiles, surplus items, stock counts, closing times, and discount tiers. Ad-hoc, unstructured component states MUST NOT be used in place of structured schemas. UI components MUST guarantee 100% offline-first reliability so demonstrations and presentations run smoothly without server errors or latency. Rationale: UI components built on realistic contract shapes can connect to real APIs and database schemas later with minimal refactoring while guaranteeing rock-solid demo performance today.

### V. Simplicity & Incremental Delivery (YAGNI)
Premature complexity—such as unneeded backend microservices, real-time cloud database sync, or heavy state orchestration—MUST NOT be introduced during the UI consolidation and demo phase. Features MUST be implemented in their simplest, clearest form using idiomatic React.js patterns and standard component composition. Rationale: Validating business value, design excellence, and user journey clarity takes precedence over speculative infrastructure.

## Technology Stack & Operational Constraints

- **Primary Project Purpose**: High-Fidelity Demo UI Showcase.
- **Frontend Framework**: React.js 18 with Vite.
- **Zero-Backend Mandate**: The client UI MUST run 100% self-contained on structured mock data without requiring any live backend server, cloud database, or paid third-party infrastructure.
- **Dual-Hosting Deployment Strategy**: Single monorepo/codebase configured for dual Vercel deployments (Customer and Merchant) via build modes (`VITE_PORTAL_MODE`) or hostname auto-detection.
- **Browser & Device Support**: Customer views MUST be mobile-first and fully responsive; Merchant portal MUST support desktop, tablet, and mobile viewports.
- **Isolation**: The target production UI project directory (`foodlink-ui/`) MUST remain clean and self-contained; legacy reference directories (`customer/`, `merchant/`, `server/`) MUST remain 100% untouched.

## Development Workflow & Quality Gates

- **Dedicated Persona Isolation Gate**: On dedicated deployment links (or locked portal builds), screens MUST be audited to guarantee zero cross-role switchers or leaked navigation controls.
- **Minimalist UX & Iconography Gate**: Every screen MUST pass a minimalism review verifying zero emojis in text/UI elements and confirming that all present icons serve a necessary UX function without breaking layout geometry.
- **UI Fidelity Check**: Every screen and interaction MUST reflect the surplus food rescue platform goals (discount before closing, high-quality food preservation, clear savings display).
- **Component Reusability**: Common UI elements (buttons, badges, modals, cards) MUST be modularized into reusable React components.
- **Zero External Dependency Gate**: The application MUST successfully build and run locally without requiring any external database instance or active network backend.

## Governance

This Constitution is the primary governance authority for the Foodlink codebase and supersedes informal conventions. All code changes, feature specifications, architecture plans, and pull requests MUST comply with these principles.

- Amendments require an explicit constitution update specifying version bump rationale.
- SemVer tracking applies to all changes:
  - MAJOR: Backward incompatible governance/principle removals or redefinitions.
  - MINOR: Adding new principles, sections, or materially expanding existing constraints.
  - PATCH: Clarifications, formatting, and non-semantic adjustments.

**Version**: 1.2.0 | **Ratified**: 2026-10-30 | **Last Amended**: 2026-10-31

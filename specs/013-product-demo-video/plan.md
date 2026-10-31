# Implementation Plan: 013-product-demo-video

**Branch**: `013-product-demo-video` | **Date**: 2026-10-31 | **Spec**: [spec.md](file:///d:/DGIY\foodlink-2\specs\013-product-demo-video\spec.md)

---

## Summary

Build a programmatic, high-fidelity 40-second product demonstration video for **FoodLink Cambodia** using **HyperFrames** (HTML/CSS/JS rendered to frame-accurate video). 

The video showcases the complete dual-portal workflow:
1. **Customer Discovery & 1-Tap KHQR Checkout** on a floating mobile device mockup.
2. **Real-time Merchant Kitchen Queue Alert & PIN Verification** on a floating tablet mockup.
3. **Closing-hour surplus food rescue** at CAD Bakery (Street 310, BKK1, Phnom Penh).
4. **Impact & Action**: Meals rescued, CO₂ avoided, and side-by-side scannable QR codes for `/customer` and `/merchant`.

### Hard Safety Constraints
- **Preserve Existing Video**: `videos/foodlink-demo/` is frozen and protected (zero modifications).
- **Isolated Directory**: The new project is strictly confined to `videos/foodlink-product-film/`.
- **Constitution Compliance**: Zero emojis (Principle III), legacy directories untouched (Principle VI).

---

## Technical Context

- **Engine**: HyperFrames v0.8.x (`npx.cmd --yes hyperframes`)
- **Animation Framework**: GSAP 3.12+ (timeline-based deterministic animations)
- **Resolution**: 1920 × 1080 (16:9 widescreen)
- **Framerate**: 30 FPS (Total 1,200 frames over 40.0s)
- **Audio Profile**: Minimalist UI sound effects only (no background music)
- **Typography**: Inter & Poppins (standard brand typography)
- **Design Tokens**: Primary Green `#2E7D32`, Accent Orange `#FF8A3D`, Canvas `#FAFAFA`, Text `#1C1C1E`

---

## Constitution Check

*GATE: Verified against Foodlink Constitution v1.2.0.*

| Principle | Requirement | Plan Compliance |
| :--- | :--- | :--- |
| **Principle I: UI-First** | UI components prototyped on deterministic mock data | High-fidelity mockups of live Customer and Merchant interfaces. |
| **Principle II: Domain Separation** | Clean distinction between Customer and Merchant journeys | Side-by-side floating mockups clearly distinguishing consumer feed from kitchen queue. |
| **Principle III: Minimalist UX & Zero Emojis** | Strictly 0 emojis; Lucide SVG icons only | All graphic overlays use clean typography and Lucide SVG icons; zero emojis. |
| **Principle IV: Offline-First Reliability** | 100% offline self-contained demo | All assets (logos, food photos, sound cues, QR codes) bundled locally in `assets/`. |
| **Principle VI: Repository Isolation** | Legacy folders untouched | `customer/`, `merchant/`, and `server/` remain 100% untouched. `videos/foodlink-demo/` protected. |

---

## Project Structure

```
videos/foodlink-product-film/
├── assets/
│   ├── audio/
│   │   ├── click.mp3
│   │   ├── khqr-chime.mp3
│   │   ├── order-ping.mp3
│   │   └── verify-ding.mp3
│   ├── cad-bakery-logo.png
│   ├── foodlink-logo.png
│   ├── qr-customer.png
│   ├── qr-merchant.png
│   └── food-sourdough.jpg
├── compositions/
│   ├── scene-1-hook.html        (0.0s – 7.0s: The Evening Surplus Challenge)
│   ├── scene-2-discovery.html   (7.0s – 16.0s: Customer Discovery in BKK1)
│   ├── scene-3-checkout.html    (16.0s – 25.0s: Bakong KHQR & Instant Pass)
│   ├── scene-4-kitchen.html     (25.0s – 33.0s: Merchant Queue & PIN Handover)
│   └── scene-5-impact.html      (33.0s – 40.0s: Environmental Impact & Dual QR CTA)
├── index.html                   (Root composition & timeline orchestrator)
├── hyperframes.json             (Project configuration)
└── package.json                 (Scripts for preview, check, and render)
```

---

## Detailed Implementation Phases

### Phase 0: Project Setup & Asset Assembly
- Verify isolation: confirm `videos/foodlink-demo/` is untouched.
- Create directory structure: `videos/foodlink-product-film/{assets/audio,compositions,renders}`.
- Copy brand assets into `assets/`:
  - `foodlink-ui/public/foodlink-logo.png` $\rightarrow$ `assets/foodlink-logo.png`
  - `foodlink-ui/public/cad-bakery-logo.png` $\rightarrow$ `assets/cad-bakery-logo.png`
  - `Customer.png` $\rightarrow$ `assets/qr-customer.png`
  - `Merchant.png` $\rightarrow$ `assets/qr-merchant.png`
- Create `hyperframes.json` and `package.json`.
- Synthesize/generate lightweight UI audio cues in `assets/audio/`.

### Phase 1: Root Composition & Scene Architecture
- Author `videos/foodlink-product-film/index.html`:
  - Root composition container: `1920×1080`, `data-duration="40"`.
  - Mount 5 scene hosts with precise clip boundaries (`data-start`, `data-duration`).
  - Declare audio triggers matching interaction timings.
  - Setup clean studio background styling (`#FAFAFA` with subtle radial gradient).

### Phase 2: User Story 1 (MVP) - Dual-Perspective Workflow
- **`scene-2-discovery.html` (7s – 16s)**:
  - Render floating smartphone frame with glossy bezel and camera pill.
  - Display CAD Bakery food card ($4.99, 69% OFF) with pulsing BKK1 location pin.
  - GSAP timeline: smooth entrance, card highlight, button tap.
- **`scene-3-checkout.html` (16s – 25s)**:
  - Bottom sheet slides up with red Bakong KHQR badge and payment card.
  - Scanner sweep animation $\rightarrow$ transition to digital pass `#FS-849201`.
- **`scene-4-kitchen.html` (25s – 33s)**:
  - Tablet frame glides into view showing the Merchant Kitchen Queue.
  - Pulsing "Incoming Order Placed!" banner.
  - PIN entry simulation (`8-4-9-2-0-1`) $\rightarrow$ green verified checkmark.

### Phase 3: User Story 2 - Kinetic Hook & Environmental Impact
- **`scene-1-hook.html` (0s – 7s)**:
  - Kinetic headline: *"Phnom Penh. 8:00 PM. High-end food about to be thrown away."*
  - Brand reveal: FoodLink logo animation with green glow accent.
- **`scene-5-impact.html` (33s – 40s)**:
  - Counter animation: *18 Bags Saved • $69.86 Recovered • 342 kg CO₂ Prevented*.
  - Grand finale: Side-by-side QR codes (Customer & Merchant) with live Vercel URL.

### Phase 4: User Story 3 - Audio Integration & Motion Polish
- Wire audio elements in `index.html` with exact timestamp synchronization.
- Fine-tune GSAP easing curves (`power2.out`, `back.out(1.4)`) for fluid transitions.
- Validate zero layout overflow and safe margins.

### Phase 5: Verification & Quality Gate
- Run `npx.cmd --yes hyperframes check --json` to ensure 0 lint or contract errors.
- Run `npx.cmd --yes hyperframes render -o renders/foodlink-product-film.mp4`.
- Confirm `git status --porcelain customer merchant server videos/foodlink-demo` produces 0 output.

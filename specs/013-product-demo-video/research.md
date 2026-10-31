# Phase 0 Research: HyperFrames Product Demo Video

**Feature Branch**: `013-product-demo-video`  
**Date**: 2026-10-31  
**Spec**: [spec.md](file:///d:/DGIY/foodlink-2/specs/013-product-demo-video/spec.md)

---

## 1. Executive Research Summary

This document establishes the technical, architectural, and motion design patterns for the new FoodLink product film in `videos/foodlink-product-film/`.

### Core Technical Decisions:
1. **Directory Isolation**:
   - The existing project `videos/foodlink-demo/` is frozen and protected.
   - The new project lives at `videos/foodlink-product-film/`.
2. **Engine & CLI**:
   - Engine: **HyperFrames** (HTML + CSS + GSAP rendered frame-by-frame).
   - Package manager / invocation on Windows: `npx.cmd --yes hyperframes`.
   - Resolution: 1920 × 1080 (16:9 widescreen) at 30 fps.
   - Total length: 40.0s (1,200 frames).
3. **Motion Framework**:
   - GSAP 3.12+ bundled by HyperFrames.
   - Strict adherence to the HyperFrames render contract (deterministic timelines registered via `window.__timelines["<id>"] = tl`).
4. **Design Tokens & Visual Language**:
   - Studio Canvas: `#FAFAFA` (stone-50) with subtle ambient lighting.
   - FoodLink Forest Green: `#2E7D32`.
   - Accent Orange: `#FF8A3D`.
   - Dark Charcoal: `#1C1C1E`.
   - High-fidelity realistic phone & tablet frames with glass reflections and drop shadows.
   - Zero emojis per Foodlink Constitution v1.2.0 (clean Lucide SVG icons only).
5. **Audio Pipeline**:
   - Minimalist UI sound effects only (no background music).
   - Discrete audio events: tap clicks, Bakong KHQR chime, kitchen alert ping, and green verification ding.

---

## 2. HyperFrames Render Contract & Quality Invariants

To guarantee 100% successful headless rendering and linting (`npx hyperframes check --json`), the project must satisfy these 6 invariants:

1. **Timed Elements**:
   Every animated element must carry `class="clip"` along with `data-start` (seconds) and `data-duration` (seconds).
2. **Timeline Registration**:
   Each sub-composition in `compositions/scene-*.html` must construct a paused GSAP timeline:
   ```javascript
   const tl = gsap.timeline({ paused: true });
   // ... tweens ...
   window.__timelines = window.__timelines || {};
   window.__timelines["scene-X"] = tl;
   ```
3. **Deterministic Math & Clock**:
   No `Date.now()`, no unseeded `Math.random()`, no `requestAnimationFrame()`, no `repeat: -1`. Everything must be a direct mathematical function of timeline progress.
4. **CSS Transforms over Layout Properties**:
   Animate `x`, `y`, `scale`, and `opacity` using GSAP. Never animate `width`, `height`, `left`, `top`, or CSS filters.
5. **Asset References**:
   All local assets (images, sounds) must be referenced via relative paths without leading slashes: `assets/...`.
6. **Sub-composition Structure**:
   Each scene file encapsulates styles, markup, and scripts inside `<template>` and scopes styling to `#root`.

---

## 3. Scene Breakdown & Animation Choreography

### Scene 1: The Evening Challenge Hook (`0.0s – 7.0s`)
- **Theme**: Evening closing time in Phnom Penh. Bakeries discard fresh inventory while hungry customers miss out.
- **Visuals**: Ambient dark-to-light transition. Clean kinetic typography: *"Phnom Penh. 8:00 PM. Delicious surplus food about to be discarded."*
- **Animation**: Staggered text reveals with smooth blur-to-sharp GSAP eases (`power3.out`). FoodLink green brand accent illuminates the tagline: *"Connecting hungry diners with artisan bakeries."*

### Scene 2: Customer Discovery Feed (`7.0s – 16.0s`)
- **Theme**: Customer opening FoodLink on their phone in BKK1.
- **Visuals**: A sleek floating smartphone frame glides into view from the left. Inside the viewport, the live FoodLink mobile feed renders with category pills (Bakery, Meals, Groceries) and the BKK1 map pin on CAD Bakery & Cafe.
- **Animation**: The feed scrolls smoothly; the CAD Bakery card highlights with a pulse: *"Artisan Sourdough Box • $4.99 • 69% OFF"*. Audio: subtle click cue on card selection.

### Scene 3: Bakong KHQR Checkout & Counter Pass (`16.0s – 25.0s`)
- **Theme**: Seamless 1-tap reservation and digital pass generation.
- **Visuals**: The checkout sheet glides up. The official red Bakong KHQR card displays. A simulated scan glow sweeps across the code.
- **Animation**: Transaction confirms with an emerald checkmark and soft audio chime. The digital pickup pass generates with high-contrast digits: `#FS-849201`.

### Scene 4: Merchant Kitchen Alert & PIN Handover (`25.0s – 33.0s`)
- **Theme**: Real-time kitchen queue synchronization and counter handover.
- **Visuals**: Widescreen pans to reveal a floating tablet frame on the right representing CAD Bakery's kitchen terminal.
- **Animation**: A vibrant green "Incoming Order Placed!" banner pulses at the top. Staff inputs the 6-digit code `849201` on the keypad. The order card status morphs into an emerald *"✓ Verified Handover"*. Audio: satisfying success ding.

### Scene 5: Impact Metrics & Dual QR Call-To-Action (`33.0s – 40.0s`)
- **Theme**: Ecological/economic impact and audience call-to-action.
- **Visuals**: Both devices slide into a balanced composition. Scaled impact counters reveal: *"18 Meals Rescued • $69.86 Recovered • 342 kg CO₂ Prevented"*.
- **Ending Frame**: The official FoodLink logo centers above two high-contrast side-by-side QR codes:
  - **Left QR**: *"Customer App"* (`/customer`)
  - **Right QR**: *"Merchant App"* (`/merchant`)
  - Subtitle: *"Live on Vercel • Test the demo today"*.

---

## 4. Audio Architecture & Synthesis

Since the user explicitly selected **Minimalist UI Sound Effects Only (No background music)**:
- 4 short, clean, royalty-free audio cues will be placed in `assets/audio/`:
  1. `click.mp3` (~80ms): Soft tactile click on feed selection (plays at 11.2s).
  2. `khqr-chime.mp3` (~400ms): Pleasant resonant chime on Bakong payment success (plays at 21.0s).
  3. `order-ping.mp3` (~300ms): Kitchen bell ping on real-time order arrival (plays at 25.5s).
  4. `verify-ding.mp3` (~500ms): Dual-harmonic positive chime on PIN verification (plays at 31.0s).
- HyperFrames `<audio>` tags are declared in `index.html` with unique `id` attributes and timed clips.

---

## 5. Risk Assessment & Mitigations

| Potential Risk | Severity | Mitigation Strategy |
| :--- | :---: | :--- |
| Overwriting existing video in `videos/foodlink-demo` | Critical | Hard enforcement: all new files live strictly in `videos/foodlink-product-film/`. |
| HyperFrames check failures due to missing timelines | High | Every sub-composition exports a registered GSAP timeline under `window.__timelines`. |
| Emoji leakage in video copy | Medium | Strict code audit against Constitution Principle III (use Lucide SVG icons). |
| Offline asset dependency | Medium | All brand logos, food images, and sound effects are stored locally in `assets/`. |


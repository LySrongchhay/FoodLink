---
description: "Task list for feature 013-product-demo-video"
---

# Tasks: HyperFrames Product Demo Video

**Input**: Design documents from `specs/013-product-demo-video/`  
**Prerequisites**: [plan.md](file:///d:/DGIY/foodlink-2/specs/013-product-demo-video/plan.md), [spec.md](file:///d:/DGIY/foodlink-2/specs/013-product-demo-video/spec.md), [research.md](file:///d:/DGIY/foodlink-2/specs/013-product-demo-video/research.md), [quickstart.md](file:///d:/DGIY/foodlink-2/specs/013-product-demo-video/quickstart.md)

## Format: `[ID] [P?] [Story] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Mapped to User Story (US1 = Dual-Perspective Core Rush, US2 = Kinetic Hook & Impact CTA, US3 = Audio Sync & Polish)
- Strict adherence to Foodlink Constitution v1.2.0 (zero emojis, isolated to `videos/foodlink-product-film/`)
- Hard safety constraint: `videos/foodlink-demo/` must remain completely untouched.

---

## Phase 1: Setup & Asset Assembly

**Purpose**: Initialize the isolated project directory and gather local assets

- [x] T001 Verify git isolation gate and confirm `videos/foodlink-demo/`, `customer/`, `merchant/`, and `server/` remain untouched
- [x] T002 Create isolated project structure in `videos/foodlink-product-film/` with subdirectories `assets/audio/`, `compositions/`, and `renders/`
- [x] T003 [P] Copy brand logo, CAD Bakery logo, food photos, and QR codes into `videos/foodlink-product-film/assets/`
- [x] T004 [P] Generate lightweight tactile UI audio cues (`click.mp3`, `khqr-chime.mp3`, `order-ping.mp3`, `verify-ding.mp3`) in `videos/foodlink-product-film/assets/audio/`
- [x] T005 [P] Create `videos/foodlink-product-film/hyperframes.json` and `package.json`

---

## Phase 2: Foundational Composition & Master Canvas

**Purpose**: Core master timeline orchestrator that all scene compositions mount into

- [x] T006 Author root timeline orchestrator `videos/foodlink-product-film/index.html` (1920×1080 @ 30 fps, 40s duration, clean studio backdrop `#FAFAFA`, scene clip mounts, audio declarations)

**Checkpoint**: Foundation ready - scene sub-compositions can now be created and tested.

---

## Phase 3: User Story 1 - Dual-Perspective Closing-Hour Rush (Priority: P1) [MVP]

**Goal**: Deliver the core 3-scene synchronized workflow: customer browsing CAD Bakery in BKK1 $\rightarrow$ Bakong KHQR checkout with pass `#FS-849201` $\rightarrow$ merchant kitchen alert and PIN verification.

**Independent Test**: Load `videos/foodlink-product-film/` in HyperFrames preview. Verify scenes 2, 3, and 4 animate smoothly on floating phone and tablet frames with timeline registration.

### Implementation for User Story 1
- [x] T007 [P] [US1] Author Customer Discovery scene in `videos/foodlink-product-film/compositions/scene-2-discovery.html` (7.0s – 16.0s: floating smartphone frame, BKK1 map pin, CAD Bakery surprise box card, GSAP timeline registration)
- [x] T008 [P] [US1] Author Bakong KHQR Checkout scene in `videos/foodlink-product-film/compositions/scene-3-checkout.html` (16.0s – 25.0s: 1-tap checkout sheet, red Bakong KHQR card, scanner sweep, pass `#FS-849201`)
- [x] T009 [P] [US1] Author Merchant Kitchen Handover scene in `videos/foodlink-product-film/compositions/scene-4-kitchen.html` (25.0s – 33.0s: floating tablet frame, live order alert ping, PIN entry `849201`, emerald verified badge)

**Checkpoint**: User Story 1 (MVP core product walkthrough) is functional and testable independently.

---

## Phase 4: User Story 2 - Kinetic Hook & Environmental Impact (Priority: P2)

**Goal**: Bookend the video with an emotional hook on evening bakery surplus in Phnom Penh and an impactful resolution with dual QR codes for `/customer` and `/merchant`.

**Independent Test**: Preview the full 40-second sequence. Verify Scene 1 displays animated kinetic typography on Phnom Penh food waste, and Scene 5 renders animated impact counters and side-by-side QR codes.

### Implementation for User Story 2
- [x] T010 [P] [US2] Author Opening Hook scene in `videos/foodlink-product-film/compositions/scene-1-hook.html` (0.0s – 7.0s: kinetic typography on evening food surplus dilemma in Phnom Penh, brand reveal with GSAP blur/fade)
- [x] T011 [P] [US2] Author Impact & Dual QR CTA scene in `videos/foodlink-product-film/compositions/scene-5-impact.html` (33.0s – 40.0s: animated counters for meals saved & CO₂ prevented, FoodLink logo flanked by Customer and Merchant QR codes)

**Checkpoint**: User Stories 1 and 2 deliver the complete narrative arc from problem to resolution.

---

## Phase 5: User Story 3 - Audio Synchronization & Motion Polish (Priority: P3)

**Goal**: Synchronize tactile UI sound cues and fine-tune GSAP easing curves and floating device shadows.

**Independent Test**: Verify that audio effects trigger exactly when UI events occur (click at 11.2s, KHQR chime at 21.0s, alert ping at 25.5s, verified ding at 31.0s) with zero clipping or volume distortion.

### Implementation for User Story 3
- [x] T012 [US3] Wire and synchronize UI audio cues in `videos/foodlink-product-film/index.html` with exact clip timings
- [x] T013 [US3] Fine-tune GSAP easing curves, drop shadows, and responsive glass reflections across phone and tablet frames

---

## Phase 6: Quality Gate, Verification & Render

**Purpose**: Cross-cutting verification against HyperFrames render contract and Foodlink Constitution v1.2.0

- [x] T014 [P] Verify Foodlink Constitution Principle III (Strictly zero emojis) across all HTML/CSS files
- [x] T015 Run HyperFrames contract validation gate via `npx.cmd --yes hyperframes check --json` inside `videos/foodlink-product-film/`
- [x] T016 Render final 1080p MP4 via `npx.cmd --yes hyperframes render -o renders/foodlink-product-film.mp4`
- [x] T017 Verify isolation gate: confirm `git status --porcelain customer merchant server videos/foodlink-demo` produces zero output

---

## Dependencies & Execution Order

### Phase Dependencies
- **Setup (Phase 1)**: Independent - runs first.
- **Foundational (Phase 2)**: Depends on Setup completion - mounts master timeline.
- **User Story 1 (Phase 3 - MVP)**: Customer & Merchant dual-perspective scenes.
- **User Story 2 (Phase 4)**: Opening kinetic hook & closing impact CTA.
- **User Story 3 (Phase 5)**: Audio cues & motion polish.
- **Quality Gate & Render (Phase 6)**: Validates compliance and produces master MP4.


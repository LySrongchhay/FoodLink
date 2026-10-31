---
description: "Task list for feature 014-video-voiceover-narration"
---

# Tasks: Commercial Motion Film with Human Story Narration

**Input**: Design documents from `specs/014-video-voiceover-narration/`  
**Prerequisites**: [plan.md](file:///d:/DGIY/foodlink-2/specs/014-video-voiceover-narration/plan.md), [spec.md](file:///d:/DGIY/foodlink-2/specs/014-video-voiceover-narration/spec.md), [research.md](file:///d:/DGIY/foodlink-2/specs/014-video-voiceover-narration/research.md), [quickstart.md](file:///d:/DGIY/foodlink-2/specs/014-video-voiceover-narration/quickstart.md)

## Organization: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Mapped to User Story (US1 = Dual-Persona Human Story, US2 = Kinetic Advertising Motion, US3 = Mouse Click & Audio Mix)
- Strict adherence to Foodlink Constitution v1.2.0 (zero emojis, isolated to `videos/foodlink-product-film/`)
- Hard safety constraint: `videos/foodlink-demo/`, `customer/`, `merchant/`, and `server/` must remain completely untouched.

---

## Phase 1: Setup & Audio Infrastructure

**Purpose**: Establish audio generation and mastering infrastructure

- [x] T001 Verify git isolation gate and confirm `videos/foodlink-demo/`, `customer/`, `merchant/`, and `server/` remain untouched
- [x] T002 Create voiceover asset directory `videos/foodlink-product-film/assets/audio/voiceover/` and scripts directory `videos/foodlink-product-film/scripts/`
- [x] T003 Author audio synthesis and broadcast mastering pipeline script in `videos/foodlink-product-film/scripts/build-audio-assets.py` (generating mechanical mouse click, modern tech BGM bed, and studio speech mastering chain)

---

## Phase 2: Foundational Audio Asset Assembly

**Purpose**: Generate all required audio assets locally before composition updates

- [x] T004 [US3] Execute `build-audio-assets.py` to synthesize tactile mechanical mouse click `mouse-click.mp3` and `mouse-click.wav` in `videos/foodlink-product-film/assets/audio/`
- [x] T005 [US3] Execute `build-audio-assets.py` to synthesize modern minimal tech background bed `bgm-ambient-tech.mp3` in `videos/foodlink-product-film/assets/audio/`
- [x] T006 [US1] Execute `build-audio-assets.py` to synthesize 5 studio-mastered voiceover narration tracks (`vo-1.mp3` through `vo-5.mp3`) in `videos/foodlink-product-film/assets/audio/voiceover/`

**Checkpoint**: Foundation ready - all audio assets generated and verified locally.

---

## Phase 3: User Story 1 - Relatable Dual-Persona Human Story (Priority: P1) [MVP]

**Goal**: Deliver the commercial human story of Sokha and CAD Bakery across all 5 video scenes with synchronized voiceover narration.

**Independent Test**: Load `videos/foodlink-product-film/` in HyperFrames preview. Listen to the narration track across the 40 seconds; confirm that spoken dialogue introduces Sokha, CAD Bakery in BKK1, Bakong instant checkout, kitchen PIN verification, and ecological savings.

### Implementation for User Story 1
- [x] T007 [US1] Mount the 5 voiceover audio segments (`vo-1` through `vo-5`) in master orchestrator `videos/foodlink-product-film/index.html` with exact start timestamps (0.8s, 7.6s, 16.5s, 25.5s, 33.5s) and duration attributes
- [x] T008 [P] [US1] Update narrative copy and typography in `videos/foodlink-product-film/compositions/scene-1-hook.html` to reflect the 8:00 PM Phnom Penh bakery dilemma
- [x] T009 [P] [US1] Update customer mobile scene in `videos/foodlink-product-film/compositions/scene-2-discovery.html` to introduce Sokha reserving CAD Bakery BKK1 surprise box at 60% off
- [x] T010 [P] [US1] Update Bakong checkout scene in `videos/foodlink-product-film/compositions/scene-3-checkout.html` with pass `#FS-849201` narrative alignment
- [x] T011 [P] [US1] Update kitchen tablet scene in `videos/foodlink-product-film/compositions/scene-4-kitchen.html` with real-time order arrival and staff PIN verification narrative
- [x] T012 [P] [US1] Update impact scene in `videos/foodlink-product-film/compositions/scene-5-impact.html` to conclude the mutual win-win story and dual QR scan call to action

**Checkpoint**: User Story 1 (MVP narrative film) is fully functional with synchronized human story voiceover.

---

## Phase 4: User Story 2 - Kinetic Advertising Motion & Camera Dynamics (Priority: P2)

**Goal**: Transform static device presentation into dynamic advertising commercial motion design.

**Independent Test**: Preview the video in HyperFrames. Observe fluid 3D perspective tilts on the smartphone and tablet, momentum camera moves, and kinetic typography.

### Implementation for User Story 2
- [x] T013 [P] [US2] Enhance GSAP 3D perspective angles, floating inertial sway, and dynamic drop shadows in `videos/foodlink-product-film/compositions/scene-2-discovery.html`
- [x] T014 [P] [US2] Upgrade Bakong KHQR scanner sweep, glowing light ray, and pass confirmation modal animation in `videos/foodlink-product-film/compositions/scene-3-checkout.html`
- [x] T015 [P] [US2] Enhance 3D tablet orientation and interactive PIN keypad entry animation in `videos/foodlink-product-film/compositions/scene-4-kitchen.html`
- [x] T016 [P] [US2] Enhance kinetic typography entrance choreography and outro swell in `videos/foodlink-product-film/compositions/scene-1-hook.html` and `videos/foodlink-product-film/compositions/scene-5-impact.html`

**Checkpoint**: User Stories 1 and 2 deliver high-energy commercial advertising motion.

---

## Phase 5: User Story 3 - Mechanical Mouse Click & Audio Mastering (Priority: P3)

**Goal**: Deliver realistic physical mouse click sound effects and balanced audio mixing with dynamic ducking.

**Independent Test**: Play the video with headphones. Confirm that the tap at 11.2s sounds like an authentic mechanical mouse click and the background tech bed ducks smoothly whenever the narrator speaks.

### Implementation for User Story 3
- [x] T017 [US3] Update `index.html` to replace the previous tap sound with `assets/audio/mouse-click.mp3` at 11.2s on track 6
- [x] T018 [US3] Wire background music bed `bgm-ambient-tech.mp3` on track 2 in `videos/foodlink-product-film/index.html` with dynamic volume ducking (0.18 during speech, 0.45 during outro)
- [x] T019 [US3] Fine-tune relative volume levels across voiceover (-14 LUFS), mouse click, Bakong chime, order ping, and verify ding

---

## Phase 6: Quality Gate, Verification & Render

**Purpose**: Cross-cutting verification against HyperFrames render contract and Foodlink Constitution v1.2.0

- [x] T020 [P] Verify Foodlink Constitution Principle III (Strictly zero emojis) across all HTML, CSS, JavaScript, and metadata files
- [x] T021 Run HyperFrames contract validation gate via `npx.cmd --yes hyperframes check --json` inside `videos/foodlink-product-film/`
- [x] T022 Render master 1080p MP4 via `npx.cmd --yes hyperframes render -o renders/foodlink-product-film.mp4`
- [x] T023 Verify isolation gate: confirm `git status --porcelain customer merchant server videos/foodlink-demo` produces zero output

---

## Dependencies & Execution Order

### Phase Dependencies
- **Setup & Infrastructure (Phase 1)**: Independent - runs first.
- **Audio Asset Assembly (Phase 2)**: Depends on Phase 1 script.
- **User Story 1 (Phase 3 - MVP)**: Mounts voiceover and narrative text across scenes.
- **User Story 2 (Phase 4)**: Upgrades GSAP 3D motion choreography.
- **User Story 3 (Phase 5)**: Integrates mechanical mouse click, BGM, and ducking.
- **Quality Gate & Render (Phase 6)**: Validates compliance and produces master MP4.

### Parallel Opportunities
- In Phase 3: T008, T009, T010, T011, T012 can be edited in parallel across separate scene files.
- In Phase 4: T013, T014, T015, T016 can be enhanced in parallel across separate composition files.
- In Phase 6: T020 runs in parallel with verification prep.


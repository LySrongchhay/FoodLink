# Implementation Plan: Commercial Motion Film with Human Story Narration

**Branch**: `014-video-voiceover-narration` | **Date**: 2026-10-31 | **Spec**: [spec.md](file:///d:/DGIY/foodlink-2/specs/014-video-voiceover-narration/spec.md)

**Input**: Feature specification from `/specs/014-video-voiceover-narration/spec.md`

## Summary

Transform the FoodLink product demo into a high-energy commercial advertising motion film driven by a relatable dual-perspective human story (Sokha after work in Phnom Penh and CAD Bakery facing closing-hour food waste). Rebuild the sound design with an authentic mechanical mouse click, studio-mastered human voice narration, and an uplifting modern minimal tech background bed with dynamic ducking. Enhance visual scenes with 3D device perspective tilt, kinetic typography reveals, and fluid momentum camera dynamics.

## Technical Context

**Language/Version**: HTML5, Modern CSS3 (3D transforms, backdrop-filter), JavaScript (ES2022), Python 3.14 (audio synthesis script), PowerShell 5.1/7+.  
**Primary Dependencies**: HyperFrames CLI (0.8.223), GSAP 3.14.2 (via CDN/bundle), FFmpeg (N-126905 audio filter chain), System.Speech / OneCore TTS.  
**Storage**: Local filesystem assets in `videos/foodlink-product-film/assets/`.  
**Testing**: `npx.cmd --yes hyperframes check --json` automated quality gate; manual video/audio inspection.  
**Target Platform**: MP4 video (H.264/AAC @ 1920×1080 30 fps), playable on web browsers, mobile feeds, and social platforms.  
**Project Type**: HyperFrames Video Composition project.  
**Performance Goals**: 40.0s timeline (1,200 frames @ 30 fps), render time < 2 minutes on NVIDIA RTX 3050 GPU, output MP4 < 12 MB.  
**Constraints**: Zero emojis across all assets and code (Constitution Principle III); strict isolation of `videos/foodlink-demo/` and legacy directories (`customer/`, `merchant/`, `server/`).  
**Scale/Scope**: 5 coordinated scene compositions, 5 voiceover audio segments, 1 mechanical click SFX, 1 ambient tech bed, 3 UI chimes.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Principle I (UI-First & Decoupled)**: PASS. Video operates 100% on self-contained local assets without external cloud or database dependencies.
- **Principle II (Two-Sided Domain Separation)**: PASS. The human story clearly differentiates Sokha (customer mobile discovery) from CAD Bakery (merchant kitchen tablet operations).
- **Principle III (Zero-Emoji Mandate & Minimalist UX)**: PASS. Zero emojis in video overlays, captions, metadata, or scripts. Clean Inter / Plus Jakarta Sans typography.
- **Principle IV (Offline-First Reliability)**: PASS. Audio synthesis and video rendering run 100% locally via FFmpeg, Python, and HyperFrames.
- **Principle V (Simplicity & Incremental Delivery)**: PASS. Built upon the validated 40s foundation in `videos/foodlink-product-film/`.
- **Principle VI (Isolation)**: PASS. Modifies only `videos/foodlink-product-film/`; `videos/foodlink-demo/`, `customer/`, `merchant/`, and `server/` remain 100% untouched.

## Project Structure

### Documentation (this feature)

```text
specs/014-video-voiceover-narration/
├── plan.md              # Implementation plan (this file)
├── research.md          # Research decisions & audio engineering
├── data-model.md        # Entities, audio track architecture
├── quickstart.md        # Verification and rendering guide
├── contracts/
│   └── narration-manifest.json # Audio and script manifest schema
└── tasks.md             # Implementation tasks (/speckit-tasks output)
```

### Source Code Layout

```text
videos/foodlink-product-film/
├── assets/
│   ├── audio/
│   │   ├── mouse-click.mp3       # Crisp mechanical mouse click (SFX)
│   │   ├── mouse-click.wav
│   │   ├── bgm-ambient-tech.mp3  # Modern minimal electronic tech bed (BGM)
│   │   ├── khqr-chime.mp3        # Bakong confirmation chime
│   │   ├── order-ping.mp3        # Kitchen tablet order arrival ping
│   │   ├── verify-ding.mp3       # PIN verification success ding
│   │   └── voiceover/            # Studio mastered voice narration tracks
│   │       ├── vo-1.mp3          # Scene 1: Phnom Penh surplus hook (5.2s)
│   │       ├── vo-2.mp3          # Scene 2: Sokha & CAD Bakery BKK1 (6.2s)
│   │       ├── vo-3.mp3          # Scene 3: Bakong instant pay & pass (5.4s)
│   │       ├── vo-4.mp3          # Scene 4: Kitchen verification (5.8s)
│   │       └── vo-5.mp3          # Scene 5: Impact & Dual QR CTA (4.8s)
│   ├── cad-bakery-logo.png
│   ├── food-sourdough.jpg
│   ├── foodlink-logo.png
│   ├── qr-customer.png
│   └── qr-merchant.png
├── compositions/
│   ├── scene-1-hook.html         # Dilemma typography & cinematic logo reveal
│   ├── scene-2-discovery.html    # 3D tilted phone, Sokha BKK1 CAD Bakery card
│   ├── scene-3-checkout.html     # Bakong KHQR ray sweep, digital pass `#FS-849201`
│   ├── scene-4-kitchen.html      # 3D tilted tablet, live order ping, PIN typing
│   └── scene-5-impact.html       # Animated metric cards & side-by-side QR codes
├── scripts/
│   └── build-audio-assets.py     # Local synthesis & FFmpeg broadcast mastering
├── hyperframes.json              # HyperFrames project configuration
├── index.html                    # Root timeline orchestrator, audio mixing & ducking
├── package.json
└── renders/
    └── foodlink-product-film.mp4 # Master 1080p rendered commercial film
```

## Implementation Phases

### Phase 1: Audio Asset Synthesis & Mastering
- Author `scripts/build-audio-assets.py` to synthesize:
  1. `mouse-click.mp3` / `.wav` (mechanical microswitch impulse).
  2. `bgm-ambient-tech.mp3` (40s rhythmic electronic ambient track).
  3. `vo-1.mp3` through `vo-5.mp3` (studio speech synthesis passed through FFmpeg EQ, compand, and loudnorm).

### Phase 2: Master Timeline Audio Orchestration & Ducking
- Update `videos/foodlink-product-film/index.html`:
  - Mount background music track (`data-track-index="2"`, volume ducked during narration).
  - Mount 5 voiceover audio segments (`data-track-index="4"`).
  - Update `snd-click` to reference `assets/audio/mouse-click.mp3`.
  - Maintain precise duration attributes to ensure zero linter warnings.

### Phase 3: Advertising Motion Upgrades in Compositions
- Update `scene-1-hook.html`: Staggered kinetic typography and momentum entrance.
- Update `scene-2-discovery.html`: 3D smartphone perspective tilt (`rotationY: -10deg`, `rotationX: 5deg`), smooth alignment on mouse tap.
- Update `scene-3-checkout.html`: Ray sweep transform and sleek pass modal transition.
- Update `scene-4-kitchen.html`: Floating tablet 3D tilt, realistic sequential PIN entry.
- Update `scene-5-impact.html`: Outro swell, floating dual QR cards.

### Phase 4: Quality Gate & Rendering
- Run `npx.cmd --yes hyperframes check --json` and ensure 0 errors.
- Render master 1080p MP4 via `npx.cmd --yes hyperframes render -o renders/foodlink-product-film.mp4`.
- Audit isolation gate: `git status --porcelain customer merchant server videos/foodlink-demo`.

# Implementation Plan: Ultra-Realistic Human Voiceover & Visual Synchronization

**Branch**: `015-realistic-voice-visual-sync` | **Date**: 2026-10-31 | **Spec**: [spec.md](file:///d:/DGIY/foodlink-2/specs/015-realistic-voice-visual-sync/spec.md)

**Input**: Feature specification from `/specs/015-realistic-voice-visual-sync/spec.md`

## Summary

Upgrade the FoodLink product film into an ultra-realistic commercial advertising film narrated by Microsoft Neural Studio Voice `en-US-JennyNeural`. Extend the total video duration to 55.0 seconds (1,650 frames @ 30 fps) to give generous breathing room across all 5 scenes (10s to 12s per scene) and provide an extended 7-second QR code scanning outro. Re-time all GSAP visual animations in lockstep ($\le 200\text{ ms}$ latency) with the spoken keywords (Phnom Penh 8 PM clock, Sokha discovery, 60% discount highlight, mouse click reservation, Bakong KHQR scan ray, pass `#FS-849201`, tablet order alert, sequential PIN entry `849201`, and dual QR CTA).

## Technical Context

**Language/Version**: HTML5, Modern CSS3, JavaScript (ES2022), Python 3.14 (`edge-tts 7.3.1`), FFmpeg N-126905.  
**Primary Dependencies**: HyperFrames CLI (0.8.223), GSAP 3.14.2, `edge-tts` (Microsoft Neural Studio Voice engine).  
**Storage**: Local audio and visual assets in `videos/foodlink-product-film/assets/`.  
**Testing**: `npx.cmd --yes hyperframes check --json` automated quality gate; manual video/audio inspection.  
**Target Platform**: MP4 video (H.264/AAC @ 1920×1080 30 fps), duration 55.0s (1,650 frames).  
**Project Type**: HyperFrames Video Composition project.  
**Performance Goals**: 55.0s timeline, render time < 2.5 minutes with NVIDIA RTX 3050 hardware acceleration, output MP4 < 12 MB.  
**Constraints**: Strictly zero emojis across all assets and code (Constitution Principle III); strict isolation of `videos/foodlink-demo/`, `customer/`, `merchant/`, and `server/` (Constitution Principle VI).  
**Scale/Scope**: 5 scene compositions re-timed to 55s, 5 studio neural voiceover segments, 55s ambient tech BGM bed, 4 synchronized tactile UI SFX.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Principle I (UI-First & Decoupled)**: PASS. All visual mockups operate on self-contained local assets.
- **Principle II (Two-Sided Domain Separation)**: PASS. Delineates Sokha (consumer discovery) and CAD Bakery (merchant kitchen tablet).
- **Principle III (Zero-Emoji Mandate & Minimalist UX)**: PASS. Strictly zero emojis across typography, audio scripts, and metadata.
- **Principle IV (Offline-First Reliability)**: PASS. Audio synthesis and rendering execute locally via Python and HyperFrames.
- **Principle V (Simplicity & Incremental Delivery)**: PASS. Built upon the validated foundation in `videos/foodlink-product-film/`.
- **Principle VI (Isolation)**: PASS. Modifies only `videos/foodlink-product-film/`; legacy directories and frozen demo remain 100% untouched.

## Project Structure

### Documentation (this feature)

```text
specs/015-realistic-voice-visual-sync/
├── plan.md              # Implementation plan (this file)
├── research.md          # Research decisions, audio engineering & sync matrix
├── data-model.md        # Entities & master 55s track layout
├── quickstart.md        # Verification and rendering guide
├── contracts/
│   └── timeline-sync-manifest.json # Timeline synchronization contract
└── tasks.md             # Implementation tasks (/speckit-tasks output)
```

### Source Code Layout

```text
videos/foodlink-product-film/
├── assets/
│   ├── audio/
│   │   ├── mouse-click.mp3       # Crisp mechanical mouse click (SFX)
│   │   ├── mouse-click.wav
│   │   ├── bgm-ambient-tech.mp3  # 55-second modern minimal tech bed (BGM)
│   │   ├── khqr-chime.mp3        # Resonant Bakong payment confirmation chime
│   │   ├── order-ping.mp3        # Kitchen tablet order alert ping
│   │   ├── verify-ding.mp3       # PIN verification success ding
│   │   └── voiceover/            # Studio mastered JennyNeural voice files
│   │       ├── vo-1.mp3          # Scene 1: Phnom Penh surplus hook (8.4s)
│   │       ├── vo-2.mp3          # Scene 2: Sokha & CAD Bakery BKK1 (9.6s)
│   │       ├── vo-3.mp3          # Scene 3: Bakong instant pay & pass (8.4s)
│   │       ├── vo-4.mp3          # Scene 4: Kitchen verification (8.7s)
│   │       └── vo-5.mp3          # Scene 5: Impact & Dual QR CTA (7.0s)
│   ├── cad-bakery-logo.png
│   ├── food-sourdough.jpg
│   ├── foodlink-logo.png
│   ├── qr-customer.png
│   └── qr-merchant.png
├── compositions/
│   ├── scene-1-hook.html         # Re-timed to 10.0s: 8 PM clock & brand reveal
│   ├── scene-2-discovery.html    # Re-timed to 12.0s: Sokha badge, -60% pulse, click at 16.5s
│   ├── scene-3-checkout.html     # Re-timed to 11.5s: KHQR ray at 23.5s, pass at 27.2s
│   ├── scene-4-kitchen.html      # Re-timed to 11.5s: alert at 33.0s, PIN at 35.8s, verify at 40.0s
│   └── scene-5-impact.html       # Re-timed to 12.0s: metrics at 43.8s, dual QR at 47.5s (7s hold)
├── scripts/
│   └── build-audio-assets.py     # JennyNeural speech generation & 55s BGM synthesis
├── hyperframes.json
├── index.html                    # 55.0s master timeline orchestrator (1,650 frames)
├── package.json
└── renders/
    └── foodlink-product-film.mp4 # Rendered 55-second commercial film
```

## Implementation Phases

### Phase 1: Audio Pipeline Upgrade
- Update `scripts/build-audio-assets.py`:
  - Synthesize 5 voiceover tracks via `edge_tts.Communicate(text, 'en-US-JennyNeural', rate='-2%')`.
  - Process via FFmpeg broadcast filter chain (`highpass=f=80,loudnorm=I=-14:LRA=7:tp=-1`).
  - Extend `generate_ambient_tech_bed()` to 55.0 seconds.
  - Execute script and inspect output durations.

### Phase 2: Master Timeline Orchestrator Re-timing (55.0s)
- Update `videos/foodlink-product-film/index.html`:
  - Change root duration to `55.0` seconds (1,650 frames).
  - Re-mount the 5 scene compositions with extended durations and clean overlap.
  - Re-mount the 5 JennyNeural voiceover clips with exact probe timestamps.
  - Re-mount BGM (55.0s) with dynamic ducking during speech.
  - Re-time SFX triggers: click at 16.5s, KHQR chime at 23.8s, order ping at 33.0s, verify ding at 40.0s.

### Phase 3: Visual Scene Synchronization
- Update `scene-1-hook.html`: Duration 10.0s; clock rolls to 8 PM at 0.8s; headline at 2.8s; brand reveal at 5.8s.
- Update `scene-2-discovery.html`: Duration 12.0s; Sokha badge at 10.4s; CAD Bakery highlight at 12.8s; pointer tap at 16.5s.
- Update `scene-3-checkout.html`: Duration 11.5s; Bakong QR sheet at 21.8s; ray sweep at 23.5s; pass `#FS-849201` at 27.2s.
- Update `scene-4-kitchen.html`: Duration 11.5s; order alert at 33.0s; PIN digits sequential typing at 35.8s; verified badge at 39.8s.
- Update `scene-5-impact.html`: Duration 12.0s; impact counters at 43.8s; dual QR cards at 47.5s, holding until 55.0s.

### Phase 4: Quality Gate & Render
- Verify zero emojis across all code and text (Constitution Principle III).
- Run `npx.cmd --yes hyperframes check --json` and ensure 0 errors.
- Render master 1080p MP4 via `npx.cmd --yes hyperframes render -o renders/foodlink-product-film.mp4`.
- Audit isolation gate: `git status --porcelain customer merchant server videos/foodlink-demo`.

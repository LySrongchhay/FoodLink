# Feature Specification: Human Voiceover Narration for Product Demo Film

**Feature Branch**: `014-video-voiceover-narration`

**Created**: 2026-10-31

**Status**: Draft

**Input**: User description: "for the video demo, also have human talking to explain our product, the sound alone is not good,"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Synchronized Multi-Scene Voiceover Narration (Priority: P1) [MVP]

Viewers watching the FoodLink product demo video hear a natural, articulate human voiceover guiding them step-by-step through the dual-perspective workflow across all 40 seconds:
1. **Hook (0.0s – 7.5s)**: Explaining how fresh Phnom Penh bakeries discard surplus food daily at closing hours.
2. **Customer Discovery (7.0s – 16.5s)**: Demonstrating how customers discover surprise bags in BKK1 at 50% to 70% off.
3. **Checkout & Pass (16.0s – 25.5s)**: Explaining 1-tap Bakong KHQR instant payment and the generation of the 6-digit counter pickup pass.
4. **Merchant Kitchen & Counter (25.0s – 33.5s)**: Explaining real-time kitchen order alerts and rapid counter PIN verification with zero staff friction.
5. **Impact & CTA (33.0s – 40.0s)**: Concluding with rescued meal metrics, CO2 emissions prevented, and inviting viewers to scan the customer and merchant QR codes.

**Why this priority**: Standalone sound effects lack narrative context. A clear human voiceover anchors viewer attention, explains the product value proposition, and transforms the animation into a persuasive commercial product film.

**Independent Test**: Play the video timeline in HyperFrames preview. Listen to the narration track solo or alongside visuals. Every spoken sentence must align with on-screen actions with natural cadence and intelligible audio.

**Acceptance Scenarios**:

1. **Given** the video starts at 0.0s, **When** Scene 1 plays, **Then** the narrator introduces Phnom Penh's evening surplus challenge and introduces FoodLink as the solution.
2. **Given** Scene 2 opens at 7.0s, **When** the smartphone UI highlights CAD Bakery in BKK1, **Then** the voiceover explains discount surprise bags and customer reservation.
3. **Given** Scene 3 transitions at 16.0s, **When** the Bakong KHQR card and ray sweep appear, **Then** the voiceover articulates instant digital payment and digital counter pass issuance.
4. **Given** Scene 4 transitions at 25.0s, **When** the kitchen tablet enters and the PIN is typed, **Then** the voiceover explains staff verification and zero-friction handover.
5. **Given** Scene 5 transitions at 33.0s, **When** impact metrics and dual QR codes appear, **Then** the voiceover delivers a closing call to action to test both live portals.

---

### User Story 2 - Balanced Audio Mixing & Dynamic UI Ducking (Priority: P2)

The voiceover narration is cleanly integrated into the master audio pipeline alongside the existing tactile UI sound effects (`click.mp3`, `khqr-chime.mp3`, `order-ping.mp3`, `verify-ding.mp3`) and an optional low-profile ambient background track. The voiceover remains at the forefront (-14 LUFS to -16 LUFS broadcast standard) while sound effects and music duck automatically during active speech.

**Why this priority**: Poor audio balancing leads to muffled speech or jarring volume spikes. A disciplined mix ensures the human voice remains crisp, clear, and comfortable on mobile speakers and headphones.

**Independent Test**: Render the audio mix with `npx hyperframes check` and inspect waveform levels. Spoken audio must never clip, distort, or be drowned out by tactile UI sound effects.

**Acceptance Scenarios**:

1. **Given** the voiceover is speaking at 11.2s, **When** `snd-click` triggers, **Then** the click sound effect is audible without masking narrator vocal clarity.
2. **Given** the Bakong chime plays at 20.8s, **When** the voiceover introduces the pickup pass, **Then** the chime rings cleanly without vocal clash.
3. **Given** the master audio track renders, **When** analyzed, **Then** total audio loudness adheres to standard video streaming range without distortion.

---

### User Story 3 - Synchronized Visual Subtitles / Caption Overlay (Priority: P3)

Clean, minimalist subtitles or kinetic phrase cards render along the lower third of the video, synchronized with the voiceover script. This guarantees maximum engagement for social media platforms where video defaults to muted playback.

**Why this priority**: Over 65% of mobile social viewers watch video with audio muted initially. Synced captions reinforce comprehension and expand accessibility.

**Independent Test**: Mute master audio during playback and confirm that the subtitles clearly convey the entire narrative arc with legible typography conforming to FoodLink minimalist design standards.

**Acceptance Scenarios**:

1. **Given** the narrator speaks each phrase, **When** played on screen, **Then** synchronized text highlights or appears in clean Inter typography without obscuring core phone/tablet UI frames.
2. **Given** full video playback, **When** captions display, **Then** zero emojis are used in subtitle copy (complying with Foodlink Constitution Principle III).

---

### Edge Cases

- What happens if voiceover duration exceeds the allocated scene duration (e.g., scene 3 is 9.5s but narration takes 11s)? The script must be tightly budgeted to word counts matching natural speaking rates (approx. 2.5 words per second / 150 words per minute max).
- How does the system handle audio format compatibility across Chrome/Safari/VLC? Audio tracks must be formatted as high-bitrate stereo MP3 / AAC at 44.1kHz or 48kHz.
- What happens if background audio is added? It must be ducked to -22 dB to -24 dB relative to the voiceover at -14 dB.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide high-fidelity voiceover audio assets corresponding to each narrative phase of the 40-second product film.
- **FR-002**: Narration script MUST strictly adhere to the Foodlink tone of voice: professional, solution-oriented, modern, and free of hype or decorative emojis.
- **FR-003**: System MUST declare voiceover audio clips in `videos/foodlink-product-film/index.html` using HyperFrames `<audio class="clip">` syntax with precise `data-start`, `data-duration`, `data-track-index`, and `data-volume` parameters.
- **FR-004**: System MUST synchronize voiceover cues so the spoken words match the exact visual milestones on screen (CAD Bakery card reveal at 8s, tap at 11s, KHQR at 18s, PIN verification at 27s, impact metrics at 34s).
- **FR-005**: Voice narration language MUST be [NEEDS CLARIFICATION: Should the narrator speak in clear international English, Khmer, or a dual bilingual approach? Defaulting to clear international English tailored for Cambodian tech ecosystem demos].
- **FR-006**: Voice audio generation MUST use [NEEDS CLARIFICATION: Generated studio-grade natural AI narrator voice via TTS pipeline vs provided pre-recorded human WAV/MP3 files? Defaulting to studio-grade natural neutral human voiceover audio files].
- **FR-007**: Audio balance MUST maintain voice clarity as primary focal audio while preserving tactile feedback from existing UI cues.
- **FR-008**: All video sources and audio assets MUST reside strictly in `videos/foodlink-product-film/` with legacy applications (`customer/`, `merchant/`, `server/`) and `videos/foodlink-demo/` remaining 100% untouched.

### Key Entities *(include if feature involves data)*

- **Voiceover Segment**: Represents a discrete spoken narrative passage with attributes:
  - `id`: Unique identifier (e.g., `vo-scene-1-hook`, `vo-scene-2-discovery`)
  - `startTime`: Timeline offset in seconds
  - `duration`: Duration in seconds
  - `scriptText`: Verbatim spoken sentence script
  - `audioFile`: Relative path to MP3/WAV asset in `assets/audio/voiceover/`
- **Audio Mix Configuration**: Volume levels, ducking offsets, and track indexes assigned to each sound element in the master orchestrator.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of the 40-second video has coherent, intelligible spoken commentary with zero dead silence intervals exceeding 2.5 seconds.
- **SC-002**: Audio sync timing between voiceover milestones and visual screen transitions remains within $\pm 0.3$ seconds.
- **SC-003**: HyperFrames validation check (`npx hyperframes check --json`) passes with 0 errors across audio, layout, and runtime categories.
- **SC-004**: Rendered MP4 output filesize remains compact (under 12 MB) while delivering clear 48 kHz stereo voice narration.
- **SC-005**: 100% compliance with Foodlink Constitution Principle III (zero emojis in audio metadata, scripts, or on-screen captions) and Principle VI (legacy app isolation).

## Assumptions

- The primary language for the demo presentation is English, with familiar local references (Phnom Penh, BKK1, Bakong KHQR, CAD Bakery).
- The existing tactile sound effects (`click`, `khqr-chime`, `order-ping`, `verify-ding`) are preserved and balanced with the voiceover rather than replaced.
- The 40-second duration and 5-scene structure established in feature `013` remain the target visual canvas for this narration layer.
- Render pipeline will execute locally via HyperFrames CLI with hardware GPU acceleration.

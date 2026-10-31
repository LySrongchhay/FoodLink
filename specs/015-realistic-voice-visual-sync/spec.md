# Feature Specification: Ultra-Realistic Human Voiceover & Visual Story Synchronization

**Feature Branch**: `015-realistic-voice-visual-sync`

**Created**: 2026-10-31

**Status**: Draft

**Input**: User description: "make the sound it video as real as human, and make the visual align wit hthe script, we can have more time for the video"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Ultra-Realistic Human Studio Voiceover (Priority: P1) [MVP]

Viewers watching the product film hear an articulate, natural human voiceover powered by state-of-the-art neural studio synthesis (replacing legacy robotic desktop synth). The voice sounds warm, conversational, and authentic, with natural breathing pauses, expressive inflection, and accurate Cambodian pronunciation (Phnom Penh, Boeung Keng Kang 1 / BKK1, Bakong KHQR, CAD Bakery).

**Why this priority**: Robotic synthesizer voices break trust and lower production value. A studio-quality natural human voice makes the product commercial persuasive, polished, and enjoyable to listen to.

**Independent Test**: Listen to the generated voiceover files solo. Verify that tone, cadence, and breath sound like a genuine professional voice actor with zero mechanical robotic artifacts.

**Acceptance Scenarios**:

1. **Given** any voiceover segment, **When** played back, **Then** vocal timbre possesses studio depth and natural human conversational pacing (~130–135 words per minute).
2. **Given** spoken phrases with local terms, **When** the narrator speaks, **Then** "Phnom Penh", "BKK1", "CAD Bakery", and "Bakong KHQR" are articulated accurately and naturally.

---

### User Story 2 - Real-Time Visual Alignment with Voiceover Script (Priority: P2)

Every visual milestone on screen triggers in exact synchronization with the words spoken by the narrator:
1. **"It is 8:00 PM in Phnom Penh"** $\rightarrow$ Clock counter smoothly ticks to 8:00 PM over glowing evening city silhouette.
2. **"Meet Sokha"** $\rightarrow$ Sokha user persona tag and avatar ring slide into view on the mobile device.
3. **"spots CAD Bakery in BKK1 with 60% off"** $\rightarrow$ CAD Bakery card with `-60%` discount chip pulses into focus 400m away.
4. **"reserves an artisan box"** $\rightarrow$ Tactile cursor clicks "Reserve Now" with an authentic mechanical mouse click.
5. **"One tap with Bakong KHQR confirms payment"** $\rightarrow$ Red Bakong KHQR card sweeps with light ray and confirmation chime.
6. **"generating her secure six-digit digital counter pass"** $\rightarrow$ Pickup pass `#FS-849201` animates into view.
7. **"CAD Bakery receives the order live"** $\rightarrow$ Real-time incoming order banner drops into the merchant tablet.
8. **"verifies the PIN on their tablet"** $\rightarrow$ Keypad enters digits `8-4-9-2-0-1` in step with speech.
9. **"Surplus saved, revenue recovered"** $\rightarrow$ Ecological and revenue metrics count upward.
10. **"Scan on your phone to experience FoodLink live today"** $\rightarrow$ Dual Customer and Merchant QR cards reveal side-by-side.

**Why this priority**: Disconnected visuals and audio confuse the viewer. Frame-accurate alignment creates a seamless, immersive advertising experience.

**Independent Test**: Watch the video at 0.5x and 1.0x speed. Confirm that on-screen animations occur simultaneously with their corresponding spoken words within a $\pm 0.2$s window.

**Acceptance Scenarios**:

1. **Given** the narrator says "reserves an artisan box", **When** the word "reserves" is spoken, **Then** the cursor presses the button and the mechanical mouse click triggers simultaneously.
2. **Given** the narrator mentions "verifies the PIN", **When** spoken, **Then** the PIN digits highlight and type into the boxes in real-time.

---

### User Story 3 - Extended 50-Second Commercial Timeline (Priority: P3)

The total video duration is expanded from 40 seconds (1,200 frames) to **50 seconds (1,500 frames @ 30 fps)**. This extended duration provides generous breathing room across all 5 scenes (9 to 11 seconds per scene), preventing the narrator or animations from feeling rushed.

**Why this priority**: A 40-second runtime forced high speech density. A 50-second runtime allows comfortable pauses between thoughts, letting visual details and music breathe.

**Independent Test**: Verify that the master orchestrator `index.html` has `data-duration="50.0"` and renders exactly 1,500 frames with zero dead silence or rushed pacing.

**Acceptance Scenarios**:

1. **Given** the 50-second timeline, **When** transitioning between scenes, **Then** a 0.8s to 1.2s musical breathing buffer exists between spoken thoughts.
2. **Given** the final impact scene, **When** dual QR codes display, **Then** they remain visible for at least 6.0 seconds so viewers have ample time to scan with their phones.

---

### Edge Cases

- What happens if neural TTS generates varying audio lengths between runs? Audio scripts are pre-measured and padded with silent head/tail markers so timestamps remain deterministic.
- What happens if the extended timeline causes frame dedup or dead-stretch linter warnings? Visual elements incorporate subtle inertial floating sway and ambient light pulses to ensure continuous visual life without static holds exceeding 3 seconds.
- How does the system handle dual QR codes on phone screens? QR codes are scaled to at least 260×260 px with high-contrast borders for instant smartphone camera scanning.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST synthesize studio neural human speech using high-fidelity neural voice models (`en-US-AndrewNeural` or `en-US-ChristopherNeural` or `en-US-JennyNeural`).
- **FR-002**: Master video timeline duration MUST be set to exactly 50.0 seconds (1,500 frames at 30 fps).
- **FR-003**: System MUST choreograph visual GSAP animations in each scene so keyframe triggers align within $\pm 0.2$ seconds of the corresponding spoken voiceover words.
- **FR-004**: System MUST maintain crisp mechanical mouse click sound (`mouse-click.mp3`) synchronized with the customer reservation tap.
- **FR-005**: System MUST extend the background ambient music bed (`bgm-ambient-tech.mp3`) to 50.0 seconds with dynamic ducking during active speech.
- **FR-006**: System MUST ensure strictly zero emojis appear across all video overlays, captions, metadata, or audio scripts (Constitution Principle III).
- **FR-007**: System MUST preserve strict directory isolation: `videos/foodlink-demo/`, `customer/`, `merchant/`, and `server/` remain 100% untouched (Constitution Principle VI).

### Key Entities *(include if feature involves data)*

- **Extended Scene Budget Map (50.0s total)**:
  - `Scene 1 (The Dilemma)`: 0.0s – 9.0s (9.0s window, ~20 words, hook & Phnom Penh context)
  - `Scene 2 (Sokha Discovery)`: 8.5s – 19.5s (11.0s window, ~24 words, BKK1 CAD Bakery reserve)
  - `Scene 3 (Bakong Instant Pay)`: 19.0s – 29.5s (10.5s window, ~18 words, KHQR & pass `#FS-849201`)
  - `Scene 4 (Kitchen PIN Verification)`: 29.0s – 40.0s (11.0s window, ~22 words, tablet queue & PIN)
  - `Scene 5 (Impact & Dual QR CTA)`: 39.5s – 50.0s (10.5s window, ~16 words, metrics & scan CTA)

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The voiceover sounds 100% natural, human, and professional, verified through spectral quality and conversational pacing.
- **SC-002**: Visual-audio synchronization latency between spoken keywords and visual on-screen triggers is $\le 200\text{ ms}$ throughout the entire film.
- **SC-003**: Master video renders at full 1080p (1920×1080 @ 30 fps) with exactly 1,500 frames and a duration of 50.0 seconds.
- **SC-004**: HyperFrames automated quality check (`npx hyperframes check --json`) passes with 0 errors across lint, runtime, audio, and layout.
- **SC-005**: 100% compliance with Foodlink Constitution Principle III (zero emojis) and Principle VI (legacy app isolation).

## Assumptions

- High-definition neural TTS synthesis is powered locally via the upgraded `edge-tts` engine.
- Background music is synthesized to 50 seconds to cover the full extended timeline.
- The output file replaces `videos/foodlink-product-film/renders/foodlink-product-film.mp4`.

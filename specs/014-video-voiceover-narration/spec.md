# Feature Specification: Commercial Motion Film with Human Story Narration

**Feature Branch**: `014-video-voiceover-narration`

**Created**: 2026-10-31

**Status**: Clarified

**Input**: User description: "make the video as motion, an advertising video about the product, not just show the feature, show the user story, the sound that have implement is not good, make like a mouse click instead"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Relatable Dual-Persona Human Story (Priority: P1) [MVP]

Rather than a dry software feature demo, the 40-second product film tells an engaging, commercial user story connecting two real people in Phnom Penh:
1. **The Dilemma (0.0s – 7.5s)**: It's 8:00 PM in Phnom Penh. At CAD Bakery in Boeung Keng Kang 1, fresh artisan loaves and pastries are about to go to waste. Meanwhile, Sokha, a young professional finishing work, wants quality dinner without high restaurant costs.
2. **The Connection (7.0s – 16.5s)**: Sokha opens FoodLink on her phone, spots CAD Bakery 400m away offering a 60% closing-hour discount, and reserves a sourdough surprise box with one tap.
3. **Instant Bakong KHQR (16.0s – 25.5s)**: Sokha pays seamlessly via Bakong KHQR and instantly receives a secure 6-digit counter pickup pass (`#FS-849201`).
4. **Kitchen Operations (25.0s – 33.5s)**: At CAD Bakery, staff hear an instant order chime on their kitchen tablet, greet Sokha, enter the 6-digit PIN, and hand over the fresh bread with zero friction.
5. **The Mutual Win (33.0s – 40.0s)**: Sokha saved 60%, CAD Bakery recovered revenue on unsold food, and 342kg of CO2 was prevented from the city.

**Why this priority**: People buy into human stories and emotional problem-solving, not isolated UI buttons. Showing Sokha and CAD Bakery transforms FoodLink into an impactful, memorable consumer brand.

**Independent Test**: Watch the video and confirm that every scene communicates who is acting, what their motivation is, and how FoodLink solves their immediate problem.

**Acceptance Scenarios**:

1. **Given** Scene 1 begins, **When** the film opens, **Then** the narrator introduces Phnom Penh's closing-hour bakery surplus problem and introduces FoodLink.
2. **Given** Scene 2 opens, **When** the customer smartphone animates in, **Then** the narrator frames the interaction around Sokha discovering fresh discounts in BKK1.
3. **Given** Scene 3 transitions, **When** Bakong KHQR displays, **Then** the narrator highlights effortless cashless payment and instant pickup pass generation.
4. **Given** Scene 4 transitions, **When** the merchant tablet is shown, **Then** the narrator explains counter staff receiving the order and verifying the customer handover.
5. **Given** Scene 5 concludes, **When** impact metrics appear, **Then** the narrator recaps the win-win outcome and invites viewers to scan the live demo QR codes.

---

### User Story 2 - Kinetic Advertising Motion & Camera Dynamics (Priority: P2)

The visual design elevates from static UI presentation to an advertising motion commercial:
- High-impact kinetic typography with fluid entrance choreography.
- 3D perspective phone and tablet floating angles, subtle inertial float, and responsive shadows.
- Dynamic camera zooms and smooth scene transitions (momentum push/pull, depth blurring, clean studio backdrops).
- Visual storytelling cues (clock ticking to 8:15 PM, distance badge `400m`, clear discount chips `-60%`).

**Why this priority**: Commercial motion design captures attention on social media and investor decks within the first 3 seconds and sustains high viewer retention throughout the 40 seconds.

**Independent Test**: Inspect frame transitions in HyperFrames preview. Elements must glide with natural physical momentum and zero robotic or abrupt cuts.

**Acceptance Scenarios**:

1. **Given** scene transitions, **When** switching perspectives between customer and merchant, **Then** device frames glide smoothly with 3D perspective tilts and subtle scale easing.
2. **Given** kinetic typography, **When** headline text renders, **Then** words reveal with staggered kinetic momentum without visual jitter.

---

### User Story 3 - Realistic Mouse Click & Refined Audio Mix (Priority: P3)

The audio experience is rebuilt to replace artificial synthesizer tones with realistic, tactile sound design:
- **Crisp Mechanical Mouse Click**: Replaces the previous beep/synthetic tone with a satisfying, realistic physical mouse click / tactile screen tap (`mouse-click.mp3`/`.wav`) at interaction points (11.2s).
- **Studio Human Voiceover**: A warm, natural, professional English voiceover narrating the human story with natural conversational pacing (~145 wpm).
- **Subtle Commercial Bed & Ducking**: A modern, low-profile ambient background bed layered underneath with automatic volume ducking whenever the narrator speaks.
- **Harmonious Notification Chimes**: Soft, elegant Bakong KHQR confirmation and kitchen order chime that blend naturally with the voiceover without jarring volume spikes.

**Why this priority**: Poor audio destroys viewer immersion. A realistic mechanical click and balanced narrative audio track make the product feel polished, tangible, and high quality.

**Independent Test**: Listen to the audio master on studio headphones and laptop speakers. The mouse click must sound crisp and authentic, and the spoken story must remain distinct and intelligible throughout.

**Acceptance Scenarios**:

1. **Given** the customer taps "Reserve Box" at 11.2s, **When** the interaction occurs, **Then** a crisp physical mouse click sound plays.
2. **Given** active voice narration, **When** background elements or chimes trigger, **Then** the narration remains the loudest, most prominent element with zero audio clipping.

---

### Edge Cases

- What happens if the voiceover narration script runs longer than the scene visual window? The script word count must strictly adhere to speaking rate limits: Scene 1 ($\le 18$ words), Scene 2 ($\le 24$ words), Scene 3 ($\le 22$ words), Scene 4 ($\le 22$ words), Scene 5 ($\le 18$ words).
- What happens if mouse click sound is too quiet or too sharp? The click asset must be normalized to -12 dB with high frequencies softened around 8 kHz to prevent ear fatigue.
- How does the system handle sound-off viewers? Clear visual callouts, badge highlights, and large readable metrics convey the full story even if muted.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST craft a commercial advertising voiceover script telling the dual human user story of Sokha and CAD Bakery.
- **FR-002**: System MUST replace synthetic UI tap sounds with a crisp, realistic tactile mechanical mouse click audio asset (`mouse-click.mp3` / `mouse-click.wav`).
- **FR-003**: System MUST provide studio-grade natural human voiceover narration files synchronized to each scene's visual milestones.
- **FR-004**: System MUST implement dynamic advertising motion choreography (3D device tilt, kinetic typography, momentum transitions) in GSAP timelines.
- **FR-005**: Voice narration language MUST be clear, articulate International English with authentic local Cambodian pronunciation for place names and brands (Phnom Penh, BKK1, Bakong KHQR, CAD Bakery).
- **FR-006**: Voice audio generation MUST use a warm, natural professional product narrator persona with studio neural voice quality and balanced conversational pacing.
- **FR-007**: Audio balance MUST maintain voice clarity at -14 LUFS broadcast standard, duck background audio by 6–8 dB during active speech, and align tactile mouse clicks within $\pm 0.1$s of visual tap cues.
- **FR-008**: All video sources, audio assets, and compositions MUST reside strictly in `videos/foodlink-product-film/` with legacy applications (`customer/`, `merchant/`, `server/`) and `videos/foodlink-demo/` remaining 100% untouched.

### Key Entities *(include if feature involves data)*

- **Commercial Story Arc**:
  - `Act I (The Problem)`: CAD Bakery closing-hour surplus vs. Sokha looking for quality dinner in Phnom Penh.
  - `Act II (Customer Discovery)`: Browsing BKK1 live discounts and reserving the sourdough box.
  - `Act III (Frictionless Pay)`: Bakong KHQR 1-tap checkout and digital counter pass `#FS-849201`.
  - `Act IV (Kitchen Handover)`: Real-time tablet alert and instant PIN counter verification.
  - `Act V (The Impact)`: Mutual financial and ecological win + QR call-to-action.
- **Tactile Sound Map**:
  - `mouse-click.mp3`: Triggered on customer reservation tap (11.2s).
  - `khqr-chime.mp3`: Soft resonant chime on Bakong payment confirmation (20.8s).
  - `order-ping.mp3`: Crisp bell ping on kitchen tablet order arrival (25.4s).
  - `verify-ding.mp3`: Ascending dual-tone confirmation on successful PIN verification (30.8s).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The video tells a coherent advertising commercial narrative (identifying the user need, product interaction, and business/environmental resolution) across exactly 40.0 seconds.
- **SC-002**: The primary UI tap effect sounds like an authentic mechanical mouse click, validated through audio spectral review.
- **SC-003**: Voiceover clarity rating achieves 100% intelligibility without clipping or masking by background sound effects.
- **SC-004**: HyperFrames quality check (`npx hyperframes check --json`) passes with 0 errors across audio, layout, and runtime categories.
- **SC-005**: 100% compliance with Foodlink Constitution Principle III (zero emojis) and Principle VI (legacy app isolation).

## Assumptions

- The 40-second runtime (1,200 frames @ 30 fps) and 1080p widescreen canvas established in feature `013` remain the target foundation.
- Voice narration will be generated using a high-fidelity natural neural speech synthesis engine with human warmth and precision.
- The output will be rendered to `videos/foodlink-product-film/renders/foodlink-product-film.mp4`.

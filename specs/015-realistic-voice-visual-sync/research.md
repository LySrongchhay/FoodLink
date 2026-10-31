# Research & Decisions: Ultra-Realistic Human Voiceover & Visual Synchronization

**Feature**: `015-realistic-voice-visual-sync`  
**Status**: Completed  
**Date**: 2026-10-31  

---

## 1. Studio Neural Voice Synthesis: `en-US-JennyNeural`

### Decision
Migrate from local SAPI desktop voices to Microsoft's neural studio model `en-US-JennyNeural` via `edge-tts 7.3.1`:
- Pacing rate: `rate="-2%"` to establish a warm, relaxed commercial cadence (~135 words per minute).
- Audio filter: `highpass=f=80,loudnorm=I=-14:LRA=7:tp=-1` via FFmpeg at 48 kHz stereo.

### Rationale
- `en-US-JennyNeural` is a premier studio neural voice with lifelike breathing micro-pauses, smooth pitch transitions, and natural conversational warmth.
- It sounds indistinguishable from a professional human voice actor and removes all robotic desktop artifacts.

---

## 2. 55-Second Commercial Timeline Budget

### Decision
Expand master timeline from 40.0s to 55.0s (1,650 frames @ 30 fps), distributed across 5 scenes:

| Scene | Composition Window | Voiceover Time Window | Script Word Count | Spoken Dialogue |
| :--- | :--- | :--- | :--- | :--- |
| **Scene 1: Hook & Dilemma** | 0.0s – 10.0s (10.0s) | 0.5s – 8.9s (8.4s) | 21 words | *"It is eight PM in Phnom Penh. Fresh bakery surplus is about to go to waste. But it does not have to."* |
| **Scene 2: Sokha Discovery** | 9.5s – 21.5s (12.0s) | 10.2s – 19.8s (9.6s) | 25 words | *"Meet Sokha. Finishing work, she opens FoodLink, spots CAD Bakery in BKK1 with sixty percent off, and reserves an artisan box."* |
| **Scene 3: Bakong Pay & Pass** | 21.0s – 32.5s (11.5s) | 21.8s – 30.2s (8.4s) | 20 words | *"One tap with Bakong KHQR confirms payment instantly, generating her secure six-digit digital counter pickup pass."* |
| **Scene 4: Kitchen Handover** | 32.0s – 43.5s (11.5s) | 32.8s – 41.5s (8.7s) | 24 words | *"At the counter, CAD Bakery receives the order live, verifies the PIN on their tablet, and hands over fresh bread with zero friction."* |
| **Scene 5: Impact & Dual QR** | 43.0s – 55.0s (12.0s) | 43.8s – 50.8s (7.0s) | 16 words | *"Surplus saved, revenue recovered, and a cleaner city. Scan on your phone to experience FoodLink live today."* |

**Breathing Room**: Each scene contains a 1.0s–1.5s buffer before the transition cut. The outro holds dual QR codes for 7.0 seconds (48.0s – 55.0s) to guarantee viewers can scan effortlessly from their phones.

---

## 3. Frame-Accurate Visual Synchronization Matrix

### Decision
Align visual milestones within $\pm 0.2$ seconds of the spoken keyword:

1. **Scene 1 (Hook)**:
   - 0.5s: Voice: *"It is eight PM in Phnom Penh"* $\rightarrow$ Animated clock ticks to 8:00 PM over glowing map pin.
   - 2.8s: Voice: *"Fresh bakery surplus about to go to waste"* $\rightarrow$ Kinetic headline text unfolds.
   - 5.8s: Voice: *"But it does not have to"* $\rightarrow$ Smooth morph into the FoodLink Cambodia brand splash.
2. **Scene 2 (Discovery)**:
   - 10.2s: Voice: *"Meet Sokha"* $\rightarrow$ Persona card with "Sokha • BKK1" drops into the smartphone status bar.
   - 12.8s: Voice: *"spots CAD Bakery in BKK1 with sixty percent off"* $\rightarrow$ CAD Bakery card with `-60%` chip scales up.
   - 16.5s: Voice: *"and reserves an artisan box"* $\rightarrow$ Pointer clicks "Reserve Now", triggering `mouse-click.mp3` at 16.5s.
3. **Scene 3 (Bakong Pay)**:
   - 21.8s: Voice: *"One tap with Bakong KHQR"* $\rightarrow$ Red Bakong KHQR sheet slides into view.
   - 23.5s: Light ray sweeps across QR card, accompanied by `khqr-chime.mp3` at 23.8s.
   - 27.2s: Voice: *"generating her secure six-digit digital counter pickup pass"* $\rightarrow$ Confirmation ticket stamps with code `#FS-849201`.
4. **Scene 4 (Kitchen Handover)**:
   - 32.8s: Voice: *"CAD Bakery receives the order live"* $\rightarrow$ Merchant tablet alert rings with `order-ping.mp3` at 33.0s.
   - 35.8s: Voice: *"verifies the PIN on their tablet"* $\rightarrow$ Digits `8-4-9-2-0-1` type sequentially into boxes.
   - 39.8s: Voice: *"hands over fresh bread with zero friction"* $\rightarrow$ Verified badge drops with `verify-ding.mp3` at 40.0s.
5. **Scene 5 (Impact & QR CTA)**:
   - 43.8s: Voice: *"Surplus saved, revenue recovered, and a cleaner city"* $\rightarrow$ 3 metric cards roll up.
   - 47.5s: Voice: *"Scan on your phone to experience FoodLink live today"* $\rightarrow$ Dual QR codes expand and hold until 55.0s.

---

## 4. Audio Pipeline: 55s BGM & Dynamic Ducking

### Decision
Extend `bgm-ambient-tech.mp3` to 55.0s (116 BPM, C Major / A Minor). In `index.html`, set base volume to 0.18 during active speech, with a smooth swell to 0.42 during the final QR code hold (50.5s – 55.0s).

# Research & Design Decisions: Commercial Motion Film with Human Story Narration

**Feature**: `014-video-voiceover-narration`  
**Status**: Completed  
**Date**: 2026-10-31  

---

## 1. Voiceover Audio Generation & Studio Broadcast Mastering

### Decision
Generate discrete voiceover narrative segments using native high-definition speech synthesis, followed by an automated FFmpeg broadcast audio chain:
- Speech synthesis: High-clarity natural speech engine (Windows Speech / OneCore English voices).
- Studio Mastering Chain:
  `highpass=f=80, lowpass=f=12000, aequalizer=f=3000:width_type=h:width=1000:g=2.5, compand=attacks=0.02:decays=0.2:points=-80/-80|-24/-24|-12/-15|0/-13, loudnorm=I=-14:LRA=7:tp=-1`
- Format: 48 kHz, 16-bit stereo MP3 and WAV.

### Rationale
- Pure local execution guarantees 100% offline reliability without external cloud tokens or third-party API rate limits (complying with Foodlink Constitution Principle IV).
- The EQ and multiband compression chain removes low-frequency boom, adds vocal presence in the 3 kHz intelligibility band, and normalizes output to the broadcast standard of -14 LUFS.

### Alternatives Considered
- Cloud TTS (ElevenLabs, Azure Speech): Requires network tokens and API credits; violates offline demo reliability and zero-backend principle.
- Direct raw SAPI output: Sounds slightly dry and uncompressed without mastering; FFmpeg EQ/compand solves this completely.

---

## 2. Mechanical Mouse Click Sound Design

### Decision
Synthesize a physical microswitch mouse click (`mouse-click.mp3` / `mouse-click.wav`) characterized by:
1. High-frequency initial transient: 0.8 ms steep attack spike centered at 3.2 kHz to 4.5 kHz.
2. Mechanical housing resonance: 18 ms exponentially decaying body damped at 1.2 kHz.
3. Total duration: 32 ms.
4. Output level: Normalized to -12 dB with a gentle high-shelf rolloff above 9 kHz to ensure crisp tactile feedback without ear fatigue.

### Rationale
The previous audio cue was a generic synthesizer frequency sweep. A genuine mechanical mouse click gives a tangible, tactile physical feedback sensation that matches modern premium UI commercials.

### Alternatives Considered
- Keystroke sound: Too hollow and lacks the distinct "tap/click" intent of selecting a card on a modern smartphone.
- Synthetic beep: Rejected by user as artificial and unengaging.

---

## 3. Background Music Bed & Dynamic Audio Ducking

### Decision
Generate a custom 40-second modern minimal electronic tech ambient bed (`bgm-ambient-tech.mp3`):
- Tempo: 116 BPM in C Major / A Minor.
- Instruments: Soft analog pulse, warm sub-bass root notes, gentle filtered marimba arpeggio.
- Mix Level: Base volume set to -22 dB.
- Dynamic Ducking: In HyperFrames master orchestrator, background music is held at 0.18 volume during spoken narration, allowing the voiceover to command 100% intelligibility, smoothly swelling to 0.45 volume during the closing impact resolution (35.0s – 40.0s).

### Rationale
Background music sets a polished commercial tone and bridges scene cuts, while dynamic ducking prevents music frequencies from interfering with speech.

---

## 4. Narration Script & Timeline Pacing Budget

### Decision
The script is strictly budgeted to natural speaking rates (approx. 2.4 words per second / 145 words per minute) mapped to the 5 scenes:

| Scene | Window | Spoken Text | Word Count | Duration |
| :--- | :--- | :--- | :--- | :--- |
| **Scene 1: The Dilemma** | 0.8s – 6.8s | *"It's eight PM in Phnom Penh. Fresh bakery surplus is about to go to waste. But it doesn't have to."* | 18 words | 5.2s |
| **Scene 2: Customer Discovery** | 7.6s – 15.5s | *"Meet Sokha. She opens FoodLink, spots CAD Bakery in BKK1 with sixty percent off, and reserves an artisan box."* | 20 words | 6.2s |
| **Scene 3: Bakong Pay & Pass** | 16.5s – 24.5s | *"One tap with Bakong KHQR confirms payment instantly, generating her secure six-digit digital counter pass."* | 16 words | 5.4s |
| **Scene 4: Kitchen Handover** | 25.5s – 32.5s | *"At the counter, CAD Bakery receives the order live, types the PIN, and hands over fresh bread with zero friction."* | 20 words | 5.8s |
| **Scene 5: The Impact & CTA** | 33.5s – 39.5s | *"Surplus saved, revenue recovered, and cleaner air. Scan to experience FoodLink live today."* | 13 words | 4.8s |

**Total Spoken Words**: 87 words over 40.0s (average 2.18 wps, allowing breathing room between scene transitions).

---

## 5. Kinetic Advertising Motion Design in HyperFrames

### Decision
Upgrade visual choreography across all scene compositions:
1. **3D Perspective Camera Angles**:
   Apply `perspective: 1400px` on device containers with GSAP 3D rotations:
   `rotationY: -12deg`, `rotationX: 6deg`, `scale: 1.04` settling into a straight elevation view on interaction.
2. **Dynamic Depth Shadows**:
   Multi-layered soft box shadows with ambient green tint:
   `box-shadow: 0 25px 60px -15px rgba(46, 125, 50, 0.12), 0 12px 30px -10px rgba(0, 0, 0, 0.08)`.
3. **Kinetic Typography**:
   Staggered word reveals (`y: 24, opacity: 0, stagger: 0.08, ease: "power3.out"`) synchronized with the narrator's vocal cadence.


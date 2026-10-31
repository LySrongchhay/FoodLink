# Quickstart & Verification Guide: Ultra-Realistic Voiceover & Visual Synchronization

**Feature Branch**: `015-realistic-voice-visual-sync`  
**Video Project Directory**: `videos/foodlink-product-film/`  

---

## 1. Prerequisites

- Python 3.10+ with `edge-tts 7.3.1` installed (`python -m pip install --upgrade edge-tts`).
- FFmpeg installed and accessible in PATH.
- Node.js 18+ with `npx.cmd` on Windows.

---

## 2. Generate JennyNeural Audio & 55s BGM Bed

Run the automated audio build script:

```powershell
python videos/foodlink-product-film/scripts/build-audio-assets.py
```

Expected output:
- `assets/audio/bgm-ambient-tech.mp3` synthesized to 55.0 seconds.
- `assets/audio/mouse-click.mp3` preserved.
- `assets/audio/voiceover/vo-1.mp3` through `vo-5.mp3` synthesized via `en-US-JennyNeural` and normalized to -14 LUFS.

---

## 3. Automated HyperFrames Quality Check

Validate that all 5 scene durations, audio clip alignments, and GSAP timeline registrations pass:

```powershell
cd videos/foodlink-product-film
npx.cmd --yes hyperframes check --json
```

Success Gate:
- `"ok": true`
- `errorCount: 0` across lint, runtime, layout, and audio.

---

## 4. Master 1080p MP4 Render (55 Seconds)

Render the final 55-second film with hardware GPU acceleration:

```powershell
cd videos/foodlink-product-film
npx.cmd --yes hyperframes render -o renders/foodlink-product-film.mp4
```

Verification:
- Resolution: 1920×1080 @ 30 fps.
- Total Frames: 1,650 frames.
- Duration: Exactly 55.0 seconds.
- Voice: Natural studio human narration by `en-US-JennyNeural`.
- Visual Sync: Action triggers on screen within $\pm 0.2$s of spoken keywords.

---

## 5. Isolation Gate Audit

```powershell
git status --porcelain customer merchant server videos/foodlink-demo
```

Output MUST be completely empty.


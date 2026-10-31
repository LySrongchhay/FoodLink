# Quickstart & Verification Guide: Commercial Motion Film with Human Story Narration

**Feature Branch**: `014-video-voiceover-narration`  
**Target Video Project**: `videos/foodlink-product-film/`  

---

## 1. Prerequisites

- Node.js 18+ and `npx.cmd` available on Windows PowerShell.
- FFmpeg installed and accessible via PATH.
- Python 3.10+ available for speech generation script.

---

## 2. Audio Generation & Synthesis Verification

Run the automated audio build script inside `videos/foodlink-product-film/`:

```powershell
cd videos/foodlink-product-film
python scripts/build-audio-assets.py
```

Expected output:
- `assets/audio/mouse-click.mp3` and `.wav` generated (32 ms crisp microswitch).
- `assets/audio/bgm-ambient-tech.mp3` generated (40s clean modern tech bed).
- `assets/audio/voiceover/vo-1.mp3` through `vo-5.mp3` generated and mastered to -14 LUFS.

---

## 3. HyperFrames Quality & Layout Validation

Verify that all HTML compositions, GSAP 3D motion, audio clip slots, and layout boundaries satisfy HyperFrames validation criteria:

```powershell
cd videos/foodlink-product-film
npx.cmd --yes hyperframes check --json
```

Success Gate:
- Output must have `"ok": true`.
- Zero errors across `lint`, `runtime`, `layout`, and `audio`.

---

## 4. Master 1080p MP4 Render

Render the final 40-second commercial film with hardware GPU acceleration:

```powershell
cd videos/foodlink-product-film
npx.cmd --yes hyperframes render -o renders/foodlink-product-film.mp4
```

Verification Criteria:
- Resolution: 1920×1080 @ 30 fps.
- Duration: Exactly 40.0 seconds (1,200 frames).
- Output File: `videos/foodlink-product-film/renders/foodlink-product-film.mp4`.
- Audio Track: Clear human voice narration, crisp mechanical mouse click on reservation, and subtle background tech bed.

---

## 5. Isolation Gate Audit

Confirm that core applications and the preserved legacy demo remain 100% untouched:

```powershell
git status --porcelain customer merchant server videos/foodlink-demo
```

Output MUST be completely empty.


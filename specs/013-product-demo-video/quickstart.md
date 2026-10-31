# Quickstart: HyperFrames Product Demo Video

**Feature Branch**: `013-product-demo-video`  
**Target Directory**: `videos/foodlink-product-film/`  
**Output Video**: `videos/foodlink-product-film/renders/foodlink-product-film.mp4`

---

## 1. Project Overview

This project builds a programmatic, frame-accurate product launch film for **FoodLink Cambodia** using **HyperFrames**. 

The existing video in `videos/foodlink-demo/` is frozen and protected. All new work is isolated inside `videos/foodlink-product-film/`.

---

## 2. Prerequisites

- **Node.js**: 22 LTS or newer (`node -v`)
- **NPM**: `npm.cmd` on Windows
- **HyperFrames CLI**: Run via `npx.cmd --yes hyperframes`

---

## 3. Workflow & Commands

Navigate to the new video directory before running commands:

```powershell
cd d:\DGIY\foodlink-2\videos\foodlink-product-film
```

### A. Live Interactive Preview (Studio)

To open the real-time interactive timeline player in your browser:

```powershell
npx.cmd --yes hyperframes preview
```

- Plays back the 40-second timeline at 30 fps.
- Allows scrubbing through all 5 scenes frame by frame.
- Displays responsive floating device frames and typography.

---

### B. Validation & Contract Verification

Before rendering, run the HyperFrames quality gate:

```powershell
npx.cmd --yes hyperframes check --json
```

This verifies:
- All clip timing attributes (`data-start`, `data-duration`).
- All GSAP timelines registered in `window.__timelines`.
- No missing local asset files (logos, audio, fonts).
- Zero console errors or runtime warnings.

---

### C. Render Final MP4 Video

To render the master 1080p MP4 file:

```powershell
npx.cmd --yes hyperframes render -o renders/foodlink-product-film.mp4
```

- Resolution: **1920 × 1080**
- Framerate: **30 FPS**
- Total Frames: **1,200 frames**
- Output: `videos/foodlink-product-film/renders/foodlink-product-film.mp4`

---

## 4. Key Assets Reference

| Asset | Source / Location | Purpose |
| :--- | :--- | :--- |
| **FoodLink Logo** | `foodlink-ui/public/foodlink-logo.png` $\rightarrow$ `assets/foodlink-logo.png` | Opening hook & closing CTA screen |
| **CAD Bakery Logo** | `foodlink-ui/public/cad-bakery-logo.png` $\rightarrow$ `assets/cad-bakery-logo.png` | Merchant device header & food card |
| **Sourdough Photo** | `assets/food-sourdough.jpg` | High-res food surprise bag card |
| **Customer QR** | `Customer.png` $\rightarrow$ `assets/qr-customer.png` | Ending scene left QR code (`/customer`) |
| **Merchant QR** | `Merchant.png` $\rightarrow$ `assets/qr-merchant.png` | Ending scene right QR code (`/merchant`) |
| **Audio Effects** | `assets/audio/*.mp3` | Tactile clicks, chime, alert ping, ding |


# Feature Specification: 013-product-demo-video

**Feature Branch**: `013-product-demo-video`  
**Created**: 2026-10-31  
**Status**: Ready for Planning  
**Input**: `/speckit-specify /hyperframes generate the video about our product, generate a new one do not touch our existing video`

---

## 1. Executive Summary & Objective

Create a high-impact, programmatic product demonstration video for **FoodLink Cambodia** using **HyperFrames** (HTML/CSS/JS rendered to frame-accurate video). 

The video must showcase FoodLink's core value proposition:
1. **Closing-hour surplus food rescue** in Phnom Penh (CAD Bakery & Artisan Cafes).
2. **Dual-Portal Workflow**: Customer discovery and Bakong KHQR checkout on mobile, synchronized with the Merchant's real-time Kitchen Queue and PIN verification.
3. **The Impact**: 50–70% savings for customers, revenue recovery for local bakeries, and reduced carbon footprint.

### Strict Isolation Constraints
- **Preserve Existing Video**: Under no circumstances should `videos/foodlink-demo/` or its contents (`foodlink-demo.mp4`, `video.mp4`, `hyperframes.json`) be modified or deleted.
- **Dedicated Project Directory**: The new video project must reside in an isolated directory: `videos/foodlink-product-film/`.
- **Constitutional Compliance (v1.2.0)**: Principle III (Strictly zero emojis — Lucide SVG icons only) and Principle VI (Isolation — `customer/`, `merchant/`, and `server/` untouched).

---

## 2. Clarifications & Design Decisions

The following key architectural and creative decisions were clarified via interactive alignment:

| Question | Selected Decision | Specification Impact |
| :--- | :--- | :--- |
| **Aspect Ratio & Format** | **16:9 Widescreen (1920×1080)** | Video root is set to 1920×1080 at 30 fps, optimized for laptop display, presentation stages, and pitch decks. |
| **Total Duration** | **40 Seconds (1200 frames @ 30 fps)** | Perfectly paced 5-scene structure (Hook $\rightarrow$ Discovery $\rightarrow$ KHQR Checkout $\rightarrow$ Kitchen Handover $\rightarrow$ Impact & Dual QR CTA). |
| **Studio Background** | **Clean Light Studio (`#FAFAFA` / stone-50)** | Matches FoodLink brand aesthetic, clean minimalist drop shadows, and green/orange accent tokens. |
| **Audio Style** | **Minimalist UI Sound Effects Only** | Pure tactile interaction audio: subtle clicks, KHQR scan confirmation chime, kitchen alert ping, and green verification ding. No background music. |
| **Visual Mockup Style** | **Realistic Floating Device Frames** | Customer portal rendered inside a sleek floating smartphone frame (left); Merchant kitchen portal rendered inside a tablet frame (right) against a clean studio backdrop. |
| **Final Scene CTA** | **Two Side-by-Side QR Codes** | Closing screen features two distinct high-contrast QR codes with centered brand badges: one for the Customer Portal (`/customer`) and one for the Merchant Portal (`/merchant`). |

---

## 3. User Scenarios & Prioritized User Stories

### User Story 1 - Dual-Perspective Closing-Hour Rush (Priority: P1) [MVP]

**Goal**: Deliver a 30-to-45-second core demonstration showing the synchronized dual-portal interaction between a customer rescuing an evening surprise bag and the merchant processing the order in real time.

**Why this priority**: This is the heart of FoodLink's pitch. Demonstrating the simultaneous customer order and kitchen alert proves the platform's live operational capability.

**Independent Test**: Load and preview `videos/foodlink-product-film/` in the HyperFrames player. The sequence smoothly depicts customer browsing in BKK1 $\rightarrow$ reserving via Bakong KHQR $\rightarrow$ instant merchant alert on the kitchen queue with matching 6-digit pickup code `#FS-849201`.

**Acceptance Scenarios**:
1. **Given** the customer opening the FoodLink Customer Feed in Phnom Penh, **When** they select CAD Bakery's Artisan Sourdough Box ($4.99, 69% OFF) and tap "Reserve Now", **Then** the UI transitions into the Bakong KHQR instant payment modal and confirms the reservation.
2. **Given** the reservation confirmation, **When** a 6-digit counter pass (`#FS-849201`) is generated, **Then** the merchant screen immediately triggers an animated "New Order Alert" banner showing the customer's name and matching pass.
3. **Given** the merchant screen with the pending order, **When** the PIN verification sequence executes, **Then** the order status transitions to "Verified" with a green check confirmation.

---

### User Story 2 - Kinetic Problem & Impact Framing (Priority: P2)

**Goal**: Bookend the product walkthrough with a compelling visual hook (the food waste problem in Phnom Penh) and an uplifting resolution (meals rescued, carbon emissions avoided, and clear scannable QR call-to-action).

**Why this priority**: A product film needs narrative momentum to persuade hackathon judges, investors, and potential bakery partners.

**Independent Test**: Verify that the opening scene dynamically renders animated statistics of evening food surplus in Phnom Penh cafes, and the final scene renders real scannable QR codes for `/customer` and `/merchant` with FoodLink branding.

**Acceptance Scenarios**:
1. **Given** the opening title card (0:00 - 0:08), **When** the scene plays, **Then** kinetic typography introduces the dilemma: evening closing hour waste vs. demand for affordable quality food.
2. **Given** the closing impact sequence, **When** the transaction concludes, **Then** animated metrics display: *"18 Bags Rescued Today • $69.86 Revenue Recovered • 342 kg CO₂ Prevented"*.
3. **Given** the closing frame, **When** the call to action appears, **Then** high-contrast QR codes and the official FoodLink logo are prominently rendered with the live Vercel URL.

---

### User Story 3 - Cinematic Motion, Branding & Sound Integration (Priority: P3)

**Goal**: Polish the video with brand-aligned typography (Poppins, Inter), brand tokens (`#2E7D32`, `#FF8A3D`, `#FAFAFA`), smooth GSAP easing curves, and synchronized audio cue elements.

**Why this priority**: Elevates the video from a basic slideshow into an international-standard product launch film.

**Independent Test**: Run `npx hyperframes check --json` against `videos/foodlink-product-film/` with 0 errors, validating proper timeline registrations, asset paths, clip boundaries, and sound triggers.

**Acceptance Scenarios**:
1. **Given** all visual transitions, **When** elements animate, **Then** GSAP timelines control position, scale, and opacity using standard easing (no abrupt cutoffs or unsupported CSS filter transforms).
2. **Given** UI action moments (KHQR scan, order ping, PIN verified), **When** these actions occur, **Then** synchronized sound triggers emphasize the tactile interaction.

---

## 4. Video Architecture & Scene Breakdown

### Total Duration: 40 Seconds (1200 frames @ 30 fps)
- **Aspect Ratio**: 1920 × 1080 (16:9 Widescreen)
- **Framerate**: 30 FPS
- **Audio Profile**: Minimalist UI sound effects only (no background music)
- **Mockup Aesthetics**: Realistic floating smartphone & tablet frames
- **Directory**: `videos/foodlink-product-film/`

```
videos/foodlink-product-film/
├── assets/
│   ├── audio/
│   │   ├── click.mp3
│   │   ├── ping.mp3
│   │   └── verify.mp3
│   ├── cad-bakery-logo.png
│   ├── foodlink-logo.png
│   ├── qr-customer.png
│   ├── qr-merchant.png
│   └── food-sourdough.jpg
├── compositions/
│   ├── scene-1-hook.html        (0.0s – 7.0s: The Evening Surplus Challenge)
│   ├── scene-2-discovery.html   (7.0s – 16.0s: Customer Discovery in BKK1)
│   ├── scene-3-checkout.html    (16.0s – 25.0s: Bakong KHQR & Instant Pass)
│   ├── scene-4-kitchen.html     (25.0s – 33.0s: Merchant Queue & PIN Handover)
│   └── scene-5-impact.html      (33.0s – 40.0s: Environmental Impact & Dual QR CTA)
├── index.html                   (Root composition & timeline orchestrator)
└── hyperframes.json             (Project configuration)
```

---

## 5. Detailed Scene Timeline

| Scene | Time Range | Content & Motion Design |
| :--- | :---: | :--- |
| **Scene 1: Hook** | `0.0s – 7.0s` | Dark studio background with subtle ambient illumination. Kinetic typography reveals: *"Phnom Penh. 8:00 PM. High-end food about to be thrown away."* Transitions into FoodLink brand reveal with clean sound cue. |
| **Scene 2: Customer Discovery** | `7.0s – 16.0s` | Floating iPhone frame glides into view. Map view in BKK1 centers on CAD Bakery (Street 310). Surprise box card pops up: *"Artisan Sourdough Box • $4.99 • 69% OFF"*. Subtle click sound on selection. |
| **Scene 3: Checkout & Pass** | `16.0s – 25.0s` | 1-tap checkout. KHQR Bakong instant payment card slides up with vibrant red payment badge. Chime cue confirms transaction. Digital counter pass displays: `#FS-849201`. |
| **Scene 4: Merchant Handover** | `25.0s – 33.0s` | Screen pans to a sleek floating tablet frame displaying the Merchant Kitchen Queue. Incoming order alert banner pings. Counter staff enters `849201`. Sound cue dings on green verification: *"Handover Verified • 1 Meal Rescued"*. |
| **Scene 5: Impact & Dual QR CTA** | `33.0s – 40.0s` | Bold impact numbers scale up: *342 kg CO₂ Saved • $69.86 Recovered*. Screen transitions into the grand finale: FoodLink logo flanked by two side-by-side high-contrast QR codes (*"Scan Left for Customer App • Scan Right for Merchant App"*). |

---

## 6. Non-Functional Requirements & Guardrails

1. **HyperFrames Render Contract Compliance**:
   - Every timed element must have `class="clip"`, `data-start`, and `data-duration`.
   - All animations must be registered via `window.__timelines["<id>"] = tl`.
   - Strictly deterministic: no `Date.now()`, unseeded `Math.random()`, or network fetches during render.
2. **Foodlink Constitution v1.2.0**:
   - Zero emojis in any scene text or graphic elements.
   - Design tokens: Forest Green `#2E7D32`, Accent Orange `#FF8A3D`, Dark Charcoal `#1C1C1E`.
3. **Isolation Protection**:
   - `videos/foodlink-demo/` must remain completely untouched.
   - `customer/`, `merchant/`, and `server/` must remain completely untouched.

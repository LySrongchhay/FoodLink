---
format: 1920x1080
duration: 70s
message: "FoodLink enables merchants to sell surplus meals at a discount and customers to reserve in real-time, reducing food waste through a seamless verification code pickup."
arc: Hook → Merchant Listing → Live Customer Discovery → Reservation & Code → Merchant Real-Time Alert → Code Verification → Win-Win Impact & CTA
audience: Investors, judges, merchants, and conscious consumers
mode: collaborative
music: upbeat-tech
---

## Video direction

The video is staged as a sleek, dynamic product pitch on a premium 16:9 presentation canvas (`1920×1080`).
Dual realistic modern mobile device frames (iPhone style: rounded corners, camera pill notch, subtle depth shadows) float on screen.
The left device represents the Merchant App (`foodlink-merchants.vercel.app`), while the right device represents the Customer App (`foodlink-beige.vercel.app`).
Visual focus switches dynamically using spotlight zooms, subtle angle tilts, and vibrant brand green (`#2e7d32`) and orange (`#ff8a3d`) accent highlights.

## Frame 1 — The Surplus Dilemma & Introduction
- status: animated
- src: compositions/frames/01-hook.html
- duration: 8s
- transition_in: cut
- scene: Title and Problem Hook introducing FoodLink with dual mobile frames.
- voiceover: Every day, local bakeries and restaurants discard fresh, delicious food simply because it went unsold. Meet FoodLink—the marketplace bridging surplus food with hungry customers.
- asset_candidates: assets/cad-bakery-logo.png — Bakery logo; assets/artisan-pastry-sourdough-surprise-bag.jpg — Surplus pastry bag

### Shot sequence
- 0.0s – 3.0s: Dramatic headline reveal "Food Waste Meets Instant Value" over warm editorial grid with gentle floating particles.
- 3.0s – 5.5s: Dual mobile frames glide into perspective view showing merchant dashboard (left) and customer discovery (right).
- 5.5s – 8.0s: Centered FoodLink brand badge and tagline locks into position with high-contrast badge glow.

## Frame 2 — Merchant Creates Surplus Listing
- status: animated
- src: compositions/frames/02-merchant-listing.html
- duration: 12s
- transition_in: crossfade
- scene: Merchant Mobile Frame displays the Merchant Dashboard where an unsold bakery item is listed with discount and pickup window.
- voiceover: It starts with the merchant. In seconds, a bakery owner lists excess croissants and surprise meal boxes at up to 60 percent off, setting an easy pickup window before closing.
- asset_candidates: assets/french-butter-croissant-viennoiserie-bag.jpg — Croissant bag; assets/cad-bakery-logo.png — Bakery logo

### Shot sequence
- 0.0s – 3.5s: Camera zooms smoothly into the Merchant Mobile Frame. App header shows "CAD Bakery - Surplus Manager".
- 3.5s – 8.0s: Simulated tap on "+ New Surplus Listing". Card unfolds showing "Artisan Croissant Bag", original price $18 marked down to $6.99 (60% off).
- 8.0s – 12.0s: Pickup window slider locks to "7:00 PM – 9:00 PM". Tap on "Publish Listing" creates an energetic ripple and publishes live.

## Frame 3 — Instant Customer Alert & Discovery
- status: animated
- src: compositions/frames/03-customer-discovery.html
- duration: 12s
- transition_in: wipe
- scene: Customer Mobile Frame receives an instant push notification and browses nearby discounted meals.
- voiceover: On the customer side, an instant notification fires. Nearby diners browse live surplus deals, seeing great food, huge savings, and exact collection times.
- asset_candidates: assets/artisan-pastry-sourdough-surprise-bag.jpg — Surplus pastry bag

### Shot sequence
- 0.0s – 3.0s: Smooth transition to Customer Mobile Device. Push banner slides down from top notch: "🔔 CAD Bakery just listed 5 Surprise Bags!".
- 3.0s – 7.5s: Customer opens the app feed. Interactive cards display surplus meals with green "Save 60%" pill badges and distance markers.
- 7.5s – 12.0s: Customer taps CAD Bakery card to open the delicious surprise bag listing with photo, remaining count, and pickup window.

## Frame 4 — Reservation & Secure Pickup Code
- status: animated
- src: compositions/frames/04-reservation-code.html
- duration: 12s
- transition_in: crossfade
- scene: Customer confirms reservation and receives a distinct 4-digit pickup verification code with timer.
- voiceover: With a single tap, the customer reserves the meal and receives a verified 4-digit pickup code—guaranteeing their bag is held safe and ready.
- asset_candidates: assets/french-butter-croissant-viennoiserie-bag.jpg — Croissant bag

### Shot sequence
- 0.0s – 3.5s: Customer presses prominent orange "Reserve for $6.99" button with tactile button-press animation.
- 3.5s – 7.5s: Reservation confirmation modal springs up: "Bag Reserved! 🎉".
- 7.5s – 12.0s: Large bold pickup code card flips into view: `[ #FL-8492 ]` with pulsating QR badge and countdown timer ("Ready for pickup").

## Frame 5 — Real-Time Merchant Notification
- status: animated
- src: compositions/frames/05-merchant-notification.html
- duration: 10s
- transition_in: slide
- scene: Merchant dashboard live-updates via WebSockets showing new reserved order in the pickup queue.
- voiceover: The merchant's terminal pings in real time. The order enters the active queue, allowing staff to prep the bag with zero friction.
- asset_candidates: assets/cad-bakery-logo.png — Bakery logo

### Shot sequence
- 0.0s – 3.0s: Dynamic camera sweep back to the Merchant terminal / tablet display.
- 3.0s – 6.5s: Audio wave animation & green alert pill triggers: "⚡ New Reservation: Order #8492 reserved by Alex".
- 6.5s – 10.0s: Active pickup queue increments with bag status marked "Awaiting Customer Collection".

## Frame 6 — In-Store Pickup & Code Verification
- status: animated
- src: compositions/frames/06-pickup-verification.html
- duration: 10s
- transition_in: crossfade
- scene: Customer shows the code at pickup counter; merchant types code and triggers instant green verification badge.
- voiceover: At pickup, the customer presents their code. The merchant enters the digits, clicks verify, and handoff is confirmed instantly.
- asset_candidates: assets/cad-bakery-logo.png — Bakery logo

### Shot sequence
- 0.0s – 3.5s: Split screen layout: Customer mobile holding code `8492` alongside Merchant verification keypad.
- 3.5s – 7.0s: Digits `8` `4` `9` `2` type into merchant input slots with satisfying sound/glow effect.
- 7.0s – 10.0s: Large green checkmark bursts with confetti particles: "Verified & Handed Off! Payment Cleared."

## Frame 7 — Impact Metrics & Pitch Call to Action
- status: animated
- src: compositions/frames/07-summary-cta.html
- duration: 6s
- transition_in: crossfade
- scene: Dynamic stat count-up of meals rescued, revenue recovered, and FoodLink call-to-action lockup.
- voiceover: Merchants recover revenue. Customers save money. Communities reduce waste. Join FoodLink today and turn surplus into value.
- asset_candidates: assets/cad-bakery-logo.png — Bakery logo

### Shot sequence
- 0.0s – 3.0s: Three large stat cards count up rapidly: "+450 Meals Rescued", "65% Waste Reduced", "$12K Revenue Saved".
- 3.0s – 6.0s: Final cinematic hero lockup: "FoodLink — Turn Surplus into Value" with website URLs and QR code.

path = "videos/foodlink-product-film/compositions/scene-4-kitchen.html"

scene4_html = """<template>
  <style>
    #root {
      position: absolute;
      inset: 0;
      width: 1920px;
      height: 1080px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif;
      overflow: hidden;
      opacity: 0;
    }

    .glow-spot {
      position: absolute;
      width: 850px;
      height: 850px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(46, 125, 50, 0.12) 0%, transparent 70%);
      filter: blur(50px);
      pointer-events: none;
    }

    /* Side Narrative Callout with Step 3 */
    .narrative-col {
      width: 580px;
      margin-right: 70px;
      z-index: 10;
    }
    .badge-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 18px;
      background: #eaf7ed;
      color: #2e7d32;
      border: 1px solid rgba(46, 125, 50, 0.25);
      border-radius: 9999px;
      font-size: 14px;
      font-weight: 800;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      margin-bottom: 16px;
    }
    .narrative-title {
      font-size: 46px;
      font-weight: 900;
      color: #1c1c1e;
      line-height: 1.15;
      letter-spacing: -1.2px;
      margin-bottom: 20px;
    }
    .narrative-title span {
      color: #2e7d32;
    }

    /* Step-by-Step Real-Time Journey Tracker */
    .journey-steps {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-top: 10px;
    }
    .step-card {
      display: flex;
      align-items: center;
      gap: 18px;
      padding: 16px 20px;
      background: #ffffff;
      border: 1.5px solid #e5e5ea;
      border-radius: 20px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
      transform-origin: left center;
    }
    .step-card.active {
      border-color: #2e7d32;
      background: #f7fcf8;
      box-shadow: 0 8px 24px rgba(46, 125, 50, 0.12);
    }
    .step-card.completed {
      border-color: #e5e5ea;
      background: #ffffff;
    }
    .step-num {
      width: 40px;
      height: 40px;
      border-radius: 12px;
      background: #eaf7ed;
      color: #2e7d32;
      font-size: 16px;
      font-weight: 900;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .step-card.active .step-num {
      background: #2e7d32;
      color: #ffffff;
    }
    .step-heading {
      font-size: 18px;
      font-weight: 800;
      color: #1c1c1e;
      margin: 0 0 2px;
    }
    .step-sub {
      font-size: 14px;
      color: #636366;
      line-height: 1.35;
      margin: 0;
      font-weight: 500;
    }

    /* Floating Tablet Frame */
    .tablet-wrapper {
      position: relative;
      width: 840px;
      height: 600px;
      background: #000000;
      border-radius: 44px;
      padding: 14px;
      box-shadow: 
        0 40px 100px -20px rgba(0, 0, 0, 0.25),
        0 25px 45px -10px rgba(46, 125, 50, 0.15),
        inset 0 0 0 2px rgba(255, 255, 255, 0.2);
      perspective: 1400px;
      transform-style: preserve-3d;
    }
    .tablet-screen {
      position: relative;
      width: 100%;
      height: 100%;
      background: #fafafa;
      border-radius: 32px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      color: #1c1c1e;
    }

    /* Tablet Header (Authentic Merchant App) */
    .tablet-header {
      padding: 16px 24px;
      background: #ffffff;
      border-bottom: 1px solid #e5e5ea;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .store-profile {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .store-logo {
      width: 42px;
      height: 42px;
      border-radius: 12px;
      border: 1px solid #e5e5ea;
      padding: 2px;
      object-fit: contain;
      background: #ffffff;
    }
    .store-names h3 {
      font-size: 16px;
      font-weight: 900;
      color: #1c1c1e;
    }
    .store-names p {
      font-size: 12px;
      color: #2e7d32;
      font-weight: 700;
    }
    .live-status {
      display: flex;
      align-items: center;
      gap: 6px;
      background: #eaf7ed;
      color: #2e7d32;
      font-size: 12px;
      font-weight: 800;
      padding: 6px 14px;
      border-radius: 9999px;
      border: 1px solid rgba(46, 125, 50, 0.2);
    }
    .live-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #2e7d32;
    }

    /* Tablet Body */
    .tablet-body {
      padding: 16px 24px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      position: relative;
      flex: 1;
    }

    /* Real-Time Order Alert Banner */
    .order-banner {
      background: #eaf7ed;
      border: 2px solid #2e7d32;
      border-radius: 18px;
      padding: 12px 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 10px 24px rgba(46, 125, 50, 0.15);
      transform: translateY(-20px);
      opacity: 0;
    }
    .banner-left {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .bell-icon-box {
      width: 36px;
      height: 36px;
      background: #2e7d32;
      color: #ffffff;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .bell-icon-box svg {
      width: 18px;
      height: 18px;
      stroke: #ffffff;
      stroke-width: 2.5;
    }
    .banner-text h4 {
      font-size: 13px;
      font-weight: 900;
      color: #1c1c1e;
    }
    .banner-text p {
      font-size: 12px;
      color: #48484a;
      margin-top: 1px;
    }
    .banner-code {
      font-family: 'JetBrains Mono', monospace;
      font-weight: 900;
      color: #2e7d32;
      background: #ffffff;
      padding: 2px 7px;
      border-radius: 6px;
      border: 1px solid #a7f3d0;
    }

    /* Authentic Foodlink VerifyPickupModal UI */
    .verify-modal {
      background: #ffffff;
      border-radius: 20px;
      border: 1px solid #e5e5ea;
      padding: 16px 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.05);
    }
    .modal-header-line {
      display: flex;
      justify-content: space-between;
      width: 100%;
      align-items: center;
      margin-bottom: 6px;
    }
    .modal-title {
      font-size: 14px;
      font-weight: 900;
      color: #1c1c1e;
    }
    .modal-sub {
      font-size: 11px;
      color: #8e8e93;
      margin-bottom: 10px;
      text-align: center;
    }

    /* 6 PIN Display Boxes */
    .pin-input-boxes {
      display: flex;
      gap: 8px;
      margin-bottom: 12px;
    }
    .pin-box {
      width: 42px;
      height: 48px;
      border: 2px solid #e5e5ea;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'JetBrains Mono', monospace;
      font-size: 22px;
      font-weight: 900;
      color: #1c1c1e;
      background: #fafafa;
    }
    .pin-char {
      opacity: 0;
      transform: scale(0.6);
      display: inline-block;
    }

    /* Authentic Touch Keypad */
    .touch-keypad {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 6px;
      width: 240px;
      margin-bottom: 12px;
    }
    .key-btn {
      height: 38px;
      background: #f4f4f5;
      border: 1px solid #e5e5ea;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-weight: 800;
      color: #1c1c1e;
      cursor: pointer;
      transform-origin: center center;
    }

    /* Verify Action Button */
    .verify-submit-btn {
      width: 240px;
      padding: 10px;
      border-radius: 12px;
      background: #2e7d32;
      color: #ffffff;
      font-size: 13px;
      font-weight: 800;
      text-align: center;
      box-shadow: 0 4px 14px rgba(46, 125, 50, 0.25);
      cursor: pointer;
      transform-origin: center center;
    }

    /* Verified Splash Modal */
    .verified-splash {
      position: absolute;
      inset: 16px 24px;
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(8px);
      border-radius: 24px;
      border: 2px solid #2e7d32;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 50;
      opacity: 0;
      transform: scale(0.92);
      box-shadow: 0 20px 50px rgba(46, 125, 50, 0.2);
    }
    .check-circle {
      width: 68px;
      height: 68px;
      background: #2e7d32;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 12px;
      box-shadow: 0 10px 25px rgba(46, 125, 50, 0.35);
    }
    .check-circle svg {
      width: 38px;
      height: 38px;
      stroke: #ffffff;
      stroke-width: 3.5;
    }
    .verified-title {
      font-size: 24px;
      font-weight: 900;
      color: #1c1c1e;
    }
    .verified-sub {
      font-size: 14px;
      font-weight: 700;
      color: #2e7d32;
      margin-top: 4px;
    }
    .verified-detail-card {
      margin-top: 14px;
      background: #f7fcf8;
      border: 1px solid rgba(46, 125, 50, 0.2);
      border-radius: 14px;
      padding: 10px 20px;
      font-size: 12px;
      color: #166534;
      text-align: center;
      font-weight: 700;
    }

    /* Tap Cursor Pointer */
    .tap-cursor {
      position: absolute;
      top: 0;
      left: 0;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: rgba(46, 125, 50, 0.4);
      border: 2px solid #2e7d32;
      pointer-events: none;
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.6);
      z-index: 99;
    }
  </style>

  <div id="root" data-composition-id="scene-4-kitchen" data-width="1920" data-height="1080" data-duration="11.5">
    <div class="glow-spot" style="left: 65%;"></div>

    <!-- Narrative Column (Left) with Step 3 Active -->
    <div class="narrative-col" id="us3-narrative" data-layout-ignore>
      <div class="badge-pill">FoodLink Merchant Portal • Step 3 of 3</div>
      <h2 class="narrative-title">Real-Time Kitchen Alert & <span>Instant Handover</span></h2>

      <div class="journey-steps">
        <div class="step-card completed" id="k-step-1">
          <div class="step-num">01</div>
          <div class="step-content">
            <h4 class="step-heading">Step 1: Customer Browsed Feed</h4>
            <p class="step-sub">Artisan Sourdough Box selected from live surplus stock.</p>
          </div>
        </div>

        <div class="step-card completed" id="k-step-2">
          <div class="step-num">02</div>
          <div class="step-content">
            <h4 class="step-heading">Step 2: Bakong KHQR Settled</h4>
            <p class="step-sub">Instant digital counter pass #FS-849201 generated.</p>
          </div>
        </div>

        <div class="step-card active" id="k-step-3">
          <div class="step-num">03</div>
          <div class="step-content">
            <h4 class="step-heading">Step 3: Staff Enters PIN & Confirms</h4>
            <p class="step-sub">Staff taps customer PIN on terminal and validates pickup.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Tablet Frame (Right) -->
    <div class="tablet-wrapper" id="us3-tablet" data-hold data-layout-ignore>
      <div class="tablet-screen">
        <!-- Tablet Header -->
        <div class="tablet-header">
          <div class="store-profile">
            <img src="assets/cad-bakery-logo.png" alt="Bakery Logo" class="store-logo" />
            <div class="store-names">
              <h3>Artisan Bakery & Cafe</h3>
              <p>Bakery Partner Terminal • 8:18 PM</p>
            </div>
          </div>
          <div class="live-status">
            <span class="live-dot"></span>
            <span>Live on Discovery Feed</span>
          </div>
        </div>

        <!-- Tablet Body -->
        <div class="tablet-body">
          <!-- Real-Time Order Alert Banner -->
          <div class="order-banner" id="order-alert-banner">
            <div class="banner-left">
              <div class="bell-icon-box">
                <svg fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
              </div>
              <div class="banner-text">
                <h4>Customer Pickup Ready!</h4>
                <p>1x Artisan Sourdough Box ($4.99) • Counter Pass: <span class="banner-code">849201</span></p>
              </div>
            </div>
          </div>

          <!-- PIN Verification Keypad Modal (Matches VerifyPickupModal.jsx) -->
          <div class="verify-modal" id="pin-modal" data-hold>
            <div class="modal-header-line">
              <span class="modal-title">Customer Pickup PIN Verification</span>
              <span style="font-size: 11px; font-weight: 700; color: #2e7d32;">6-Digit Security</span>
            </div>
            <p class="modal-sub">Enter customer 6-digit counter pass shown on voucher</p>

            <div class="pin-input-boxes">
              <div class="pin-box" id="pin-box-1"><span class="pin-char" id="pc-1">8</span></div>
              <div class="pin-box" id="pin-box-2"><span class="pin-char" id="pc-2">4</span></div>
              <div class="pin-box" id="pin-box-3"><span class="pin-char" id="pc-3">9</span></div>
              <div class="pin-box" id="pin-box-4"><span class="pin-char" id="pc-4">2</span></div>
              <div class="pin-box" id="pin-box-5"><span class="pin-char" id="pc-5">0</span></div>
              <div class="pin-box" id="pin-box-6"><span class="pin-char" id="pc-6">1</span></div>
            </div>

            <!-- Touch Number Pad -->
            <div class="touch-keypad">
              <div class="key-btn" id="k-btn-1">1</div>
              <div class="key-btn" id="k-btn-2">2</div>
              <div class="key-btn" id="k-btn-3">3</div>
              <div class="key-btn" id="k-btn-4">4</div>
              <div class="key-btn" id="k-btn-5">5</div>
              <div class="key-btn" id="k-btn-6">6</div>
              <div class="key-btn" id="k-btn-7">7</div>
              <div class="key-btn" id="k-btn-8">8</div>
              <div class="key-btn" id="k-btn-9">9</div>
              <div class="key-btn" id="k-btn-c">C</div>
              <div class="key-btn" id="k-btn-0">0</div>
              <div class="key-btn" id="k-btn-ok">&#10003;</div>
            </div>

            <div class="verify-submit-btn" id="btn-verify-submit">Verify & Complete Pickup</div>
          </div>

          <!-- Verified Splash Modal -->
          <div class="verified-splash" id="verified-modal">
            <div class="check-circle" id="verified-check">
              <svg fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
            </div>
            <div class="verified-title">Pickup Authorized!</div>
            <div class="verified-sub">1 Surplus Meal Rescued • Revenue Recorded</div>
            <div class="verified-detail-card">
              Order #FS-849201 • Artisan Sourdough & Croissant Box ($4.99)
            </div>
          </div>
        </div>

        <!-- Tap Cursor Pointer -->
        <div class="tap-cursor" id="tap-pointer-tablet"></div>
      </div>
    </div>
  </div>

  <script>
    (function() {
      const tl = gsap.timeline({ paused: true });

      // 0.0s: Entrance with 3D perspective
      tl.to("#root", { opacity: 1, duration: 0.4, ease: "power2.out" }, 0);
      tl.from("#us3-narrative", { x: -60, opacity: 0, duration: 1.0, ease: "power3.out" }, 0.2);
      tl.from(".step-card", { x: -30, opacity: 0, duration: 0.6, stagger: 0.12, ease: "back.out(1.4)" }, 0.4);

      tl.fromTo("#us3-tablet",
        { y: 120, rotationY: -10, rotationX: 4, opacity: 0 },
        { y: 0, rotationY: -3, rotationX: 1, opacity: 1, duration: 1.0, ease: "power3.out" },
        0.3
      );

      // Order alert drops down at 1.0s (corresponds to film time 33.0s - snd-ping fires)
      tl.to("#order-alert-banner", {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "back.out(1.5)"
      }, 1.0);

      // Camera settles flat for keypad entry
      tl.to("#us3-tablet", {
        rotationY: 0,
        rotationX: 0,
        duration: 0.6,
        ease: "power2.inOut"
      }, 2.4);

      // Staff taps PIN digits on the keypad step-by-step!
      // Keypad button coordinates relative to tablet screen:
      // Key 8: x=420, y=380
      // Key 4: x=340, y=338
      // Key 9: x=500, y=380
      // Key 2: x=420, y=298
      // Key 0: x=420, y=422
      // Key 1: x=340, y=298
      // Verify button: x=420, y=462

      const keyClicks = [
        { keyId: "#k-btn-8", boxId: "#pin-box-1", charId: "#pc-1", x: 420, y: 380, t: 2.8 },
        { keyId: "#k-btn-4", boxId: "#pin-box-2", charId: "#pc-2", x: 340, y: 338, t: 3.5 },
        { keyId: "#k-btn-9", boxId: "#pin-box-3", charId: "#pc-3", x: 500, y: 380, t: 4.2 },
        { keyId: "#k-btn-2", boxId: "#pin-box-4", charId: "#pc-4", x: 420, y: 298, t: 4.9 },
        { keyId: "#k-btn-0", boxId: "#pin-box-5", charId: "#pc-5", x: 420, y: 422, t: 5.6 },
        { keyId: "#k-btn-1", boxId: "#pin-box-6", charId: "#pc-6", x: 340, y: 298, t: 6.3 }
      ];

      // Cursor entrance
      tl.to("#tap-pointer-tablet", {
        x: 420,
        y: 380,
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "power2.out"
      }, 2.5);

      keyClicks.forEach(kc => {
        // Move to key
        tl.to("#tap-pointer-tablet", { x: kc.x, y: kc.y, duration: 0.35, ease: "power2.out" }, kc.t - 0.35);
        // Tap down
        tl.to("#tap-pointer-tablet", { scale: 0.75, backgroundColor: "rgba(46, 125, 50, 0.7)", duration: 0.12, yoyo: true, repeat: 1 }, kc.t);
        tl.to(kc.keyId, { scale: 0.9, backgroundColor: "#2e7d32", color: "#ffffff", duration: 0.12, yoyo: true, repeat: 1 }, kc.t);
        // Digit pops into box
        tl.to(kc.charId, { opacity: 1, scale: 1, duration: 0.2, ease: "back.out(2)" }, kc.t + 0.05);
        tl.to(kc.boxId, { borderColor: "#2e7d32", backgroundColor: "#eaf7ed", color: "#2e7d32", duration: 0.2 }, kc.t + 0.05);
      });

      // Cursor moves down to 'Verify & Complete Pickup' button
      tl.to("#tap-pointer-tablet", {
        x: 420,
        y: 462,
        duration: 0.5,
        ease: "power2.out"
      }, 7.2);

      // Button Click on 'Verify & Complete Pickup' at 7.8s!
      tl.to("#tap-pointer-tablet", {
        scale: 0.75,
        backgroundColor: "rgba(46, 125, 50, 0.8)",
        duration: 0.15,
        yoyo: true,
        repeat: 1
      }, 7.8);

      tl.to("#btn-verify-submit", {
        scale: 0.92,
        backgroundColor: "#256628",
        duration: 0.15,
        yoyo: true,
        repeat: 1
      }, 7.8);

      tl.to("#tap-pointer-tablet", {
        opacity: 0,
        duration: 0.3
      }, 8.2);

      // Verification ding at 8.5s (corresponds to film time 40.5s - snd-verify fires)
      tl.to("#verified-modal", {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.4)"
      }, 8.5);

      tl.from("#verified-check", {
        scale: 0.3,
        rotation: -45,
        duration: 0.4,
        ease: "back.out(2)"
      }, 8.6);

      // 10.8s: Transition exit
      tl.to("#root", {
        opacity: 0,
        y: -30,
        duration: 0.7,
        ease: "power2.in"
      }, 10.8);

      window.__timelines = window.__timelines || {};
      window.__timelines["scene-4-kitchen"] = tl;
    })();
  </script>
</template>
"""

with open(path, "w", encoding="utf-8") as f:
    f.write(scene4_html)

print("Updated scene-4-kitchen.html with authentic touch keypad and step-by-step key click animations.")


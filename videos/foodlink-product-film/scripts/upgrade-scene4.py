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
      width: 820px;
      height: 570px;
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

    /* Tablet Header */
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
      width: 44px;
      height: 44px;
      border-radius: 14px;
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
      padding: 20px 24px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      position: relative;
      flex: 1;
    }

    /* Real-Time Order Alert Banner */
    .order-banner {
      background: #eaf7ed;
      border: 2px solid #2e7d32;
      border-radius: 20px;
      padding: 14px 20px;
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
      gap: 14px;
    }
    .bell-icon-box {
      width: 40px;
      height: 40px;
      background: #2e7d32;
      color: #ffffff;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .bell-icon-box svg {
      width: 20px;
      height: 20px;
      stroke: #ffffff;
      stroke-width: 2.5;
    }
    .banner-text h4 {
      font-size: 14px;
      font-weight: 900;
      color: #1c1c1e;
    }
    .banner-text p {
      font-size: 12px;
      color: #48484a;
      margin-top: 2px;
    }
    .banner-code {
      font-family: 'JetBrains Mono', monospace;
      font-weight: 900;
      color: #2e7d32;
      background: #ffffff;
      padding: 3px 8px;
      border-radius: 6px;
      border: 1px solid #a7f3d0;
    }

    /* PIN Verification Keypad Modal */
    .verify-modal {
      background: #ffffff;
      border-radius: 24px;
      border: 1px solid #e5e5ea;
      padding: 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
      box-shadow: 0 16px 36px rgba(0, 0, 0, 0.06);
      margin-top: 8px;
    }
    .verify-modal h4 {
      font-size: 15px;
      font-weight: 900;
      color: #1c1c1e;
    }
    .pin-input-boxes {
      display: flex;
      gap: 10px;
      margin: 16px 0;
    }
    .pin-box {
      width: 48px;
      height: 54px;
      border: 2px solid #e5e5ea;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'JetBrains Mono', monospace;
      font-size: 24px;
      font-weight: 900;
      color: #1c1c1e;
      background: #fafafa;
    }
    .pin-char {
      opacity: 0;
      transform: scale(0.6);
      display: inline-block;
    }

    /* Verified Splash Banner */
    .verified-splash {
      position: absolute;
      inset: 20px 24px;
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
      width: 72px;
      height: 72px;
      background: #2e7d32;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 14px;
      box-shadow: 0 10px 25px rgba(46, 125, 50, 0.35);
    }
    .check-circle svg {
      width: 42px;
      height: 42px;
      stroke: #ffffff;
      stroke-width: 3.5;
    }
    .verified-title {
      font-size: 26px;
      font-weight: 900;
      color: #1c1c1e;
    }
    .verified-sub {
      font-size: 15px;
      font-weight: 700;
      color: #2e7d32;
      margin-top: 6px;
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
            <h4 class="step-heading">Step 3: Rapid Counter Verification</h4>
            <p class="step-sub">Staff confirms 6-digit PIN and hands over fresh bread.</p>
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

          <!-- PIN Verification Modal -->
          <div class="verify-modal" id="pin-modal" data-hold>
            <h4>Verify Customer 6-Digit Counter Pass</h4>
            <div class="pin-input-boxes">
              <div class="pin-box" id="pin-box-1"><span class="pin-char" id="pc-1">8</span></div>
              <div class="pin-box" id="pin-box-2"><span class="pin-char" id="pc-2">4</span></div>
              <div class="pin-box" id="pin-box-3"><span class="pin-char" id="pc-3">9</span></div>
              <div class="pin-box" id="pin-box-4"><span class="pin-char" id="pc-4">2</span></div>
              <div class="pin-box" id="pin-box-5"><span class="pin-char" id="pc-5">0</span></div>
              <div class="pin-box" id="pin-box-6"><span class="pin-char" id="pc-6">1</span></div>
            </div>
          </div>

          <!-- Verified Splash Modal -->
          <div class="verified-splash" id="verified-modal">
            <div class="check-circle" id="verified-check">
              <svg fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
            </div>
            <div class="verified-title">Handover Verified!</div>
            <div class="verified-sub">1 Surplus Meal Rescued • Revenue Recorded</div>
          </div>
        </div>
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

      // Camera settles flat for PIN verification
      tl.to("#us3-tablet", {
        rotationY: 0,
        rotationX: 0,
        duration: 0.6,
        ease: "power2.inOut"
      }, 2.6);

      // Deterministic, seek-safe PIN digits animation (3.6s to 6.6s)
      const digits = [
        { box: "#pin-box-1", char: "#pc-1", t: 3.6 },
        { box: "#pin-box-2", char: "#pc-2", t: 4.2 },
        { box: "#pin-box-3", char: "#pc-3", t: 4.8 },
        { box: "#pin-box-4", char: "#pc-4", t: 5.4 },
        { box: "#pin-box-5", char: "#pc-5", t: 6.0 },
        { box: "#pin-box-6", char: "#pc-6", t: 6.6 }
      ];

      digits.forEach(d => {
        tl.to(d.char, { opacity: 1, scale: 1, duration: 0.2, ease: "back.out(2)" }, d.t);
        tl.to(d.box, { borderColor: "#2e7d32", backgroundColor: "#eaf7ed", color: "#2e7d32", duration: 0.2 }, d.t);
      });

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

print("Updated scene-4-kitchen.html with connected journey and deterministic PIN typing.")


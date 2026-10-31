path = "videos/foodlink-product-film/compositions/scene-3-checkout.html"

scene3_html = """<template>
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
      width: 750px;
      height: 750px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(225, 29, 72, 0.08) 0%, rgba(46, 125, 50, 0.08) 40%, transparent 70%);
      filter: blur(50px);
      pointer-events: none;
    }

    /* Side Narrative Callout with Step-by-Step Connected Journey */
    .narrative-col {
      width: 620px;
      margin-right: 80px;
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
      font-size: 48px;
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

    /* Smartphone Frame */
    .phone-wrapper {
      position: relative;
      width: 440px;
      height: 900px;
      background: #000000;
      border-radius: 60px;
      padding: 14px;
      box-shadow: 
        0 40px 100px -20px rgba(0, 0, 0, 0.25),
        0 25px 45px -10px rgba(46, 125, 50, 0.15),
        inset 0 0 0 2px rgba(255, 255, 255, 0.2);
      perspective: 1400px;
      transform-style: preserve-3d;
    }
    .phone-screen {
      position: relative;
      width: 100%;
      height: 100%;
      background: #fafafa;
      border-radius: 48px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      color: #1c1c1e;
    }
    .island {
      position: absolute;
      top: 14px;
      left: 50%;
      transform: translateX(-50%);
      width: 120px;
      height: 32px;
      background: #000000;
      border-radius: 20px;
      z-index: 50;
    }
    .status-bar {
      position: absolute;
      top: 18px;
      width: 100%;
      padding: 0 32px;
      display: flex;
      justify-content: space-between;
      font-size: 13px;
      font-weight: 700;
      color: #1c1c1e;
      z-index: 40;
    }

    .checkout-body {
      padding: 64px 20px 20px;
      display: flex;
      flex-direction: column;
      gap: 14px;
      height: 100%;
    }
    .checkout-title {
      font-size: 20px;
      font-weight: 900;
      letter-spacing: -0.5px;
    }

    /* Order Summary Card (Matching Foodlink CustomerCheckoutFlow.jsx) */
    .order-box {
      background: #ffffff;
      border-radius: 20px;
      padding: 14px 16px;
      border: 1.5px solid #e5e5ea;
      display: flex;
      gap: 14px;
      align-items: center;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
    }
    .order-img {
      width: 64px;
      height: 64px;
      border-radius: 14px;
      object-fit: cover;
    }
    .order-text h4 {
      font-size: 14px;
      font-weight: 900;
      color: #1c1c1e;
      line-height: 1.25;
    }
    .order-text p {
      font-size: 12px;
      color: #2e7d32;
      font-weight: 700;
      margin-top: 3px;
    }

    /* Bakong KHQR Payment Card (Authentic Foodlink KHQR Modal) */
    .khqr-box {
      background: #ffffff;
      border-radius: 22px;
      padding: 18px;
      border: 1.5px solid rgba(225, 29, 72, 0.4);
      background: linear-gradient(180deg, #ffffff 0%, #fffbfb 100%);
      box-shadow: 0 8px 24px rgba(225, 29, 72, 0.08);
      position: relative;
      overflow: hidden;
    }
    .khqr-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
    }
    .khqr-pill {
      background: #e11d48;
      color: #ffffff;
      font-size: 10px;
      font-weight: 900;
      letter-spacing: 1px;
      padding: 3px 8px;
      border-radius: 6px;
    }
    .khqr-title {
      font-size: 14px;
      font-weight: 800;
      color: #1c1c1e;
    }
    .khqr-sub {
      font-size: 11px;
      color: #8e8e93;
    }
    .khqr-amount-row {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      margin-top: 8px;
    }
    .khqr-amount {
      font-size: 28px;
      font-weight: 900;
      color: #1c1c1e;
    }
    .khqr-timer {
      font-size: 11px;
      color: #e11d48;
      font-weight: 700;
    }

    /* Scan sweep ray */
    .scan-ray {
      position: absolute;
      top: 0;
      left: 0;
      width: 60%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(225, 29, 72, 0.25), transparent);
      transform: translateX(-120%) skewX(-20deg);
    }

    /* Pay Action Button */
    .pay-btn {
      width: 100%;
      padding: 15px;
      border-radius: 16px;
      background: #2e7d32;
      color: #ffffff;
      font-size: 15px;
      font-weight: 800;
      text-align: center;
      box-shadow: 0 8px 20px rgba(46, 125, 50, 0.3);
      cursor: pointer;
      transform-origin: center center;
      margin-top: auto;
    }

    /* Confirmation Modal / Pass Reveal */
    .pass-overlay {
      position: absolute;
      inset: 0;
      background: #ffffff;
      border-radius: 48px;
      padding: 70px 24px 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      z-index: 60;
      opacity: 0;
      transform: scale(0.95);
    }
    .success-icon-box {
      width: 76px;
      height: 76px;
      background: #eaf7ed;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 16px;
      border: 3px solid #2e7d32;
    }
    .success-icon-box svg {
      width: 40px;
      height: 40px;
      stroke: #2e7d32;
      stroke-width: 3.5;
    }
    .pass-card {
      width: 100%;
      background: #fafafa;
      border: 2px dashed #2e7d32;
      border-radius: 24px;
      padding: 22px 16px;
      margin-top: 16px;
    }
    .pass-label {
      font-size: 12px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #2e7d32;
    }
    .pass-code {
      font-family: 'JetBrains Mono', monospace;
      font-size: 34px;
      font-weight: 900;
      letter-spacing: 3px;
      color: #1c1c1e;
      margin: 8px 0;
    }
    .pass-note {
      font-size: 12px;
      color: #636366;
      font-weight: 600;
    }

    /* Tap Cursor Pointer */
    .tap-cursor {
      position: absolute;
      top: 0;
      left: 0;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: rgba(46, 125, 50, 0.35);
      border: 2.5px solid #2e7d32;
      pointer-events: none;
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.6);
      z-index: 99;
    }
  </style>

  <div id="root" data-composition-id="scene-3-checkout" data-width="1920" data-height="1080" data-duration="11.5">
    <div class="glow-spot" style="left: 65%;"></div>

    <!-- Narrative Column (Left) with Step 2 Active -->
    <div class="narrative-col" id="us2-narrative" data-layout-ignore>
      <div class="badge-pill">FoodLink Customer Journey • Step 2 of 3</div>
      <h2 class="narrative-title">Instant Pay via <span>Bakong KHQR</span></h2>

      <div class="journey-steps">
        <div class="step-card completed" id="c-step-1">
          <div class="step-num">01</div>
          <div class="step-content">
            <h4 class="step-heading">Step 1: Surplus Reserved</h4>
            <p class="step-sub">Artisan Sourdough & Croissant Box locked at 69% off ($4.99).</p>
          </div>
        </div>

        <div class="step-card active" id="c-step-2">
          <div class="step-num">02</div>
          <div class="step-content">
            <h4 class="step-heading">Step 2: Tap "Pay $4.99 with Bakong"</h4>
            <p class="step-sub">National Bakong KHQR QR scan confirmed in sub-seconds.</p>
          </div>
        </div>

        <div class="step-card" id="c-step-3">
          <div class="step-num">03</div>
          <div class="step-content">
            <h4 class="step-heading">Step 3: Secure Counter Pass</h4>
            <p class="step-sub">Digital Pass #FS-849201 generated for rapid bakery pickup.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Smartphone Frame (Right) -->
    <div class="phone-wrapper" id="us2-phone" data-layout-ignore>
      <div class="phone-screen">
        <div class="island"></div>
        <div class="status-bar">
          <span>8:16</span>
          <span>5G • 100%</span>
        </div>

        <div class="checkout-body" data-layout-allow-overlap>
          <h3 class="checkout-title">Review & Reserve</h3>

          <div class="order-box">
            <img src="assets/food-sourdough.jpg" alt="Order" class="order-img" />
            <div class="order-text">
              <h4>Artisan Sourdough & Croissant Box</h4>
              <p>Artisan Bakery & Cafe • 1x Box ($4.99)</p>
            </div>
          </div>

          <!-- KHQR Card -->
          <div class="khqr-box" id="khqr-card">
            <div class="scan-ray" id="khqr-ray"></div>
            <div class="khqr-header">
              <div>
                <div class="khqr-title">Bakong Instant Pay</div>
                <div class="khqr-sub">Scan via any Mobile Banking App</div>
              </div>
              <span class="khqr-pill">KHQR</span>
            </div>
            <div class="khqr-amount-row">
              <div class="khqr-amount">$4.99</div>
              <div class="khqr-timer">Valid for 15:00</div>
            </div>
          </div>

          <!-- Pay Button (Directly clicked by cursor) -->
          <div class="pay-btn" id="btn-pay-bakong">Pay $4.99 with Bakong</div>
        </div>

        <!-- Pass Reveal Overlay -->
        <div class="pass-overlay" id="pass-sheet" data-hold data-layout-allow-overlap>
          <div class="success-icon-box" id="pass-check">
            <svg fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
          </div>
          <h3 style="font-size: 20px; font-weight: 900; color: #1c1c1e;">Payment Confirmed!</h3>
          <p style="font-size: 13px; color: #636366; margin-top: 4px;">Pickup window: Today, 8:15 PM – 8:45 PM</p>

          <div class="pass-card">
            <div class="pass-label">Digital Counter Pass</div>
            <div class="pass-code">#FS-849201</div>
            <div class="pass-note">Show this code at Artisan Bakery & Cafe counter</div>
          </div>
        </div>

        <!-- Tap Cursor Pointer -->
        <div class="tap-cursor" id="tap-pointer-pay"></div>
      </div>
    </div>
  </div>

  <script>
    (function() {
      const tl = gsap.timeline({ paused: true });

      // 0.0s: Entrance with 3D perspective
      tl.to("#root", { opacity: 1, duration: 0.4, ease: "power2.out" }, 0);
      tl.from("#us2-narrative", { x: -60, opacity: 0, duration: 1.0, ease: "power3.out" }, 0.2);
      tl.from(".step-card", { x: -30, opacity: 0, duration: 0.6, stagger: 0.12, ease: "back.out(1.4)" }, 0.4);

      tl.fromTo("#us2-phone",
        { y: 120, rotationY: 10, rotationX: 4, opacity: 0 },
        { y: 0, rotationY: 2, rotationX: 1, opacity: 1, duration: 1.0, ease: "power3.out" },
        0.3
      );

      // KHQR Ray sweep
      tl.fromTo("#khqr-ray", 
        { x: -50 },
        {
          x: 450,
          duration: 1.4,
          ease: "power2.inOut",
          repeat: 1,
          repeatDelay: 0.2
        },
        0.8
      );

      // Camera settles flat as user prepares to click button
      tl.to("#us2-phone", {
        rotationY: 0,
        rotationX: 0,
        duration: 0.6,
        ease: "power2.inOut"
      }, 2.2);

      // Tap cursor glides to the 'Pay $4.99 with Bakong' button (2.2s - 2.9s)
      tl.to("#tap-pointer-pay", {
        x: 205,
        y: 810,
        opacity: 1,
        scale: 1,
        duration: 0.7,
        ease: "power2.out"
      }, 2.2);

      // Authentic Button Click on 'Pay $4.99 with Bakong' at 3.0s!
      tl.to("#tap-pointer-pay", {
        scale: 0.75,
        backgroundColor: "rgba(46, 125, 50, 0.7)",
        duration: 0.15,
        yoyo: true,
        repeat: 1
      }, 3.0);

      tl.to("#btn-pay-bakong", {
        scale: 0.94,
        backgroundColor: "#256628",
        duration: 0.15,
        yoyo: true,
        repeat: 1
      }, 3.0);

      tl.to("#tap-pointer-pay", {
        opacity: 0,
        duration: 0.3
      }, 3.4);

      // Payment success & Pass reveal at 3.8s (corresponds to film time 24.8s - snd-khqr fires)
      tl.to(".checkout-body", { opacity: 0, duration: 0.3, ease: "power2.in" }, 3.7);
      tl.to("#pass-sheet", {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.4)"
      }, 3.8);

      tl.from("#pass-check", {
        scale: 0.2,
        rotation: -45,
        duration: 0.4,
        ease: "back.out(2)"
      }, 3.9);

      // Step 3 Activates upon Pass generation (4.2s)
      tl.to("#c-step-2", {
        borderColor: "#e5e5ea",
        backgroundColor: "#ffffff",
        boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
        duration: 0.4
      }, 4.2);
      tl.to("#c-step-2 .step-num", { backgroundColor: "#eaf7ed", color: "#2e7d32", duration: 0.4 }, 4.2);

      tl.to("#c-step-3", {
        borderColor: "#2e7d32",
        backgroundColor: "#f7fcf8",
        boxShadow: "0 8px 24px rgba(46, 125, 50, 0.15)",
        duration: 0.4
      }, 4.4);
      tl.to("#c-step-3 .step-num", { backgroundColor: "#2e7d32", color: "#ffffff", duration: 0.4 }, 4.4);

      // 10.8s: Transition exit
      tl.to("#root", {
        opacity: 0,
        y: -30,
        duration: 0.7,
        ease: "power2.in"
      }, 10.8);

      window.__timelines = window.__timelines || {};
      window.__timelines["scene-3-checkout"] = tl;
    })();
  </script>
</template>
"""

with open(path, "w", encoding="utf-8") as f:
    f.write(scene3_html)

print("Updated scene-3-checkout.html with authentic Pay button and step-by-step click interaction.")


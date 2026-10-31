import re

path = "videos/foodlink-product-film/compositions/scene-5-impact.html"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Add CSS for scanner reticle and laser beam
css_additions = """
    .qr-scanner-wrapper {
      position: relative;
      width: 200px;
      height: 200px;
      border-radius: 20px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #ffffff;
    }
    .reticle-corner {
      position: absolute;
      width: 20px;
      height: 20px;
      border-color: #2e7d32;
      border-style: solid;
      pointer-events: none;
      z-index: 10;
    }
    .qr-card.merchant .reticle-corner {
      border-color: #0f172a;
    }
    .reticle-corner.top-left {
      top: 6px;
      left: 6px;
      border-width: 3px 0 0 3px;
      border-top-left-radius: 8px;
    }
    .reticle-corner.top-right {
      top: 6px;
      right: 6px;
      border-width: 3px 3px 0 0;
      border-top-right-radius: 8px;
    }
    .reticle-corner.bottom-left {
      bottom: 6px;
      left: 6px;
      border-width: 0 0 3px 3px;
      border-bottom-left-radius: 8px;
    }
    .reticle-corner.bottom-right {
      bottom: 6px;
      right: 6px;
      border-width: 0 3px 3px 0;
      border-bottom-right-radius: 8px;
    }

    .laser-beam {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      height: 4px;
      background: linear-gradient(90deg, transparent 0%, #22c55e 50%, transparent 100%);
      box-shadow: 0 0 14px #22c55e, 0 0 6px #4ade80;
      opacity: 0;
      z-index: 15;
      pointer-events: none;
    }
    .qr-card.merchant .laser-beam {
      background: linear-gradient(90deg, transparent 0%, #3b82f6 50%, transparent 100%);
      box-shadow: 0 0 14px #3b82f6, 0 0 6px #60a5fa;
    }
"""

content = content.replace("    .qr-img {", css_additions + "\n    .qr-img {")

# 2. Wrap qr-img in qr-scanner-wrapper with corner reticles and laser beam
old_qr_markup = """      <div class="qr-container" data-hold>
        <!-- Customer QR -->
        <div class="qr-card customer" id="qr-box-customer">
          <img src="assets/qr-customer.png" alt="Customer QR" class="qr-img" />
          <span class="qr-tag customer">Customer Food App</span>
        </div>

        <!-- Merchant QR -->
        <div class="qr-card merchant" id="qr-box-merchant">
          <img src="assets/qr-merchant.png" alt="Merchant QR" class="qr-img" />
          <span class="qr-tag merchant">Merchant Portal</span>
        </div>
      </div>"""

new_qr_markup = """      <div class="qr-container" data-hold>
        <!-- Customer QR -->
        <div class="qr-card customer" id="qr-box-customer">
          <div class="qr-scanner-wrapper">
            <div class="reticle-corner top-left"></div>
            <div class="reticle-corner top-right"></div>
            <div class="reticle-corner bottom-left"></div>
            <div class="reticle-corner bottom-right"></div>
            <div class="laser-beam" id="laser-customer"></div>
            <img src="assets/qr-customer.png" alt="Customer QR" class="qr-img" />
          </div>
          <span class="qr-tag customer">Customer Food App</span>
        </div>

        <!-- Merchant QR -->
        <div class="qr-card merchant" id="qr-box-merchant">
          <div class="qr-scanner-wrapper">
            <div class="reticle-corner top-left"></div>
            <div class="reticle-corner top-right"></div>
            <div class="reticle-corner bottom-left"></div>
            <div class="reticle-corner bottom-right"></div>
            <div class="laser-beam" id="laser-merchant"></div>
            <img src="assets/qr-merchant.png" alt="Merchant QR" class="qr-img" />
          </div>
          <span class="qr-tag merchant">Merchant Portal</span>
        </div>
      </div>"""

content = content.replace(old_qr_markup, new_qr_markup)

# 3. Add GSAP animations for the reticle and laser sweep
old_script_tail = """      tl.from("#cta-footer", { opacity: 0, y: 10, duration: 0.5 }, 5.1);

      // Hold until end of 12.0s
      window.__timelines = window.__timelines || {};"""

new_script_tail = """      tl.from("#cta-footer", { opacity: 0, y: 10, duration: 0.5 }, 5.1);

      // Reticle corner bracket focus entrance
      tl.from(".reticle-corner", {
        scale: 1.5,
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: "back.out(2)"
      }, 5.2);

      // Laser Sweep Pass 1 (5.6s - 7.6s)
      tl.set("#laser-customer, #laser-merchant", { top: 0, opacity: 0 }, 5.5);
      tl.to("#laser-customer, #laser-merchant", { opacity: 1, duration: 0.2 }, 5.6);
      tl.to("#laser-customer, #laser-merchant", {
        top: 196,
        duration: 1.8,
        ease: "power1.inOut"
      }, 5.6);
      tl.to("#laser-customer, #laser-merchant", { opacity: 0, duration: 0.2 }, 7.4);

      // Laser Sweep Pass 2 (8.4s - 10.4s)
      tl.set("#laser-customer, #laser-merchant", { top: 0, opacity: 0 }, 8.3);
      tl.to("#laser-customer, #laser-merchant", { opacity: 1, duration: 0.2 }, 8.4);
      tl.to("#laser-customer, #laser-merchant", {
        top: 196,
        duration: 1.8,
        ease: "power1.inOut"
      }, 8.4);
      tl.to("#laser-customer, #laser-merchant", { opacity: 0, duration: 0.2 }, 10.2);

      // Subtle pulse on the reticle corners
      tl.to(".reticle-corner", {
        scale: 1.08,
        duration: 0.8,
        repeat: 3,
        yoyo: true,
        ease: "sine.inOut"
      }, 6.0);

      // Hold until end of 12.0s
      window.__timelines = window.__timelines || {};"""

content = content.replace(old_script_tail, new_script_tail)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

print("Applied QR reticle and laser sweep to Scene 5.")


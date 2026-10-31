import re

path = "videos/foodlink-product-film/compositions/scene-5-impact.html"
with open(path, "r", encoding="utf-8") as f:
    c = f.read()

# 1. Update metric numbers HTML with IDs and initial zeros
old_grid = """      <div class="metrics-grid">
        <div class="metric-card" id="m-card-1">
          <div class="metric-num">18</div>
          <div class="metric-label">Meals Rescued</div>
          <div class="metric-sub">Partner Bakeries & Cafes</div>
        </div>
        <div class="metric-card" id="m-card-2">
          <div class="metric-num orange">$69.86</div>
          <div class="metric-label">Revenue Recovered</div>
          <div class="metric-sub">Direct Merchant Earnings</div>
        </div>
        <div class="metric-card" id="m-card-3">
          <div class="metric-num">342 kg</div>
          <div class="metric-label">CO₂ Prevented</div>
          <div class="metric-sub">Cleaner Environment</div>
        </div>
      </div>"""

new_grid = """      <div class="metrics-grid">
        <div class="metric-card" id="m-card-1">
          <div class="metric-num" id="num-meals">0+</div>
          <div class="metric-label">Meals Rescued</div>
          <div class="metric-sub">Partner Bakeries & Cafes</div>
        </div>
        <div class="metric-card" id="m-card-2">
          <div class="metric-num orange" id="num-rev">$0</div>
          <div class="metric-label">Revenue Recovered</div>
          <div class="metric-sub">Direct Merchant Earnings</div>
        </div>
        <div class="metric-card" id="m-card-3">
          <div class="metric-num" id="num-co2">0 kg</div>
          <div class="metric-label">CO2 Prevented</div>
          <div class="metric-sub">Cleaner Environment</div>
        </div>
      </div>"""

c = c.replace(old_grid, new_grid)

# 2. Update GSAP script with deterministic number counting animation
new_script = """  <script>
    (function() {
      const tl = gsap.timeline({ paused: true });

      // Counter state object
      const counts = { meals: 0, revenue: 0, co2: 0 };
      const elMeals = document.getElementById("num-meals");
      const elRev = document.getElementById("num-rev");
      const elCo2 = document.getElementById("num-co2");

      // 0.0s: Entrance of Impact
      tl.to("#root", { opacity: 1, duration: 0.4, ease: "power2.out" }, 0);
      tl.from("#impact-badge", { y: -20, opacity: 0, duration: 0.6, ease: "back.out(1.5)" }, 0.2);
      tl.from("#impact-heading", { y: 30, opacity: 0, duration: 0.7, ease: "power3.out" }, 0.3);

      tl.from("#m-card-1", { scale: 0.8, opacity: 0, y: 40, duration: 0.6, ease: "back.out(1.6)" }, 0.5);
      tl.from("#m-card-2", { scale: 0.8, opacity: 0, y: 40, duration: 0.6, ease: "back.out(1.6)" }, 0.7);
      tl.from("#m-card-3", { scale: 0.8, opacity: 0, y: 40, duration: 0.6, ease: "back.out(1.6)" }, 0.9);

      // 0.6s - 2.4s: Animated Metric Numbers Roll-Up
      tl.to(counts, {
        meals: 1850,
        revenue: 12480,
        co2: 3420,
        duration: 1.8,
        ease: "power2.out",
        onUpdate: function() {
          if (elMeals) elMeals.innerText = Math.round(counts.meals).toLocaleString() + "+";
          if (elRev) elRev.innerText = "$" + Math.round(counts.revenue).toLocaleString();
          if (elCo2) elCo2.innerText = Math.round(counts.co2).toLocaleString() + " kg";
        }
      }, 0.6);

      // Card subtle pop highlight after count completion
      tl.to("#m-card-1, #m-card-2, #m-card-3", {
        scale: 1.03,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        ease: "power1.inOut"
      }, 2.4);

      // 3.8s: Transition to Dual QR CTA
      tl.to("#panel-impact", {
        opacity: 0,
        scale: 0.94,
        duration: 0.5,
        ease: "power2.in"
      }, 3.8);

      tl.to("#panel-cta", {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
      }, 4.2);

      tl.from("#cta-logo", { scale: 0.5, opacity: 0, duration: 0.5, ease: "back.out(2)" }, 4.3);
      tl.from("#cta-heading", { y: 20, opacity: 0, duration: 0.5, ease: "power2.out" }, 4.4);
      tl.from("#cta-sub", { y: 15, opacity: 0, duration: 0.5, ease: "power2.out" }, 4.5);

      tl.from("#qr-box-customer", {
        x: -40,
        opacity: 0,
        scale: 0.9,
        duration: 0.7,
        ease: "back.out(1.4)"
      }, 4.6);

      tl.from("#qr-box-merchant", {
        x: 40,
        opacity: 0,
        scale: 0.9,
        duration: 0.7,
        ease: "back.out(1.4)"
      }, 4.8);

      tl.from("#cta-footer", { opacity: 0, y: 10, duration: 0.5 }, 5.1);

      // Hold until end of 12.0s
      window.__timelines = window.__timelines || {};
      window.__timelines["scene-5-impact"] = tl;
    })();
  </script>"""

old_script_match = re.search(r'\s*<script>.*?</script>', c, re.DOTALL).group(0)
c = c.replace(old_script_match, "\n" + new_script)

with open(path, "w", encoding="utf-8") as f:
    f.write(c)

print("Updated scene-5-impact.html with animated counter roll-up.")


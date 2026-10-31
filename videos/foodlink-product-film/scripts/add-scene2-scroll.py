import re

path = "videos/foodlink-product-film/compositions/scene-2-discovery.html"
with open(path, "r", encoding="utf-8") as f:
    c = f.read()

# 1. Add CSS for island toast
toast_css = """
    /* Dynamic Island Micro-Toast */
    .island-toast {
      position: absolute;
      top: 14px;
      left: 50%;
      transform: translateX(-50%) scale(0.85);
      background: #000000;
      color: #ffffff;
      padding: 7px 18px;
      border-radius: 20px;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.3px;
      z-index: 60;
      opacity: 0;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
      border: 1px solid rgba(74, 222, 128, 0.4);
      white-space: nowrap;
      pointer-events: none;
    }
    .toast-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #4ade80;
      box-shadow: 0 0 6px #4ade80;
    }
"""
c = c.replace("    /* Simulated Tap Pointer */", toast_css + "\n    /* Simulated Tap Pointer */")

# 2. Add toast HTML inside phone-screen
toast_html = """
        <!-- Dynamic Island Micro-Toast -->
        <div class="island-toast" id="reserve-toast">
          <span class="toast-dot"></span>
          <span>Surplus Reserved • Proceeding to Payment</span>
        </div>
"""
c = c.replace('<div class="island"></div>', '<div class="island"></div>' + toast_html)

# 3. Update GSAP timeline with feed scroll and toast trigger
new_script = """  <script>
    (function() {
      const tl = gsap.timeline({ paused: true });

      // 0.0s: Entrance with 3D camera perspective
      tl.to("#root", { opacity: 1, duration: 0.4, ease: "power2.out" }, 0);
      tl.from("#us1-narrative", { x: -60, opacity: 0, duration: 1.0, ease: "power3.out" }, 0.2);
      tl.fromTo("#us1-phone", 
        { y: 120, rotationY: -12, rotationX: 6, opacity: 0 },
        { y: 0, rotationY: -4, rotationX: 2, opacity: 1, duration: 1.2, ease: "power3.out" },
        0.3
      );

      // Stagger in the feed items
      tl.from(".filter-chip", { opacity: 0, scale: 0.8, stagger: 0.08, duration: 0.4, ease: "back.out(1.5)" }, 0.6);
      tl.from("#item-2-card", { y: 20, opacity: 0, duration: 0.5, ease: "power2.out" }, 0.8);
      tl.from("#item-3-card", { y: 20, opacity: 0, duration: 0.5, ease: "power2.out" }, 1.0);
      tl.from("#item-4-card", { y: 20, opacity: 0, duration: 0.5, ease: "power2.out" }, 1.2);

      // 1.8s - 3.8s: Natural feed browsing scroll (shows user exploring surplus options)
      tl.to("#feed-items-list", {
        y: -95,
        duration: 1.2,
        ease: "power2.inOut"
      }, 1.8);

      tl.to("#feed-items-list", {
        y: 0,
        duration: 1.0,
        ease: "power2.inOut"
      }, 3.3);

      // 4.4s: Highlight the target food card as camera straightens
      tl.to("#target-food-card", {
        boxShadow: "0 16px 36px rgba(46, 125, 50, 0.35)",
        borderColor: "#2e7d32",
        scale: 1.03,
        duration: 0.6,
        ease: "back.out(1.5)"
      }, 4.4);

      tl.to("#us1-phone", {
        rotationY: 0,
        rotationX: 0,
        duration: 0.8,
        ease: "power2.inOut"
      }, 5.0);

      // Tap cursor glides in at 7.2s and clicks button at 8.0s (corresponds to film time 17.5s)
      tl.to("#tap-pointer", {
        x: 325,
        y: 365,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power2.out"
      }, 7.2);

      // Tap compression (click sound fires at 17.5s in master)
      tl.to("#tap-pointer", {
        scale: 0.8,
        backgroundColor: "rgba(46, 125, 50, 0.6)",
        duration: 0.15,
        yoyo: true,
        repeat: 1
      }, 8.0);

      tl.to("#card-reserve-btn", {
        scale: 0.94,
        backgroundColor: "#256629",
        duration: 0.15,
        yoyo: true,
        repeat: 1
      }, 8.0);

      tl.to("#tap-pointer", {
        opacity: 0,
        duration: 0.3
      }, 8.4);

      // 8.2s: Dynamic island expands with confirmation toast!
      tl.to("#reserve-toast", {
        opacity: 1,
        scale: 1,
        y: 6,
        duration: 0.4,
        ease: "back.out(1.6)"
      }, 8.2);

      // 11.3s: Transition exit
      tl.to("#root", {
        opacity: 0,
        y: -30,
        duration: 0.7,
        ease: "power2.in"
      }, 11.3);

      window.__timelines = window.__timelines || {};
      window.__timelines["scene-2-discovery"] = tl;
    })();
  </script>"""

old_script_match = re.search(r'\s*<script>.*?</script>', c, re.DOTALL).group(0)
c = c.replace(old_script_match, "\n" + new_script)

with open(path, "w", encoding="utf-8") as f:
    f.write(c)

print("Updated scene-2-discovery.html with interactive scroll and dynamic toast.")


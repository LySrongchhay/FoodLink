import re

def update_scene_2():
    path = "videos/foodlink-product-film/compositions/scene-2-discovery.html"
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    content = re.sub(r'data-duration="9\.5"', 'data-duration="12.0"', content)
    
    old_script = re.search(r'<script>.*?</script>', content, re.DOTALL).group(0)
    new_script = """<script>
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

      // 4.0s: CAD Bakery card highlight
      tl.to("#target-food-card", {
        boxShadow: "0 16px 36px rgba(46, 125, 50, 0.25)",
        borderColor: "#2e7d32",
        scale: 1.02,
        duration: 0.6,
        ease: "back.out(1.5)"
      }, 4.0);

      // Camera straightens up toward the reservation action
      tl.to("#us1-phone", {
        rotationY: 0,
        rotationX: 0,
        duration: 0.8,
        ease: "power2.inOut"
      }, 5.5);

      // Tap cursor glides in at 7.2s and clicks button at 8.0s (corresponds to film time 17.5s)
      tl.to("#tap-pointer", {
        x: 330,
        y: 430,
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

    content = content.replace(old_script, new_script)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Scene 2 updated.")

def update_scene_3():
    path = "videos/foodlink-product-film/compositions/scene-3-checkout.html"
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    content = re.sub(r'data-duration="9\.5"', 'data-duration="11.5"', content)

    old_script = re.search(r'<script>.*?</script>', content, re.DOTALL).group(0)
    new_script = """<script>
    (function() {
      const tl = gsap.timeline({ paused: true });

      // 0.0s: Entrance with 3D perspective
      tl.to("#root", { opacity: 1, duration: 0.4, ease: "power2.out" }, 0);
      tl.from("#us2-narrative", { x: -60, opacity: 0, duration: 1.0, ease: "power3.out" }, 0.2);
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
          duration: 1.6,
          ease: "power2.inOut",
          repeat: 1,
          repeatDelay: 0.2
        },
        1.0
      );

      // Camera settles flat for confirmed pass
      tl.to("#us2-phone", {
        rotationY: 0,
        rotationX: 0,
        duration: 0.6,
        ease: "power2.inOut"
      }, 3.2);

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
  </script>"""

    content = content.replace(old_script, new_script)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Scene 3 updated.")

def update_scene_4():
    path = "videos/foodlink-product-film/compositions/scene-4-kitchen.html"
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    content = re.sub(r'data-duration="8\.5"', 'data-duration="11.5"', content)

    old_script = re.search(r'<script>.*?</script>', content, re.DOTALL).group(0)
    new_script = """<script>
    (function() {
      const tl = gsap.timeline({ paused: true });

      // 0.0s: Entrance with 3D perspective
      tl.to("#root", { opacity: 1, duration: 0.4, ease: "power2.out" }, 0);
      tl.from("#us3-narrative", { x: -60, opacity: 0, duration: 1.0, ease: "power3.out" }, 0.2);
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

      // Digits input simulation sequentially (3.6s to 6.6s)
      tl.call(() => { document.getElementById("pin-1").innerText = "8"; document.getElementById("pin-1").classList.add("filled"); }, null, 3.6);
      tl.call(() => { document.getElementById("pin-2").innerText = "4"; document.getElementById("pin-2").classList.add("filled"); }, null, 4.2);
      tl.call(() => { document.getElementById("pin-3").innerText = "9"; document.getElementById("pin-3").classList.add("filled"); }, null, 4.8);
      tl.call(() => { document.getElementById("pin-4").innerText = "2"; document.getElementById("pin-4").classList.add("filled"); }, null, 5.4);
      tl.call(() => { document.getElementById("pin-5").innerText = "0"; document.getElementById("pin-5").classList.add("filled"); }, null, 6.0);
      tl.call(() => { document.getElementById("pin-6").innerText = "1"; document.getElementById("pin-6").classList.add("filled"); }, null, 6.6);

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
  </script>"""

    content = content.replace(old_script, new_script)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Scene 4 updated.")

def update_scene_5():
    path = "videos/foodlink-product-film/compositions/scene-5-impact.html"
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    content = re.sub(r'data-duration="7\.0"', 'data-duration="12.0"', content)

    old_script = re.search(r'<script>.*?</script>', content, re.DOTALL).group(0)
    new_script = """<script>
    (function() {
      const tl = gsap.timeline({ paused: true });

      // 0.0s: Entrance of Impact
      tl.to("#root", { opacity: 1, duration: 0.4, ease: "power2.out" }, 0);
      tl.from("#impact-badge", { y: -20, opacity: 0, duration: 0.6, ease: "back.out(1.5)" }, 0.2);
      tl.from("#impact-heading", { y: 30, opacity: 0, duration: 0.7, ease: "power3.out" }, 0.3);

      tl.from("#m-card-1", { scale: 0.8, opacity: 0, y: 40, duration: 0.6, ease: "back.out(1.6)" }, 0.5);
      tl.from("#m-card-2", { scale: 0.8, opacity: 0, y: 40, duration: 0.6, ease: "back.out(1.6)" }, 0.7);
      tl.from("#m-card-3", { scale: 0.8, opacity: 0, y: 40, duration: 0.6, ease: "back.out(1.6)" }, 0.9);

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

    content = content.replace(old_script, new_script)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Scene 5 updated.")

if __name__ == "__main__":
    update_scene_2()
    update_scene_3()
    update_scene_4()
    update_scene_5()


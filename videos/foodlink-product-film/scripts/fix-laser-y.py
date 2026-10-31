path = "videos/foodlink-product-film/compositions/scene-5-impact.html"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace top with y in GSAP tweens
old_tweens = """      // Laser Sweep Pass 1 (5.6s - 7.6s)
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
      tl.to("#laser-customer, #laser-merchant", { opacity: 0, duration: 0.2 }, 10.2);"""

new_tweens = """      // Laser Sweep Pass 1 (5.6s - 7.6s)
      tl.set("#laser-customer, #laser-merchant", { y: 0, opacity: 0 }, 5.5);
      tl.to("#laser-customer, #laser-merchant", { opacity: 1, duration: 0.2 }, 5.6);
      tl.to("#laser-customer, #laser-merchant", {
        y: 196,
        duration: 1.8,
        ease: "power1.inOut"
      }, 5.6);
      tl.to("#laser-customer, #laser-merchant", { opacity: 0, duration: 0.2 }, 7.4);

      // Laser Sweep Pass 2 (8.4s - 10.4s)
      tl.set("#laser-customer, #laser-merchant", { y: 0, opacity: 0 }, 8.3);
      tl.to("#laser-customer, #laser-merchant", { opacity: 1, duration: 0.2 }, 8.4);
      tl.to("#laser-customer, #laser-merchant", {
        y: 196,
        duration: 1.8,
        ease: "power1.inOut"
      }, 8.4);
      tl.to("#laser-customer, #laser-merchant", { opacity: 0, duration: 0.2 }, 10.2);"""

content = content.replace(old_tweens, new_tweens)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

print("Updated tweens to use transform y.")


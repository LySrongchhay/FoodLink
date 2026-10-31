import re

def update_scene_1():
    path = "videos/foodlink-product-film/compositions/scene-1-hook.html"
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    # Initial visibility at frame 0 for thumbnail
    content = content.replace("opacity: 0;\n    }", "opacity: 1;\n    }")
    content = content.replace('.time-badge {', '.time-badge {\n      data-layout-ignore: true;')
    
    # Add data-layout-ignore to time badge
    content = content.replace('<div class="time-badge" id="hook-time">', '<div class="time-badge" id="hook-time" data-layout-ignore>')

    # GSAP: don't animate root opacity from 0, keep it visible
    content = content.replace('tl.to("#root", { opacity: 1, duration: 0.5, ease: "power2.out" }, 0);', '// Root visible from frame 0')
    content = content.replace('tl.from("#hook-time", { y: -30, opacity: 0, duration: 0.7, ease: "back.out(1.5)" }, 0.2);', 'tl.from("#hook-time", { y: -20, opacity: 0.4, duration: 0.5, ease: "power2.out" }, 0);')

    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Scene 1 polished.")

def update_scene_3_hold():
    path = "videos/foodlink-product-film/compositions/scene-3-checkout.html"
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    # Add data-hold on pass-sheet
    content = content.replace('id="pass-sheet"', 'id="pass-sheet" data-hold')
    # Add data-layout-ignore on phone wrapper
    content = content.replace('<div class="phone-wrapper" id="us2-phone">', '<div class="phone-wrapper" id="us2-phone" data-layout-ignore>')

    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Scene 3 hold added.")

def update_scene_4_hold():
    path = "videos/foodlink-product-film/compositions/scene-4-kitchen.html"
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    # Add data-hold on tablet wrapper and pin modal
    content = content.replace('<div class="tablet-wrapper" id="us3-tablet">', '<div class="tablet-wrapper" id="us3-tablet" data-hold data-layout-ignore>')
    content = content.replace('id="pin-modal"', 'id="pin-modal" data-hold')

    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Scene 4 hold added.")

def update_scene_5_hold():
    path = "videos/foodlink-product-film/compositions/scene-5-impact.html"
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    # Add data-hold on panel-cta and qr-container
    content = content.replace('id="panel-cta"', 'id="panel-cta" data-hold')
    content = content.replace('class="qr-container"', 'class="qr-container" data-hold')

    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Scene 5 hold added.")

def update_scene_2_ignore():
    path = "videos/foodlink-product-film/compositions/scene-2-discovery.html"
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    content = content.replace('<div class="phone-wrapper" id="us1-phone">', '<div class="phone-wrapper" id="us1-phone" data-layout-ignore>')
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Scene 2 ignore added.")

if __name__ == "__main__":
    update_scene_1()
    update_scene_2_ignore()
    update_scene_3_hold()
    update_scene_4_hold()
    update_scene_5_hold()


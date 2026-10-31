import re

def clean_index():
    path = "videos/foodlink-product-film/index.html"
    with open(path, "r", encoding="utf-8") as f:
        c = f.read()

    c = c.replace("<!-- Scene 2: Customer Discovery & BKK1 Map (9.5s – 21.5s) -->", "<!-- Scene 2: Browse Surplus Food (9.5s – 21.5s) -->")
    c = c.replace("<!-- Scene 1: Phnom Penh Evening Surplus Dilemma -->", "<!-- Scene 1: Evening Surplus Dilemma -->")
    c = c.replace("<!-- Scene 2: Evening Food Rescue & CAD Bakery BKK1 Connection -->", "<!-- Scene 2: Browse Surplus Food -->")
    c = c.replace("<!-- Scene 4: CAD Bakery Kitchen Handover & PIN Verification -->", "<!-- Scene 4: Merchant Kitchen Handover & PIN Verification -->")

    # Update audio durations
    c = re.sub(
        r'id="vo-scene-1"\s+class="clip"\s+src="assets/audio/voiceover/vo-1.mp3"\s+data-start="0.5"\s+data-duration="[0-9\.]+"',
        'id="vo-scene-1"\n        class="clip"\n        src="assets/audio/voiceover/vo-1.mp3"\n        data-start="0.5"\n        data-duration="8.81"',
        c
    )
    c = re.sub(
        r'id="vo-scene-2"\s+class="clip"\s+src="assets/audio/voiceover/vo-2.mp3"\s+data-start="10.0"\s+data-duration="[0-9\.]+"',
        'id="vo-scene-2"\n        class="clip"\n        src="assets/audio/voiceover/vo-2.mp3"\n        data-start="10.0"\n        data-duration="9.19"',
        c
    )
    c = re.sub(
        r'id="vo-scene-5"\s+class="clip"\s+src="assets/audio/voiceover/vo-5.mp3"\s+data-start="43.5"\s+data-duration="[0-9\.]+"',
        'id="vo-scene-5"\n        class="clip"\n        src="assets/audio/voiceover/vo-5.mp3"\n        data-start="43.5"\n        data-duration="8.62"',
        c
    )

    with open(path, "w", encoding="utf-8") as f:
        f.write(c)
    print("index.html cleaned.")

def clean_scene_1():
    path = "videos/foodlink-product-film/compositions/scene-1-hook.html"
    with open(path, "r", encoding="utf-8") as f:
        c = f.read()
    c = c.replace('alt="CAD Bakery"', 'alt="Artisan Bakery"')
    c = c.replace('<!-- Node 1: Closing Kitchen (CAD Bakery) -->', '<!-- Node 1: Closing Kitchen -->')
    with open(path, "w", encoding="utf-8") as f:
        f.write(c)
    print("scene-1-hook.html cleaned.")

def clean_scene_3():
    path = "videos/foodlink-product-film/compositions/scene-3-checkout.html"
    with open(path, "r", encoding="utf-8") as f:
        c = f.read()
    c = c.replace("Show this code at CAD Bakery counter", "Show this code at the bakery counter")
    with open(path, "w", encoding="utf-8") as f:
        f.write(c)
    print("scene-3-checkout.html cleaned.")

def clean_scene_4():
    path = "videos/foodlink-product-film/compositions/scene-4-kitchen.html"
    with open(path, "r", encoding="utf-8") as f:
        c = f.read()
    c = c.replace('alt="CAD Bakery"', 'alt="Bakery Logo"')
    with open(path, "w", encoding="utf-8") as f:
        f.write(c)
    print("scene-4-kitchen.html cleaned.")

def clean_scene_5():
    path = "videos/foodlink-product-film/compositions/scene-5-impact.html"
    with open(path, "r", encoding="utf-8") as f:
        c = f.read()
    c = c.replace('<div class="metric-sub">CAD Bakery • BKK1</div>', '<div class="metric-sub">Partner Bakeries & Cafes</div>')
    c = c.replace('<div class="metric-sub">Cleaner Phnom Penh</div>', '<div class="metric-sub">Cleaner Environment</div>')
    with open(path, "w", encoding="utf-8") as f:
        f.write(c)
    print("scene-5-impact.html cleaned.")

if __name__ == "__main__":
    clean_index()
    clean_scene_1()
    clean_scene_3()
    clean_scene_4()
    clean_scene_5()


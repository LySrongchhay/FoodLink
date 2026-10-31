import re

def update_scene_2():
    path = "videos/foodlink-product-film/compositions/scene-2-discovery.html"
    with open(path, "r", encoding="utf-8") as f:
        c = f.read()

    c = re.sub(
        r'<div class="badge-pill">Act I • Sokha in BKK1</div>',
        '<div class="badge-pill">Act I • Smart Discovery in BKK1</div>',
        c
    )
    c = re.sub(
        r'<h2 class="narrative-title">Meet Sokha: <span>60% OFF</span> at CAD Bakery</h2>',
        '<h2 class="narrative-title">Evening Food Rescue: <span>60% OFF</span> at CAD Bakery</h2>',
        c
    )
    c = re.sub(
        r'Finishing work in Phnom Penh, Sokha opens FoodLink and finds freshly baked artisan sourdough just 400 meters away before closing time\.',
        'Right in Boeng Keng Kang Muoy, opening FoodLink connects you to CAD Bakery: freshly baked artisan sourdough just 400 meters away at 60% off.',
        c
    )

    with open(path, "w", encoding="utf-8") as f:
        f.write(c)

    print("Updated scene-2-discovery.html without Sokha.")

def update_scene_4():
    path = "videos/foodlink-product-film/compositions/scene-4-kitchen.html"
    with open(path, "r", encoding="utf-8") as f:
        c = f.read()

    c = re.sub(
        r"CAD Bakery staff receive Sokha's order notification live, verify the 6-digit PIN at the counter, and hand over the fresh bread with zero friction\.",
        "CAD Bakery staff receive the customer order notification live, verify the 6-digit PIN at the counter, and hand over the fresh bread with zero friction.",
        c
    )

    with open(path, "w", encoding="utf-8") as f:
        f.write(c)

    print("Updated scene-4-kitchen.html without Sokha.")

if __name__ == "__main__":
    update_scene_2()
    update_scene_4()


import re

def update_scene_1():
    path = "videos/foodlink-product-film/compositions/scene-1-hook.html"
    with open(path, "r", encoding="utf-8") as f:
        c = f.read()

    c = c.replace("Phnom Penh • 8:00 PM", "Every Evening • 8:00 PM")
    c = c.replace("CAD Bakery & Cafe • BKK1 Display Case", "Artisan Bakery & Cafe • Glass Display Case")
    c = c.replace("CAD Bakery & Cafe", "Partner Bakery & Kitchen")
    c = c.replace("Street 310, BKK1 • Closing Surplus", "Daily Fresh Surplus • Open for Rescue")
    c = c.replace("CAD Bakery Store", "Partner Bakery Store")

    with open(path, "w", encoding="utf-8") as f:
        f.write(c)
    print("Scene 1 updated without Phnom Penh, BKK1, CAD Bakery.")

def update_scene_2():
    path = "videos/foodlink-product-film/compositions/scene-2-discovery.html"
    with open(path, "r", encoding="utf-8") as f:
        c = f.read()

    c = c.replace("Act I • Smart Discovery in BKK1", "Act I • Browse Surplus Food")
    c = c.replace("Act I • Sokha in BKK1", "Act I • Browse Surplus Food")
    c = c.replace("Evening Food Rescue: <span>60% OFF</span> at CAD Bakery", "Browse Surplus: <span>Up to 60% OFF</span> Daily")
    c = c.replace("Meet Sokha: <span>60% OFF</span> at CAD Bakery", "Browse Surplus: <span>Up to 60% OFF</span> Daily")
    
    # Narrative description
    old_desc_1 = "Right in Boeng Keng Kang Muoy, opening FoodLink connects you to CAD Bakery: freshly baked artisan sourdough just 400 meters away at 60% off."
    new_desc = "Opening FoodLink, customers can browse daily surplus from local bakeries and cafes, discovering fresh artisan sourdough and pastries at 60% off before closing."
    c = c.replace(old_desc_1, new_desc)

    # Phone UI elements
    c = c.replace("Street 310, BKK1", "Nearby Surplus • Open Now")
    c = c.replace("CAD Bakery & Cafe", "Artisan Bakery & Cafe")
    c = c.replace("Nearby Partner • Closing at 8:30 PM", "Nearby Partner • Closing at 8:30 PM")

    with open(path, "w", encoding="utf-8") as f:
        f.write(c)
    print("Scene 2 updated without Phnom Penh, BKK1, CAD Bakery.")

def update_scene_3():
    path = "videos/foodlink-product-film/compositions/scene-3-checkout.html"
    with open(path, "r", encoding="utf-8") as f:
        c = f.read()

    c = c.replace("CAD Bakery & Cafe", "Artisan Bakery & Cafe")
    c = c.replace("Pickup: Street 310, BKK1", "Pickup: Partner Counter")

    with open(path, "w", encoding="utf-8") as f:
        f.write(c)
    print("Scene 3 updated without CAD Bakery / BKK1.")

def update_scene_4():
    path = "videos/foodlink-product-film/compositions/scene-4-kitchen.html"
    with open(path, "r", encoding="utf-8") as f:
        c = f.read()

    c = c.replace("CAD Bakery & Cafe", "Artisan Bakery & Cafe")
    c = c.replace(
        "CAD Bakery staff receive the customer order notification live, verify the 6-digit PIN at the counter, and hand over the fresh bread with zero friction.",
        "Merchant staff receive the customer order notification live, verify the 6-digit PIN at the counter, and hand over the fresh bread with zero friction."
    )

    with open(path, "w", encoding="utf-8") as f:
        f.write(c)
    print("Scene 4 updated without CAD Bakery.")

def update_scene_5():
    path = "videos/foodlink-product-film/compositions/scene-5-impact.html"
    with open(path, "r", encoding="utf-8") as f:
        c = f.read()

    c = c.replace(
        "Together, Phnom Penh <span>Rescues Fresh Food</span>",
        "Together, We <span>Rescue Fresh Food</span>"
    )
    c = c.replace(
        "Built for Cambodia • Hosted on Vercel",
        "FoodLink Platform • The Closing-Hour Food Rescue Network"
    )

    with open(path, "w", encoding="utf-8") as f:
        f.write(c)
    print("Scene 5 updated without Phnom Penh.")

if __name__ == "__main__":
    update_scene_1()
    update_scene_2()
    update_scene_3()
    update_scene_4()
    update_scene_5()


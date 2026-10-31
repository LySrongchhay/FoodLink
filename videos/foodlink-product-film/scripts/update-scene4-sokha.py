path = "videos/foodlink-product-film/compositions/scene-4-kitchen.html"
with open(path, "r", encoding="utf-8") as f:
    c = f.read()

c = c.replace(
    "Sokha reserved 1x Artisan Sourdough Box",
    "Customer reserved 1x Artisan Sourdough Box"
)

with open(path, "w", encoding="utf-8") as f:
    f.write(c)

print("Updated scene-4-kitchen.html line 338.")


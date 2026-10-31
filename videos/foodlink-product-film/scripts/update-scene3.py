import re

path = "videos/foodlink-product-film/compositions/scene-3-checkout.html"
with open(path, "r", encoding="utf-8") as f:
    c = f.read()

c = c.replace(
    "Sokha pays instantly using her mobile banking app.",
    "Pay instantly using any mobile banking app."
)

with open(path, "w", encoding="utf-8") as f:
    f.write(c)

print("Updated scene-3-checkout.html without Sokha.")


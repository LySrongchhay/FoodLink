import re

path = "videos/foodlink-product-film/index.html"
with open(path, "r", encoding="utf-8") as f:
    c = f.read()

c = c.replace(
    '<!-- Scene 2: Sokha & CAD Bakery BKK1 Connection -->',
    '<!-- Scene 2: Evening Food Rescue & CAD Bakery BKK1 Connection -->'
)
c = re.sub(
    r'id="vo-scene-2"\s+class="clip"\s+src="assets/audio/voiceover/vo-2.mp3"\s+data-start="10.0"\s+data-duration="10.73"',
    'id="vo-scene-2"\n        class="clip"\n        src="assets/audio/voiceover/vo-2.mp3"\n        data-start="10.0"\n        data-duration="10.39"',
    c
)
c = re.sub(
    r'id="vo-scene-4"\s+class="clip"\s+src="assets/audio/voiceover/vo-4.mp3"\s+data-start="32.5"\s+data-duration="8.95"',
    'id="vo-scene-4"\n        class="clip"\n        src="assets/audio/voiceover/vo-4.mp3"\n        data-start="32.5"\n        data-duration="10.68"',
    c
)

with open(path, "w", encoding="utf-8") as f:
    f.write(c)

print("Updated index.html voiceover durations.")


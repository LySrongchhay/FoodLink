import asyncio
import os
import edge_tts
import subprocess

SCRIPT_LINES = [
    {
        "id": "line-01",
        "text": "Every day, local bakeries and restaurants discard fresh, delicious food simply because it went unsold. Meet FoodLink—the smart marketplace connecting merchants with customers to turn surplus food into affordable meals."
    },
    {
        "id": "line-02",
        "text": "It all begins with the merchant. On their mobile device, bakery staff open Create New Bag, choose from fresh pastry presets, apply seventy percent off, and set an easy evening pickup window."
    },
    {
        "id": "line-03",
        "text": "Immediately, nearby diners receive an in-app alert. Customers explore delicious surplus bags in their neighborhood, see exact pickup hours, and save big before items sell out."
    },
    {
        "id": "line-04",
        "text": "In just a few taps, the customer reserves their surprise bag and instantly receives an authentic six-digit pickup code—twenty-four, ninety-seven, twenty-six. Simple, secure, and confirmed."
    },
    {
        "id": "line-05",
        "text": "Back on the merchant app, a live notification pings straight away. The order enters the active pickup queue with the customer details, so staff can pack the bag with zero delays."
    },
    {
        "id": "line-06",
        "text": "When the customer arrives at the counter, they present their pass. The cashier types twenty-four, ninety-seven, twenty-six into the app, confirms the live match, and hands over the meal."
    },
    {
        "id": "line-07",
        "text": "Merchants recover revenue. Customers enjoy great savings. And communities reduce food waste. Join FoodLink today—let's make every meal count."
    }
]

# We use AndrewMultilingualNeural which has richer dynamic inflection, breath pauses, and realistic human pacing
VOICE = "en-US-AndrewMultilingualNeural"
OUT_DIR = "assets/audio"
os.makedirs(OUT_DIR, exist_ok=True)

async def generate():
    print(f"Generating human-like natural voice lines with {VOICE}...")
    manifest = []
    for line in SCRIPT_LINES:
        mp3_path = os.path.join(OUT_DIR, f"{line['id']}.mp3")
        wav_path = os.path.join(OUT_DIR, f"{line['id']}.wav")
        clean_text = line["text"].replace("—", ", ").replace("–", "-")
        
        for attempt in range(4):
            try:
                comm = edge_tts.Communicate(clean_text, VOICE, rate="-2%", pitch="-1Hz")
                await comm.save(mp3_path)
                break
            except Exception as e:
                print(f"Retry {attempt+1} for {line['id']}: {e}")
                await asyncio.sleep(1.5)

        subprocess.run(["ffmpeg", "-y", "-i", mp3_path, "-ar", "44100", "-ac", "2", wav_path], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        
        res = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", wav_path], stdout=subprocess.PIPE, text=True)
        dur = float(res.stdout.strip())
        print(f"[OK] {line['id']}: {dur:.2f}s -> {line['text'][:45]}...")
        manifest.append({
            "id": line["id"],
            "wav": wav_path.replace("\\", "/"),
            "mp3": mp3_path.replace("\\", "/"),
            "duration": dur,
            "text": line["text"]
        })
    
    import json
    with open("assets/audio/voice_manifest.json", "w") as f:
        json.dump(manifest, f, indent=2)
    print("All humanized voice files generated!")

if __name__ == "__main__":
    asyncio.run(generate())

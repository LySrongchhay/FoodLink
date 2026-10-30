import asyncio
import os
import edge_tts
import subprocess

SCRIPT_LINES = [
    {
        "id": "line-01",
        "text": "Every day, local bakeries and restaurants discard fresh, delicious food simply because it went unsold. Meet FoodLink—the smart marketplace turning surplus food into affordable meals."
    },
    {
        "id": "line-02",
        "text": "It begins with the merchant. On their mobile device, a bakery staff member opens Create New Bag, selects surplus pastries, sets seventy percent off, and defines the evening pickup window."
    },
    {
        "id": "line-03",
        "text": "Instantly, a notification fires on the customer app. Nearby diners see the fresh surplus alert, explore delicious surprise bags, and view steep discounts before items sell out."
    },
    {
        "id": "line-04",
        "text": "With a single tap, the customer reserves their bag and receives a verified six-digit pickup code—twenty-four, ninety-seven, twenty-six. Secure, transparent, and reserved instantly."
    },
    {
        "id": "line-05",
        "text": "Back on the merchant app, a live notification pings immediately. The order lands in the active queue with the customer name and pickup window, ensuring zero double-booking."
    },
    {
        "id": "line-06",
        "text": "When the customer arrives at the counter, they show their six-digit pass. The merchant enters twenty-four, ninety-seven, twenty-six into the app, verifies the match, and hands over the bag."
    },
    {
        "id": "line-07",
        "text": "Merchants recover revenue. Customers save money. Communities reduce food waste. Join FoodLink today and turn surplus into value."
    }
]

VOICE = "en-US-JennyNeural"
OUT_DIR = "assets/audio"
os.makedirs(OUT_DIR, exist_ok=True)

async def generate():
    print(f"Generating voice lines using {VOICE}...")
    manifest = []
    for line in SCRIPT_LINES:
        mp3_path = os.path.join(OUT_DIR, f"{line['id']}.mp3")
        wav_path = os.path.join(OUT_DIR, f"{line['id']}.wav")
        comm = edge_tts.Communicate(line["text"], VOICE, rate="+3%")
        await comm.save(mp3_path)
        # convert to wav for universal compatibility with ffmpeg
        subprocess.run(["ffmpeg", "-y", "-i", mp3_path, "-ar", "44100", "-ac", "2", wav_path], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        
        # probe duration
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
    print("All voice files generated!")

if __name__ == "__main__":
    asyncio.run(generate())

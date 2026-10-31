import asyncio
import os
import subprocess
import edge_tts

AUDIO_DIR = os.path.abspath("videos/foodlink-product-film/assets/audio/voiceover")
os.makedirs(AUDIO_DIR, exist_ok=True)

VO_LIST = [
    (
        "vo-1",
        "It is eight PM. Fresh bakery surplus is about to go to waste. FoodLink bridges closing kitchens with conscious food lovers.",
        "+8%"
    ),
    (
        "vo-2",
        "Opening FoodLink, customers can browse daily surplus: fresh artisan sourdough and buttery croissants at sixty percent off, ready for instant rescue.",
        "+6%"
    ),
    (
        "vo-5",
        "Together, we cut food waste, support local businesses, and make sustainable dining effortless. Scan to join the movement today.",
        "+6%"
    )
]

async def build():
    for name, text, rate in VO_LIST:
        raw_mp3 = os.path.join(AUDIO_DIR, f"{name}-raw.mp3")
        wav_path = os.path.join(AUDIO_DIR, f"{name}.wav")
        final_mp3 = os.path.join(AUDIO_DIR, f"{name}.mp3")
        
        print(f"Synthesizing {name} with rate={rate}...")
        comm = edge_tts.Communicate(text, "en-US-JennyNeural", rate=rate)
        await comm.save(raw_mp3)
        
        # FFmpeg EBU R128 (-14 LUFS, -1 dBTP)
        subprocess.run([
            "ffmpeg", "-y", "-i", raw_mp3,
            "-af", "loudnorm=I=-14:LRA=7:tp=-1",
            "-ar", "48000",
            wav_path
        ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        
        subprocess.run([
            "ffmpeg", "-y", "-i", wav_path,
            "-codec:a", "libmp3lame", "-b:a", "320k",
            final_mp3
        ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        
        if os.path.exists(raw_mp3):
            os.remove(raw_mp3)
        print(f"Mastered {final_mp3}")

if __name__ == "__main__":
    asyncio.run(build())


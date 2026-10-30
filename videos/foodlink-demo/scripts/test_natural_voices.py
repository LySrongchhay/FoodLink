import asyncio
import edge_tts
import subprocess

test_line = "Every day, local bakeries and restaurants discard fresh, delicious food. Meet FoodLink—the smart marketplace turning surplus food into affordable meals."

async def test_voices():
    # Test top human-sounding voices
    voices = [
        ("en-US-BrianMultilingualNeural", "brian"),
        ("en-US-AndrewMultilingualNeural", "andrew"),
        ("en-US-AvaMultilingualNeural", "ava"),
        ("en-US-EmmaMultilingualNeural", "emma"),
    ]
    for v_name, short in voices:
        mp3 = f"assets/audio/test_{short}.mp3"
        comm = edge_tts.Communicate(test_line, v_name, rate="-2%", pitch="-1Hz")
        await comm.save(mp3)
        print(f"Generated {short} with {v_name}")

if __name__ == '__main__':
    asyncio.run(test_voices())

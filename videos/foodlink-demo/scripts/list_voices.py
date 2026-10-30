import asyncio
import edge_tts

async def list_v():
    voices = await edge_tts.list_voices()
    en_voices = [v for v in voices if v['Locale'] in ['en-US', 'en-GB', 'en-AU']]
    for v in en_voices:
        print(f"{v['ShortName']} ({v['Gender']}) -> {v['FriendlyName']}")

if __name__ == '__main__':
    asyncio.run(list_v())

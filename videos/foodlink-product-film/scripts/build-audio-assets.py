import os
import sys
import math
import wave
import struct
import subprocess

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.dirname(SCRIPT_DIR)
AUDIO_DIR = os.path.join(PROJECT_DIR, "assets", "audio")
VOICEOVER_DIR = os.path.join(AUDIO_DIR, "voiceover")

os.makedirs(VOICEOVER_DIR, exist_ok=True)

SAMPLE_RATE = 48000

def generate_mouse_click():
    """Synthesizes a realistic tactile mechanical microswitch mouse click."""
    duration = 0.035 # 35 milliseconds
    num_samples = int(SAMPLE_RATE * duration)
    wav_path = os.path.join(AUDIO_DIR, "mouse-click.wav")
    mp3_path = os.path.join(AUDIO_DIR, "mouse-click.mp3")

    with wave.open(wav_path, "w") as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(SAMPLE_RATE)
        
        frames = bytearray()
        for i in range(num_samples):
            t = i / SAMPLE_RATE
            
            # Sharp transient click (microswitch metallic contact) at ~3.4 kHz
            env_sharp = math.exp(-t * 380.0)
            tone_sharp = math.sin(2.0 * math.pi * 3400.0 * t)
            
            # Housing plastic snap body resonance at ~1.2 kHz
            env_body = math.exp(-t * 180.0)
            tone_body = math.sin(2.0 * math.pi * 1250.0 * t)
            
            # Secondary subtle release rebound at 12ms
            t_rel = max(0.0, t - 0.012)
            env_rel = math.exp(-t_rel * 450.0) if t >= 0.012 else 0.0
            tone_rel = math.sin(2.0 * math.pi * 2800.0 * t_rel)
            
            # Combine
            sample = (
                0.65 * env_sharp * tone_sharp +
                0.35 * env_body * tone_body +
                0.25 * env_rel * tone_rel
            )
            
            val = int(max(-32767, min(32767, sample * 26000)))
            frames.extend(struct.pack("<h", val))
            
        wf.writeframes(frames)
    
    # Convert to high-quality mp3
    subprocess.run([
        "ffmpeg", "-y", "-i", wav_path,
        "-codec:a", "libmp3lame", "-qscale:a", "2",
        mp3_path
    ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    print("Generated mouse-click.wav and mouse-click.mp3")

def generate_ambient_tech_bed():
    """Synthesizes a 40s subtle, modern, uplifting minimal tech background bed."""
    duration = 40.0
    num_samples = int(SAMPLE_RATE * duration)
    wav_path = os.path.join(AUDIO_DIR, "bgm-ambient-tech.wav")
    mp3_path = os.path.join(AUDIO_DIR, "bgm-ambient-tech.mp3")

    # 116 BPM: 1 beat = 60 / 116 = 0.5172 sec
    beat_sec = 60.0 / 116.0
    chord_chords = [
        # C major, Am, F, G (root, third, fifth)
        (130.81, 164.81, 196.00), # C3
        (110.00, 130.81, 164.81), # A2
        (174.61, 220.00, 261.63), # F3
        (196.00, 246.94, 293.66), # G3
    ]

    with wave.open(wav_path, "w") as wf:
        wf.setnchannels(2) # Stereo
        wf.setsampwidth(2)
        wf.setframerate(SAMPLE_RATE)
        
        frames = bytearray()
        for i in range(num_samples):
            t = i / SAMPLE_RATE
            
            # 4-measure chord progression (each chord 4 beats = ~2.07s)
            chord_idx = int(t / (beat_sec * 4)) % len(chord_chords)
            f1, f2, f3 = chord_chords[chord_idx]
            
            # Warm sub-bass foundation
            bass = 0.18 * math.sin(2.0 * math.pi * (f1 / 2.0) * t)
            
            # Soft analog chord pad
            pad = 0.08 * (
                math.sin(2.0 * math.pi * f1 * t) +
                math.sin(2.0 * math.pi * f2 * t) +
                math.sin(2.0 * math.pi * f3 * t)
            )
            
            # Subtle 8th-note rhythmic pulse
            pulse_t = t % (beat_sec / 2.0)
            pulse_env = math.exp(-pulse_t * 14.0)
            pulse_freq = f2 * 2.0
            pulse_tone = 0.06 * pulse_env * math.sin(2.0 * math.pi * pulse_freq * pulse_t)
            
            # Master volume envelope: fade in over 2s, swell slightly on outro (34s-40s)
            fade_in = min(1.0, t / 2.0)
            outro_swell = 1.0 + 0.5 * max(0.0, min(1.0, (t - 33.0) / 4.0))
            
            left = (bass + pad + pulse_tone * 0.9) * fade_in * outro_swell
            right = (bass + pad + pulse_tone * 1.1) * fade_in * outro_swell
            
            # Scale to 16-bit PCM (-22 dB relative level)
            val_l = int(max(-32767, min(32767, left * 8500)))
            val_r = int(max(-32767, min(32767, right * 8500)))
            frames.extend(struct.pack("<hh", val_l, val_r))
            
        wf.writeframes(frames)
    
    # Compress with FFmpeg
    subprocess.run([
        "ffmpeg", "-y", "-i", wav_path,
        "-codec:a", "libmp3lame", "-b:a", "192k",
        mp3_path
    ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    print("Generated bgm-ambient-tech.wav and bgm-ambient-tech.mp3")

VOICEOVER_SCRIPTS = [
    (
        "vo-1",
        "It is eight PM in Phnom Penh. Fresh bakery surplus is about to go to waste. But it does not have to."
    ),
    (
        "vo-2",
        "Meet Sokha. She opens FoodLink, spots CAD Bakery in BKK1 with sixty percent off, and reserves an artisan box."
    ),
    (
        "vo-3",
        "One tap with Bakong KHQR confirms payment instantly, generating her secure six-digit digital counter pass."
    ),
    (
        "vo-4",
        "At the counter, CAD Bakery receives the order live, types the PIN, and hands over fresh bread with zero friction."
    ),
    (
        "vo-5",
        "Surplus saved, revenue recovered, and cleaner air. Scan to experience FoodLink live today."
    ),
]

def generate_voiceover_segments():
    """Generates studio-mastered voiceover audio for each scene."""
    durations = {}
    for vid, text in VOICEOVER_SCRIPTS:
        raw_wav = os.path.join(VOICEOVER_DIR, f"{vid}_raw.wav")
        final_wav = os.path.join(VOICEOVER_DIR, f"{vid}.wav")
        final_mp3 = os.path.join(VOICEOVER_DIR, f"{vid}.mp3")

        # Synthesize via Windows System.Speech PowerShell helper with Rate = 1
        ps_cmd = (
            f"Add-Type -AssemblyName System.Speech; "
            f"$synth = New-Object System.Speech.Synthesis.SpeechSynthesizer; "
            f"$synth.SelectVoice('Microsoft Zira Desktop'); "
            f"$synth.Rate = 1; "
            f"$synth.SetOutputToWaveFile('{raw_wav.replace(os.sep, '/')}'); "
            f"$synth.Speak('{text}'); "
            f"$synth.Dispose()"
        )
        subprocess.run(["powershell", "-ExecutionPolicy", "Bypass", "-Command", ps_cmd], check=True)

        # Broadcast studio mastering chain: Highpass 80Hz & EBU R128 Loudness Normalization to -14 LUFS
        filter_chain = "highpass=f=80,loudnorm=I=-14:LRA=7:tp=-1"

        subprocess.run([
            "ffmpeg", "-y", "-i", raw_wav,
            "-af", filter_chain,
            "-ar", "48000",
            final_wav
        ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

        subprocess.run([
            "ffmpeg", "-y", "-i", final_wav,
            "-codec:a", "libmp3lame", "-b:a", "192k",
            final_mp3
        ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

        if os.path.exists(raw_wav):
            os.remove(raw_wav)

        # Probe exact duration
        res = subprocess.run([
            "ffprobe", "-v", "error", "-show_entries",
            "format=duration", "-of", "default=noprint_wrappers=1:nokey=1",
            final_mp3
        ], capture_output=True, text=True, check=True)
        dur = float(res.stdout.strip())
        durations[vid] = dur
        print(f"Generated {vid}.mp3 ({dur:.2f}s): \"{text[:45]}...\"")
    
    print("\n--- Audio Durations Map ---")
    for vid, dur in durations.items():
        print(f"'{vid}': duration = {dur:.2f}s")

if __name__ == "__main__":
    print("--- Building FoodLink Audio Assets ---")
    generate_mouse_click()
    generate_ambient_tech_bed()
    generate_voiceover_segments()
    print("All audio assets successfully synthesized and mastered!")

import os
import math
import struct
import subprocess
import numpy as np

AUDIO_DIR = os.path.abspath("videos/foodlink-product-film/assets/audio")
os.makedirs(AUDIO_DIR, exist_ok=True)
SAMPLE_RATE = 48000

def create_energetic_soundtrack(duration=55.0):
    print("Synthesizing energetic 124 BPM commercial tech soundtrack...")
    total_samples = int(SAMPLE_RATE * duration)
    bpm = 124.0
    beat_samples = int(SAMPLE_RATE * (60.0 / bpm)) # ~23,225 samples
    bar_samples = beat_samples * 4 # ~92,903 samples
    
    # Timeline buffers for stereo mix
    mix_left = np.zeros(total_samples, dtype=np.float32)
    mix_right = np.zeros(total_samples, dtype=np.float32)

    # 1. SYNTHESIZE DRUM SOUNDS
    # Kick drum: punchy transient + pitch drop 160Hz -> 48Hz
    kick_len = int(SAMPLE_RATE * 0.28)
    t_k = np.linspace(0, 0.28, kick_len, endpoint=False)
    freq_k = 48.0 + (160.0 - 48.0) * np.exp(-t_k * 22.0)
    phase_k = 2.0 * np.pi * np.cumsum(freq_k) / SAMPLE_RATE
    env_k = np.exp(-t_k * 14.0)
    click_k = np.sin(2.0 * np.pi * 1200.0 * t_k) * np.exp(-t_k * 90.0) * 0.35
    kick_sample = (np.sin(phase_k) * env_k + click_k).astype(np.float32) * 0.95

    # Snare / Clap: snappy crack + filtered noise burst
    clap_len = int(SAMPLE_RATE * 0.22)
    t_c = np.linspace(0, 0.22, clap_len, endpoint=False)
    noise = np.random.uniform(-1.0, 1.0, clap_len)
    clap_env = np.exp(-t_c * 24.0)
    # Pre-burst claps (simulating hands clapping)
    pre_burst = np.zeros(clap_len)
    for offset_ms in [0, 12, 24]:
        idx = int(SAMPLE_RATE * (offset_ms / 1000.0))
        if idx < clap_len:
            pre_len = min(int(SAMPLE_RATE * 0.04), clap_len - idx)
            pre_burst[idx:idx+pre_len] += np.random.uniform(-0.5, 0.5, pre_len) * np.exp(-np.linspace(0, 1, pre_len) * 10)
    tone_c = np.sin(2.0 * np.pi * 210.0 * t_c) * np.exp(-t_c * 30.0) * 0.4
    clap_sample = ((noise * clap_env * 0.65 + pre_burst * 0.5 + tone_c) * 0.75).astype(np.float32)

    # Closed Hat: short bright metallic click
    hat_len = int(SAMPLE_RATE * 0.05)
    t_h = np.linspace(0, 0.05, hat_len, endpoint=False)
    hat_sample = (np.random.uniform(-1.0, 1.0, hat_len) * np.exp(-t_h * 75.0) * 0.4).astype(np.float32)

    # Open Hat: sizzle on upbeats
    open_hat_len = int(SAMPLE_RATE * 0.20)
    t_oh = np.linspace(0, 0.20, open_hat_len, endpoint=False)
    open_hat_sample = (np.random.uniform(-1.0, 1.0, open_hat_len) * np.exp(-t_oh * 18.0) * 0.35).astype(np.float32)

    # 2. CHORD PROGRESSION & BASSLINE (Energetic Modern Minor / Uplifting Tech: C - Eb - F - G)
    # Roots in Hz
    c_root = 65.41   # C2
    eb_root = 77.78  # Eb2
    f_root = 87.31   # F2
    g_root = 98.00   # G2
    roots = [c_root, eb_root, f_root, g_root]

    # Chord frequencies (C minor, Eb major, F minor/sus, G minor/dom)
    chords = [
        [130.81, 155.56, 196.00, 261.63], # Cm (C3, Eb3, G3, C4)
        [155.56, 196.00, 233.08, 311.13], # Eb (Eb3, G3, Bb3, Eb4)
        [174.61, 207.65, 261.63, 349.23], # Fm (F3, Ab3, C4, F4)
        [196.00, 246.94, 293.66, 392.00], # G  (G3, B3, D4, G4)
    ]

    total_beats = int(duration / (60.0 / bpm))

    # Place Drums and Bass across the timeline
    for beat in range(total_beats):
        beat_start = beat * beat_samples
        if beat_start >= total_samples:
            break
        
        t_sec = beat_start / SAMPLE_RATE
        bar = beat // 4
        bar_pos = beat % 4
        chord_idx = bar % len(chords)
        current_root = roots[chord_idx]
        current_chord = chords[chord_idx]

        # Section-dependent energy mapping:
        # Scene 1 (0 - 9.5s): Intro pulse
        is_intro = (t_sec < 9.5)
        # Scene 2, 3, 4, 5: Full energetic dance drive
        is_drop = (t_sec >= 9.5)

        # Kick drum placement
        if is_drop:
            # 4-on-the-floor
            # Micro-break at 24.8s (KHQR scan confirmation chime)
            is_break = (24.2 < t_sec < 25.0)
            if not is_break:
                end_idx = min(total_samples, beat_start + kick_len)
                actual_k_len = end_idx - beat_start
                mix_left[beat_start:end_idx] += kick_sample[:actual_k_len] * 0.70
                mix_right[beat_start:end_idx] += kick_sample[:actual_k_len] * 0.70
        elif is_intro and (bar >= 2):
            # Intro filtered kick on beats 1 and 3
            if bar_pos in [0, 2]:
                end_idx = min(total_samples, beat_start + kick_len)
                actual_k_len = end_idx - beat_start
                mix_left[beat_start:end_idx] += kick_sample[:actual_k_len] * 0.35
                mix_right[beat_start:end_idx] += kick_sample[:actual_k_len] * 0.35

        # Clap placement (beats 2 and 4 during drop)
        if is_drop and (bar_pos in [1, 3]):
            end_idx = min(total_samples, beat_start + clap_len)
            actual_c_len = end_idx - beat_start
            mix_left[beat_start:end_idx] += clap_sample[:actual_c_len] * 0.45
            mix_right[beat_start:end_idx] += clap_sample[:actual_c_len] * 0.50

        # Hi-Hats: 16th notes
        sixteenth_samples = beat_samples // 4
        for sixteenth in range(4):
            s_start = beat_start + sixteenth * sixteenth_samples
            if s_start >= total_samples:
                break
            
            # Closed hat on every 16th with accent on upbeat (sixteenth 2)
            if is_drop:
                h_vol = 0.28 if sixteenth == 2 else 0.16
                end_idx = min(total_samples, s_start + hat_len)
                actual_h_len = end_idx - s_start
                # Stereo pan hats slightly right
                mix_left[s_start:end_idx] += hat_sample[:actual_h_len] * (h_vol * 0.8)
                mix_right[s_start:end_idx] += hat_sample[:actual_h_len] * (h_vol * 1.2)

                # Open hat on upbeat (sixteenth == 2)
                if sixteenth == 2:
                    oh_end = min(total_samples, s_start + open_hat_len)
                    actual_oh_len = oh_end - s_start
                    mix_left[s_start:oh_end] += open_hat_sample[:actual_oh_len] * 0.22
                    mix_right[s_start:oh_end] += open_hat_sample[:actual_oh_len] * 0.26
            elif is_intro and (bar >= 1):
                # Light 8th-note shaker in intro
                if sixteenth in [0, 2]:
                    end_idx = min(total_samples, s_start + hat_len)
                    actual_h_len = end_idx - s_start
                    mix_left[s_start:end_idx] += hat_sample[:actual_h_len] * 0.12
                    mix_right[s_start:end_idx] += hat_sample[:actual_h_len] * 0.15

        # BASSLINE (Bouncy 16th-note syncopated electro bass)
        bass_note_len = int(SAMPLE_RATE * 0.16)
        t_b = np.linspace(0, 0.16, bass_note_len, endpoint=False)
        # Synth bass tone: saw + square with snappy filter decay
        bass_env = np.exp(-t_b * 16.0)
        
        # 16th-note bass pattern: hits on 0, 1, 3 (syncopated groove)
        bass_hits = [0, 1, 3] if is_drop else [0, 2]
        for hit_idx in bass_hits:
            b_start = beat_start + hit_idx * sixteenth_samples
            if b_start >= total_samples:
                break
            
            # Root note, occasional octave jump on hit 3
            pitch = current_root * (2.0 if (hit_idx == 3 and is_drop) else 1.0)
            # Saw wave + sub sine wave
            tone_saw = 0.5 * (2.0 * ((t_b * pitch) % 1.0) - 1.0)
            tone_sub = 0.7 * np.sin(2.0 * np.pi * pitch * t_b)
            tone_bass = (tone_saw + tone_sub) * bass_env * (0.35 if is_drop else 0.20)
            
            b_end = min(total_samples, b_start + bass_note_len)
            actual_b_len = b_end - b_start
            mix_left[b_start:b_end] += tone_bass[:actual_b_len]
            mix_right[b_start:b_end] += tone_bass[:actual_b_len]

    # 3. SYNTH ARPEGGIO & UPLIFTING PLUCK MELODIES (Crisp 16th-note rolling drive)
    arp_note_len = int(SAMPLE_RATE * 0.18)
    t_arp = np.linspace(0, 0.18, arp_note_len, endpoint=False)
    arp_env = np.exp(-t_arp * 22.0)
    
    total_sixteenths = total_beats * 4
    for s_idx in range(total_sixteenths):
        s_start = s_idx * (beat_samples // 4)
        if s_start >= total_samples:
            break
        t_sec = s_start / SAMPLE_RATE
        if t_sec < 4.0:
            continue # Intro silence for clean hook narration
        
        bar = (s_idx // 16)
        chord_idx = bar % len(chords)
        chord_notes = chords[chord_idx]
        
        # Arpeggio pattern: cycle through chord notes in 16th notes
        note_freq = chord_notes[s_idx % len(chord_notes)] * 2.0 # In octave 4/5
        
        # FM pluck synthesis
        mod_freq = note_freq * 2.0
        mod = 2.0 * np.sin(2.0 * np.pi * mod_freq * t_arp) * np.exp(-t_arp * 35.0)
        carrier = np.sin(2.0 * np.pi * note_freq * t_arp + mod) * arp_env
        
        # Section volume envelope
        arp_vol = 0.18 if t_sec >= 9.5 else 0.08
        if t_sec > 43.0: # Scene 5 Outro swell
            arp_vol = 0.24
            
        a_end = min(total_samples, s_start + arp_note_len)
        actual_a_len = a_end - s_start
        # Ping-pong stereo pan
        pan = 0.5 + 0.4 * np.sin(s_idx * 0.8)
        mix_left[s_start:a_end] += carrier[:actual_a_len] * (arp_vol * (1.0 - pan))
        mix_right[s_start:a_end] += carrier[:actual_a_len] * (arp_vol * pan)

    # 4. UPLIFTING CHORD STABS (Sidechained to kick for infectious dance bounce)
    for beat in range(total_beats):
        t_sec = beat * (60.0 / bpm)
        if t_sec < 9.5:
            continue
        # Off-beat stabs (8th note upbeat)
        stab_start = int(SAMPLE_RATE * (t_sec + (30.0 / bpm)))
        if stab_start >= total_samples:
            break
        
        stab_len = int(SAMPLE_RATE * 0.25)
        t_s = np.linspace(0, 0.25, stab_len, endpoint=False)
        stab_env = np.exp(-t_s * 12.0)
        
        bar = beat // 4
        chord_notes = chords[bar % len(chords)]
        
        # Super-saw chord stab
        stab_tone = np.zeros(stab_len, dtype=np.float32)
        for f in chord_notes:
            stab_tone += np.sin(2.0 * np.pi * f * t_s) + 0.5 * np.sin(2.0 * np.pi * (f * 1.008) * t_s)
        stab_tone = (stab_tone / len(chord_notes)) * stab_env * 0.16
        
        s_end = min(total_samples, stab_start + stab_len)
        actual_s_len = s_end - stab_start
        mix_left[stab_start:s_end] += stab_tone[:actual_s_len]
        mix_right[stab_start:s_end] += stab_tone[:actual_s_len]

    # 5. DYNAMIC RISERS & TRANSITION WHOOSHES (Crescendo into drops)
    # Riser into Scene 2 (7.5s to 9.5s)
    r1_start = int(SAMPLE_RATE * 7.5)
    r1_len = int(SAMPLE_RATE * 2.0)
    t_r1 = np.linspace(0, 2.0, r1_len, endpoint=False)
    # Sweeping pitch from 150 Hz to 1200 Hz + rising white noise
    sweep1 = np.sin(2.0 * np.pi * (150.0 + 525.0 * (t_r1 ** 2)) * t_r1)
    noise1 = np.random.uniform(-0.5, 0.5, r1_len)
    riser1 = (sweep1 * 0.4 + noise1 * 0.6) * (t_r1 / 2.0) ** 2 * 0.28
    mix_left[r1_start:r1_start+r1_len] += riser1
    mix_right[r1_start:r1_start+r1_len] += riser1

    # Riser into Scene 5 Outro (41.0s to 43.0s)
    r2_start = int(SAMPLE_RATE * 41.0)
    r2_len = int(SAMPLE_RATE * 2.0)
    t_r2 = np.linspace(0, 2.0, r2_len, endpoint=False)
    sweep2 = np.sin(2.0 * np.pi * (200.0 + 600.0 * (t_r2 ** 2)) * t_r2)
    noise2 = np.random.uniform(-0.5, 0.5, r2_len)
    riser2 = (sweep2 * 0.4 + noise2 * 0.6) * (t_r2 / 2.0) ** 2 * 0.35
    mix_left[r2_start:r2_start+r2_len] += riser2
    mix_right[r2_start:r2_start+r2_len] += riser2

    # Master Fade In / Out
    fade_in_len = int(SAMPLE_RATE * 1.5)
    fade_in = np.linspace(0, 1, fade_in_len)
    mix_left[:fade_in_len] *= fade_in
    mix_right[:fade_in_len] *= fade_in

    fade_out_len = int(SAMPLE_RATE * 2.0)
    fade_out = np.linspace(1, 0, fade_out_len)
    mix_left[-fade_out_len:] *= fade_out
    mix_right[-fade_out_len:] *= fade_out

    # Normalize to -1 dB peak before EBU R128 mastering
    peak = max(np.max(np.abs(mix_left)), np.max(np.abs(mix_right)))
    if peak > 0:
        mix_left = (mix_left / peak) * 0.88
        mix_right = (mix_right / peak) * 0.88

    # Write uncompressed 32-bit float WAV
    temp_wav = os.path.join(AUDIO_DIR, "bgm-temp-energetic.wav")
    final_wav = os.path.join(AUDIO_DIR, "bgm-ambient-tech.wav")
    final_mp3 = os.path.join(AUDIO_DIR, "bgm-ambient-tech.mp3")

    # Pack 16-bit PCM for temp
    int16_l = (mix_left * 32767).clip(-32767, 32767).astype(np.int16)
    int16_r = (mix_right * 32767).clip(-32767, 32767).astype(np.int16)
    stereo_interleaved = np.empty((total_samples * 2,), dtype=np.int16)
    stereo_interleaved[0::2] = int16_l
    stereo_interleaved[1::2] = int16_r

    import wave
    with wave.open(temp_wav, "wb") as wf:
        wf.setnchannels(2)
        wf.setsampwidth(2)
        wf.setframerate(SAMPLE_RATE)
        wf.writeframes(stereo_interleaved.tobytes())

    # Master with FFmpeg EBU R128 Loudness Normalization (-14 LUFS, -1 dBTP)
    print("Mastering energetic BGM via FFmpeg EBU R128 (-14 LUFS)...")
    subprocess.run([
        "ffmpeg", "-y", "-i", temp_wav,
        "-af", "loudnorm=I=-14:LRA=7:tp=-1",
        "-ar", "48000",
        final_wav
    ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    # Convert to MP3 320 kbps
    subprocess.run([
        "ffmpeg", "-y", "-i", final_wav,
        "-codec:a", "libmp3lame", "-b:a", "320k",
        final_mp3
    ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    if os.path.exists(temp_wav):
        os.remove(temp_wav)

    print("Energetic soundtrack successfully synthesized & mastered at 48kHz stereo!")

def create_cinematic_whooshes():
    """Generates crisp aerodynamic transition whooshes."""
    whoosh_path = os.path.join(AUDIO_DIR, "whoosh.wav")
    whoosh_mp3 = os.path.join(AUDIO_DIR, "whoosh.mp3")
    
    dur = 0.55
    n_samples = int(SAMPLE_RATE * dur)
    t = np.linspace(0, dur, n_samples, endpoint=False)
    
    # Aerodynamic frequency sweep + bandpass noise
    noise = np.random.uniform(-1, 1, n_samples)
    # Bell-shaped envelope peaking at t=0.25
    env = np.exp(-((t - 0.22) ** 2) / 0.012)
    # Frequency modulation
    freq = 300.0 + 800.0 * np.exp(-((t - 0.22) ** 2) / 0.02)
    sweep = np.sin(2.0 * np.pi * np.cumsum(freq) / SAMPLE_RATE)
    
    whoosh = (noise * 0.7 + sweep * 0.3) * env * 0.8
    int16_w = (whoosh * 32767).clip(-32767, 32767).astype(np.int16)
    
    import wave
    with wave.open(whoosh_path, "wb") as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(SAMPLE_RATE)
        wf.writeframes(int16_w.tobytes())
        
    subprocess.run([
        "ffmpeg", "-y", "-i", whoosh_path,
        "-codec:a", "libmp3lame", "-qscale:a", "2",
        whoosh_mp3
    ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    print("Generated cinematic whoosh transition sound effect.")

if __name__ == "__main__":
    create_energetic_soundtrack()
    create_cinematic_whooshes()


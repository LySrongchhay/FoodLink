# Data Model & Schema: Commercial Motion Film with Human Story Narration

**Feature**: `014-video-voiceover-narration`  
**Status**: Completed  
**Date**: 2026-10-31  

---

## 1. Entities

### Entity: VoiceoverSegment
Represents a timed speech audio block aligned with a specific narrative phase of the product film.

| Attribute | Type | Description | Example |
| :--- | :--- | :--- | :--- |
| `id` | `string` | Unique identifier of the segment | `"vo-scene-1-hook"` |
| `sceneId` | `string` | Associated sub-composition ID | `"scene-1-hook"` |
| `startTime` | `number` | Master timeline offset in seconds | `0.8` |
| `duration` | `number` | Audio asset duration in seconds | `5.2` |
| `script` | `string` | Verbatim text spoken by narrator | `"It's eight PM in Phnom Penh..."` |
| `audioFile` | `string` | Relative path to master MP3 file | `"assets/audio/voiceover/vo-1.mp3"` |
| `targetLoudness` | `number` | Target integrated loudness (LUFS) | `-14.0` |
| `trackIndex` | `number` | HyperFrames audio track layering index | `4` |
| `volume` | `number` | Playback gain factor | `1.0` |

---

### Entity: SoundEffectCue
Represents a discrete tactile physical UI sound trigger in the composition.

| Attribute | Type | Description | Example |
| :--- | :--- | :--- | :--- |
| `id` | `string` | Unique identifier of the SFX | `"snd-click"` |
| `cueType` | `enum` | Type of audio cue (`click`, `chime`, `ping`, `ding`) | `"click"` |
| `triggerTime` | `number` | Master timeline trigger timestamp | `11.2` |
| `duration` | `number` | Playback slot duration in seconds | `0.05` |
| `audioFile` | `string` | Path to audio file | `"assets/audio/mouse-click.mp3"` |
| `trackIndex` | `number` | HyperFrames audio track layering index | `6` |
| `volume` | `number` | Playback gain factor | `0.85` |

---

### Entity: MusicTrack
Represents the underlying background music bed.

| Attribute | Type | Description | Example |
| :--- | :--- | :--- | :--- |
| `id` | `string` | Unique identifier | `"bgm-ambient-tech"` |
| `startTime` | `number` | Master timeline start in seconds | `0.0` |
| `duration` | `number` | Total duration | `40.0` |
| `audioFile` | `string` | Path to ambient music bed | `"assets/audio/bgm-ambient-tech.mp3"` |
| `baseVolume` | `number` | Base volume during active speech | `0.18` |
| `swellVolume` | `number` | Volume during outro swell | `0.45` |
| `trackIndex` | `number` | Audio track layering index | `2` |

---

## 2. Audio Pipeline Track Architecture

```text
Track 0-1: [Visual Video Layers: Studio Canvas, Scene Mounts 1-5, Overlays]
Track 2:   [Music Bed: bgm-ambient-tech.mp3 (Volume 0.18 -> 0.45)]
Track 4:   [Narrator Voiceover: vo-1 -> vo-2 -> vo-3 -> vo-4 -> vo-5 (-14 LUFS)]
Track 6:   [Tactile UI Effects: mouse-click (11.2s), khqr-chime (20.8s), order-ping (25.4s), verify-ding (30.8s)]
```


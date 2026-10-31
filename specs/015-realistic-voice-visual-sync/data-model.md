# Data Model & Schema: Ultra-Realistic Voiceover & Visual Synchronization

**Feature**: `015-realistic-voice-visual-sync`  
**Status**: Completed  
**Date**: 2026-10-31  

---

## 1. Entities

### Entity: SyncedVoiceoverSegment
Represents a speech segment voiced by `en-US-JennyNeural`.

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `string` | Unique identifier (e.g. `vo-scene-1`) |
| `sceneId` | `string` | Associated sub-composition ID |
| `start` | `number` | Master timeline trigger timestamp |
| `duration` | `number` | Segment duration in seconds |
| `script` | `string` | Spoken narrative line |
| `audioFile` | `string` | Relative path to 48kHz mastered MP3 |
| `voiceModel` | `string` | `"en-US-JennyNeural"` |
| `pacingRate` | `string` | `"-2%"` |

---

### Entity: VisualSyncEvent
Represents an on-screen animation trigger aligned with speech.

| Field | Type | Description |
| :--- | :--- | :--- |
| `eventId` | `string` | Unique identifier (e.g. `evt-sokha-reserve`) |
| `sceneId` | `string` | Target scene composition |
| `triggerTime` | `number` | Timestamp in master seconds |
| `spokenKeyword` | `string` | Spoken word that triggers the action |
| `actionType` | `enum` | `reveal`, `click`, `sweep`, `type-pin`, `verify` |
| `associatedSfx` | `string` | Audio asset ID triggered (optional) |

---

## 2. Master 55-Second Audio Track Layout

```text
Track 0-1: [Visual Video Compositor: 5 Scenes (1920x1080 @ 30 fps, 1,650 frames)]
Track 2:   [BGM: bgm-ambient-tech.mp3 (0.0s – 55.0s, Ducking at 0.18, Swell to 0.42)]
Track 4:   [JennyNeural Studio Voiceover: vo-1 -> vo-2 -> vo-3 -> vo-4 -> vo-5]
Track 6:   [Tactile UI SFX: mouse-click (16.5s), khqr-chime (23.8s), order-ping (33.0s), verify-ding (40.0s)]
```


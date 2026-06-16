# Metronome (Expo / React Native)

A native iOS + Android port of the metronome from
[jva-music.com/metronome](https://jva-music.com/metronome/). The audio engine
(scheduler + click synthesis) is ported nearly verbatim from the web version
onto [`react-native-audio-api`](https://docs.swmansion.com/react-native-audio-api/),
Software Mansion's Web Audio API implementation for React Native — so the click
timing is sample-accurate and the timbres are identical to the website.

## Features

- BPM 1–500 with slider, ±1 / ±5 nudges, and tap tempo; live tempo-mark name
- Time signatures incl. compound/odd meters and x/2, x/8, x/16 pulse scaling,
  with musically-sensible default accent patterns (claves, dotted-quarter feel)
- Subdivisions: duplet → sextuplet, plus a custom count (2–32) with a
  programmable on/off inner-pulse pattern
- Swing (duplet) with presets
- Per-beat accent grid: accent / normal / soft / mute
- Two synthesized voices: electronic and clave
- **Gap trainer** (alternate playing/silent bars or beats)
- **Random-mute trainer** (drop a % of beats and/or subdivisions)
- **Song / form builder**: sequence bars with changing meters, grouped view,
  bulk add, per-bar editing, undo/redo, play-from-here and loop-a-range
- State persists across launches (AsyncStorage)

## Why a development build (not Expo Go)

`react-native-audio-api` ships native code, so it is **not available in the
stock Expo Go app**. A real metronome needs sample-accurate scheduling that
Expo Go's bundled audio can't provide, so this project targets an **Expo
development build** — the same Expo workflow (Metro, fast refresh, the dev menu)
with a one-time custom client installed on your device.

## Running it

```sh
cd metronome-app
npm install

# iOS (needs macOS + Xcode)
npx expo run:ios            # builds the dev client and launches it
# Android (needs Android Studio / SDK)
npx expo run:android

# After the dev client is installed once, day-to-day you only need:
npm start                   # Metro with the dev client; reload on save
```

To build in the cloud instead of locally, use EAS:

```sh
npm install -g eas-cli
eas build --profile development --platform ios     # or android
```

The audio session is configured for the `playback` category with the `audio`
background mode, so the click keeps going through screen-lock and ignores the
iOS silent switch — no WAV-handoff workarounds needed (the website needs those
only because browsers suspend Web Audio in the background).

## Project layout

```
src/
  engine/
    MetronomeEngine.ts   # state + realtime scheduler (ported from the web)
    synth.ts             # electronic + clave click synthesis (verbatim)
    types.ts
  logic/                 # pure helpers: tempo names, time-sig defaults, subdivisions
  state/                 # AsyncStorage persistence + React binding hooks
  ui/                    # theme, components, Pulse + Forms screens
App.tsx                  # tab shell, boot/persistence wiring
```

## Not yet ported

These web features are deliberately left for a follow-up pass:

- Shareable form **codes** and share links, and the saved-forms **library**
- Multi-select duplicate/delete across arbitrary bar ranges (loop/play-from a
  single group is supported)
- Editable-number keypad entry on every readout (steppers + sliders cover the
  same ranges today)

import { useEffect, useState, useSyncExternalStore } from 'react';

import { engine } from '../engine/MetronomeEngine';
import type { VisualTick } from '../engine/types';

/**
 * Subscribe a component to engine settings changes. Returns the engine so the
 * component can both read current state (engine.state / engine.adv) and call
 * mutators. Re-renders whenever any setting changes (version bump), but NOT on
 * every audio tick — those flow through useVisualTick instead.
 */
export function useEngine() {
  useSyncExternalStore(engine.subscribe, engine.getVersion, engine.getVersion);
  return engine;
}

/**
 * Drive a per-step visual from the engine's realtime visual loop without
 * routing audio-rate updates through the settings store. The callback fires on
 * every drained step; keep it cheap (set a small piece of local state).
 */
export function useVisualTick(onTick: (tick: VisualTick) => void): void {
  useEffect(() => engine.subscribeVisual(onTick), [onTick]);
}

/** Convenience: track only the currently active beat index (sub === 0). */
export function useActiveBeat(): { beat: number; formIdx: number } {
  const [active, setActive] = useState({ beat: -1, formIdx: 0 });
  useEffect(
    () =>
      engine.subscribeVisual((t) => {
        if (t.beat === -1) {
          setActive({ beat: -1, formIdx: t.formIdx });
        } else if (t.sub === 0) {
          setActive({ beat: t.beat, formIdx: t.formIdx });
        }
      }),
    [],
  );
  return active;
}

import React, { useCallback, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

import type { VisualTick } from '../../engine/types';
import { useVisualTick } from '../../state/useEngine';
import { colors, flashColor, spacing } from '../theme';

/**
 * The big circular pulse indicator. Flashes (scale + color) on each non-muted
 * step, driven directly by the engine's realtime visual loop, and renders the
 * row of subdivision dots with the active one lit.
 */
export function PulseDisplay({ tempoName }: { tempoName: string }) {
  const scale = useRef(new Animated.Value(1)).current;
  const [color, setColor] = useState(colors.surfaceHi);
  const [subCount, setSubCount] = useState(1);
  const [activeSub, setActiveSub] = useState(-1);

  const onTick = useCallback(
    (t: VisualTick) => {
      if (t.beat === -1) {
        setColor(colors.surfaceHi);
        setActiveSub(-1);
        return;
      }
      if (t.sub === 0 && t.subdivision != null) setSubCount(t.subdivision);
      setActiveSub(t.sub);
      if (t.clickType !== 'mute') {
        setColor(flashColor(t.clickType));
        scale.stopAnimation();
        scale.setValue(t.clickType === 'accent' ? 1.18 : t.sub === 0 ? 1.1 : 1.04);
        Animated.timing(scale, {
          toValue: 1,
          duration: 140,
          useNativeDriver: true,
        }).start();
      }
    },
    [scale],
  );
  useVisualTick(onTick);

  return (
    <View style={styles.wrap}>
      <Animated.View style={[styles.circle, { backgroundColor: color, transform: [{ scale }] }]}>
        <Text style={styles.tempo}>{tempoName}</Text>
      </Animated.View>
      <View style={styles.subDots}>
        {Array.from({ length: Math.min(subCount, 16) }).map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i === 0 && styles.dotBeat,
              i === activeSub && styles.dotActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', marginVertical: spacing.md },
  circle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tempo: { color: '#fff', fontSize: 16, fontWeight: '700', letterSpacing: 0.5 },
  subDots: { flexDirection: 'row', gap: 8, marginTop: spacing.lg, minHeight: 14 },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.rule },
  dotBeat: { backgroundColor: colors.muted },
  dotActive: { backgroundColor: colors.lime, transform: [{ scale: 1.3 }] },
});

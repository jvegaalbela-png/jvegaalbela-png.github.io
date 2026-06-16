import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { BeatState } from '../../engine/types';
import { beatColor, beatIcon, colors, radius, spacing } from '../theme';

/**
 * The per-beat grid. `activeBeat` highlights the currently sounding beat (or -1
 * when stopped). Tapping a cell cycles its state (accent → soft → mute →
 * normal). Cells flow into rows; cell size shrinks for busy meters.
 */
export function BeatGrid({
  beats,
  activeBeat,
  onCycle,
}: {
  beats: BeatState[];
  activeBeat: number;
  onCycle: (i: number) => void;
}) {
  const size = beats.length > 8 ? 44 : beats.length > 6 ? 52 : 60;
  return (
    <View style={styles.grid}>
      {beats.map((state, i) => {
        const active = i === activeBeat;
        return (
          <Pressable
            key={i}
            onPress={() => onCycle(i)}
            style={({ pressed }) => [
              styles.cell,
              { width: size, height: size, borderColor: beatColor(state) },
              active && { backgroundColor: beatColor(state) },
              pressed && { opacity: 0.6 },
            ]}
          >
            <Text style={[styles.num, active && styles.numActive]}>{i + 1}</Text>
            <Text style={[styles.icon, { color: active ? '#fff' : beatColor(state) }]}>
              {beatIcon(state)}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    justifyContent: 'center',
  },
  cell: {
    borderRadius: radius.md,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.navy,
  },
  num: { color: colors.muted, fontSize: 11, fontWeight: '700', position: 'absolute', top: 4 },
  numActive: { color: '#fff' },
  icon: { fontSize: 20, fontWeight: '700', marginTop: 6 },
});

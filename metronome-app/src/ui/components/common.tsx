import React, { useRef, useState } from 'react';
import {
  GestureResponderEvent,
  LayoutChangeEvent,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';

import { colors, radius, spacing } from '../theme';

export function Card({
  title,
  children,
  style,
  inactive,
}: {
  title?: string;
  children: React.ReactNode;
  style?: ViewStyle;
  inactive?: boolean;
}) {
  return (
    <View style={[styles.card, inactive && styles.cardInactive, style]}>
      {title ? <Text style={styles.cardTitle}>{title}</Text> : null}
      {children}
    </View>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return <Text style={styles.sectionLabel}>{children}</Text>;
}

export function PillButton({
  label,
  active,
  onPress,
  flex,
  small,
}: {
  label: string;
  active?: boolean;
  onPress: () => void;
  flex?: boolean;
  small?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.pill,
        small && styles.pillSmall,
        flex && { flex: 1 },
        active && styles.pillActive,
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.pillText, active && styles.pillTextActive]}>{label}</Text>
    </Pressable>
  );
}

/** A row of pill buttons that wrap. */
export function PillRow({ children }: { children: React.ReactNode }) {
  return <View style={styles.pillRow}>{children}</View>;
}

export function Stepper({
  value,
  onChange,
  min = 1,
  max = 99,
  step = 1,
  width = 56,
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  width?: number;
}) {
  const clamp = (v: number) => Math.max(min, Math.min(max, v));
  return (
    <View style={styles.stepper}>
      <Pressable
        onPress={() => onChange(clamp(value - step))}
        style={({ pressed }) => [styles.stepBtn, pressed && styles.pressed]}
      >
        <Text style={styles.stepBtnText}>−</Text>
      </Pressable>
      <View style={[styles.stepValueBox, { minWidth: width }]}>
        <Text style={styles.stepValue}>{value}</Text>
      </View>
      <Pressable
        onPress={() => onChange(clamp(value + step))}
        style={({ pressed }) => [styles.stepBtn, pressed && styles.pressed]}
      >
        <Text style={styles.stepBtnText}>+</Text>
      </Pressable>
    </View>
  );
}

/**
 * Self-contained horizontal slider (PanResponder-driven), so the app needs no
 * extra native slider module. Reports continuous values while dragging.
 */
export function Slider({
  value,
  min,
  max,
  step = 1,
  onChange,
  accent = colors.orange,
}: {
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  accent?: string;
}) {
  const [width, setWidth] = useState(0);
  const widthRef = useRef(0);

  const valueToFrac = (v: number) => (max === min ? 0 : (v - min) / (max - min));

  const handleAt = (x: number) => {
    const w = widthRef.current;
    if (w <= 0) return;
    const frac = Math.max(0, Math.min(1, x / w));
    let v = min + frac * (max - min);
    v = Math.round(v / step) * step;
    v = Math.max(min, Math.min(max, v));
    onChange(v);
  };

  const responder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e: GestureResponderEvent) => handleAt(e.nativeEvent.locationX),
      onPanResponderMove: (e: GestureResponderEvent) => handleAt(e.nativeEvent.locationX),
    }),
  ).current;

  const onLayout = (e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width;
    widthRef.current = w;
    setWidth(w);
  };

  const frac = valueToFrac(value);
  return (
    <View style={styles.sliderTrack} onLayout={onLayout} {...responder.panHandlers}>
      <View style={[styles.sliderFill, { width: width * frac, backgroundColor: accent }]} />
      <View style={[styles.sliderThumb, { left: Math.max(0, width * frac - 11), borderColor: accent }]} />
    </View>
  );
}

export function Row({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  return <View style={[styles.row, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.rule,
  },
  cardInactive: { opacity: 0.45 },
  cardTitle: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: spacing.md,
  },
  sectionLabel: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
  },
  pillRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  pill: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceHi,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.rule,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillSmall: { paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  pillActive: { backgroundColor: colors.orange, borderColor: colors.orange },
  pillText: { color: colors.ink, fontSize: 15, fontWeight: '600' },
  pillTextActive: { color: '#fff' },
  pressed: { opacity: 0.6 },
  stepper: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  stepBtn: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceHi,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepBtnText: { color: colors.ink, fontSize: 24, fontWeight: '600', lineHeight: 26 },
  stepValueBox: { alignItems: 'center', justifyContent: 'center', paddingHorizontal: spacing.sm },
  stepValue: { color: colors.ink, fontSize: 20, fontWeight: '700' },
  sliderTrack: {
    height: 36,
    justifyContent: 'center',
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceHi,
    overflow: 'visible',
  },
  sliderFill: { position: 'absolute', left: 0, height: 36, borderRadius: radius.pill, opacity: 0.5 },
  sliderThumb: {
    position: 'absolute',
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.cream,
    borderWidth: 3,
    top: 7,
  },
  row: { flexDirection: 'row', alignItems: 'center' },
});

import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { engine } from '../../engine/MetronomeEngine';
import { formatBpm, getTempoName } from '../../logic/tempo';
import { SIG_PRESETS, allUnits, COMMON_UNITS } from '../../logic/timesig';
import { SUB_PRESETS, subdivisionName } from '../../logic/subdivision';
import { useActiveBeat, useEngine } from '../../state/useEngine';
import { BeatGrid } from '../components/BeatGrid';
import { PulseDisplay } from '../components/PulseDisplay';
import { Card, PillButton, PillRow, Row, SectionLabel, Slider, Stepper } from '../components/common';
import { colors, radius, spacing } from '../theme';

export function PulseScreen() {
  useEngine(); // re-render on any settings change
  const { beat: activeBeat } = useActiveBeat();
  const s = engine.state;
  const [showAllUnits, setShowAllUnits] = useState(false);

  const isDuplet = s.subdivision === 2 && !s.subCustom;

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <PulseDisplay tempoName={getTempoName(s.bpm)} />

      {/* ── BPM ── */}
      <Card>
        <View style={styles.bpmRow}>
          <Text style={styles.bpmValue}>{formatBpm(s.bpm)}</Text>
          <Text style={styles.bpmUnit}>BPM</Text>
        </View>
        <Slider value={s.bpm} min={20} max={300} step={1} onChange={(v) => engine.setBPM(v)} />
        <Row style={{ justifyContent: 'space-between', marginTop: spacing.md }}>
          <PillButton label="−5" small onPress={() => engine.nudgeBPM(-5)} />
          <PillButton label="−1" small onPress={() => engine.nudgeBPM(-1)} />
          <PillButton label="Tap" small onPress={() => engine.registerTap()} />
          <PillButton label="+1" small onPress={() => engine.nudgeBPM(1)} />
          <PillButton label="+5" small onPress={() => engine.nudgeBPM(5)} />
        </Row>
      </Card>

      {/* ── Play / Stop ── */}
      <Pressable
        onPress={() => engine.toggle()}
        style={({ pressed }) => [
          styles.playBtn,
          s.isPlaying && styles.playBtnActive,
          pressed && { opacity: 0.85 },
        ]}
      >
        <Text style={styles.playBtnText}>{s.isPlaying ? '■  Stop' : '▶  Start'}</Text>
      </Pressable>

      {/* ── Beats ── */}
      <Card title="Beats — tap to change sound">
        <BeatGrid beats={s.beats} activeBeat={activeBeat} onCycle={(i) => engine.cycleBeat(i)} />
      </Card>

      {/* ── Time signature ── */}
      <Card title="Time signature">
        <PillRow>
          {SIG_PRESETS.map((p) => (
            <PillButton
              key={p.label}
              label={p.label}
              small
              active={s.beatsPerMeasure === p.beats && s.beatUnit === p.unit}
              onPress={() => engine.setTimeSig(p.beats, p.unit, true)}
            />
          ))}
        </PillRow>
        <Row style={{ marginTop: spacing.lg, justifyContent: 'space-between' }}>
          <View>
            <SectionLabel>Beats</SectionLabel>
            <Stepper
              value={s.beatsPerMeasure}
              min={1}
              max={32}
              onChange={(v) => engine.setTimeSig(v, s.beatUnit)}
            />
          </View>
          <View style={{ flex: 1, marginLeft: spacing.lg }}>
            <Row style={{ justifyContent: 'space-between' }}>
              <SectionLabel>Note value</SectionLabel>
              <Pressable onPress={() => setShowAllUnits((v) => !v)}>
                <Text style={styles.link}>{showAllUnits ? 'Common' : 'More…'}</Text>
              </Pressable>
            </Row>
            <PillRow>
              {(showAllUnits ? allUnits() : COMMON_UNITS).map((u) => (
                <PillButton
                  key={u}
                  label={String(u)}
                  small
                  active={s.beatUnit === u}
                  onPress={() => engine.setTimeSig(s.beatsPerMeasure, u)}
                />
              ))}
            </PillRow>
          </View>
        </Row>
      </Card>

      {/* ── Subdivision ── */}
      <Card title="Subdivision">
        <PillRow>
          {SUB_PRESETS.map((n) => (
            <PillButton
              key={n}
              label={n === 1 ? 'None' : subdivisionName(n)}
              small
              active={!s.subCustom && s.subdivision === n}
              onPress={() => engine.setSubdivision(n, false)}
            />
          ))}
          <PillButton
            label="Custom"
            small
            active={s.subCustom}
            onPress={() => engine.setSubdivision(s.customCount, true)}
          />
        </PillRow>

        {s.subCustom ? (
          <View style={{ marginTop: spacing.lg }}>
            <Row style={{ justifyContent: 'space-between' }}>
              <SectionLabel>{subdivisionName(s.subdivision)}</SectionLabel>
              <Text style={styles.subCount}>{s.subdivision}</Text>
            </Row>
            <Slider
              value={s.subdivision}
              min={2}
              max={32}
              step={1}
              accent={colors.lime}
              onChange={(v) => engine.setCustomCount(v)}
            />
            <View style={styles.subPattern}>
              {s.subPattern.map((on, i) => (
                <Pressable
                  key={i}
                  disabled={i === 0}
                  onPress={() => engine.toggleSubStep(i)}
                  style={[
                    styles.subCell,
                    i === 0 ? styles.subCellBeat : on ? styles.subCellOn : styles.subCellOff,
                  ]}
                >
                  <Text style={styles.subCellText}>{i === 0 ? '◆' : on ? '●' : '○'}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        ) : null}

        {s.subdivision > 1 ? (
          <Pressable
            style={styles.followRow}
            onPress={() => engine.setSubFollowMute(!s.subFollowMute)}
          >
            <View style={[styles.checkbox, s.subFollowMute && styles.checkboxOn]}>
              {s.subFollowMute ? <Text style={styles.checkmark}>✓</Text> : null}
            </View>
            <Text style={styles.followText}>Silence subdivisions on muted beats</Text>
          </Pressable>
        ) : null}
      </Card>

      {/* ── Swing (duplet only) ── */}
      <Card title="Swing" inactive={!isDuplet}>
        <Row style={{ justifyContent: 'space-between', marginBottom: spacing.sm }}>
          <Text style={styles.body}>Duplet swing feel</Text>
          <Text style={styles.subCount}>{Math.round(s.swingPct * 10) / 10}%</Text>
        </Row>
        <Slider
          value={s.swingPct}
          min={50}
          max={75}
          step={0.5}
          accent={colors.gold}
          onChange={(v) => engine.setSwingPct(v)}
        />
        <PillRow>
          {[50, 54, 58, 62, 66.7].map((v) => (
            <PillButton
              key={v}
              label={v === 50 ? 'Straight' : v === 66.7 ? 'Triplet' : `${v}%`}
              small
              active={Math.abs(s.swingPct - v) < 0.05}
              onPress={() => engine.setSwingPct(v)}
            />
          ))}
        </PillRow>
      </Card>

      {/* ── Sound ── */}
      <Card title="Sound">
        <PillRow>
          <PillButton
            label="Electronic"
            flex
            active={engine.soundMode === 'electronic'}
            onPress={() => engine.setSoundMode('electronic')}
          />
          <PillButton
            label="Clave"
            flex
            active={engine.soundMode === 'clave'}
            onPress={() => engine.setSoundMode('clave')}
          />
        </PillRow>
      </Card>

      <View style={{ height: spacing.xxl }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.lg },
  bpmRow: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', marginBottom: spacing.md },
  bpmValue: { color: colors.cream, fontSize: 64, fontWeight: '800', lineHeight: 66 },
  bpmUnit: { color: colors.muted, fontSize: 18, fontWeight: '700', marginBottom: 12, marginLeft: spacing.sm },
  playBtn: {
    backgroundColor: colors.orange,
    borderRadius: radius.lg,
    paddingVertical: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  playBtnActive: { backgroundColor: colors.crimson },
  playBtnText: { color: '#fff', fontSize: 22, fontWeight: '800' },
  link: { color: colors.blueLt, fontSize: 13, fontWeight: '700' },
  body: { color: colors.ink, fontSize: 15 },
  subCount: { color: colors.cream, fontSize: 18, fontWeight: '700' },
  subPattern: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.md },
  subCell: {
    width: 38,
    height: 38,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.rule,
  },
  subCellBeat: { backgroundColor: colors.cobalt },
  subCellOn: { backgroundColor: colors.surfaceHi },
  subCellOff: { backgroundColor: colors.navy },
  subCellText: { color: colors.cream, fontSize: 16 },
  followRow: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.lg, gap: spacing.sm },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.muted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxOn: { backgroundColor: colors.orange, borderColor: colors.orange },
  checkmark: { color: '#fff', fontSize: 14, fontWeight: '900' },
  followText: { color: colors.ink, fontSize: 14, flex: 1 },
});

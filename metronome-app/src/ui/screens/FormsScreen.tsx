import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { engine } from '../../engine/MetronomeEngine';
import { beatColor, beatIcon, colors, radius, spacing } from '../theme';
import { useActiveBeat, useEngine } from '../../state/useEngine';
import { Card, PillButton, PillRow, Row, SectionLabel, Slider, Stepper } from '../components/common';

export function FormsScreen() {
  useEngine();
  const { formIdx } = useActiveBeat();
  const a = engine.adv;
  const playing = engine.state.isPlaying;
  const [expanded, setExpanded] = useState<Set<number>>(new Set());
  const [bulkCount, setBulkCount] = useState(4);
  const [bulkBeats, setBulkBeats] = useState(4);
  const [bulkUnit, setBulkUnit] = useState(4);

  const toggleExpand = (start: number) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(start) ? next.delete(start) : next.add(start);
      return next;
    });

  const groups = engine.groupForm();

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      {/* ── Gap trainer ── */}
      <Card title="Gap trainer">
        <Row style={{ justifyContent: 'space-between' }}>
          <Text style={styles.body}>Alternate playing and silent bars</Text>
          <Switch on={a.gapEnabled} onToggle={() => engine.setGapEnabled(!a.gapEnabled)} />
        </Row>
        {a.gapEnabled ? (
          <View style={{ marginTop: spacing.lg }}>
            <Row style={{ justifyContent: 'space-between', marginBottom: spacing.md }}>
              <View>
                <SectionLabel>Play</SectionLabel>
                <Stepper
                  value={a.gapPlay}
                  min={1}
                  max={16}
                  onChange={(v) => engine.setGap(v, a.gapSilent, a.gapUnit)}
                />
              </View>
              <View>
                <SectionLabel>Silent</SectionLabel>
                <Stepper
                  value={a.gapSilent}
                  min={1}
                  max={16}
                  onChange={(v) => engine.setGap(a.gapPlay, v, a.gapUnit)}
                />
              </View>
            </Row>
            <PillRow>
              <PillButton
                label="Measures"
                small
                active={a.gapUnit === 'measure'}
                onPress={() => engine.setGap(a.gapPlay, a.gapSilent, 'measure')}
              />
              <PillButton
                label="Beats"
                small
                active={a.gapUnit === 'beat'}
                onPress={() => engine.setGap(a.gapPlay, a.gapSilent, 'beat')}
              />
            </PillRow>
          </View>
        ) : null}
      </Card>

      {/* ── Random mute trainer ── */}
      <Card title="Random mute">
        <Row style={{ justifyContent: 'space-between' }}>
          <Text style={styles.body}>Randomly drop clicks to test your time</Text>
          <Switch
            on={a.randomMuteEnabled}
            onToggle={() => engine.setRandomMuteEnabled(!a.randomMuteEnabled)}
          />
        </Row>
        {a.randomMuteEnabled ? (
          <View style={{ marginTop: spacing.lg }}>
            <Row style={{ justifyContent: 'space-between', marginBottom: spacing.sm }}>
              <Text style={styles.body}>Beats muted</Text>
              <Text style={styles.value}>{a.randomMutePct}%</Text>
            </Row>
            <Slider
              value={a.randomMutePct}
              min={0}
              max={100}
              onChange={(v) => engine.setRandomMutePct(v)}
            />
            <Row style={{ justifyContent: 'space-between', marginTop: spacing.lg, marginBottom: spacing.sm }}>
              <Text style={styles.body}>Subdivisions muted</Text>
              <Text style={styles.value}>{a.randomMuteSubPct}%</Text>
            </Row>
            <Slider
              value={a.randomMuteSubPct}
              min={0}
              max={100}
              accent={colors.lime}
              onChange={(v) => engine.setRandomMuteSubPct(v)}
            />
          </View>
        ) : null}
      </Card>

      {/* ── Form / song builder ── */}
      <Card title="Song / form builder">
        <Row style={{ justifyContent: 'space-between' }}>
          <Text style={styles.body}>Sequence bars with changing meters</Text>
          <Switch on={a.formEnabled} onToggle={() => engine.setFormEnabled(!a.formEnabled)} />
        </Row>

        {a.formEnabled ? (
          <View style={{ marginTop: spacing.lg }}>
            <Row style={{ justifyContent: 'space-between', marginBottom: spacing.md }}>
              <Text style={styles.counter}>
                {playing && formIdx >= 0
                  ? `Measure ${formIdx + 1} of ${a.form.length}`
                  : `${a.form.length} measure${a.form.length !== 1 ? 's' : ''}`}
              </Text>
              <Row style={{ gap: spacing.sm }}>
                <PillButton
                  label="↶"
                  small
                  active={false}
                  onPress={() => engine.undoForm()}
                />
                <PillButton label="↷" small onPress={() => engine.redoForm()} />
              </Row>
            </Row>

            {groups.map((g) => {
              const isExpanded = expanded.has(g.start);
              const groupActive = playing && formIdx >= g.start && formIdx <= g.end;
              return (
                <View key={g.start} style={styles.group}>
                  <View style={[styles.groupHeader, groupActive && styles.groupActive]}>
                    <Text style={styles.groupRange}>
                      {g.count === 1 ? g.start + 1 : `${g.start + 1}–${g.end + 1}`}
                    </Text>
                    <Text style={styles.groupMeter}>
                      {g.beats}/{g.unit}
                    </Text>
                    <Text style={styles.groupCount}>×{g.count}</Text>
                    <View style={{ flex: 1 }} />
                    <Pressable onPress={() => engine.playFromSelection(g.start)} hitSlop={8}>
                      <Text style={styles.groupBtn}>▶</Text>
                    </Pressable>
                    <Pressable onPress={() => engine.loopSelection(g.start, g.end)} hitSlop={8}>
                      <Text style={styles.groupBtn}>⟲</Text>
                    </Pressable>
                    <Pressable onPress={() => toggleExpand(g.start)} hitSlop={8}>
                      <Text style={styles.groupBtn}>{isExpanded ? '▲' : '▾'}</Text>
                    </Pressable>
                    <Pressable onPress={() => engine.deleteFormGroup(g.start, g.count)} hitSlop={8}>
                      <Text style={[styles.groupBtn, { color: colors.crimson }]}>✕</Text>
                    </Pressable>
                  </View>

                  {isExpanded
                    ? Array.from({ length: g.count }).map((_, k) => {
                        const idx = g.start + k;
                        const entry = a.form[idx];
                        if (!entry) return null;
                        return (
                          <View key={idx} style={styles.bar}>
                            <Text style={styles.barNum}>{idx + 1}</Text>
                            <Stepper
                              value={entry.beats}
                              min={1}
                              max={32}
                              width={40}
                              onChange={(v) => engine.setEntryBeats(idx, v)}
                            />
                            <View style={styles.barBeats}>
                              {entry.states.map((st, bi) => (
                                <Pressable
                                  key={bi}
                                  onPress={() => engine.cycleEntryBeat(idx, bi)}
                                  style={[styles.barBeat, { borderColor: beatColor(st) }]}
                                >
                                  <Text style={{ color: beatColor(st), fontSize: 12 }}>
                                    {beatIcon(st)}
                                  </Text>
                                </Pressable>
                              ))}
                            </View>
                            <Pressable onPress={() => engine.deleteFormMeasure(idx)} hitSlop={8}>
                              <Text style={[styles.groupBtn, { color: colors.crimson }]}>✕</Text>
                            </Pressable>
                          </View>
                        );
                      })
                    : null}
                </View>
              );
            })}

            <PillRow>
              <PillButton label="+ Add measure" small onPress={() => engine.addFormMeasure()} />
            </PillRow>

            <View style={styles.bulkBox}>
              <SectionLabel>Bulk add</SectionLabel>
              <Row style={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: spacing.sm }}>
                <View>
                  <Text style={styles.tiny}>Count</Text>
                  <Stepper value={bulkCount} min={1} max={64} width={36} onChange={setBulkCount} />
                </View>
                <View>
                  <Text style={styles.tiny}>Beats</Text>
                  <Stepper value={bulkBeats} min={1} max={32} width={36} onChange={setBulkBeats} />
                </View>
                <View>
                  <Text style={styles.tiny}>Unit</Text>
                  <Stepper value={bulkUnit} min={1} max={32} width={36} onChange={setBulkUnit} />
                </View>
              </Row>
              <PillRow>
                <PillButton
                  label={`Add ${bulkCount} × ${bulkBeats}/${bulkUnit}`}
                  small
                  onPress={() => engine.bulkAddMeasures(bulkCount, bulkBeats, bulkUnit)}
                />
              </PillRow>
            </View>
          </View>
        ) : null}
      </Card>

      <View style={{ height: spacing.xxl }} />
    </ScrollView>
  );
}

function Switch({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <Pressable onPress={onToggle} style={[styles.switch, on && styles.switchOn]}>
      <View style={[styles.knob, on && styles.knobOn]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.lg },
  body: { color: colors.ink, fontSize: 15, flex: 1, paddingRight: spacing.md },
  value: { color: colors.cream, fontSize: 18, fontWeight: '700' },
  counter: { color: colors.muted, fontSize: 13, fontWeight: '700' },
  group: { marginBottom: spacing.sm },
  groupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surfaceHi,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  groupActive: { backgroundColor: colors.cobalt },
  groupRange: { color: colors.cream, fontSize: 14, fontWeight: '700', minWidth: 34 },
  groupMeter: { color: colors.blueLt, fontSize: 15, fontWeight: '800' },
  groupCount: { color: colors.muted, fontSize: 13 },
  groupBtn: { color: colors.ink, fontSize: 16, paddingHorizontal: 4, fontWeight: '700' },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    paddingLeft: spacing.md,
  },
  barNum: { color: colors.muted, fontSize: 12, width: 22 },
  barBeats: { flexDirection: 'row', flexWrap: 'wrap', gap: 4, flex: 1 },
  barBeat: {
    width: 26,
    height: 26,
    borderRadius: 6,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bulkBox: { marginTop: spacing.lg, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.rule, paddingTop: spacing.md },
  tiny: { color: colors.muted, fontSize: 11, marginBottom: 4, textAlign: 'center' },
  switch: {
    width: 52,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.rule,
    padding: 3,
    justifyContent: 'center',
  },
  switchOn: { backgroundColor: colors.orange },
  knob: { width: 24, height: 24, borderRadius: 12, backgroundColor: colors.cream },
  knobOn: { alignSelf: 'flex-end' },
});

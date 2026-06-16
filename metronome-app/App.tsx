import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useKeepAwake } from 'expo-keep-awake';

import { engine } from './src/engine/MetronomeEngine';
import { attachPersistence, loadPersistedState } from './src/state/persistence';
import { useEngine } from './src/state/useEngine';
import { PulseScreen } from './src/ui/screens/PulseScreen';
import { FormsScreen } from './src/ui/screens/FormsScreen';
import { colors, spacing } from './src/ui/theme';

type Tab = 'pulse' | 'forms';

export default function App() {
  const [tab, setTab] = useState<Tab>('pulse');
  const [ready, setReady] = useState(false);

  // Keep the screen on while the metronome is running so the click never cuts
  // out mid-practice (the native audio session handles background/lock audio).
  const s = useEngine();

  useEffect(() => {
    attachPersistence(engine);
    loadPersistedState(engine).then(() => {
      engine.seedFormHistory();
      engine.emitChange();
      setReady(true);
    });
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      {s.state.isPlaying ? <KeepAwake /> : null}
      <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
        <View style={styles.header}>
          <Text style={styles.title}>Metronome</Text>
        </View>

        <View style={styles.body}>
          {ready ? (tab === 'pulse' ? <PulseScreen /> : <FormsScreen />) : null}
        </View>

        <View style={styles.tabBar}>
          <TabButton label="Pulse" active={tab === 'pulse'} onPress={() => setTab('pulse')} />
          <TabButton label="Forms" active={tab === 'forms'} onPress={() => setTab('forms')} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

function KeepAwake() {
  useKeepAwake();
  return null;
}

function TabButton({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.tabBtn}>
      <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{label}</Text>
      {active ? <View style={styles.tabIndicator} /> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  header: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.rule,
  },
  title: { color: colors.cream, fontSize: 20, fontWeight: '800', letterSpacing: 0.5 },
  body: { flex: 1 },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.rule,
    backgroundColor: colors.navy,
  },
  tabBtn: { flex: 1, alignItems: 'center', paddingVertical: spacing.md },
  tabLabel: { color: colors.muted, fontSize: 15, fontWeight: '700' },
  tabLabelActive: { color: colors.cream },
  tabIndicator: {
    marginTop: 4,
    width: 28,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.orange,
  },
});

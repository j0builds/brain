import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const SUGGESTED_BRANCHES = [
  { id: 'deepen', label: 'Deepen', prompt: 'Break this into first principles and one advanced layer.' },
  { id: 'compare', label: 'Compare', prompt: 'Compare two strong opposing explanations with evidence gaps.' },
  { id: 'dissent', label: 'Dissent', prompt: 'Show me the strongest dissenting view and where it is weak.' },
  { id: 'beginner', label: 'Beginner', prompt: 'Explain this at beginner level with one analogy.' },
  { id: 'adjacent', label: 'Adjacent', prompt: 'Find one adjacent domain worth exploring next.' },
];

const INITIAL_SPARKS = [
  'Why do anti-fragile systems improve under stress?',
  'Could fasting affect medication response timing?',
  'How do recommendation systems collapse curiosity breadth?',
];

const INITIAL_THREADS = [
  {
    title: 'Curiosity vs. novelty seeking',
    status: 'resolved',
    confidenceBefore: 0.35,
    confidenceAfter: 0.78,
  },
  {
    title: 'When to trust synthetic evidence summaries',
    status: 'in progress',
    confidenceBefore: 0.46,
    confidenceAfter: 0.63,
  },
];

export default function App() {
  const [spark, setSpark] = useState('How do I design Epiphany to maximize closure rather than doom-scrolling?');
  const [confidence, setConfidence] = useState('0.52');
  const [selectedBranch, setSelectedBranch] = useState(SUGGESTED_BRANCHES[0].id);
  const [savedInsights, setSavedInsights] = useState(14);
  const [resurfaced, setResurfaced] = useState(4);
  const [resolutionRate, setResolutionRate] = useState(47);
  const [sessionLog, setSessionLog] = useState([]);

  const currentBranch = useMemo(
    () => SUGGESTED_BRANCHES.find((branch) => branch.id === selectedBranch) ?? SUGGESTED_BRANCHES[0],
    [selectedBranch],
  );

  function runDemoSession() {
    const safeConfidence = Math.min(1, Math.max(0, Number(confidence) || 0));
    const closability = Math.round((1 - Math.abs(0.62 - safeConfidence)) * 100);
    const novelty = Math.round((0.45 + Math.random() * 0.45) * 100);
    const relevance = Math.round((0.6 + Math.random() * 0.35) * 100);

    const nextLog = {
      spark,
      branch: currentBranch.label,
      summary: currentBranch.prompt,
      confidenceBefore: safeConfidence,
      confidenceAfter: Math.min(1, safeConfidence + 0.19).toFixed(2),
      closability,
      novelty,
      relevance,
      evidenceTier: closability > 70 ? 'Tier A (peer-reviewed + primary source)' : 'Tier B (mixed)',
      nextQuestion: 'What contradiction should I inspect before locking this belief?',
      createdAt: new Date().toLocaleTimeString(),
    };

    setSavedInsights((prev) => prev + 1);
    setResurfaced((prev) => prev + (closability > 68 ? 1 : 0));
    setResolutionRate((prev) => Math.min(95, prev + 1));
    setSessionLog((prev) => [nextLog, ...prev].slice(0, 4));
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Epiphany Mobile Demo</Text>
        <Text style={styles.subtitle}>Curiosity OS · Spark → Path → Evidence → Memory</Text>

        <View style={styles.metricsRow}>
          <MetricCard label="Resolution Rate" value={`${resolutionRate}%`} />
          <MetricCard label="Saved Insights" value={`${savedInsights}`} />
          <MetricCard label="Resurfaced" value={`${resurfaced}`} />
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>1) Capture Spark</Text>
          <TextInput
            style={[styles.input, styles.sparkInput]}
            multiline
            value={spark}
            onChangeText={setSpark}
            placeholder="What are you curious about right now?"
          />

          <Text style={styles.label}>Confidence before exploring (0-1)</Text>
          <TextInput
            style={styles.input}
            value={confidence}
            onChangeText={setConfidence}
            keyboardType="decimal-pad"
          />

          <Text style={styles.muted}>Suggested sparks</Text>
          {INITIAL_SPARKS.map((item) => (
            <TouchableOpacity key={item} style={styles.sparkChip} onPress={() => setSpark(item)}>
              <Text style={styles.sparkChipText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>2) Choose Exploration Path</Text>
          <View style={styles.branchGrid}>
            {SUGGESTED_BRANCHES.map((branch) => {
              const active = branch.id === selectedBranch;
              return (
                <TouchableOpacity
                  key={branch.id}
                  onPress={() => setSelectedBranch(branch.id)}
                  style={[styles.branchButton, active && styles.branchButtonActive]}
                >
                  <Text style={[styles.branchText, active && styles.branchTextActive]}>{branch.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <Text style={styles.helperText}>{currentBranch.prompt}</Text>

          <TouchableOpacity style={styles.runButton} onPress={runDemoSession}>
            <Text style={styles.runButtonText}>Run Curiosity Session</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>3) Memory & Closure</Text>
          {sessionLog.length === 0 ? (
            <Text style={styles.muted}>No session yet. Run one to see synthesis, evidence tier, and next question.</Text>
          ) : (
            sessionLog.map((entry) => (
              <View key={`${entry.createdAt}-${entry.spark}`} style={styles.logItem}>
                <Text style={styles.logTitle}>{entry.spark}</Text>
                <Text style={styles.logMeta}>Path: {entry.branch} · {entry.createdAt}</Text>
                <Text style={styles.logMeta}>Evidence: {entry.evidenceTier}</Text>
                <Text style={styles.logMeta}>Novelty {entry.novelty}% · Relevance {entry.relevance}% · Closability {entry.closability}%</Text>
                <Text style={styles.logMeta}>
                  Confidence lift: {entry.confidenceBefore.toFixed(2)} → {entry.confidenceAfter}
                </Text>
                <Text style={styles.logNext}>Next question: {entry.nextQuestion}</Text>
              </View>
            ))
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Thread Snapshot</Text>
          {INITIAL_THREADS.map((thread) => (
            <View key={thread.title} style={styles.threadItem}>
              <Text style={styles.threadTitle}>{thread.title}</Text>
              <Text style={styles.logMeta}>
                {thread.status} · {thread.confidenceBefore.toFixed(2)} → {thread.confidenceAfter.toFixed(2)}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

function MetricCard({ label, value }) {
  return (
    <View style={styles.metricCard}>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#030712',
  },
  container: {
    padding: 16,
    gap: 14,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#f9fafb',
  },
  subtitle: {
    color: '#9ca3af',
    marginBottom: 4,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  metricCard: {
    flex: 1,
    borderRadius: 12,
    padding: 10,
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  metricValue: {
    color: '#22d3ee',
    fontWeight: '700',
    fontSize: 20,
  },
  metricLabel: {
    color: '#9ca3af',
    fontSize: 12,
  },
  card: {
    backgroundColor: '#111827',
    borderRadius: 14,
    padding: 14,
    gap: 8,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  sectionTitle: {
    color: '#f3f4f6',
    fontWeight: '700',
    fontSize: 16,
  },
  label: {
    color: '#e5e7eb',
    fontWeight: '600',
  },
  muted: {
    color: '#9ca3af',
    fontSize: 13,
  },
  input: {
    borderWidth: 1,
    borderColor: '#374151',
    borderRadius: 10,
    padding: 10,
    color: '#f9fafb',
    backgroundColor: '#0b1220',
  },
  sparkInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  sparkChip: {
    borderColor: '#334155',
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  sparkChipText: {
    color: '#cbd5e1',
    fontSize: 12,
  },
  branchGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  branchButton: {
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  branchButtonActive: {
    backgroundColor: '#1d4ed8',
    borderColor: '#2563eb',
  },
  branchText: {
    color: '#cbd5e1',
    fontWeight: '600',
  },
  branchTextActive: {
    color: '#eff6ff',
  },
  helperText: {
    color: '#93c5fd',
    fontSize: 13,
  },
  runButton: {
    marginTop: 6,
    borderRadius: 10,
    backgroundColor: '#0ea5e9',
    alignItems: 'center',
    paddingVertical: 12,
  },
  runButtonText: {
    color: '#0c1423',
    fontWeight: '800',
  },
  logItem: {
    borderWidth: 1,
    borderColor: '#233149',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#0b1220',
    gap: 2,
  },
  logTitle: {
    color: '#f8fafc',
    fontWeight: '700',
  },
  logMeta: {
    color: '#93a4bb',
    fontSize: 12,
  },
  logNext: {
    color: '#c4b5fd',
    marginTop: 4,
    fontSize: 12,
  },
  threadItem: {
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderColor: '#1f2937',
  },
  threadTitle: {
    color: '#e2e8f0',
    fontWeight: '600',
  },
});

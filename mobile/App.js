import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const DEFAULT_API_URL = 'http://localhost:8000';

export default function App() {
  const [apiUrl, setApiUrl] = useState(DEFAULT_API_URL);
  const [topic, setTopic] = useState('medication');
  const [utterance, setUtterance] = useState('I will skip meds today');
  const [confidence, setConfidence] = useState('0.40');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('Response will appear here.');

  async function runCheck() {
    setLoading(true);
    setResult('Running intervention check...');

    try {
      const payload = {
        topic,
        utterance,
        confidence: Number(confidence),
      };

      const response = await fetch(`${apiUrl}/intervene`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await response.json();
      setResult(JSON.stringify(json, null, 2));
    } catch (error) {
      setResult(`Request failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Ephipany Mobile</Text>
        <Text style={styles.subtitle}>Gstack Intervention Console</Text>

        <View style={styles.card}>
          <Text style={styles.label}>API URL</Text>
          <TextInput style={styles.input} value={apiUrl} onChangeText={setApiUrl} autoCapitalize="none" />

          <Text style={styles.label}>Topic</Text>
          <TextInput style={styles.input} value={topic} onChangeText={setTopic} autoCapitalize="none" />

          <Text style={styles.label}>Utterance</Text>
          <TextInput style={styles.input} value={utterance} onChangeText={setUtterance} multiline />

          <Text style={styles.label}>Confidence (0-1)</Text>
          <TextInput
            style={styles.input}
            value={confidence}
            onChangeText={setConfidence}
            keyboardType="decimal-pad"
          />

          <TouchableOpacity style={styles.button} onPress={runCheck} disabled={loading}>
            <Text style={styles.buttonText}>{loading ? 'Running...' : 'Run Intervention Check'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Response</Text>
          <Text style={styles.result}>{result}</Text>
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  container: {
    padding: 20,
    gap: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 16,
    color: '#4b5563',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    gap: 8,
  },
  label: {
    fontWeight: '600',
    marginTop: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 8,
    backgroundColor: '#2563eb',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
  result: {
    fontFamily: 'Courier',
    fontSize: 12,
    color: '#111827',
  },
});

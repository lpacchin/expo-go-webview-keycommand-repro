import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { WebView } from 'react-native-webview';

// Repro: on a physical iPad with a hardware keyboard, in Expo Go,
// typing "r" in the WebView <textarea> reloads the app and "d" opens the dev menu.
// Typing the same letters in the native TextInput below does nothing (expected).

const html = `<!doctype html>
<meta name="viewport" content="width=device-width, initial-scale=1">
<body style="font-family: -apple-system; padding: 16px">
  <p>WebView textarea: type "r" or "d" with a hardware keyboard</p>
  <textarea rows="5" style="width: 100%; font-size: 18px"></textarea>
</body>`;

export default function App() {
  // Changes on every JS reload, so a reload is visible.
  const [startedAt] = useState(() => new Date().toLocaleTimeString());

  return (
    <View style={styles.container}>
      <Text style={styles.label}>JS started at {startedAt}</Text>
      <Text style={styles.label}>Native TextInput (not affected):</Text>
      <TextInput style={styles.input} placeholder="type r or d here" />
      <WebView style={styles.webView} originWhitelist={['*']} source={{ html }} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16, paddingTop: 64, gap: 8 },
  label: { fontSize: 16 },
  input: { borderWidth: 1, borderColor: '#999', borderRadius: 6, padding: 10, fontSize: 18 },
  webView: { flex: 1, borderWidth: 1, borderColor: '#999' },
});

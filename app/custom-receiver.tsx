import {
  ACTION_CUSTOM_TEXT,
  registerReceiver,
} from "@/utils/broadcast-manager";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CustomReceiverScreen() {
  const [receivedMessage, setReceivedMessage] = useState<string | null>(null);

  // register the broadcast receiver on mount
  useEffect(() => {
    const subscription = registerReceiver(ACTION_CUSTOM_TEXT, (data) => {
      setReceivedMessage(data.message);
    });

    // unregister receiver on unmount
    return () => subscription.remove();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Custom Broadcast Receiver</Text>

      {/* receiver status */}
      <View style={styles.card}>
        <Text style={styles.statusLabel}>
          {receivedMessage
            ? "✓ Broadcast Received"
            : "Waiting for broadcast..."}
        </Text>

        {receivedMessage && (
          <>
            <View style={styles.divider} />
            <Text style={styles.msgLabel}>Received Message:</Text>
            <Text style={styles.msgText}>{receivedMessage}</Text>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333",
  },
  card: {
    backgroundColor: "#f0f4f8",
    borderRadius: 12,
    padding: 24,
    width: "90%",
    alignItems: "center",
  },
  statusLabel: {
    fontSize: 17,
    fontWeight: "600",
    color: "#2e7d32",
  },
  divider: {
    height: 1,
    backgroundColor: "#ddd",
    width: "100%",
    marginVertical: 16,
  },
  msgLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 6,
  },
  msgText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
    textAlign: "center",
  },
});

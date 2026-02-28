import { ACTION_CUSTOM_TEXT, sendBroadcast } from "@/utils/broadcast-manager";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function BroadcastInputScreen() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  // send a broadcast with the entered text, then navigate to receiver
  const handleSend = () => {
    if (!message.trim()) {
      Alert.alert("Error", "Please enter a message");
      return;
    }
    // navigate to the receiver screen first so it can register
    router.push("/custom-receiver");
    // send the broadcast after a short delay to let the receiver mount
    setTimeout(() => {
      sendBroadcast(ACTION_CUSTOM_TEXT, { message: message.trim() });
    }, 500);
    setSent(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Custom Broadcast</Text>
      <Text style={styles.label}>Enter a message to broadcast:</Text>

      {/* text input */}
      <TextInput
        style={styles.input}
        placeholder="Type your message here..."
        value={message}
        onChangeText={setMessage}
        placeholderTextColor="#999"
      />

      {/* send button */}
      <TouchableOpacity style={styles.button} onPress={handleSend}>
        <Text style={styles.buttonText}>Send Broadcast</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  label: {
    fontSize: 15,
    color: "#555",
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    marginBottom: 24,
    color: "#333",
  },
  button: {
    backgroundColor: "#4a90d9",
    borderRadius: 6,
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

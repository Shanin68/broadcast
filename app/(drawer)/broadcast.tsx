import { useRouter } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const BROADCAST_OPTIONS = [
  "Custom broadcast receiver",
  "System battery notification receiver",
];

export default function BroadcastScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState(0);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // navigate to next screen based on selection
  const handleProceed = () => {
    if (selected === 0) {
      router.push("/broadcast-input");
    } else {
      router.push("/battery-status");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select a broadcast type</Text>

      {/* dropdown selector */}
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setDropdownVisible(true)}
      >
        <Text style={styles.dropdownText}>
          {selected === 0 ? "Custom" : "Battery"} ▾
        </Text>
      </TouchableOpacity>

      {/* dropdown modal */}
      <Modal
        visible={dropdownVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setDropdownVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setDropdownVisible(false)}
        >
          <View style={styles.modalContent}>
            <FlatList
              data={BROADCAST_OPTIONS}
              keyExtractor={(_, i) => i.toString()}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={[
                    styles.option,
                    index === selected && styles.optionSelected,
                  ]}
                  onPress={() => {
                    setSelected(index);
                    setDropdownVisible(false);
                  }}
                >
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Pressable>
      </Modal>

      {/* proceed button */}
      <TouchableOpacity style={styles.button} onPress={handleProceed}>
        <Text style={styles.buttonText}>Proceed</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 40,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    color: "#555",
    marginBottom: 16,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 30,
    minWidth: 160,
    alignItems: "center",
  },
  dropdownText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 8,
    width: 280,
    paddingVertical: 8,
    elevation: 5,
  },
  option: {
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  optionSelected: {
    backgroundColor: "#e8e8e8",
  },
  optionText: {
    fontSize: 15,
    color: "#333",
  },
  button: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 6,
    paddingHorizontal: 28,
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "#555",
  },
});

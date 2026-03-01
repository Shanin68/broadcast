import * as Battery from "expo-battery";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BatteryStatusScreen() {
  const [level, setLevel] = useState<number | null>(null);
  const [state, setState] = useState<Battery.BatteryState>(
    Battery.BatteryState.UNKNOWN,
  );

  useEffect(() => {
    // get initial battery level
    Battery.getBatteryLevelAsync().then((l) => setLevel(l));
    Battery.getBatteryStateAsync().then((s) => setState(s));

    // subscribe to battery level changes
    const levelSub = Battery.addBatteryLevelListener(({ batteryLevel }) => {
      setLevel(batteryLevel);
    });
    const stateSub = Battery.addBatteryStateListener(({ batteryState }) => {
      setState(batteryState);
    });

    return () => {
      levelSub.remove();
      stateSub.remove();
    };
  }, []);

  // convert state enum to readable string
  const stateLabel = () => {
    switch (state) {
      case Battery.BatteryState.CHARGING:
        return "Charging";
      case Battery.BatteryState.FULL:
        return "Full";
      case Battery.BatteryState.UNPLUGGED:
        return "Unplugged";
      default:
        return "Unknown";
    }
  };

  const percentage = level !== null ? Math.round(level * 100) : "--";

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Battery Broadcast Receiver</Text>

      {/* battery info */}
      <View style={styles.card}>
        <Text style={styles.percentText}>{percentage}%</Text>
        <Text style={styles.stateText}>Status: {stateLabel()}</Text>
      </View>

      <Text style={styles.hint}>
        Battery level updates are received via system broadcast.
      </Text>
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
    padding: 30,
    alignItems: "center",
    width: "80%",
    marginBottom: 20,
  },
  percentText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#4a90d9",
  },
  stateText: {
    fontSize: 16,
    color: "#666",
    marginTop: 8,
  },
  hint: {
    fontSize: 13,
    color: "#999",
    textAlign: "center",
    paddingHorizontal: 20,
  },
});

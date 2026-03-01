import { Audio } from "expo-av";
import { useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// local audio file
const AUDIO_SOURCE = require("@/assets/mp3/Piki - Momo Island (freetouse.com).mp3");

export default function AudioScreen() {
  const soundRef = useRef<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  // load audio if not already loaded
  const loadAudio = async () => {
    if (soundRef.current) return;
    const { sound } = await Audio.Sound.createAsync(
      AUDIO_SOURCE,
      { shouldPlay: false },
      onPlaybackUpdate,
    );
    soundRef.current = sound;
    setLoaded(true);
  };

  // playback status callback
  const onPlaybackUpdate = (status: any) => {
    if (status.isLoaded) {
      setIsPlaying(status.isPlaying);
      setPosition(status.positionMillis);
      setDuration(status.durationMillis || 0);
    }
  };

  const togglePlayback = async () => {
    await loadAudio();
    if (!soundRef.current) return;
    if (isPlaying) {
      await soundRef.current.pauseAsync();
    } else {
      await soundRef.current.playAsync();
    }
  };

  const stopPlayback = async () => {
    if (!soundRef.current) return;
    await soundRef.current.stopAsync();
    setIsPlaying(false);
  };

  // format milliseconds to mm:ss
  const formatTime = (ms: number) => {
    const totalSec = Math.floor(ms / 1000);
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Audio Player</Text>

      {/* playback progress */}
      <View style={styles.card}>
        <Text style={styles.trackName}>Piki - Momo Island</Text>
        <Text style={styles.time}>
          {formatTime(position)} / {formatTime(duration)}
        </Text>

        {/* progress bar */}
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: duration > 0 ? `${(position / duration) * 100}%` : "0%",
              },
            ]}
          />
        </View>

        {/* controls */}
        <View style={styles.controls}>
          <TouchableOpacity style={styles.button} onPress={togglePlayback}>
            <Text style={styles.buttonText}>
              {isPlaying ? "Pause" : "Play"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.stopBtn]}
            onPress={stopPlayback}
          >
            <Text style={styles.buttonText}>Stop</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 24,
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
    width: "100%",
    alignItems: "center",
  },
  trackName: {
    fontSize: 17,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  time: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  progressBar: {
    width: "100%",
    height: 6,
    backgroundColor: "#ddd",
    borderRadius: 3,
    marginBottom: 20,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#4a90d9",
    borderRadius: 3,
  },
  controls: {
    flexDirection: "row",
    gap: 16,
  },
  button: {
    backgroundColor: "#4a90d9",
    borderRadius: 6,
    paddingHorizontal: 28,
    paddingVertical: 10,
  },
  stopBtn: {
    backgroundColor: "#d94a4a",
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});

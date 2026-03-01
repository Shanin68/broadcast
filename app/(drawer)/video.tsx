import { ResizeMode, Video } from "expo-av";
import { useRef, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width: SCREEN_W } = Dimensions.get("window");

// local video file
const VIDEO_SOURCE = require("@/assets/video/audio.tsx - Ass_02 - Visual Studio Code 2026-03-01 14-10-39.mp4");

export default function VideoScreen() {
  const videoRef = useRef<Video>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayback = async () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      await videoRef.current.pauseAsync();
    } else {
      await videoRef.current.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Video Player</Text>

      {/* video player */}
      <Video
        ref={videoRef}
        source={VIDEO_SOURCE}
        style={styles.video}
        resizeMode={ResizeMode.CONTAIN}
        useNativeControls
        onPlaybackStatusUpdate={(status) => {
          if (status.isLoaded) {
            setIsPlaying(status.isPlaying);
          }
        }}
      />

      {/* play/pause button */}
      <TouchableOpacity style={styles.button} onPress={togglePlayback}>
        <Text style={styles.buttonText}>{isPlaying ? "Pause" : "Play"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  video: {
    width: SCREEN_W - 32,
    height: (SCREEN_W - 32) * 0.56,
    backgroundColor: "#000",
    borderRadius: 8,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#4a90d9",
    borderRadius: 6,
    paddingHorizontal: 32,
    paddingVertical: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

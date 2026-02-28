import { Image } from "expo-image";
import { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const IMAGE_URL = "https://picsum.photos/800/600";
const { width: SCREEN_W } = Dimensions.get("window");

export default function ImageScaleScreen() {
  const [loading, setLoading] = useState(true);

  // pinch zoom values
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);

  // pan offset values
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);

  // pinch gesture
  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = savedScale.value * e.scale;
    })
    .onEnd(() => {
      savedScale.value = scale.value;
      if (scale.value < 1) {
        scale.value = 1;
        savedScale.value = 1;
      }
    });

  // pan gesture for moving zoomed image
  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = savedTranslateX.value + e.translationX;
      translateY.value = savedTranslateY.value + e.translationY;
    })
    .onEnd(() => {
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    });

  // combine both gestures
  const composed = Gesture.Simultaneous(pinchGesture, panGesture);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Image Scale</Text>
      <Text style={styles.hint}>Pinch to zoom, drag to move</Text>

      {/* zoomable image area */}
      <GestureDetector gesture={composed}>
        <Animated.View style={[styles.imageWrapper, animatedStyle]}>
          <Image
            source={{ uri: IMAGE_URL }}
            style={styles.image}
            contentFit="contain"
            onLoadEnd={() => setLoading(false)}
          />
        </Animated.View>
      </GestureDetector>

      {loading && (
        <ActivityIndicator size="large" color="#4a90d9" style={styles.loader} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 16,
    color: "#333",
  },
  hint: {
    fontSize: 13,
    color: "#999",
    marginBottom: 12,
  },
  imageWrapper: {
    width: SCREEN_W,
    height: SCREEN_W * 0.75,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  loader: {
    position: "absolute",
    top: "50%",
  },
});

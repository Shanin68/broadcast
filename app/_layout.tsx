import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        {/* drawer is the main navigator */}
        <Stack.Screen name="(drawer)" options={{ headerShown: false }} />

        {/* broadcast sub-screens */}
        <Stack.Screen
          name="broadcast-input"
          options={{ title: "Custom Broadcast" }}
        />
        <Stack.Screen
          name="battery-status"
          options={{ title: "Battery Status" }}
        />
        <Stack.Screen
          name="custom-receiver"
          options={{ title: "Broadcast Receiver" }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

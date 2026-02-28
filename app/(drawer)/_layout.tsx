import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerTitle: "App",
          drawerType: "front",
          drawerStyle: { width: 250 },
        }}
      >
        {/* hide the index redirect from the drawer */}
        <Drawer.Screen
          name="index"
          options={{ drawerItemStyle: { display: "none" } }}
        />

        {/* drawer menu items */}
        <Drawer.Screen
          name="broadcast"
          options={{ drawerLabel: "Broadcast Receiver", title: "App" }}
        />
        <Drawer.Screen
          name="image-scale"
          options={{ drawerLabel: "Image Scale", title: "App" }}
        />
        <Drawer.Screen
          name="video"
          options={{ drawerLabel: "Video", title: "App" }}
        />
        <Drawer.Screen
          name="audio"
          options={{ drawerLabel: "Audio", title: "App" }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

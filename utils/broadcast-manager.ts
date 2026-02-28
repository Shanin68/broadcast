import { DeviceEventEmitter } from "react-native";

// action name for the custom text broadcast
export const ACTION_CUSTOM_TEXT = "com.ass02.CUSTOM_TEXT_BROADCAST";

// send a broadcast with an action and data payload
export function sendBroadcast(action: string, data: Record<string, string>) {
  DeviceEventEmitter.emit(action, data);
}

// register a broadcast receiver for a given action
export function registerReceiver(
  action: string,
  callback: (data: Record<string, string>) => void,
) {
  const subscription = DeviceEventEmitter.addListener(action, callback);
  return subscription;
}

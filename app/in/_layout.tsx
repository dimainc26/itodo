import { Stack } from "expo-router";

export default function InLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ title: "Inside" }} />
    </Stack>
  );
}

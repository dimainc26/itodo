import { Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export const sections = [
  {
    title: "Settings",
    items: [
      {
        label: "App Settings",
        icon: <Feather name="settings" size={20} />,
        onPress: () => router.push("/in/(tabs)/profile/settings"),
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        label: "Change account name",
        icon: <Ionicons name="person-outline" size={20} />,
        onPress: () => router.push("/in/(tabs)/profile/settings"),
      },
      {
        label: "Change account password",
        icon: <Feather name="lock" size={20} />,
        onPress: () => router.push("/in/(tabs)/profile/settings"),
      },
      {
        label: "Change account Image",
        icon: <Feather name="camera" size={20} />,
        onPress: () => router.push("/in/(tabs)/profile/settings"),
      },
    ],
  },
  {
    title: "Uptodo",
    items: [
      {
        label: "About US",
        icon: <Ionicons name="grid-outline" size={20} />,
        onPress: () => router.push("/in/(tabs)/profile/settings"),
      },
      {
        label: "FAQ",
        icon: <Ionicons name="help-circle-outline" size={20} />,
        onPress: () => router.push("/in/(tabs)/profile/settings"),
      },
      {
        label: "Help & Feedback",
        icon: <Feather name="message-square" size={20} />,
        onPress: () => router.push("/in/(tabs)/profile/settings"),
      },
      {
        label: "Support US",
        icon: <Feather name="heart" size={20} />,
        onPress: () => router.push("/in/(tabs)/profile/settings"),
      },
    ],
  },
];

import { ColorScheme } from "@/hooks/useTheme";
import { StyleSheet } from "react-native";

export const createTaskItemStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    card: {
      borderRadius: 20,
      padding: 16,
      backgroundColor: "#ffffff",
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.06,
      shadowRadius: 12,
      elevation: 6,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    project: {
      fontSize: 14,
      fontWeight: "600",
      color: "#7C7C7C",
    },
    iconContainer: {
      width: 32,
      height: 32,
      borderRadius: 16,
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      fontSize: 17,
      fontWeight: "700",
      marginVertical: 8,
      color: "#1F1F1F",
    },
    footer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    timeContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    time: {
      fontSize: 14,
      color: "#8B5CF6",
      fontWeight: "500",
    },
    statusBadge: {
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 12,
    },
    statusText: {
      fontSize: 12,
      fontWeight: "600",
    },
  });

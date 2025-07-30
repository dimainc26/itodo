import { ColorScheme } from "@/hooks/useTheme";
import { StyleSheet } from "react-native";

export const createTodayTaskStyles = (colors: ColorScheme) => {
  return StyleSheet.create({
    card: {
      backgroundColor: colors.primary,
      borderRadius: 24,
      padding: 20,
      marginHorizontal: 24,
      marginBottom: 24,
      maxHeight: 160,
    },
    left: {
      height: "100%",
      flexDirection: "column",
      alignItems: "flex-start",
    },
    leftContent: {
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      color: "#ffffff",
      fontSize: 18,
      fontWeight: "600",
      lineHeight: 24,
      flex: 1,
    },
    button: {
      backgroundColor: "#ffffff",
      borderRadius: 12,
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    buttonText: {
      color: colors.primary,
      fontWeight: "700",
      fontSize: 15,
    },
    right: {
      flex: 1,
      height: "100%",
      flexDirection: "row",
      position: "relative",
      justifyContent: "center",
      alignItems: "center",
    },
    menuButton: {
      position: "absolute",
      right: 0,
      top: 0,
      backgroundColor: colors.primaryMuted,
      paddingHorizontal: 4,
      paddingVertical: 4,
      borderRadius: 8,
    },
  });
};

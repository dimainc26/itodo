import { ColorScheme } from "@/hooks/useTheme";
import { StyleSheet } from "react-native";

export const createPriorityStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    buttonWrapper: {
      flex: 1,
      borderRadius: 20,
      overflow: "hidden",
    },
    activeWrapper: {
      elevation: 4,
    },
    button: {
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonTextInactive: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.textMuted,
    },
    buttonTextActive: {
      fontSize: 14,
      fontWeight: "700",
      color: "#fff",
    },
  });

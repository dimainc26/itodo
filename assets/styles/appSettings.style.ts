import { ColorScheme } from "@/hooks/useTheme";
import { StyleSheet } from "react-native";

export const createAppSettingsStyle = (colors: ColorScheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.bg,
      padding: 24,
    },
    sectionTitle: {
      fontSize: 13,
      color: colors.textMuted,
      marginBottom: 12,
      marginTop: 24,
    },
    row: {
      backgroundColor: colors.surface,
      padding: 14,
      borderRadius: 16,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 10,
    },
    rowLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    rowLabel: {
      color: colors.text,
      fontSize: 15,
    },
    rowRightValue: {
      color: colors.textMuted,
      fontSize: 14,
    },
  });

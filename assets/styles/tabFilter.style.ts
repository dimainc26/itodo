import { ColorScheme } from "@/hooks/useTheme";
import { StyleSheet } from "react-native";

export const createTabFilterStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 24,
      gap: 12,
      flexDirection: "row",
      marginBottom: 24,
      paddingVertical: 12,
    },
    tab: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 16,
      borderCurve: "continuous",
    },
    tabActive: {
      backgroundColor: colors.primary,
    },
    tabInactive: {
      backgroundColor: colors.primarySoft,
    },
    tabTextInactive: {
      backgroundColor: colors.primarySoft,
    },
    tabText: {
      fontSize: 15,
      fontWeight: "600",
      color: colors.primary,
    },
    tabTextActive: {
      color: "#fff",
    },
  });

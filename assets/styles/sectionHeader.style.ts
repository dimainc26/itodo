import { ColorScheme } from "@hooks/useTheme";
import { StyleSheet } from "react-native";

export const createSectionHeaderStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 16,
      paddingHorizontal: 24,
    },
    title: {
      fontSize: 20,
      fontWeight: "700",
      color: colors.text,
    },
    badge: {
      backgroundColor: colors.primary + "10",
      marginLeft: 8,
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 10,
    },
    badgeText: {
      fontWeight: "700",
      fontSize: 14,
      color: colors.primary,
    },
  });

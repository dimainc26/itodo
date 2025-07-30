import { ColorScheme } from "@/hooks/useTheme";
import { StyleSheet } from "react-native";

export const createDateSelectorStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 24,
      paddingVertical: 12,
    },
    item: {
      backgroundColor: "#F4F4F4",
      borderRadius: 20,
      width: 64,
      height: 88,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 12,
    },
    itemSelected: {
      backgroundColor: colors.primary,
    },
    day: {
      fontSize: 20,
      fontWeight: "700",
      color: colors.text,
    },
    daySelected: {
      color: "white",
    },
    weekday: {
      fontSize: 14,
      fontWeight: "500",
      color: colors.textMuted,
      marginTop: 4,
    },
    weekdaySelected: {
      color: "white",
    },
  });

import { ColorScheme } from "@/hooks/useTheme";
import { StyleSheet } from "react-native";

export const createCalendarHeaderStyles = (colors: ColorScheme) => {
  return StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 24,
      paddingVertical: 12,
      paddingTop: 24,
    },
    title: {
      fontSize: 20,
      fontWeight: "700",
      color: colors.text,
    },
    iconWrapper: {
      width: 36,
      height: 36,
      borderRadius: 18,
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
    },
    badge: {
      position: "absolute",
      top: 6,
      right: 6,
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.primary,
    },
  });
};

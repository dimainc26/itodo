import { ColorScheme } from "@/hooks/useTheme";
import { StyleSheet } from "react-native";

export const createOnboardingStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 60,
      paddingHorizontal: 24,
      backgroundColor: colors.bg,
    },
    illustration: {
      width: "100%",
      height: 300,
    },
    textContainer: {
      alignItems: "center",
    },
    title: {
      fontSize: 22,
      fontWeight: "700",
      textAlign: "center",
      color: colors.text,
      marginBottom: 12,
    },
    subtitle: {
      fontSize: 15,
      textAlign: "center",
      color: colors.textMuted,
      lineHeight: 22,
    },
  });

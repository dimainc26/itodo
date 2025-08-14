import { ColorScheme } from "@/hooks/useTheme";
import { StyleSheet } from "react-native";

export const createFocusModeStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      //   backgroundColor: colors.gradients.background[0],
      padding: 24,
    },

    timerWrapper: {
      backgroundColor: colors.bg,
      paddingVertical: 32,
      paddingHorizontal: 48,
      borderRadius: 16,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 6,
      marginBottom: 48,
    },
    timer: {
      fontSize: 48,
      fontWeight: "bold",
      color: colors.text,
    },
    controls: {
      width: "100%",
      paddingVertical: 60,
      height: 70,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: 20,
    },
    controlButton: {
      width: 60,
      height: 60,
      backgroundColor: colors.primary,
      borderRadius: 30, // metà della larghezza/altezza
      justifyContent: "center",
      alignItems: "center",
    },

    resetButton: {
      backgroundColor: colors.warning,
    },
  });

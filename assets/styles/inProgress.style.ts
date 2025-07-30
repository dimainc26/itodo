import { ColorScheme } from "@/hooks/useTheme";
import { StyleSheet } from "react-native";

export const createInProgressStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    sectionContainer: {
      //   paddingHorizontal: 24,
      marginVertical: 12,
    },

    card: {
      width: 240,
      borderRadius: 20,
      padding: 16,
      marginRight: 16,
    },
    cardHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 8,
    },
    cardProjectType: {
      color: colors.textMuted,
      fontSize: 14,
      fontWeight: "600",
    },
    cardIconWrapper: {
      width: 28,
      height: 28,
      borderRadius: 14,
      justifyContent: "center",
      alignItems: "center",
    },
    cardTitle: {
      fontSize: 17,
      fontWeight: "700",
      color: colors.text,
      marginBottom: 12,
    },
    cardProgressBarWrapper: {
      marginTop: 8,
    },
    cardProgressBarBg: {
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.bg,
      overflow: "hidden",
    },
    cardProgressBarFill: {
      height: 8,
      borderRadius: 4,
    },
  });

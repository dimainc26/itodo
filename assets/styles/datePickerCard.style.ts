// assets/styles/datePickerCard.style.ts
import { ColorScheme } from "@/hooks/useTheme";
import { StyleSheet } from "react-native";

export const createDatePickerCardStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.backgrounds.editInput,
      padding: 16,
      borderRadius: 20,
      marginBottom: 16,
    },
    iconWrapper: {
      width: 36,
      height: 36,
      borderRadius: 18,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.primary + "20",
      marginRight: 12,
    },
    textWrapper: {
      flex: 1,
    },
    label: {
      fontSize: 12,
      color: colors.textMuted,
      marginBottom: 2,
      fontWeight: "500",
    },
    dateText: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text,
    },
  });

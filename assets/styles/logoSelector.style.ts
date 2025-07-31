import { ColorScheme } from "@/hooks/useTheme";
import { StyleSheet } from "react-native";

export const createLogoSelectorStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.backgrounds.editInput,
      borderRadius: 20,
      padding: 16,
      gap: 16,
    },
    logoWrapper: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: "#F1F5F9",
      overflow: "hidden",
      justifyContent: "center",
      alignItems: "center",
    },
    logoImage: {
      width: "100%",
      height: "100%",
      resizeMode: "cover",
    },
    logoPlaceholder: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.border,
    },
    infoWrapper: {
      flex: 1,
    },
    nameLine: {
      fontSize: 16,
      fontWeight: "700",
    },
    nameGreen: {
      color: "#15803D",
    },
    nameRed: {
      color: "#DC2626",
    },
    button: {
      backgroundColor: "#E9D5FF",
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderRadius: 10,
    },
    buttonText: {
      color: "#7C3AED",
      fontWeight: "600",
      fontSize: 14,
    },
  });

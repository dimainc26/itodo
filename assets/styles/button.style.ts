import { ColorScheme } from "@/hooks/useTheme";
import { StyleSheet } from "react-native";

const createButtonStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.bg,
      borderRadius: 20,
      paddingHorizontal: 20,
      paddingVertical: 16,
      shadowColor: "#000",
      shadowOpacity: 0.05,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 4 },
      elevation: 4,
      marginBottom: 16,
    },
  });

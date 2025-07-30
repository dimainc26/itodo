import { ColorScheme } from "@/hooks/useTheme";
import { StyleSheet } from "react-native";

export const createTaskGroupStyles = (_: ColorScheme) => {
  return StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      padding: 16,
      borderRadius: 20,
      marginBottom: 12,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.05,
      shadowRadius: 6,
      elevation: 3,
    },
    iconWrapper: {
      width: 48,
      height: 48,
      borderRadius: 24,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 16,
    },
    textContainer: {
      flex: 1,
    },
    title: {
      fontSize: 16,
      fontWeight: "700",
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 14,
      fontWeight: "500",
    },
  });
};

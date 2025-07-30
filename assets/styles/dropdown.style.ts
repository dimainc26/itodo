import { ColorScheme } from "@/hooks/useTheme";
import { StyleSheet } from "react-native";

export const createDropdownStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    dropdown: {
      padding: 16,
      borderRadius: 20,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      shadowColor: "#000",
      shadowOpacity: 0.05,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 4 },
      elevation: 4,
    },
    groupInfo: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    iconWrapper: {
      width: 40,
      height: 40,
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
    },
    label: {
      fontSize: 13,
      fontWeight: "500",
    },
    name: {
      fontSize: 16,
      fontWeight: "700",
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: "#00000033",
      justifyContent: "center",
      paddingHorizontal: 24,
    },
    modalContent: {
      borderRadius: 20,
      padding: 20,
    },
    option: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      paddingVertical: 8,
    },
    optionText: {
      fontSize: 16,
      fontWeight: "600",
    },
  });

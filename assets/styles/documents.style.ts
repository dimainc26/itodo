import { ColorScheme } from "@/hooks/useTheme";
import { StyleSheet } from "react-native";

export const createDocumentsStyle = (colors: ColorScheme) =>
  StyleSheet.create({
    container: {
      //   flex: 1,
    },
    listContainer: {
      padding: 24,
      paddingBottom: 12,
    },
    groupItem: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.surface,
      padding: 16,
      borderRadius: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 4,
    },
    iconWrapper: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.primary + "10",
      justifyContent: "center",
      alignItems: "center",
      marginRight: 12,
    },
    groupName: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: "#00000080",
      justifyContent: "center",
      alignItems: "center",
    },
    modalContent: {
      width: "90%",
      backgroundColor: colors.gradients.background[0],
      borderRadius: 20,
      padding: 24,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: "700",
      marginBottom: 16,
      color: colors.text,
    },
    modalSaveButton: {
      marginTop: 24,
      backgroundColor: colors.primary,
      paddingVertical: 12,
      borderRadius: 12,
      alignItems: "center",
    },
    modalSaveText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "600",
    },
  });

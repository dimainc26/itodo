import { ColorScheme } from "@/hooks/useTheme";
import { StyleSheet } from "react-native";

export const createProfileStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    wrapper: {
      flex: 1,
    },
    container: {
      padding: 24,
    },
    avatarSection: {
      alignItems: "center",
      marginVertical: 20,
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
    },
    name: {
      color: colors.text,
      marginTop: 8,
      fontSize: 16,
      fontWeight: "600",
    },
    taskStats: {
      flexDirection: "row",
      gap: 24,
      marginTop: 24,
    },
    statBadge: {
      backgroundColor: colors.gradients.background[1],
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 12,
    },
    statText: {
      color: colors.textMuted,
      fontSize: 15,
      fontWeight: "700",
    },
    section: {
      marginTop: 24,
    },
    sectionTitle: {
      marginBottom: 12,
      color: colors.textMuted,
      fontSize: 20,
      fontWeight: "700",
    },
    row: {
      backgroundColor: colors.surface,
      padding: 24,
      borderRadius: 16,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 10,
    },
    rowLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    rowLabel: {
      fontSize: 15,
      fontWeight: "500",
      color: colors.text,
    },
    logout: {
      backgroundColor: colors.danger + 10,
    },
    logoutLabel: {
      color: colors.danger,
      fontSize: 15,
      fontWeight: "700",
    },
  });

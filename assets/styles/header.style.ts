import { ColorScheme } from "@/hooks/useTheme";
import { StyleSheet } from "react-native";

export const createHeaderStyles = (colors: ColorScheme) => {
  return StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 24,
      paddingTop: 24,
      paddingBottom: 12,
    },
    leftSection: {
      flexDirection: "row",
      alignItems: "center",
    },

    // Avatar__________________________________________
    avatarContainer: {
      width: 48,
      height: 48,
      borderRadius: 24,
      marginRight: 12,
      backgroundColor: colors.primary,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
    },
    avatar: {
      width: 42,
      height: 42,
    },

    // UserHero__________________________________________
    textContainer: {
      justifyContent: "center",
    },
    greeting: {
      fontSize: 15,
      fontWeight: "500",
      color: colors.textMuted,
    },
    name: {
      fontSize: 20,
      fontWeight: "700",
      color: colors.text,
    },

    // NotificationBell__________________________________________

    notificationButton: {
      width: 44,
      height: 44,
      //   borderRadius: 22,
      //   backgroundColor: colors.surface,
      justifyContent: "center",
      alignItems: "center",
      //   shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 4,
      position: "relative",
    },
    notificationBadge: {
      position: "absolute",
      backgroundColor: colors.primary,
      width: 14,
      height: 14,
      borderRadius: 9999,
      zIndex: 1,
      top: 8,
      right: 8,
    },
  });
};

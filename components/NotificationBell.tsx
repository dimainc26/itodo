import { createHeaderStyles } from "@/assets/styles/header.style";
import { NotificationSVG } from "@/data/icons";
import { useTheme } from "@/hooks/useTheme";
import React from "react";
import { TouchableOpacity, View } from "react-native";

const NotificationBell = () => {
  const { colors } = useTheme();
  const styles = createHeaderStyles(colors);

  return (
    <TouchableOpacity style={styles.notificationButton} activeOpacity={0.7}>
      <View style={styles.notificationBadge} />
      <NotificationSVG width={28} height={28} fill={colors.text} />
    </TouchableOpacity>
  );
};

export default NotificationBell;

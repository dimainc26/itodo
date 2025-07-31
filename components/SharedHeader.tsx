import { createCalendarHeaderStyles } from "@/assets/styles/calendarHeader.style";
import { LeftSVG } from "@/data/icons";
import { useTheme } from "@/hooks/useTheme";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import NotificationBell from "./NotificationBell";

interface SharedHeaderProps {
  title: string;
}

const SharedHeader = ({ title }: SharedHeaderProps) => {
  const { colors } = useTheme();
  const styles = createCalendarHeaderStyles(colors);
  const router = useRouter();

  const goBack = () => {
    if (router.canGoBack()) router.back();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goBack} style={styles.iconWrapper}>
        <LeftSVG width={24} height={24} fill={colors.text} />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      <NotificationBell />
    </View>
  );
};

export default SharedHeader;

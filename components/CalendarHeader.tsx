import { createCalendarHeaderStyles } from "@/assets/styles/calendarHeader.style";
import { LeftSVG } from "@/data/icons";
import { useTheme } from "@/hooks/useTheme";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import NotificationBell from "./NotificationBell";

const CalendarHeader = () => {
  const { colors } = useTheme();
  const styles = createCalendarHeaderStyles(colors);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconWrapper}>
        <LeftSVG width={24} height={24} fill={colors.text} />
      </TouchableOpacity>

      <Text style={styles.title}>Today’s Tasks</Text>

      <NotificationBell />
    </View>
  );
};

export default CalendarHeader;

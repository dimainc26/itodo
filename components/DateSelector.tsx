import { useTheme } from "@/hooks/useTheme";
import { createDateSelectorStyles } from "@assets/styles/dateSelector.style";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

const dates = [
  { day: "23", weekday: "Fri" },
  { day: "24", weekday: "Sat" },
  { day: "25", weekday: "Sun", selected: true },
  { day: "26", weekday: "Mon" },
  { day: "27", weekday: "Tue" },
];

const DateSelector = () => {
  const { colors } = useTheme();
  const styles = createDateSelectorStyles(colors);

  return (
    <View style={{}}>
      <FlatList
        data={dates}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.item, item.selected && styles.itemSelected]}
          >
            <Text style={[styles.day, item.selected && styles.daySelected]}>
              {item.day}
            </Text>
            <Text
              style={[styles.weekday, item.selected && styles.weekdaySelected]}
            >
              {item.weekday}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default DateSelector;

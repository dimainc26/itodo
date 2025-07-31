// components/DatePickerCard.tsx
import { CalendarSVG, DownSVG } from "@/data/icons";
import { useTheme } from "@/hooks/useTheme";
import { createDatePickerCardStyles } from "@assets/styles/datePickerCard.style";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import React, { useState } from "react";
import { Platform, Pressable, Text, View } from "react-native";

type Props = {
  label: string;
  date: Date;
  onChange: (date: Date) => void;
};

const DatePickerCard = ({ label, date, onChange }: Props) => {
  const { colors } = useTheme();
  const styles = createDatePickerCardStyles(colors);
  const [show, setShow] = useState(false);

  const onDateChange = (_event: any, selectedDate?: Date) => {
    setShow((prev) => !prev);
    if (selectedDate) onChange(selectedDate);
  };

  return (
    <>
      <Pressable
        onPress={() => setShow((prev) => !prev)}
        style={styles.container}
      >
        <View style={styles.iconWrapper}>
          <CalendarSVG width={20} color={colors.primary} />
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.dateText}>
            {dayjs(date).format("DD MMMM, YYYY")}
          </Text>
        </View>
        <DownSVG width={16} color={colors.text} />
      </Pressable>

      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === "ios" ? "inline" : "default"}
          onChange={onDateChange}
        />
      )}
    </>
  );
};

export default DatePickerCard;

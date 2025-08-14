// components/DatePickerCard.tsx
import { CalendarSVG, DownSVG } from "@/data/icons";
import { useTheme } from "@/hooks/useTheme";
import { createDatePickerCardStyles } from "@assets/styles/datePickerCard.style";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import React, { useState } from "react";
import { Platform, Pressable, Text, View } from "react-native";

type Props = {
  label: string;
  date: Date;
  onChange: (date: Date) => void;
};

type PickerMode = "date" | "time";

const DatePickerCard = ({ label, date, onChange }: Props) => {
  const { colors } = useTheme();
  const styles = createDatePickerCardStyles(colors);

  const [show, setShow] = useState(false);
  const [mode, setMode] = useState<PickerMode>("date");
  const [draftDate, setDraftDate] = useState<Date>(date);

  const openPicker = () => {
    setDraftDate(date);
    setMode("date");
    setShow(true);
  };

  const mergeDateAndTime = (datePart: Date, timePart: Date) => {
    const merged = new Date(datePart);
    merged.setHours(timePart.getHours(), timePart.getMinutes(), 0, 0);
    return merged;
  };

  const onPickerChange = (event: DateTimePickerEvent, selected?: Date) => {
    // Android: chiuso senza selezione
    if (Platform.OS === "android" && event.type === "dismissed") {
      setShow(false);
      setMode("date");
      return;
    }
    if (!selected) return;

    if (mode === "date") {
      // Step 1: scelgo la data → passo all'ora
      setDraftDate(selected);
      if (Platform.OS === "android") {
        setMode("time");
        setShow(true); // riapri in modalità time (il dialog date si chiude da solo)
      } else {
        setMode("time"); // su iOS resta aperto, cambiamo solo la modalità
      }
      return;
    }

    // Step 2: scelgo l'ora → unisco e chiudo
    const finalDate = mergeDateAndTime(draftDate, selected);
    onChange(finalDate);
    setShow(false);
    setMode("date");
  };

  return (
    <>
      <Pressable onPress={openPicker} style={styles.container}>
        <View style={styles.iconWrapper}>
          <CalendarSVG width={20} color={colors.primary} />
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.dateText}>
            {dayjs(date).format("DD MMMM, YYYY HH:mm")}
          </Text>
        </View>
        <DownSVG width={16} color={colors.text} />
      </Pressable>

      {show && (
        <DateTimePicker
          value={draftDate}
          mode={mode}
          display={
            Platform.OS === "ios"
              ? mode === "date"
                ? "inline"
                : "spinner"
              : "default"
          }
          onChange={onPickerChange}
          is24Hour
        />
      )}
    </>
  );
};

export default DatePickerCard;

import { useTheme } from "@/hooks/useTheme";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

type Props = TextInputProps & {
  label: string;
  multiline?: boolean;
};

const LabeledTextInput = ({ label, multiline = false, ...props }: Props) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && styles.multiline]}
        multiline={multiline}
        numberOfLines={multiline ? 4 : 1}
        textAlignVertical={multiline ? "top" : "center"}
        placeholderTextColor={colors.textMuted}
        {...props}
      />
    </View>
  );
};

export default LabeledTextInput;

const createStyles = (colors: ReturnType<typeof useTheme>["colors"]) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.bg,
      borderRadius: 20,
      paddingHorizontal: 20,
      paddingVertical: 16,
      shadowColor: "#000",
      shadowOpacity: 0.05,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 4 },
      elevation: 4,
      marginBottom: 16,
    },
    label: {
      fontSize: 13,
      fontWeight: "500",
      color: colors.textMuted,
      marginBottom: 8,
    },
    input: {
      fontSize: 17,
      fontWeight: "600",
      color: colors.text,
      padding: 0,
    },
    multiline: {
      minHeight: 100,
      lineHeight: 22,
    },
  });

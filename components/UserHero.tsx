import { createHeaderStyles } from "@/assets/styles/header.style";
import { useTheme } from "@/hooks/useTheme";
import React from "react";
import { Text, View } from "react-native";

interface UserTextsProps {
  name: string;
}

const UserTexts = ({ name }: UserTextsProps) => {
  const { colors } = useTheme();
  const styles = createHeaderStyles(colors);

  return (
    <View style={styles.textContainer}>
      <Text style={styles.greeting}>Hello!</Text>
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

export default UserTexts;

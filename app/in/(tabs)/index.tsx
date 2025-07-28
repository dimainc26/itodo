import { useTheme } from "@/hooks/useTheme";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const Index = () => {
  const { toggleDarkMode } = useTheme();
  return (
    <View className="" style={styles.container}>
      <Text>in tabs index</Text>
      <Pressable style={styles.button} onPress={toggleDarkMode}>
        <Text>Switch Theme</Text>
      </Pressable>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  button: {
    borderColor: "green",
    borderWidth: 2,
    padding: 12,
  },
});

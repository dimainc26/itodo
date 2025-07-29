import { createHomeStyles } from "@/assets/styles/home.style";
import { useTheme } from "@/hooks/useTheme";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Pressable, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  const { toggleDarkMode, colors } = useTheme();

  // const addTodo = useMutation(api.todos.addTodo);
  // const clearAllTodos = useMutation(api.todos.clearAllTodos);

  const homeStyles = createHomeStyles(colors);

  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={homeStyles.container}
    >
      <StatusBar barStyle={colors.statusBarStyle} />
      <SafeAreaView style={homeStyles.safeArea}>
        <View>
          <Text>in tabs index</Text>
          <Pressable style={styles.button} onPress={toggleDarkMode}>
            <Text>Add todo</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </LinearGradient>
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

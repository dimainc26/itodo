import { createHomeStyles } from "@assets/styles/home.style";
import InProgress from "@components/InProgress";
import TodayTask from "@components/TodayTask";
import { UserHeader } from "@components/UserHeader";
import { useTheme } from "@hooks/useTheme";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  const { colors } = useTheme();

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
        <UserHeader />
        <TodayTask />
        <InProgress />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Index;

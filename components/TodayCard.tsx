import { createTodayTaskStyles } from "@/assets/styles/todayTask.style";
import { api } from "@/convex/_generated/api";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import CircularProgressIndicator from "./ui/CircularProgressIndicator";
const TodayCard = () => {
  const { colors } = useTheme();
  const styles = createTodayTaskStyles(colors);

  const todos = useQuery(api.todos.getTodos, {});

  const completedCount = todos
    ? todos.filter((todo) => todo.isCompleted).length
    : 0;
  const totalCount = todos ? todos.length : 0;
  const processPercentage =
    totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const onPress = () => {};

  return (
    <View style={{ flexDirection: "row", height: "100%" }}>
      <View style={styles.left}>
        <Text style={styles.title}>Your todays task{"\n"}almost done!</Text>
        <View style={styles.leftContent}>
          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>View Task</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.right}>
        <CircularProgressIndicator
          size={72}
          strokeWidth={8}
          progress={processPercentage}
          textColor="#ffffff"
        />
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="ellipsis-horizontal" size={20} color={colors.bg} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TodayCard;

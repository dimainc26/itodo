import { api } from "@/convex/_generated/api";
import { useTheme } from "@/hooks/useTheme";
import { useQuery } from "convex/react";
import React from "react";
import { View } from "react-native";
import TodayCard from "./TodayCard";
import HeroCard from "./ui/HeroCard";

const TodayTask = () => {
  const { colors } = useTheme();

  const todos = useQuery(api.todos.getTodos);

  const completedCount = todos
    ? todos.filter((todo) => todo.isCompleted).length
    : 0;
  const totalCount = todos ? todos.length : 0;
  const processPercentage =
    totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
  return (
    <View>
      <HeroCard>
        <TodayCard />
      </HeroCard>
    </View>
  );
};

export default TodayTask;

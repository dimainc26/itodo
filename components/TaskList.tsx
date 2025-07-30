import { tasks } from "@/mocks/tasks";
import TaskItemCard from "@components/TaskItemCard";
import React from "react";
import { FlatList, View } from "react-native";

const TaskList = () => {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 100,
      }}
      renderItem={({ item }) => <TaskItemCard {...item} />}
      ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
      style={{ paddingHorizontal: 24 }}
    />
  );
};

export default TaskList;

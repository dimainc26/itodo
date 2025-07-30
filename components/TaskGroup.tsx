import { CalendarSVG, HomeSVG, UserSVG } from "@/data/icons";
import TaskGroupCard from "@components/TaskGroupCard";
import React from "react";
import { FlatList, View } from "react-native";
import { SectionHeader } from "./SectionHeader";

const DATA = [
  {
    id: "1",
    title: "Office Project",
    subtitle: "23 Tasks",
    icon: <HomeSVG width={24} height={24} fill="#EC4899" />,
    progress: 70,
    color: "#EC4899",
  },
  {
    id: "2",
    title: "Personal Project",
    subtitle: "30 Tasks",
    icon: <UserSVG width={24} height={24} fill="#8B5CF6" />,
    progress: 52,
    color: "#8B5CF6",
  },
  {
    id: "3",
    title: "Daily Study",
    subtitle: "30 Tasks",
    icon: <CalendarSVG width={24} height={24} fill="#F97316" />,
    progress: 87,
    color: "#F97316",
  },
];

const TaskGroup = () => {
  return (
    <View style={{ marginTop: 12 }}>
      <SectionHeader title="Task Groups" badgeCount={DATA.length} />

      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskGroupCard
            title={item.title}
            subtitle={item.subtitle}
            icon={item.icon}
            progress={item.progress}
            progressColor={item.color}
          />
        )}
        contentContainerStyle={{}}
        style={{ paddingHorizontal: 24 }}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        scrollEnabled={false} // rimuovi se vuoi che scrolli indipendentemente dal resto
      />
    </View>
  );
};

export default TaskGroup;

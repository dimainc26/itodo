import TaskGroup from "@/components/TaskGroup";
import Outside from "@/components/ui/Outside";
import InProgress from "@components/InProgress";
import TodayTask from "@components/TodayTask";
import { UserHeader } from "@components/UserHeader";
import React from "react";
import { FlatList } from "react-native";

const Index = () => {
  return (
    <Outside>
      <UserHeader />

      <FlatList
        data={[]}
        keyExtractor={undefined}
        renderItem={null}
        contentContainerStyle={{ gap: 16, paddingBottom: 32 }}
        ListHeaderComponent={
          <>
            <TodayTask />
            <InProgress />
            <TaskGroup />
          </>
        }
      />
    </Outside>
  );
};

export default Index;

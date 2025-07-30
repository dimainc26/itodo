import CalendarHeader from "@/components/CalendarHeader";
import DateSelector from "@/components/DateSelector";
import { TabFilter } from "@/components/TabFilter";
import TaskList from "@/components/TaskList";
import { TASK_FILTER_TABS } from "@/constants/filters";
import Outside from "@components/ui/Outside";
import React, { useState } from "react";
import { FlatList } from "react-native";

const Calendar = () => {
  const [activeTab, setActiveTab] = useState("All");
  return (
    <Outside>
      <CalendarHeader />
      <FlatList
        data={[]}
        keyExtractor={undefined}
        renderItem={null}
        contentContainerStyle={{ gap: 16, paddingBottom: 32 }}
        ListHeaderComponent={
          <>
            <DateSelector />
            <TabFilter
              activeTab={activeTab}
              onTabPress={setActiveTab}
              tabs={TASK_FILTER_TABS}
            />
            <TaskList />
          </>
        }
      />
    </Outside>
  );
};

export default Calendar;

import DatePickerCard from "@/components/DatePickerCard";
import LabeledTextInput from "@/components/LabeledTextInput";
import LogoSelector from "@/components/LogoSelector";
import PrioritySelector, { PriorityLevel } from "@/components/PrioritySelector";
import TaskGroupDropdown from "@/components/TaskGroupDropdown";
import Outside from "@/components/ui/Outside";
import SquircleButton from "@/components/ui/SquircleButton";
import { groupOptions } from "@/mocks/groupList";
import SharedHeader from "@components/SharedHeader";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const Add = () => {
  const [selectedGroup, setSelectedGroup] = useState(groupOptions[0]);

  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [priority, setPriority] = useState<PriorityLevel>("Medium");

  return (
    <Outside>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={0} // modifica se hai header fissi
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}
            style={{}}
            showsVerticalScrollIndicator={false}
          >
            <SharedHeader title="Add Task" />
            <TaskGroupDropdown
              groups={groupOptions}
              selectedGroupId={selectedGroup.id}
              onSelect={(group) => setSelectedGroup(group)}
            />
            <View
              style={{
                paddingHorizontal: 24,
                paddingTop: 24,
                paddingBottom: 12,
              }}
            >
              <PrioritySelector selected={priority} onSelect={setPriority} />
            </View>

            <View
              style={{
                paddingHorizontal: 24,
                flexDirection: "column",
                gap: 12,
                paddingTop: 12,
              }}
            >
              <LabeledTextInput
                label="Task Name"
                placeholder="Grocery Shopping App"
                value={projectName}
                onChangeText={setProjectName}
              />

              <LabeledTextInput
                label="Description"
                placeholder="Describe the project..."
                multiline
                value={description}
                onChangeText={setDescription}
              />
            </View>
            <View style={{ paddingHorizontal: 24 }}>
              <DatePickerCard
                label="Start Date"
                date={startDate}
                onChange={setStartDate}
              />
              <DatePickerCard
                label="End Date"
                date={endDate}
                onChange={setEndDate}
              />
            </View>
            <View
              style={{
                paddingHorizontal: 24,
              }}
            >
              <LogoSelector />
            </View>
            <SquircleButton onPress={() => {}} title="Add task" />
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Outside>
  );
};

export default Add;

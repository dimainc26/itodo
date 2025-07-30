import LabeledTextInput from "@/components/LabeledTextInput";
import TaskGroupDropdown from "@/components/TaskGroupDropdown";
import Outside from "@/components/ui/Outside";
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
            contentContainerStyle={{ flexGrow: 1 }}
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
                flexDirection: "column",
                gap: 12,
                paddingTop: 24,
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
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Outside>
  );
};

export default Add;

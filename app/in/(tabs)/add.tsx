import DatePickerCard from "@/components/DatePickerCard";
import LabeledTextInput from "@/components/LabeledTextInput";
import LogoSelector from "@/components/LogoSelector";
import PrioritySelector, { PriorityLevel } from "@/components/PrioritySelector";
import SharedHeader from "@/components/SharedHeader";
import TaskGroupDropdown from "@/components/TaskGroupDropdown";
import Outside from "@/components/ui/Outside";
import SquircleButton from "@/components/ui/SquircleButton";
import { useProjects } from "@/hooks/useProjects";
import { useTodos, type Priority } from "@/hooks/useTodos";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const priorityMap: Record<PriorityLevel, Priority> = {
  Low: "low",
  Medium: "medium",
  High: "high",
};

const Add = () => {
  const { list: projects } = useProjects();
  const { add } = useTodos();

  const [selectedProjectId, setSelectedProjectId] = useState<
    string | undefined
  >(undefined);

  // Imposta automaticamente il primo progetto quando arrivano i dati
  useEffect(() => {
    if (!selectedProjectId && projects && projects.length > 0) {
      setSelectedProjectId(String(projects[0]._id));
    }
  }, [projects, selectedProjectId]);

  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");

  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  const [priority, setPriority] = useState<PriorityLevel>("Medium");
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = useMemo(
    () => projectName.trim().length > 0 && !!startDate && !!priority,
    [projectName, startDate, priority]
  );

  const handleAdd = useCallback(async () => {
    if (submitting) return;
    if (!canSubmit) {
      Alert.alert(
        "Missing data",
        "Title, Start Date and Priority are required."
      );
      return;
    }

    const startMs = startDate.getTime();
    const endMs = endDate?.getTime?.();

    if (endMs !== undefined && endMs < startMs) {
      Alert.alert("Invalid dates", "End Date cannot be before Start Date.");
      return;
    }

    try {
      setSubmitting(true);
      await add({
        title: projectName.trim(),
        startDate: startMs,
        priority: priorityMap[priority],
        description: description.trim() || undefined,
        endDate: endMs,
        // Convex Id<"projects"> viene serializzato come stringa dal client
        projectId: selectedProjectId as any, // se hai il tipo Id<"projects"> importa e tipizza meglio
      });

      // reset soft
      setProjectName("");
      setDescription("");
      setPriority("Medium");
      setStartDate(new Date());
      setEndDate(new Date());
      // non resetto il project per comodità dell’utente

      Alert.alert("Success", "Task created.");
    } catch (err: any) {
      Alert.alert("Error", err?.message ?? "Failed to create task.");
    } finally {
      setSubmitting(false);
    }
  }, [
    add,
    canSubmit,
    description,
    endDate,
    priority,
    projectName,
    selectedProjectId,
    startDate,
    submitting,
  ]);

  return (
    <Outside>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <SharedHeader title="Add Task" />

            {/* Dropdown controllato */}
            <TaskGroupDropdown
              selectedGroupId={selectedProjectId}
              onSelect={(g) => setSelectedProjectId(g.id)}
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
                placeholder="Describe the task..."
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

            <View style={{ paddingHorizontal: 24 }}>
              <LogoSelector />
            </View>

            <SquircleButton
              title={submitting ? "Saving..." : "Add task"}
              onPress={handleAdd}
              disabled={!canSubmit || submitting}
            />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Outside>
  );
};

export default Add;

// components/TaskGroup.tsx
import TaskGroupCard from "@components/TaskGroupCard";
import React, { useMemo } from "react";
import { FlatList, Text, View } from "react-native";
import { SectionHeader } from "./SectionHeader";

import { computeProgress } from "@/functions/computeProgress";
import { useProjects } from "@/hooks/useProjects";
import { useTheme } from "@/hooks/useTheme";
import { useTodos } from "@/hooks/useTodos";
import { renderProjectIcon } from "@/utils/renderProjectIcon";

const TaskGroup = () => {
  const { colors } = useTheme();
  const { list: projects } = useProjects();
  const { list: todos } = useTodos();

  // prepara i dati per la UI
  const data = useMemo(() => {
    if (!projects) return [];
    return projects.map((p) => {
      const { total, pct } = computeProgress(todos, String(p._id));
      return {
        id: String(p._id),
        title: p.name,
        subtitle: `${total} ${total === 1 ? "Task" : "Tasks"}`,
        icon: renderProjectIcon({
          family: p.iconFamily as any,
          name: p.iconType,
          color: p.color,
          size: 20,
        }),
        progress: pct,
        color: p.color,
      };
    });
  }, [projects, todos]);

  if (!projects) {
    return (
      <View style={{ marginTop: 12, paddingHorizontal: 24 }}>
        <SectionHeader title="Task Groups" badgeCount={0} />
        <Text style={{ color: colors.textMuted, marginTop: 8 }}>Loading…</Text>
      </View>
    );
  }

  if (projects.length === 0) {
    return (
      <View style={{ marginTop: 12, paddingHorizontal: 24 }}>
        <SectionHeader title="Task Groups" badgeCount={0} />
        <Text style={{ color: colors.textMuted, marginTop: 8 }}>
          Nessun progetto ancora. Creane uno per iniziare.
        </Text>
      </View>
    );
  }

  return (
    <View style={{ marginTop: 12 }}>
      <SectionHeader title="Task Groups" badgeCount={projects.length} />

      <FlatList
        data={data}
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
        scrollEnabled={false}
      />
    </View>
  );
};

export default TaskGroup;

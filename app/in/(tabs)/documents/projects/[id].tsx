import SharedHeader from "@/components/SharedHeader";
import TaskItemCard from "@/components/TaskItemCard";
import Outside from "@/components/ui/Outside";
import { computeProgress } from "@/functions/computeProgress";
import { useProjects, type IconFamily } from "@/hooks/useProjects";
import { useTheme } from "@/hooks/useTheme";
import { useTodos } from "@/hooks/useTodos";
import { TaskStatus } from "@/models/taskType";
import { renderProjectIcon } from "@/utils/renderProjectIcon";
import { useLocalSearchParams } from "expo-router";
import React, { useMemo } from "react";
import { FlatList, Text, View } from "react-native";

const ProjectDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors } = useTheme();

  const { list: projects } = useProjects();
  const { list: todos } = useTodos({ projectId: id as any });

  const project = useMemo(
    () => (projects ?? []).find((p) => String(p._id) === String(id)),
    [projects, id]
  );
  const { pct: progress } = computeProgress(todos, String(project!._id));

  if (!project) {
    return (
      <Outside>
        <SharedHeader title="Project" />
        <View style={{ padding: 24 }}>
          <Text style={{ color: colors.textMuted }}>Loading…</Text>
        </View>
      </Outside>
    );
  }

  const Icon = renderProjectIcon({
    family: project.iconFamily as IconFamily,
    name: project.iconType,
    color: project.color,
    size: 22,
  });

  return (
    <Outside>
      <SharedHeader title={project.name} />

      {/* Header progetto */}
      <View style={{ paddingHorizontal: 24, paddingBottom: 12 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
            marginBottom: 8,
          }}
        >
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: project.color + "22",
            }}
          >
            {Icon}
          </View>
        </View>

        {project.description ? (
          <Text style={{ color: colors.textMuted, marginBottom: 6 }}>
            {project.description}
          </Text>
        ) : null}

        <Text style={{ color: colors.text }}>
          Status: <Text style={{ fontWeight: "600" }}>{project.status}</Text>
        </Text>

        <Text style={{ color: colors.text, marginTop: 4 }}>
          Progress: <Text style={{ fontWeight: "600" }}>{progress}%</Text>
        </Text>
      </View>

      {/* Lista task del progetto */}
      <FlatList
        data={todos ?? []}
        keyExtractor={(t) => String(t._id)}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: 100,
        }}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        renderItem={({ item }) => (
          <TaskItemCard
            id={project._id}
            project={project.name}
            title={item.title}
            time={
              item.startDate
                ? new Date(item.startDate).toLocaleDateString()
                : "-"
            }
            status={item.isCompleted ? TaskStatus.Done : TaskStatus.InProgress}
            iconFamily={project.iconFamily as IconFamily}
            iconType={project.iconType as any}
            color={project.color}
          />
        )}
      />
    </Outside>
  );
};

export default ProjectDetails;

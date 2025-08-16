import { useProjects } from "@/hooks/useProjects";
import { useTodos } from "@/hooks/useTodos";
import type { TaskItemProps } from "@/models/taskType";
import TaskItemCard from "@components/TaskItemCard";
import React, { useMemo } from "react";
import { FlatList, View } from "react-native";

// helper: zero-pad
const z = (n: number) => (n < 10 ? `0${n}` : `${n}`);

// HH:mm - HH:mm (se end mancante, mostra solo start)
const formatTimeRange = (startMs: number, endMs?: number) => {
  const s = new Date(startMs);
  const start = `${z(s.getHours())}:${z(s.getMinutes())}`;
  if (!endMs) return start;
  const e = new Date(endMs);
  const end = `${z(e.getHours())}:${z(e.getMinutes())}`;
  return `${start} - ${end}`;
};

// status leggibile da isCompleted + date
const humanStatus = (isCompleted: boolean, startMs: number) => {
  if (isCompleted) return "Done" as const;
  const now = Date.now();
  return startMs > now ? ("To-do" as const) : ("In Progress" as const);
};

const TaskList = () => {
  const { list: todos } = useTodos(); // documenti "todos" da Convex
  const { list: projects } = useProjects(); // documenti "projects" da Convex

  // Mappa: projectId -> progetto
  type ProjectType = NonNullable<typeof projects>[number];

  const projectMap = useMemo(() => {
    const map = new Map<string, ProjectType>();
    (projects ?? []).forEach((p) => map.set(String(p._id), p));
    return map;
  }, [projects]);

  // Converte i todos nel view model richiesto da TaskItemCard (TaskItemProps)
  const items: TaskItemProps[] | undefined = useMemo(() => {
    if (!todos) return undefined;

    return todos.map((t) => {
      const proj = t.projectId
        ? projectMap.get(String(t.projectId))
        : undefined;

      const projectName = proj?.name ?? "General";
      const iconType = (proj?.iconType as any) ?? "folder-outline";
      const color = proj?.color ?? "#8B5CF6";

      const time = formatTimeRange(t.startDate, t.endDate);
      const status = humanStatus(t.isCompleted, t.startDate);

      return {
        id: String(t._id),
        project: projectName,
        title: t.title,
        time,
        status,
        iconType,
        color,
        iconFamily: proj?.iconFamily,
      } as TaskItemProps;
    });
  }, [todos, projectMap]);

  if (!items) return <View />;

  return (
    <FlatList
      data={items}
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

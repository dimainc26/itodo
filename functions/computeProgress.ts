import { useTodos } from "@/hooks/useTodos";

export const computeProgress = (
  todos: ReturnType<typeof useTodos>["list"],
  projectId: string
) => {
  const list = (todos ?? []).filter(
    (t) => String(t.projectId ?? "") === projectId
  );
  const total = list.length;
  if (total === 0) return { total, done: 0, pct: 0 };
  const done = list.filter((t) => t.isCompleted).length;
  return { total, done, pct: Math.round((done / total) * 100) };
};

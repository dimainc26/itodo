// hooks/useTodos.ts
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";

export type Priority = "low" | "medium" | "high";

export type AddTodoInput = {
  title: string;
  startDate: number; // timestamp ms
  priority: Priority;
  endDate?: number;
  description?: string;
  projectId?: Id<"projects">; // 🔗 tipizzato correttamente
};

export type UpdateTodoPayload = Partial<{
  title: string;
  startDate: number;
  endDate: number;
  priority: Priority;
  description: string;
  projectId: Id<"projects">; // 🔗 tipizzato correttamente
  isCompleted: boolean;
}>;

type Filters = {
  projectId?: Id<"projects">; // 🔗
  onlyCompleted?: boolean;
  skip?: boolean; // skippa tutte le query
  withStartDateList?: boolean; // carica anche getTodosByStartDate
  direction?: "asc" | "desc";
};

export const useTodos = (filters?: Filters) => {
  const shouldSkip = !!filters?.skip;

  const baseArgs = shouldSkip
    ? ("skip" as const)
    : ({
        projectId: filters?.projectId,
        onlyCompleted: filters?.onlyCompleted,
      } as const);

  // Queries
  const list = useQuery(api.todos.getTodos, baseArgs);

  const listByStartDate = useQuery(
    api.todos.getTodosByStartDate,
    shouldSkip || !filters?.withStartDateList
      ? "skip"
      : {
          projectId: filters?.projectId,
          direction: filters?.direction ?? "asc",
        }
  );

  // Mutations
  const _add = useMutation(api.todos.addTodo);
  const _toggle = useMutation(api.todos.toggleTodo);
  const _update = useMutation(api.todos.updateTodo);
  const _delete = useMutation(api.todos.deleteTodo);

  return {
    list, // undefined durante il loading
    listByStartDate, // undefined se skipped/non richiesto
    add: (input: AddTodoInput) => _add(input),
    toggle: (id: Id<"todos">) => _toggle({ id }),
    update: (id: Id<"todos">, payload: UpdateTodoPayload) =>
      _update({ id, payload }),
    remove: (id: Id<"todos">) => _delete({ id }),
  };
};

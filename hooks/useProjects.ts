// hooks/useProjects.ts
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";

export type ProjectStatus = "to-do" | "in progress" | "done";
export type IconFamily = "ionicons" | "feather" | "materialCommunity";

export type AddProjectInput = {
  name: string;
  iconFamily: IconFamily;
  iconType: string; // es. "folder-outline"
  color: string; // es. "#8B5CF6"
  status?: ProjectStatus;
  description?: string;
};

export type UpdateProjectPayload = Partial<{
  name: string;
  iconType: string;
  color: string;
  status: ProjectStatus;
  // description: string;
}>;

type Filters = {
  skip?: boolean;
};

export const useProjects = (filters?: Filters) => {
  const shouldSkip = !!filters?.skip;

  const list = useQuery(api.projects.getProjects, shouldSkip ? "skip" : {});

  const _add = useMutation(api.projects.addProject);
  const _update = useMutation(api.projects.updateProject);
  const _delete = useMutation(api.projects.deleteProject);
  const _clearAll = useMutation(api.projects.clearAllProjects);

  return {
    list, // undefined durante il loading
    add: (input: AddProjectInput) => _add(input),
    update: (id: Id<"projects">, payload: UpdateProjectPayload) =>
      _update({ id, payload }),
    remove: (id: Id<"projects">) => _delete({ id }),
    clearAll: () => _clearAll(),
  };
};

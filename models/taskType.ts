export enum TaskStatus {
  Done = "Done",
  InProgress = "In Progress",
  ToDo = "To-do",
}

export type TaskType = {
  id: string;
  project: string;
  title: string;
  time: string;
  status: TaskStatus;
  iconType: "briefcase-outline" | "document-text-outline" | "book-outline";
  color: string;
  iconFamily?: "ionicons" | "feather" | "materialCommunity";
};

export type TaskItemProps = TaskType;

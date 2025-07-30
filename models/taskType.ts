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
};

export type TaskItemProps = TaskType;

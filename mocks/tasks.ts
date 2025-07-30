import { TaskStatus, TaskType } from "@/models/taskType";

export const tasks: TaskType[] = [
  {
    id: "1",
    project: "Grocery shopping app design",
    title: "Market Research",
    time: "10:00 AM",
    status: TaskStatus.Done,
    iconType: "briefcase-outline",
    color: "#EC4899",
  },
  {
    id: "2",
    project: "Grocery shopping app design",
    title: "Competitive Analysis",
    time: "12:00 PM",
    status: TaskStatus.InProgress,
    iconType: "briefcase-outline",
    color: "#F97316",
  },
  {
    id: "3",
    project: "Uber Eats redesign challange",
    title: "Create Low-fidelity Wireframe",
    time: "07:00 PM",
    status: TaskStatus.ToDo,
    iconType: "document-text-outline",
    color: "#8B5CF6",
  },
  {
    id: "4",
    project: "About design sprint",
    title: "How to pitch a Design Sprint",
    time: "09:00 PM",
    status: TaskStatus.ToDo,
    iconType: "book-outline",
    color: "#F97316",
  },
];

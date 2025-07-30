import { useTheme } from "@/hooks/useTheme";
import { TaskItemProps } from "@/models/taskType";
import { createTaskItemStyles } from "@assets/styles/taskItem.style";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

const TaskItemCard = ({
  project,
  title,
  time,
  status,
  iconType,
  color,
}: TaskItemProps) => {
  const { colors } = useTheme();
  const styles = createTaskItemStyles(colors);

  const statusColorMap: Record<typeof status, string> = {
    Done: "#8B5CF6",
    "In Progress": "#FB923C",
    "To-do": "#38BDF8",
  };

  return (
    <View style={[styles.card]}>
      <View style={styles.header}>
        <Text style={styles.project}>{project}</Text>
        <View style={[styles.iconContainer, { backgroundColor: color + "20" }]}>
          <Ionicons name={iconType} size={16} color={color} />
        </View>
      </View>

      <Text style={styles.title}>{title}</Text>

      <View style={styles.footer}>
        <View style={styles.timeContainer}>
          <Ionicons name="time-outline" size={16} color="#8B5CF6" />
          <Text style={styles.time}>{time}</Text>
        </View>

        <View
          style={[
            styles.statusBadge,
            { backgroundColor: statusColorMap[status] + "20" },
          ]}
        >
          <Text style={[styles.statusText, { color: statusColorMap[status] }]}>
            {status}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TaskItemCard;

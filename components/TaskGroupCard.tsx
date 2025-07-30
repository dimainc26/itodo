import { createTaskGroupStyles } from "@/assets/styles/taskGroup.style";
import { useTheme } from "@/hooks/useTheme";
import React from "react";
import { Text, View } from "react-native";
import CircularProgressIndicator from "./ui/CircularProgressIndicator";

type Props = {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  progress: number;
  progressColor: string;
};

const TaskGroupCard = ({
  title,
  subtitle,
  icon,
  progress,
  progressColor,
}: Props) => {
  const { colors } = useTheme();

  const styles = createTaskGroupStyles(colors);

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <View
        style={[styles.iconWrapper, { backgroundColor: progressColor + "20" }]}
      >
        {icon}
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.subtitle, { color: colors.textMuted }]}>
          {subtitle}
        </Text>
      </View>
      <CircularProgressIndicator
        progress={progress}
        size={50}
        strokeWidth={5}
        progressColor={progressColor}
        textColor={colors.text}
      />
    </View>
  );
};

export default TaskGroupCard;

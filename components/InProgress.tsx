import { lighten } from "@/functions/UI/lighten";
import { computeProgress } from "@/functions/computeProgress";
import { useProjects } from "@/hooks/useProjects";
import { useTheme } from "@/hooks/useTheme";
import { useTodos } from "@/hooks/useTodos";
import { createInProgressStyles } from "@assets/styles/inProgress.style";
import React, { useMemo } from "react";
import { ScrollView, View } from "react-native";
import InProgressCard from "./InProgressCard";
import { SectionHeader } from "./SectionHeader";

const InProgress = () => {
  const { colors } = useTheme();
  const styles = createInProgressStyles(colors);

  const { list: projects } = useProjects();
  const { list: todos } = useTodos();

  const inProgressProjects = useMemo(
    () => (projects ?? []).filter((p) => p.status === "in progress"),
    [projects]
  );

  const cards = useMemo(() => {
    if (!todos) return [];
    return inProgressProjects.map((p) => {
      const { pct: progress } = computeProgress(todos, String(p._id));
      const base = p.color || "#3B82F6";
      return {
        key: String(p._id),
        title: p.name,
        projectType:
          p.description && p.description.trim().length > 0
            ? p.description
            : "Project",
        iconFamily: p.iconFamily as
          | "ionicons"
          | "feather"
          | "materialCommunity",
        iconType: p.iconType,
        progress,
        backgroundColor: lighten(base, 0.9),
        iconColor: base,
        progressColor: base,
      };
    });
  }, [inProgressProjects, todos]);

  return (
    <View style={styles.sectionContainer}>
      <SectionHeader
        title="In Progress"
        badgeCount={inProgressProjects.length}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24 }}
      >
        {cards.map((card) => (
          <InProgressCard
            key={card.key}
            title={card.title}
            projectType={card.projectType}
            iconFamily={card.iconFamily}
            iconType={card.iconType}
            progress={card.progress}
            backgroundColor={card.backgroundColor}
            iconColor={card.iconColor}
            progressColor={card.progressColor}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default InProgress;

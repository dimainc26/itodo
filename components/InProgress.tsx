import type { Doc } from "@/convex/_generated/dataModel";
import { useProjects } from "@/hooks/useProjects";
import { useTheme } from "@/hooks/useTheme";
import { useTodos } from "@/hooks/useTodos";
import { createInProgressStyles } from "@assets/styles/inProgress.style";
import React, { useMemo } from "react";
import { ScrollView, View } from "react-native";
import InProgressCard from "./InProgressCard";
import { SectionHeader } from "./SectionHeader";

// schiarisce un hex verso il bianco
const lighten = (hex: string, p: number) => {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!m) return hex;
  const toDec = (s: string) => parseInt(s, 16);
  const toHex = (n: number) =>
    Math.min(255, Math.max(0, Math.round(n)))
      .toString(16)
      .padStart(2, "0");
  const r = toDec(m[1]),
    g = toDec(m[2]),
    b = toDec(m[3]);
  const R = toHex(r + (255 - r) * p);
  const G = toHex(g + (255 - g) * p);
  const B = toHex(b + (255 - b) * p);
  return `#${R}${G}${B}`;
};

// Calcola progresso (%) da todos del progetto
const computeProgress = (allTodos: Doc<"todos">[], projectId: string) => {
  const inProject = allTodos.filter(
    (t) => String(t.projectId ?? "") === projectId
  );
  const total = inProject.length;
  if (total === 0) return 0;
  const done = inProject.filter((t) => t.isCompleted).length;
  return Math.round((done / total) * 100);
};

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
      const progress = computeProgress(todos, String(p._id));
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
        iconColor: lighten(base, 0.75),
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

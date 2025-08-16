// utils/renderProjectIcon.tsx
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";

// keep it in sync with your useProjects type
export type IconFamily = "ionicons" | "feather" | "materialCommunity";

type Props = {
  family?: IconFamily | null;
  name?: string | null;
  color?: string;
  size?: number;
};

export function renderProjectIcon({
  family = "ionicons",
  name = "folder-outline",
  color = "#8B5CF6",
  size = 16,
}: Props) {
  const iconName = name as any;

  switch (family) {
    case "feather":
      return <Feather name={iconName} size={size} color={color} />;
    case "materialCommunity":
      return (
        <MaterialCommunityIcons name={iconName} size={size} color={color} />
      );
    case "ionicons":
    default:
      return <Ionicons name={iconName} size={size} color={color} />;
  }
}

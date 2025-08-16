import { lighten } from "@/functions/UI/lighten";
import { useTheme } from "@/hooks/useTheme";
import { createInProgressStyles } from "@assets/styles/inProgress.style";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

type IconFamily = "ionicons" | "feather" | "materialCommunity";

interface Props {
  title: string;
  projectType: string;
  iconFamily: IconFamily;
  iconType: string; // es. "folder-outline"
  progress: number;
  backgroundColor: string;
  iconColor: string;
  progressColor: string;
}

const InProgressCard = ({
  title,
  projectType,
  iconFamily,
  iconType,
  progress,
  backgroundColor,
  iconColor,
  progressColor,
}: Props) => {
  const { colors } = useTheme();
  const styles = createInProgressStyles(colors);

  const renderProjectIcon = (
    family: IconFamily,
    name: string,
    color: string
  ) => {
    switch (family) {
      case "feather":
        return <Feather name={name as any} size={16} color={color} />;
      case "materialCommunity":
        return (
          <MaterialCommunityIcons name={name as any} size={16} color={color} />
        );
      case "ionicons":
      default:
        return <Ionicons name={name as any} size={16} color={color} />;
    }
  };

  return (
    <View style={[styles.card, { backgroundColor }]}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardProjectType}>{projectType}</Text>
        <View
          style={[
            styles.cardIconWrapper,
            { backgroundColor: lighten(iconColor, 0.75) },
          ]}
        >
          {renderProjectIcon(iconFamily, iconType, iconColor)}
        </View>
      </View>
      <Text style={styles.cardTitle}>{title}</Text>
      <View style={styles.cardProgressBarWrapper}>
        <View style={styles.cardProgressBarBg}>
          <View
            style={[
              styles.cardProgressBarFill,
              { width: `${progress}%`, backgroundColor: progressColor },
            ]}
          />
        </View>
      </View>
    </View>
  );
};

export default InProgressCard;

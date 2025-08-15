import { useTheme } from "@/hooks/useTheme";
import { createInProgressStyles } from "@assets/styles/inProgress.style";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

type IconFamily = "ionicons" | "feather" | "materialCommunity";

interface Props {
  title: string;
  projectType: string;
  iconFamily: IconFamily; // nuova prop
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

  const renderIcon = () => {
    switch (iconFamily) {
      case "feather":
        return (
          <Feather
            name={iconType as keyof typeof Feather.glyphMap}
            size={16}
            color={colors.primary}
          />
        );
      case "materialCommunity":
        return (
          <MaterialCommunityIcons
            name={iconType as keyof typeof MaterialCommunityIcons.glyphMap}
            size={16}
            color={colors.primary}
          />
        );
      case "ionicons":
      default:
        return (
          <Ionicons
            name={iconType as keyof typeof Ionicons.glyphMap}
            size={16}
            color={colors.primary}
          />
        );
    }
  };

  return (
    <View style={[styles.card, { backgroundColor }]}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardProjectType}>{projectType}</Text>
        <View style={[styles.cardIconWrapper, { backgroundColor: iconColor }]}>
          {renderIcon()}
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

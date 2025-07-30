import { useTheme } from "@/hooks/useTheme";
import { createInProgressStyles } from "@assets/styles/inProgress.style";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

interface Props {
  title: string;
  projectType: string;
  iconName: keyof typeof Feather.glyphMap;
  progress: number;
  backgroundColor: string;
  iconColor: string;
  progressColor: string;
}

const InProgressCard = ({
  title,
  projectType,
  iconName,
  progress,
  backgroundColor,
  iconColor,
  progressColor,
}: Props) => {
  const { colors } = useTheme();
  const styles = createInProgressStyles(colors);

  return (
    <View style={[styles.card, { backgroundColor }]}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardProjectType}>{projectType}</Text>
        <View style={[styles.cardIconWrapper, { backgroundColor: iconColor }]}>
          <Feather name={iconName} size={16} color={colors.primary} />
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

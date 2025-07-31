import { createPriorityStyles } from "@/assets/styles/prioritySelector.style";
import { useTheme } from "@/hooks/useTheme";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export type PriorityLevel = "Low" | "Medium" | "High";

type Props = {
  levels?: PriorityLevel[];
  selected: PriorityLevel;
  onSelect: (level: PriorityLevel) => void;
};

const defaultLevels: PriorityLevel[] = ["Low", "Medium", "High"];

const PrioritySelector = ({
  levels = defaultLevels,
  selected,
  onSelect,
}: Props) => {
  const { colors } = useTheme();
  const styles = createPriorityStyles(colors);

  const getGradient = (level: PriorityLevel) => {
    switch (level) {
      case "Low":
        return colors.gradients.success;
      case "Medium":
        return colors.gradients.warning;
      case "High":
        return colors.gradients.danger;
    }
  };

  return (
    <View style={styles.container}>
      {levels.map((level) => {
        const isActive = selected === level;
        const gradientColors = getGradient(level);

        return (
          <TouchableOpacity
            key={level}
            style={[styles.buttonWrapper, isActive && styles.activeWrapper]}
            onPress={() => onSelect(level)}
            activeOpacity={0.8}
          >
            {isActive ? (
              <LinearGradient colors={gradientColors} style={styles.button}>
                <Text style={styles.buttonTextActive}>{level}</Text>
              </LinearGradient>
            ) : (
              <View
                style={{
                  ...styles.button,
                  backgroundColor: colors.bg,
                }}
              >
                <Text style={styles.buttonTextInactive}>{level}</Text>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default PrioritySelector;

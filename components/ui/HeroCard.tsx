import { createTodayTaskStyles } from "@/assets/styles/todayTask.style";
import { useTheme } from "@/hooks/useTheme";
import React, { ReactNode } from "react";
import { View } from "react-native";

interface HeroCardProps {
  children: ReactNode;
}

const HeroCard = ({ children }: HeroCardProps) => {
  const { colors } = useTheme();
  const styles = createTodayTaskStyles(colors);

  return <View style={styles.card}>{children}</View>;
};

export default HeroCard;

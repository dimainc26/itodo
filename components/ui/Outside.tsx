import { createHomeStyles } from "@assets/styles/home.style";
import { useTheme } from "@hooks/useTheme";
import { LinearGradient } from "expo-linear-gradient";
import React, { ReactNode } from "react";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface OutsideProps {
  children: ReactNode;
}

const Outside = ({ children }: OutsideProps) => {
  const { colors } = useTheme();

  const homeStyles = createHomeStyles(colors);

  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={homeStyles.container}
    >
      <StatusBar barStyle={colors.statusBarStyle} />
      <SafeAreaView style={homeStyles.safeArea}>{children}</SafeAreaView>
    </LinearGradient>
  );
};

export default Outside;

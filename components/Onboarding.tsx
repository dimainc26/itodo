import { createOnboardingStyles } from "@/assets/styles/onboarding.style";
import { BusyImage } from "@/data/images";
import { useTheme } from "@/hooks/useTheme";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";
import SquircleButton from "./ui/SquircleButton";

const Onboarding = () => {
  const router = useRouter();
  const { colors } = useTheme();
  const styles = createOnboardingStyles(colors);

  return (
    <View style={styles.container}>
      <Image
        source={BusyImage}
        style={styles.illustration}
        resizeMode="contain"
      />

      <View style={styles.textContainer}>
        <Text style={styles.title}>Task Management &{"\n"}To-Do List</Text>
        <Text style={styles.subtitle}>
          This productive tool is designed to help you better manage your task
          project-wise conveniently!
        </Text>
      </View>

      <SquircleButton
        title="Let’s Start"
        onPress={() => router.replace("/in")}
      />
    </View>
  );
};

export default Onboarding;

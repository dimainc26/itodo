import { useTheme } from "@/hooks/useTheme";
import { createInProgressStyles } from "@assets/styles/inProgress.style";
import React from "react";
import { ScrollView, View } from "react-native";
import InProgressCard from "./InProgressCard";
import { SectionHeader } from "./SectionHeader";

const InProgress = () => {
  const { colors } = useTheme();
  const styles = createInProgressStyles(colors);

  return (
    <View style={styles.sectionContainer}>
      <SectionHeader title="In Progress" badgeCount={6} />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24 }}
      >
        <InProgressCard
          title="Grocery shopping app design"
          projectType="Office Project"
          iconName="briefcase"
          progress={60}
          backgroundColor="#E7F3FF"
          iconColor="#F8D6F8"
          progressColor="#0087FF"
        />
        <InProgressCard
          title="Uber Eats redesign challange"
          projectType="Personal Project"
          iconName="heart"
          progress={40}
          backgroundColor="#FFE9E4"
          iconColor="#FDD1CC"
          progressColor="#FF7F50"
        />
      </ScrollView>
    </View>
  );
};

export default InProgress;

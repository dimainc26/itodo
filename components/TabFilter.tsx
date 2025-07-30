import { useTheme } from "@/hooks/useTheme";
import { createTabFilterStyles } from "@assets/styles/tabFilter.style";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

type TabFilterProps = {
  tabs: string[];
  activeTab: string;
  onTabPress: (tab: string) => void;
};

export const TabFilter = ({ tabs, activeTab, onTabPress }: TabFilterProps) => {
  const { colors } = useTheme();
  const styles = createTabFilterStyles(colors);

  return (
    <View style={{}}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {tabs.map((tab) => {
          const isActive = tab === activeTab;
          return (
            <TouchableOpacity
              key={tab}
              onPress={() => onTabPress(tab)}
              style={[
                styles.tab,
                isActive ? styles.tabActive : styles.tabInactive,
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  isActive ? styles.tabTextActive : styles.tabTextInactive,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

import { createDocumentsStyle } from "@/assets/styles/documents.style";
import SquircleButton from "@/components/ui/SquircleButton";
import { useTheme } from "@/hooks/useTheme";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { FlatList, Text, View } from "react-native";

import { useProjects, type IconFamily } from "@/hooks/useProjects";
import { router } from "expo-router";

const GroupList = () => {
  const { colors } = useTheme();
  const styles = createDocumentsStyle(colors);

  // Convex
  const { list: projects } = useProjects();

  const renderProjectIcon = (
    family: IconFamily,
    name: string,
    color: string
  ) => {
    switch (family) {
      case "feather":
        return <Feather name={name as any} size={20} color={color} />;
      case "materialCommunity":
        return (
          <MaterialCommunityIcons name={name as any} size={20} color={color} />
        );
      case "ionicons":
      default:
        return <Ionicons name={name as any} size={20} color={color} />;
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={projects ?? []}
        keyExtractor={(item) => String(item._id)}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View style={styles.groupItem}>
            <View style={styles.iconWrapper}>
              {renderProjectIcon(
                item.iconFamily as IconFamily,
                item.iconType,
                item.color
              )}
            </View>
            <Text style={styles.groupName}>{item.name}</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        ListFooterComponent={() => (
          <View style={{ paddingVertical: 12 }}>
            <SquircleButton
              onPress={() => router.push("/in/creator/project")}
              title="+ New Project"
            />
          </View>
        )}
      />
    </View>
  );
};

export default GroupList;

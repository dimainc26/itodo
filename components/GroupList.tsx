import { createDocumentsStyle } from "@/assets/styles/documents.style";
import SquircleButton from "@/components/ui/SquircleButton";
import { useTheme } from "@/hooks/useTheme";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

import { useProjects, type IconFamily } from "@/hooks/useProjects";
import { renderProjectIcon } from "@/utils/renderProjectIcon";
import { router } from "expo-router";

const GroupList = () => {
  const { colors } = useTheme();
  const styles = createDocumentsStyle(colors);

  // Convex
  const { list: projects } = useProjects();

  // TODO: fare un unico componente composable per GroupList.tsx e TaskGroupCard

  return (
    <View style={styles.container}>
      <FlatList
        data={projects ?? []}
        keyExtractor={(item) => String(item._id)}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.groupItem}
            activeOpacity={0.8}
            onPress={() =>
              router.push({
                pathname: "/in/(tabs)/documents/projects/[id]",
                params: { id: String(item._id) },
              })
            }
          >
            <View style={styles.iconWrapper}>
              {renderProjectIcon({
                family: item.iconFamily as IconFamily,
                name: item.iconType,
                color: item.color,
              })}
            </View>
            <Text style={styles.groupName}>{item.name}</Text>
          </TouchableOpacity>
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

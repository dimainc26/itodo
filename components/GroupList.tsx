import { createDocumentsStyle } from "@/assets/styles/documents.style";
import LabeledTextInput from "@/components/LabeledTextInput";
import SquircleButton from "@/components/ui/SquircleButton";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import { useProjects, type ProjectStatus } from "@/hooks/useProjects";

const ICON_CANDIDATES = [
  "folder-outline",
  "briefcase-outline",
  "code-slash-outline",
  "school-outline",
  "rocket-outline",
  "checkbox-outline",
  "hammer-outline",
  "fitness-outline",
] as const;

const COLOR_PALETTE = [
  "#8B5CF6",
  "#06B6D4",
  "#F59E0B",
  "#EF4444",
  "#10B981",
  "#3B82F6",
  "#F97316",
  "#14B8A6",
];

const GroupList = () => {
  const { colors } = useTheme();
  const styles = createDocumentsStyle(colors);
  const [modalVisible, setModalVisible] = useState(false);

  // form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [iconType, setIconType] =
    useState<(typeof ICON_CANDIDATES)[number]>("folder-outline");
  const [pickedColor, setPickedColor] = useState<string>(COLOR_PALETTE[0]);
  const [status, setStatus] = useState<ProjectStatus>("to-do");
  const [saving, setSaving] = useState(false);

  // 🔗 Convex
  const { list: projects, add } = useProjects();

  const canSave = useMemo(
    () => name.trim().length > 0 && !!iconType && !!pickedColor && !!status,
    [name, iconType, pickedColor, status]
  );

  const handleAddGroup = async () => {
    if (!canSave || saving) return;
    try {
      setSaving(true);
      await add({
        name: name.trim(),
        iconType,
        color: pickedColor,
        status,
        description, // ora presente nello schema
      });

      // reset form + chiudi modale
      setName("");
      setDescription("");
      setIconType("folder-outline");
      setPickedColor(COLOR_PALETTE[0]);
      setStatus("to-do");
      setModalVisible(false);
    } catch (e: any) {
      Alert.alert("Error", e?.message ?? "Failed to create project.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={projects ?? []} // ✅ dati da Convex
        keyExtractor={(item) => String(item._id)}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View style={styles.groupItem}>
            <View style={styles.iconWrapper}>
              <Ionicons
                name={item.iconType as any}
                size={20}
                color={item.color}
              />
            </View>
            <Text style={styles.groupName}>{item.name}</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        ListFooterComponent={() => (
          <View style={{ paddingVertical: 12 }}>
            <SquircleButton
              onPress={() => setModalVisible(true)}
              title="+  New Project"
            />
          </View>
        )}
      />

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <Pressable
            style={styles.modalContent}
            onPress={(e) => e.stopPropagation()}
          >
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : undefined}
              keyboardVerticalOffset={0}
            >
              <Text style={styles.modalTitle}>Create New Project</Text>

              <LabeledTextInput
                label="Project Name"
                placeholder="Project name..."
                value={name}
                onChangeText={setName}
              />

              <LabeledTextInput
                label="Description"
                placeholder="Optional description..."
                value={description}
                onChangeText={setDescription}
                multiline
              />

              {/* Icon Picker */}
              <Text style={[styles.modalTitle, { fontSize: 13, marginTop: 8 }]}>
                Icon
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: 12,
                  paddingHorizontal: 12,
                  paddingBottom: 8,
                }}
              >
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {ICON_CANDIDATES.map((i) => {
                    const isSelected = i === iconType;
                    return (
                      <Pressable
                        key={i}
                        onPress={() => setIconType(i)}
                        style={{
                          marginHorizontal: 6,
                          width: 48,
                          height: 48,
                          borderRadius: 12,
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: colors.surface,
                          borderWidth: isSelected ? 2 : 1,
                          borderColor: isSelected ? pickedColor : colors.border,
                        }}
                      >
                        <Ionicons name={i} size={20} color={pickedColor} />
                      </Pressable>
                    );
                  })}
                </ScrollView>
              </View>

              {/* Color Picker */}
              <Text style={[styles.modalTitle, { fontSize: 13, marginTop: 8 }]}>
                Color
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: 10,
                  paddingHorizontal: 12,
                  paddingBottom: 8,
                }}
              >
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {COLOR_PALETTE.map((c) => {
                    const isSelected = c === pickedColor;
                    return (
                      <Pressable
                        key={c}
                        onPress={() => setPickedColor(c)}
                        style={{
                          marginHorizontal: 3,
                          width: 28,
                          height: 28,
                          borderRadius: 8,
                          backgroundColor: c,
                          borderWidth: isSelected ? 3 : 1,
                          borderColor: isSelected ? "#ffffff" : colors.border,
                        }}
                      />
                    );
                  })}
                </ScrollView>
              </View>

              <View style={{ paddingHorizontal: 24 }}>
                <SquircleButton
                  onPress={handleAddGroup}
                  title={saving ? "Saving..." : "Save"}
                  disabled={!canSave || saving}
                />
              </View>
            </KeyboardAvoidingView>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

export default GroupList;

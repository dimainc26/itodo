import { createDocumentsStyle } from "@/assets/styles/documents.style";
import { IconFamily, ProjectStatus, useProjects } from "@/hooks/useProjects";
import { useTheme } from "@/hooks/useTheme";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
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
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LabeledTextInput from "../LabeledTextInput";
import SquircleButton from "../ui/SquircleButton";

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

const FAMILY_COMPONENT: Record<IconFamily, any> = {
  ionicons: Ionicons,
  feather: Feather,
  materialCommunity: MaterialCommunityIcons,
};

interface Props {
  visible: boolean;
  onClose: () => void;
}

const CreateProjectModal = ({ visible, onClose }: Props) => {
  const { colors } = useTheme();
  const styles = createDocumentsStyle(colors);
  const insets = useSafeAreaInsets();

  // form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [iconFamily, setIconFamily] = useState<IconFamily>("ionicons");
  const [iconType, setIconType] = useState<string>("folder-outline");
  const [pickedColor, setPickedColor] = useState<string>(COLOR_PALETTE[0]);
  const [status, setStatus] = useState<ProjectStatus>("to-do");
  const [saving, setSaving] = useState(false);

  // Convex
  const { add } = useProjects();

  // Icon component & glyphs
  const IconComp = FAMILY_COMPONENT[iconFamily];
  const allIconNames = useMemo(() => {
    const glyphMap = IconComp?.glyphMap as Record<string, number> | undefined;
    return glyphMap ? Object.keys(glyphMap) : [];
  }, [IconComp]);

  const [iconSearch, setIconSearch] = useState("");
  const filteredIconNames = useMemo(() => {
    const q = iconSearch.trim().toLowerCase();
    const list = q.length
      ? allIconNames.filter((n) => n.toLowerCase().includes(q))
      : allIconNames;
    return list.slice(0, 300);
  }, [allIconNames, iconSearch]);

  const isValidIcon = useMemo(() => {
    const gm = IconComp?.glyphMap as Record<string, number> | undefined;
    return !!(gm && gm[iconType]);
  }, [IconComp, iconType]);

  const canSave = useMemo(
    () => name.trim().length > 0 && !!iconType && !!pickedColor && !!status,
    [name, iconType, pickedColor, status]
  );

  const handleAddGroup = async () => {
    if (!canSave || saving || !isValidIcon) return;
    try {
      setSaving(true);
      await add({
        name: name.trim(),
        iconFamily,
        iconType,
        color: pickedColor,
        status,
        description,
      });
      // reset
      setName("");
      setDescription("");
      setIconFamily("ionicons");
      setIconType("folder-outline");
      setPickedColor(COLOR_PALETTE[0]);
      setStatus("to-do");
      setIconSearch("");
      onClose();
    } catch (e: any) {
      Alert.alert("Error", e?.message ?? "Failed to create project.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalOverlay} onPress={onClose}>
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

            {/* Icon Family Picker */}
            <Text style={[styles.modalTitle, { fontSize: 13, marginTop: 8 }]}>
              Icon Family
            </Text>
            <View
              style={{
                flexDirection: "row",
                gap: 8,
                paddingBottom: 8,
              }}
            >
              {(
                ["ionicons", "feather", "materialCommunity"] as IconFamily[]
              ).map((fam) => {
                const selected = fam === iconFamily;
                return (
                  <Pressable
                    key={fam}
                    onPress={() => {
                      setIconFamily(fam);
                      const gm = FAMILY_COMPONENT[fam]?.glyphMap as
                        | Record<string, number>
                        | undefined;
                      if (!gm || !gm[iconType]) {
                        const first = gm ? Object.keys(gm)[0] : "folder";
                        setIconType(first);
                      }
                    }}
                    style={{
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                      borderRadius: 12,
                      borderWidth: 1,
                      borderColor: selected ? pickedColor : colors.border,
                      backgroundColor: selected
                        ? pickedColor + "20"
                        : colors.surface,
                    }}
                  >
                    <Text
                      style={{
                        color: selected ? pickedColor : colors.text,
                        fontSize: 13,
                      }}
                    >
                      {fam}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            {/* Icon preview + search */}
            <View
              style={{
                paddingBottom: 8,
                flexDirection: "row",
                alignItems: "center",
                gap: 12,
              }}
            >
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: colors.surface,
                  borderWidth: 1,
                  borderColor: isValidIcon ? colors.border : "#EF4444",
                }}
              >
                {isValidIcon ? (
                  <IconComp
                    name={iconType as any}
                    size={22}
                    color={pickedColor}
                  />
                ) : (
                  <Text style={{ color: "#EF4444", fontSize: 10 }}>
                    invalid
                  </Text>
                )}
              </View>

              <TextInput
                value={iconSearch}
                onChangeText={setIconSearch}
                placeholder="Search icon name…"
                placeholderTextColor={colors.textMuted}
                style={{
                  flex: 1,
                  height: 44,
                  borderRadius: 12,
                  paddingHorizontal: 12,
                  color: colors.text,
                  backgroundColor: colors.surface,
                  borderWidth: 1,
                  borderColor: colors.border,
                }}
              />
            </View>

            {/* Icon Picker dinamico */}
            <FlatList
              data={filteredIconNames}
              keyExtractor={(n) => n}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: 8,
                gap: 12,
              }}
              renderItem={({ item: n }) => {
                const selected = n === iconType;
                return (
                  <Pressable
                    onPress={() => setIconType(n)}
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: colors.surface,
                      borderWidth: selected ? 2 : 1,
                      borderColor: selected ? pickedColor : colors.border,
                    }}
                  >
                    <IconComp name={n as any} size={20} color={pickedColor} />
                  </Pressable>
                );
              }}
            />

            {/* Color Picker */}
            <Text style={[styles.modalTitle, { fontSize: 13, marginTop: 8 }]}>
              Color
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ paddingHorizontal: 12, paddingBottom: 8 }}
            >
              <View style={{ flexDirection: "row", gap: 10 }}>
                {COLOR_PALETTE.map((c) => {
                  const isSelected = c === pickedColor;
                  return (
                    <Pressable
                      key={c}
                      onPress={() => setPickedColor(c)}
                      style={{
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
              </View>
            </ScrollView>

            <View style={{ paddingHorizontal: 24 }}>
              <SquircleButton
                onPress={handleAddGroup}
                title={saving ? "Saving..." : "Save"}
                disabled={!canSave || saving || !isValidIcon}
              />
            </View>
          </KeyboardAvoidingView>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default CreateProjectModal;

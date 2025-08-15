import { createDocumentsStyle } from "@/assets/styles/documents.style";
import SquircleButton from "@/components/ui/SquircleButton";
import { useTheme } from "@/hooks/useTheme";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import { Alert, FlatList, Text, View } from "react-native";

import {
  useProjects,
  type IconFamily,
  type ProjectStatus,
} from "@/hooks/useProjects";
import CreateProjectModal from "./modals/CreateProjectModal";

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

const GroupList = () => {
  const { colors } = useTheme();
  const styles = createDocumentsStyle(colors);
  const [modalVisible, setModalVisible] = useState(false);

  // form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [iconFamily, setIconFamily] = useState<IconFamily>("ionicons");
  const [iconType, setIconType] = useState<string>("folder-outline");
  const [pickedColor, setPickedColor] = useState<string>(COLOR_PALETTE[0]);
  const [status, setStatus] = useState<ProjectStatus>("to-do");
  const [saving, setSaving] = useState(false);

  // Convex
  const { list: projects, add } = useProjects();

  // Icon component & glyphs (dinamici in base alla famiglia)
  const IconComp = FAMILY_COMPONENT[iconFamily];
  const allIconNames = useMemo(() => {
    const glyphMap = IconComp?.glyphMap as Record<string, number> | undefined;
    return glyphMap ? Object.keys(glyphMap) : [];
  }, [IconComp]);

  // Ricerca icone
  const [iconSearch, setIconSearch] = useState("");
  const filteredIconNames = useMemo(() => {
    const q = iconSearch.trim().toLowerCase();
    const list = q.length
      ? allIconNames.filter((n) => n.toLowerCase().includes(q))
      : allIconNames;
    // per performance UI limitiamo la render list, ma accettiamo qualunque icona
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

  const handleAddGroup = async () => {
    if (!canSave || saving) return;
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

      // reset form + chiudi modale
      setName("");
      setDescription("");
      setIconFamily("ionicons");
      setIconType("folder-outline");
      setPickedColor(COLOR_PALETTE[0]);
      setStatus("to-do");
      setIconSearch("");
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
              onPress={() => setModalVisible(true)}
              title="+  New Project"
            />
          </View>
        )}
      />
      {modalVisible && (
        <CreateProjectModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
      )}
    </View>
  );
};

export default GroupList;

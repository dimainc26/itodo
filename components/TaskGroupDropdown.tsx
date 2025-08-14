import { createDropdownStyles } from "@/assets/styles/dropdown.style";
import { useProjects } from "@/hooks/useProjects";
import { useTheme } from "@/hooks/useTheme";
import { Group } from "@/models/groupType";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";
import SquircleButton from "./ui/SquircleButton";

type Props = {
  groups?: Group[];
  selectedGroupId?: string;
  onSelect?: (group: Group) => void;
};

const TaskGroupDropdown = ({ groups, selectedGroupId, onSelect }: Props) => {
  const { colors } = useTheme();
  const styles = createDropdownStyles(colors);
  const { list: projects } = useProjects();

  const dbGroups: Group[] = useMemo(() => {
    if (groups && groups.length > 0) return groups;
    if (!projects) return [];
    return projects.map((p) => ({
      id: String(p._id),
      name: p.name,
      icon: <Ionicons name={p.iconType as any} size={16} color={p.color} />,
    }));
  }, [groups, projects]);

  const [internalSelectedId, setInternalSelectedId] = useState<
    string | undefined
  >(selectedGroupId);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!selectedGroupId && dbGroups.length > 0 && !internalSelectedId) {
      const first = dbGroups[0];
      setInternalSelectedId(first.id);
      onSelect?.(first);
    }
  }, [dbGroups, internalSelectedId, onSelect, selectedGroupId]);

  const effectiveSelectedId = selectedGroupId ?? internalSelectedId;

  const selectedGroup = useMemo(
    () => dbGroups.find((g) => g.id === effectiveSelectedId),
    [dbGroups, effectiveSelectedId]
  );

  const handlePick = (g: Group) => {
    if (!selectedGroupId) setInternalSelectedId(g.id);
    onSelect?.(g);
    setOpen(false);
  };

  const isDisabled = dbGroups.length === 0;

  return (
    <>
      <View style={{ paddingHorizontal: 24 }}>
        <TouchableOpacity
          onPress={() => !isDisabled && setOpen(true)}
          style={[
            styles.dropdown,
            { backgroundColor: colors.bg, opacity: isDisabled ? 0.6 : 1 },
          ]}
          activeOpacity={0.8}
          disabled={isDisabled}
        >
          <View style={styles.groupInfo}>
            <View
              style={[
                styles.iconWrapper,
                { backgroundColor: colors.primary + "20" },
              ]}
            >
              {selectedGroup?.icon}
            </View>
            <View>
              <Text style={[styles.label, { color: colors.textMuted }]}>
                Task Group
              </Text>
              <Text style={[styles.name, { color: colors.text }]}>
                {selectedGroup?.name ?? "—"}
              </Text>
            </View>
          </View>

          <Ionicons name="chevron-down" size={20} color={colors.text} />
        </TouchableOpacity>
      </View>

      <Modal visible={open} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setOpen(false)}
        >
          <View style={[styles.modalContent, { backgroundColor: colors.bg }]}>
            <FlatList
              data={dbGroups}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => handlePick(item)}
                >
                  <View
                    style={[
                      styles.iconWrapper,
                      { backgroundColor: colors.primary + "20" },
                    ]}
                  >
                    {item.icon}
                  </View>
                  <Text style={[styles.optionText, { color: colors.text }]}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
              ListFooterComponent={() => (
                <SquircleButton
                  onPress={() => router.push("/in/documents")}
                  title="+ New Project"
                />
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

export default TaskGroupDropdown;

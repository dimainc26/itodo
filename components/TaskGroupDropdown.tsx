import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useMemo, useState } from "react";
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";

import { createDropdownStyles } from "@/assets/styles/dropdown.style";
import { useProjects, type IconFamily } from "@/hooks/useProjects";
import { useTheme } from "@/hooks/useTheme";
import { renderProjectIcon } from "@/utils/renderProjectIcon";
import { router } from "expo-router";
import SquircleButton from "./ui/SquircleButton";

/** Se hai già un tipo Group centralizzato, riusa quello */
export type Group = {
  id: string;
  name: string;
  icon: React.ReactNode;
};

type Props = {
  /** ID selezionato, gestito dal parent */
  selectedGroupId?: string;
  /** Callback richiesta: il parent deve fare il set dello stato */
  onSelect: (group: Group) => void;
  /** fallback opzionale: se lo passi, bypassa Convex */
  groups?: Group[];
};

const TaskGroupDropdown = ({ selectedGroupId, onSelect, groups }: Props) => {
  const { colors } = useTheme();
  const styles = createDropdownStyles(colors);
  const { list: projects } = useProjects();
  const [open, setOpen] = useState(false);

  /** Se non ci passano `groups`, mappiamo i projects da Convex */
  const dbGroups: Group[] = useMemo(() => {
    if (groups && groups.length > 0) return groups;
    if (!projects) return [];
    return projects.map((p) => ({
      id: String(p._id),
      name: p.name,
      icon: renderProjectIcon({
        family: p.iconFamily as IconFamily,
        name: p.iconType,
        color: p.color,
        size: 16,
      }),
    }));
  }, [groups, projects]);

  /** Se non c’è ancora una selezione, selezioniamo il primo (e notifichiamo il parent) */
  useEffect(() => {
    if (!selectedGroupId && dbGroups.length > 0) {
      onSelect(dbGroups[0]);
    }
  }, [dbGroups, onSelect, selectedGroupId]);

  /** Trova il gruppo selezionato solo in base a selectedGroupId (controllato) */
  const selectedGroup = useMemo(
    () => dbGroups.find((g) => g.id === selectedGroupId),
    [dbGroups, selectedGroupId]
  );

  const handlePick = (g: Group) => {
    onSelect(g); // il parent deve fare setSelectedId(g.id)
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
              ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
              renderItem={({ item }) => {
                const isSelected = item.id === selectedGroupId;
                return (
                  <TouchableOpacity
                    style={[
                      styles.option,
                      isSelected && {
                        borderBottomWidth: 2,
                        borderBottomColor: colors.primary,
                      },
                    ]}
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
                    {isSelected && (
                      <Ionicons
                        name="checkmark"
                        size={18}
                        color={colors.primary}
                      />
                    )}
                  </TouchableOpacity>
                );
              }}
              ListFooterComponent={() => (
                <SquircleButton
                  onPress={() => {
                    router.push("/in/creator/project");
                    setOpen(false);
                  }}
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

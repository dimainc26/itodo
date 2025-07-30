import { createDropdownStyles } from "@/assets/styles/dropdown.style";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";

type Group = {
  id: string;
  name: string;
  icon: any;
};

type Props = {
  groups: Group[];
  selectedGroupId: string;
  onSelect: (group: Group) => void;
};

const TaskGroupDropdown = ({ groups, selectedGroupId, onSelect }: Props) => {
  const { colors } = useTheme();
  const [open, setOpen] = useState(false);
  const selectedGroup = groups.find((g) => g.id === selectedGroupId);

  const styles = createDropdownStyles(colors);

  return (
    <>
      <View style={{ paddingHorizontal: 24 }}>
        <TouchableOpacity
          onPress={() => setOpen(true)}
          style={[styles.dropdown, { backgroundColor: colors.bg }]}
          activeOpacity={0.8}
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
                {selectedGroup?.name}
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
              data={groups}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => {
                    onSelect(item);
                    setOpen(false);
                  }}
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
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

export default TaskGroupDropdown;

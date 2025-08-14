import { createDropdownStyles } from "@/assets/styles/dropdown.style";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";

export type DropdownOption<ID extends string = string> = {
  id: ID;
  name: string;
  icon?: React.ReactNode;
};

type DropdownSelectProps<ID extends string = string> = {
  label: string; // etichetta sopra al valore (es. "Language")
  options: DropdownOption<ID>[];
  selectedId: ID;
  onSelect: (option: DropdownOption<ID>) => void;
  testID?: string;
};

const DropdownSelect = <ID extends string = string>({
  label,
  options,
  selectedId,
  onSelect,
  testID,
}: DropdownSelectProps<ID>) => {
  const { colors } = useTheme();
  const [open, setOpen] = useState(false);
  const styles = createDropdownStyles(colors);

  const selected = useMemo(
    () => options.find((o) => o.id === selectedId),
    [options, selectedId]
  );

  return (
    <>
      <View style={{ paddingHorizontal: 24 }}>
        <TouchableOpacity
          testID={testID}
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
              {selected?.icon}
            </View>
            <View>
              <Text style={[styles.label, { color: colors.textMuted }]}>
                {label}
              </Text>
              <Text style={[styles.name, { color: colors.text }]}>
                {selected?.name ?? "-"}
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
              data={options}
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

export default DropdownSelect;

import { createDocumentsStyle } from "@/assets/styles/documents.style";
import LabeledTextInput from "@/components/LabeledTextInput";
import SquircleButton from "@/components/ui/SquircleButton";
import { useTheme } from "@/hooks/useTheme";
import { groupOptions } from "@/mocks/groupList";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { FlatList, Modal, Pressable, Text, View } from "react-native";

const GroupList = () => {
  const { colors } = useTheme();
  const styles = createDocumentsStyle(colors);
  const [modalVisible, setModalVisible] = useState(false);
  const [groups, setGroups] = useState(groupOptions);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleAddGroup = () => {
    if (name.trim()) {
      setGroups((prev) => [
        ...prev,
        {
          id: name.toLowerCase(),
          name,
          icon: (
            <Ionicons name="folder-outline" size={20} color={colors.primary} />
          ),
        },
      ]);
      setName("");
      setDescription("");
      setModalVisible(false);
    }
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={groups}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View style={styles.groupItem}>
            <View style={styles.iconWrapper}>{item.icon}</View>
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
            <Text style={styles.modalTitle}>Create New Group</Text>

            <LabeledTextInput
              label="Group Name"
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
            <View style={{ paddingHorizontal: 24 }}>
              <SquircleButton onPress={handleAddGroup} title="Save" />
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

export default GroupList;

import { createDocumentsStyle } from "@/assets/styles/documents.style";
import LabeledTextInput from "@/components/LabeledTextInput";
import LogoSelector from "@/components/LogoSelector";
import SharedHeader from "@/components/SharedHeader";
import Outside from "@/components/ui/Outside";
import SquircleButton from "@/components/ui/SquircleButton";
import { COLOR_PALETTE } from "@/constants/colorPalette";
import { FAMILY_COMPONENT } from "@/constants/iconFamily";
import type { Id } from "@/convex/_generated/dataModel";
import { IconFamily, ProjectStatus, useProjects } from "@/hooks/useProjects";
import { useTheme } from "@/hooks/useTheme";
import * as FileSystem from "expo-file-system";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

FileSystem;

/* -------------------- small debounce hook -------------------- */

function useDebouncedValue<T>(value: T, delay = 220) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

/* --------------------------- Screen --------------------------- */

type PickedFile = { uri: string; name?: string; type?: string };

const Project = () => {
  const { colors } = useTheme();
  const styles = createDocumentsStyle(colors);

  // form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [iconFamily, setIconFamily] = useState<IconFamily>("ionicons");
  const [iconType, setIconType] = useState<string>("folder-outline");
  const [pickedColor, setPickedColor] = useState<string>(COLOR_PALETTE[0]);
  const [status, setStatus] = useState<ProjectStatus>("to-do");
  const [saving, setSaving] = useState(false);
  const [imageStorageId, setImageStorageId] = useState<
    Id<"_storage"> | undefined
  >(undefined);

  const { add, getUploadUrl } = useProjects();

  // Famiglia icone e glyph map
  const IconComp = FAMILY_COMPONENT[iconFamily];

  const glyphMap: Record<string, number> = useMemo(() => {
    const gm = (IconComp?.glyphMap ?? {}) as Record<string, number>;
    return gm;
  }, [IconComp]);

  const allIconNames = useMemo(() => Object.keys(glyphMap), [glyphMap]);

  const [iconSearch, setIconSearch] = useState("");
  const debouncedQuery = useDebouncedValue(iconSearch, 220);

  // Filtra nomi (solo client-side)
  const filteredIconNames = useMemo(() => {
    if (!debouncedQuery) return allIconNames.slice(0, 300);
    const q = debouncedQuery.trim().toLowerCase();
    const list = allIconNames.filter((n) => n.toLowerCase().includes(q));
    return list.slice(0, 300);
  }, [allIconNames, debouncedQuery]);

  const isValidIcon = useMemo(() => !!glyphMap[iconType], [glyphMap, iconType]);

  // Quando cambio famiglia, se l'icona corrente non esiste, scegline una valida
  const lastFamilyRef = useRef<IconFamily>(iconFamily);
  useEffect(() => {
    if (lastFamilyRef.current !== iconFamily) {
      lastFamilyRef.current = iconFamily;
      if (!glyphMap[iconType]) {
        const first = allIconNames[0] ?? "folder";
        setIconType(first);
      }
    }
  }, [iconFamily, glyphMap, allIconNames, iconType]);

  // Upload immagine -> Convex storage (presigned URL)
  const handleImageSelected = async (file: PickedFile) => {
    try {
      const uploadUrl = await getUploadUrl();

      const result = await FileSystem.uploadAsync(uploadUrl, file.uri, {
        httpMethod: "POST",
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        fieldName: "file", // Convex si aspetta "file"
        mimeType: file.type ?? "image/jpeg",
        parameters: {
          // opzionale: altri campi form se ti servono
        },
      });

      if (result.status !== 200) {
        throw new Error(`Upload failed: ${result.status}`);
      }

      const { storageId } = JSON.parse(result.body);
      setImageStorageId(storageId as Id<"_storage">);
    } catch (e: any) {
      Alert.alert("Upload error", e?.message ?? "Failed to upload image");
    }
  };

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
        imageStorageId,
      });
      // reset
      setName("");
      setDescription("");
      setIconFamily("ionicons");
      setIconType("folder-outline");
      setPickedColor(COLOR_PALETTE[0]);
      setStatus("to-do");
      setIconSearch("");
      setImageStorageId(undefined);
      Alert.alert("Success", "Project created.");
    } catch (e: any) {
      Alert.alert("Error", e?.message ?? "Failed to create project.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Outside>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={0}
        style={{ flex: 1 }}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 24 }}
          showsVerticalScrollIndicator={false}
        >
          <SharedHeader title="Create New Project" />

          {/* TEXTS */}
          <View style={{ paddingHorizontal: 24 }}>
            <Text style={[styles.modalTitle, { fontSize: 13, marginTop: 8 }]}>
              Texts
            </Text>
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
          </View>

          {/* ICON FAMILY */}
          <View style={{ paddingHorizontal: 24 }}>
            <Text style={[styles.modalTitle, { fontSize: 13, marginTop: 8 }]}>
              Icon Family
            </Text>
            <View style={{ flexDirection: "row", gap: 8, paddingBottom: 8 }}>
              {(
                ["ionicons", "feather", "materialCommunity"] as IconFamily[]
              ).map((fam) => {
                const selected = fam === iconFamily;
                return (
                  <Pressable
                    key={fam}
                    onPress={() => {
                      setIconFamily(fam);
                      // l'effetto sopra corregge l'iconType se non valido
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
          </View>

          {/* ICON SEARCH + PREVIEW */}
          <View style={{ paddingHorizontal: 24 }}>
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
                autoCorrect={false}
                autoCapitalize="none"
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

            {/* ICON PICKER (orizzontale) */}
            <FlatList
              data={filteredIconNames}
              keyExtractor={(n, i) => `${n}-${i}`}
              horizontal
              showsHorizontalScrollIndicator={false}
              initialNumToRender={30}
              maxToRenderPerBatch={40}
              windowSize={5}
              removeClippedSubviews
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
              ListEmptyComponent={
                <Text style={{ color: colors.textMuted, paddingLeft: 4 }}>
                  No icons match “{debouncedQuery}”
                </Text>
              }
            />
          </View>

          {/* PROJECT IMAGE */}
          <View style={{ paddingHorizontal: 24 }}>
            <Text style={[styles.modalTitle, { fontSize: 13, marginTop: 8 }]}>
              Project Image
            </Text>
            <LogoSelector onImageSelected={handleImageSelected} />
          </View>

          {/* COLOR PICKER */}
          <View style={{ paddingHorizontal: 24 }}>
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
          </View>

          {/* SAVE */}
          <View style={{ paddingHorizontal: 24 }}>
            <SquircleButton
              onPress={handleAddGroup}
              title={saving ? "Saving..." : "Save"}
              disabled={!canSave || saving || !isValidIcon}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Outside>
  );
};

export default Project;

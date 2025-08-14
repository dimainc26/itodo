import { createAppSettingsStyle } from "@/assets/styles/appSettings.style";
import i18n, { changeLanguage } from "@/config/i18n";
import { EnglishjFlagSVG, FrenchFlagSVG, ItalianFlagSVG } from "@/data/icons";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";

type SupportedLanguage = "en" | "fr" | "it";

const LANGUAGE_LABEL: Record<SupportedLanguage, string> = {
  en: "English",
  fr: "Français",
  it: "Italiano",
};

type Option = {
  id: SupportedLanguage;
  name: string;
  icon: React.ReactNode;
};

type Props = {
  iconName?: React.ComponentProps<typeof Ionicons>["name"];
};

const LanguageDropdown = ({ iconName = "language-outline" }: Props) => {
  const { colors } = useTheme();
  const styles = createAppSettingsStyle(colors);
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const selectedId = (i18n.language as SupportedLanguage) ?? "en";

  const options: Option[] = useMemo(
    () => [
      {
        id: "en",
        name: LANGUAGE_LABEL.en,
        icon: <EnglishjFlagSVG width={18} height={18} />,
      },
      {
        id: "fr",
        name: LANGUAGE_LABEL.fr,
        icon: <FrenchFlagSVG width={18} height={18} />,
      },
      {
        id: "it",
        name: LANGUAGE_LABEL.it,
        icon: <ItalianFlagSVG width={18} height={18} />,
      },
    ],
    []
  );

  const selectedLabel = LANGUAGE_LABEL[selectedId] ?? "English";

  return (
    <>
      {/* ROW identica al tuo design */}
      <TouchableOpacity
        style={styles.row}
        activeOpacity={0.8}
        onPress={() => setOpen(true)}
      >
        <View style={styles.rowLeft}>
          <Ionicons name={iconName} size={20} color={colors.text} />
          <Text style={styles.rowLabel}>{t("settings.language")}</Text>
        </View>
        <Text style={styles.rowRightValue}>{selectedLabel}</Text>
      </TouchableOpacity>

      {/* MODAL di selezione */}
      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setOpen(false)}
          style={{
            flex: 1,
            backgroundColor: "#00000088",
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              backgroundColor: colors.bg,
              paddingHorizontal: 16,
              paddingVertical: 12,
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
            }}
          >
            <View
              style={{
                alignSelf: "center",
                width: 40,
                height: 4,
                borderRadius: 2,
                backgroundColor: colors.textMuted,
                marginBottom: 8,
                opacity: 0.5,
              }}
            />
            <Text
              style={{
                color: colors.textMuted,
                fontSize: 13,
                marginBottom: 12,
                paddingHorizontal: 8,
              }}
            >
              {t("settings.language")}
            </Text>

            <FlatList
              data={options}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
              renderItem={({ item }) => {
                const isSelected = item.id === selectedId;
                return (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={async () => {
                      await changeLanguage(item.id);
                      setOpen(false);
                    }}
                    style={{
                      backgroundColor: colors.surface,
                      borderRadius: 14,
                      paddingVertical: 14,
                      paddingHorizontal: 14,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 12,
                      }}
                    >
                      <View
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 8,
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: colors.primary + "20",
                        }}
                      >
                        {item.icon}
                      </View>
                      <Text style={{ color: colors.text, fontSize: 15 }}>
                        {item.name}
                      </Text>
                    </View>

                    {isSelected && (
                      <Ionicons
                        name="checkmark"
                        size={20}
                        color={colors.primary}
                      />
                    )}
                  </TouchableOpacity>
                );
              }}
            />

            <View style={{ height: 12 }} />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

export default LanguageDropdown;

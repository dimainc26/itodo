import { createAppSettingsStyle } from "@/assets/styles/appSettings.style";
import LanguageDropdown from "@/components/LanguageDropdown";
import SharedHeader from "@/components/SharedHeader";
import Outside from "@/components/ui/Outside";
import i18n from "@/config/i18n";
import { useTheme } from "@/hooks/useTheme";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch, Text, View } from "react-native";

const LANGUAGE_LABEL: Record<string, string> = {
  en: "English",
  fr: "Français",
  it: "Italiano",
};

const AppSettings = () => {
  const { colors, isDarkMode, toggleDarkMode } = useTheme();
  const styles = createAppSettingsStyle(colors);
  const { t } = useTranslation();

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const currentLangLabel = LANGUAGE_LABEL[i18n.language] ?? "English";

  return (
    <Outside>
      <SharedHeader title={t("settings.title")} />
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>{t("settings.appearance")}</Text>

        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Feather name="moon" size={20} color={colors.text} />
            <Text style={styles.rowLabel}>{t("settings.darkMode")}</Text>
          </View>
          <Switch
            trackColor={{ false: colors.border, true: colors.primaryMuted }}
            thumbColor={isDarkMode ? colors.primary : "#f4f3f4"}
            ios_backgroundColor={colors.border}
            onValueChange={toggleDarkMode}
            value={isDarkMode}
          />
        </View>

        <Text style={styles.sectionTitle}>{t("settings.general")}</Text>
        <LanguageDropdown />

        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Ionicons
              name="notifications-outline"
              size={20}
              color={colors.text}
            />
            <Text style={styles.rowLabel}>
              {t("settings.enableNotifications")}
            </Text>
          </View>
          <Switch
            trackColor={{ false: colors.border, true: colors.primaryMuted }}
            thumbColor={notificationsEnabled ? colors.primary : "#f4f3f4"}
            ios_backgroundColor={colors.border}
            onValueChange={() => setNotificationsEnabled((prev) => !prev)}
            value={notificationsEnabled}
          />
        </View>
      </View>
    </Outside>
  );
};

export default AppSettings;

import { createAppSettingsStyle } from "@/assets/styles/appSettings.style";
import SharedHeader from "@/components/SharedHeader";
import Outside from "@/components/ui/Outside";
import { useTheme } from "@/hooks/useTheme";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Switch, Text, TouchableOpacity, View } from "react-native";

const AppSettings = () => {
  const { colors, isDarkMode, toggleDarkMode } = useTheme();
  const styles = createAppSettingsStyle(colors);

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  return (
    <Outside>
      <SharedHeader title="App Settings" />
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Appearance</Text>
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Feather name="moon" size={20} color={colors.text} />
            <Text style={styles.rowLabel}>Dark Mode</Text>
          </View>
          <Switch
            trackColor={{ false: colors.border, true: colors.primaryMuted }}
            thumbColor={isDarkMode ? colors.primary : "#f4f3f4"}
            ios_backgroundColor={colors.border}
            onValueChange={toggleDarkMode}
            value={isDarkMode}
          />
        </View>

        <Text style={styles.sectionTitle}>General</Text>

        <TouchableOpacity style={styles.row} activeOpacity={0.8}>
          <View style={styles.rowLeft}>
            <Ionicons name="language-outline" size={20} color={colors.text} />
            <Text style={styles.rowLabel}>Language</Text>
          </View>
          <Text style={styles.rowRightValue}>{selectedLanguage}</Text>
        </TouchableOpacity>

        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Ionicons
              name="notifications-outline"
              size={20}
              color={colors.text}
            />
            <Text style={styles.rowLabel}>Enable Notifications</Text>
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

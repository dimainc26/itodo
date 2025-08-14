import { createProfileStyles } from "@/assets/styles/profile.style";
import SharedHeader from "@/components/SharedHeader";
import Outside from "@/components/ui/Outside";
import { useTheme } from "@/hooks/useTheme";
import { sections } from "@/mocks/profileSections";
import { Ionicons } from "@expo/vector-icons";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

const Index = () => {
  const { colors } = useTheme();
  const styles = createProfileStyles(colors);

  return (
    <Outside>
      <SharedHeader title="Profile" />
      <ScrollView
        style={styles.wrapper}
        contentContainerStyle={styles.container}
      >
        <View style={styles.avatarSection}>
          <Image
            source={{ uri: "https://i.pravatar.cc/150?img=2" }}
            style={styles.avatar}
          />
          <Text style={styles.name}>Martha Hays</Text>

          <View style={styles.taskStats}>
            <View style={styles.statBadge}>
              <Text style={styles.statText}>10 Task left</Text>
            </View>
            <View style={styles.statBadge}>
              <Text style={styles.statText}>5 Task done</Text>
            </View>
          </View>
        </View>

        {sections.map(({ title, items }) => (
          <View key={title} style={styles.section}>
            <Text style={styles.sectionTitle}>{title}</Text>
            {items.map(({ label, icon, onPress }) => (
              <TouchableOpacity
                key={label}
                style={styles.row}
                activeOpacity={0.8}
                onPress={onPress}
              >
                <View style={styles.rowLeft}>
                  {icon}
                  <Text style={[styles.rowLabel]}>{label}</Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={colors.textMuted}
                />
              </TouchableOpacity>
            ))}
          </View>
        ))}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Danger Zone</Text>
          <TouchableOpacity
            style={[styles.row, styles.logout]}
            activeOpacity={0.8}
            onPress={() => {}}
          >
            <View style={styles.rowLeft}>
              <Ionicons
                name="log-out-outline"
                size={20}
                color={colors.danger}
              />
              <Text style={styles.logoutLabel}>Log out</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Outside>
  );
};

export default Index;

import { useTheme } from "@/hooks/useTheme";
import { createSectionHeaderStyles } from "@assets/styles/sectionHeader.style";
import { Text, View } from "react-native";

type Props = {
  title: string;
  badgeCount?: number;
};

export const SectionHeader = ({ title, badgeCount }: Props) => {
  const { colors } = useTheme();
  const styles = createSectionHeaderStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {badgeCount !== undefined && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badgeCount}</Text>
        </View>
      )}
    </View>
  );
};

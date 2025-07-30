import { createHeaderStyles } from "@/assets/styles/header.style";
import { WorkingImage } from "@/data/images";
import { useTheme } from "@/hooks/useTheme";
import { View } from "react-native";
import NotificationBell from "./NotificationBell";
import UserAvatar from "./UserAvatar";
import UserTexts from "./UserHero";

export const UserHeader = () => {
  const { colors } = useTheme();
  const styles = createHeaderStyles(colors);

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <UserAvatar avatarUri={WorkingImage} />
        <UserTexts name="Livia Vaccarro" />
      </View>

      <NotificationBell />
    </View>
  );
};

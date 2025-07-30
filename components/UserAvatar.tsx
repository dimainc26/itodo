import { createHeaderStyles } from "@/assets/styles/header.style";
import { useTheme } from "@/hooks/useTheme";
import React from "react";
import { Image, ImageSourcePropType, View } from "react-native";

interface UserAvatarProps {
  avatarUri: ImageSourcePropType;
}

const UserAvatar = ({ avatarUri }: UserAvatarProps) => {
  const { colors } = useTheme();
  const styles = createHeaderStyles(colors);

  return (
    <View style={styles.avatarContainer}>
      <Image source={avatarUri} style={styles.avatar} />
    </View>
  );
};

export default UserAvatar;

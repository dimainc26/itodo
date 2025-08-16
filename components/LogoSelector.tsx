import { createLogoSelectorStyles } from "@/assets/styles/logoSelector.style";
import { useTheme } from "@/hooks/useTheme";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

type Asset = { uri: string; fileName?: string; mimeType?: string };

type Props = {
  onImageSelected?: (file: {
    uri: string;
    name?: string;
    type?: string;
  }) => void;
};

const LogoSelector = ({ onImageSelected }: Props) => {
  const { colors } = useTheme();
  const styles = createLogoSelectorStyles(colors);
  const [logo, setLogo] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const asset = result.assets[0] as Asset;
      setLogo(asset.uri);
      onImageSelected?.({
        uri: asset.uri,
        name: asset.fileName ?? "project.jpg",
        type: asset.mimeType ?? "image/jpeg",
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoWrapper}>
        {logo ? (
          <Image source={{ uri: logo }} style={styles.logoImage} />
        ) : (
          <View style={styles.logoPlaceholder} />
        )}
      </View>

      <View style={styles.infoWrapper}>
        <Text style={[styles.nameLine, styles.nameGreen]}>Project</Text>
        <Text style={[styles.nameLine, styles.nameRed]}>image</Text>
      </View>

      <TouchableOpacity
        onPress={pickImage}
        style={styles.button}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>
          {logo ? "Change Image" : "Choose Image"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LogoSelector;

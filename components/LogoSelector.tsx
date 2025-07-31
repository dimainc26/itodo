import { createLogoSelectorStyles } from "@/assets/styles/logoSelector.style";
import { useTheme } from "@/hooks/useTheme";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const LogoSelector = () => {
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
      setLogo(result.assets[0].uri);
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
        <Text style={[styles.nameLine, styles.nameGreen]}>Grocery</Text>
        <Text style={[styles.nameLine, styles.nameRed]}>shop</Text>
      </View>

      <TouchableOpacity onPress={pickImage} style={styles.button}>
        <Text style={styles.buttonText}>Change Logo</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LogoSelector;

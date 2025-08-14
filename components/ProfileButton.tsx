import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";

export const ProfileButton = ({
  icon,
  label,
  danger,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  danger?: boolean;
}) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
          backgroundColor: colors.surface,
          padding: 16,
          borderRadius: 16,
          marginBottom: 12,
        },
        danger && { backgroundColor: colors.danger },
      ]}
    >
      <Ionicons name={icon} size={20} color="#fff" />
      <Text style={{ color: "#fff", fontWeight: "600", fontSize: 16 }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

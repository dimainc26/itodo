import GroupList from "@/components/GroupList";
import SharedHeader from "@/components/SharedHeader";
import HeroCard from "@/components/ui/HeroCard";
import Outside from "@/components/ui/Outside";
import { useTheme } from "@/hooks/useTheme";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

const Documents = () => {
  const { colors } = useTheme();

  return (
    <Outside>
      <SharedHeader title="Documents" />
      <GroupList />
      <HeroCard>
        <TouchableOpacity
          onPress={() => router.push("/in/(tabs)/documents/focus")}
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: 80,
          }}
        >
          <Text style={{ color: colors.bg, fontSize: 20, fontWeight: "600" }}>
            Focus Mode
          </Text>
        </TouchableOpacity>
      </HeroCard>
    </Outside>
  );
};

export default Documents;

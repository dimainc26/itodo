import CurvedTabBackground from "@/components/CurvedTabBackground";
import { CalendarSVG, DocumentSVG, HomeSVG, UserSVG } from "@/data/icons";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function TabsLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#6D28D9",
          tabBarInactiveTintColor: "#BFA3F5",
          tabBarStyle: {
            position: "absolute",
            zIndex: 5,
            backgroundColor: "transparent",
            borderTopWidth: 0,
            elevation: 0,
            height: 90,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 5,
          },
          tabBarIcon: ({ focused }) => {
            const fill = focused ? "#6D28D9" : "rgba(216, 196, 255, 1)";
            const iconProps = { width: 28, height: 28, fill };

            switch (route.name) {
              case "index":
                return <HomeSVG {...iconProps} />;
              case "calendar":
                return <CalendarSVG {...iconProps} />;
              case "documents":
                return <DocumentSVG {...iconProps} />;
              case "users":
                return <UserSVG {...iconProps} />;
              default:
                return null;
            }
          },
        })}
      >
        <Tabs.Screen name="index" />
        <Tabs.Screen name="calendar" />
        <Tabs.Screen
          name="add"
          options={{
            tabBarButton: () => (
              <View style={styles.fabWrapper}>
                <TouchableOpacity onPress={() => console.log("Add pressed")}>
                  <LinearGradient
                    colors={["#A084E8", "#8C52FF"]}
                    style={styles.fabButton}
                  >
                    <Ionicons name="add" size={32} color="white" />
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            ),
          }}
        />
        <Tabs.Screen name="documents" />
        <Tabs.Screen name="users" />
      </Tabs>

      <CurvedTabBackground />
    </View>
  );
}

const styles = StyleSheet.create({
  fabWrapper: {
    position: "absolute",
    top: -45,
    alignSelf: "center",
    shadowColor: "#A084E8",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 12,
    zIndex: 1,
  },
  fabButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: "center",
    alignItems: "center",
  },
});

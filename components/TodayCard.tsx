import { createTodayTaskStyles } from "@/assets/styles/todayTask.style";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import CircularProgressIndicator from "./ui/CircularProgressIndicator";

const TodayCard = () => {
  const { colors } = useTheme();
  const styles = createTodayTaskStyles(colors);

  const onPress = () => {};

  return (
    <View style={{ flexDirection: "row", height: "100%" }}>
      <View style={styles.left}>
        <Text style={styles.title}>Your today’s task{"\n"}almost done!</Text>
        <View style={styles.leftContent}>
          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>View Task</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.right}>
        <CircularProgressIndicator
          size={72}
          strokeWidth={8}
          progress={86}
          textColor="#ffffff"
        />
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="ellipsis-horizontal" size={20} color={colors.bg} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TodayCard;

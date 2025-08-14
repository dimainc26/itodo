import { createFocusModeStyles } from "@/assets/styles/focusMode.style";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import CircularProgressIndicator from "./ui/CircularProgressIndicator";

const FocusMode = () => {
  const { colors } = useTheme();
  const styles = createFocusModeStyles(colors);

  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
      .toString()
      .padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  return (
    <View style={styles.container}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <CircularProgressIndicator
          progress={(seconds / 1800) * 100}
          progressColor={colors.gradients.primary[0]}
          backgroundColor={colors.gradients.surface[0]}
          size={200}
          strokeWidth={12}
        >
          <Text style={{ fontSize: 28, fontWeight: "600", color: colors.text }}>
            {formatTime(seconds)}
          </Text>
        </CircularProgressIndicator>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity
          onPress={() => setIsRunning((prev) => !prev)}
          style={styles.controlButton}
          activeOpacity={0.8}
        >
          <Ionicons
            name={isRunning ? "pause" : "play"}
            size={32}
            color="#fff"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleReset}
          style={[styles.controlButton, styles.resetButton]}
          activeOpacity={0.8}
        >
          <Ionicons name="refresh" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FocusMode;

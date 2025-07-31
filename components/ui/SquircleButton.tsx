import { SquircleSVG } from "@/data/icons";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

interface SquircleButtonProps {
  title: string;
  onPress: () => void;
}

const SquircleButton = ({ onPress, title }: SquircleButtonProps) => {
  const { width, height } = useWindowDimensions();
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={styles.container}
    >
      <View style={styles.content}>
        <SquircleSVG width={width} />
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SquircleButton;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  text: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 16,
    position: "absolute",
    textAlign: "center",
  },
});

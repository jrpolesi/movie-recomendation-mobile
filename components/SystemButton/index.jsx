import { useTheme } from "@react-navigation/native";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

export function SystemButton({ isLoading, children, ...props }) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity {...props} style={[styles.button(colors), props.style]}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Text style={styles.buttonText(colors)}>{children}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: (colors) => ({
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    borderWidth: 0,
  }),
  buttonText: (colors) => ({
    color: colors.textContrastColor,
  }),
});

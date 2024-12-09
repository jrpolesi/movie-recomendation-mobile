import { useTheme } from "@react-navigation/native";
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

export function SystemButton({ isLoading, children, ...props }) {
  const { colors } = useTheme();

  const isIOS = Platform.OS === "ios";

  return (
    <TouchableOpacity
      {...props}
      style={[styles.button(colors), !isIOS && styles.noIOSStyle, props.style]}
    >
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
  noIOSStyle: {
    elevation: 5,
    shadowColor: "#000000",
    borderRadius: 0,
  },
  buttonText: (colors) => ({
    color: colors.textContrastColor,
  }),
});

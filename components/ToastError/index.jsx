import { useTheme } from "@react-navigation/native";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
export function ToastError({ error, resetError }) {
  const { colors } = useTheme();

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        resetError();
      }, 3000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [error, resetError]);

  if (!error) {
    return null;
  }

  return (
    <View style={styles.toastError(colors)}>
      <Text style={styles.toastErrorIcon}>⚠️</Text>
      <Text style={styles.toastErrorMessage(colors)}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  toastError: (colors) => ({
    flexDirection: "row",
    gap: 10,
    backgroundColor: colors.warning,
    color: colors.textContrastColor,
    position: "absolute",
    right: 10,
    top: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    maxWidth: "95%",
    maxHeight: "95%",
    paddingVertical: 10,
    paddingHorizontal: 15,
  }),
  toastErrorIcon: {
    fontSize: 16,
  },
  toastErrorMessage: (colors) => ({
    color: colors.textContrastColor,
  }),
});

import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TheMovieDBProvider, ToastErrorProvider } from "./contexts/index.jsx";
import { Navigation } from "./Navigation.js";

export default function App() {
  return (
    <GestureHandlerRootView style={styles.gesture}>
      <ToastErrorProvider>
        <TheMovieDBProvider>
          <Navigation />
        </TheMovieDBProvider>
      </ToastErrorProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  gesture: {
    flex: 1,
  },
});

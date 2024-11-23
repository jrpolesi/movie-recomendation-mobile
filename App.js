import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TheMovieDBProvider, ToastErrorProvider } from "./contexts";
import { Navigation } from "./Navigation";

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

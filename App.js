import { TheMovieDBProvider, ToastErrorProvider } from "./contexts";
import { Navigation } from "./Navigation";

export default function App() {
  return (
    <ToastErrorProvider>
      <TheMovieDBProvider>
        <Navigation />
      </TheMovieDBProvider>
    </ToastErrorProvider>
  );
}

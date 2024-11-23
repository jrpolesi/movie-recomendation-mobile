import AsyncStorage from "@react-native-async-storage/async-storage";
import { WATCH_LIST_KEY } from "../storageKeys";

export async function removeMovie(options = {}) {
  const stringValue = (await AsyncStorage.getItem(WATCH_LIST_KEY)) ?? "{}";

  const value = JSON.parse(stringValue);

  if (value.movies) {
    value.movies = value.movies.filter(
      (movie) => movie.id !== options.movie.id
    );
  }

  await AsyncStorage.setItem(WATCH_LIST_KEY, JSON.stringify(value));
}

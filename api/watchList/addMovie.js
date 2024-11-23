import AsyncStorage from "@react-native-async-storage/async-storage";
import { WATCH_LIST_KEY } from "../storageKeys.js";

export async function addMovie(options = {}) {
  const stringValue = (await AsyncStorage.getItem(WATCH_LIST_KEY)) ?? "{}";

  const value = JSON.parse(stringValue);

  if (value.movies) {
    value.movies.push(options.movie);
  } else {
    value.movies = [options.movie];
  }

  await AsyncStorage.setItem(WATCH_LIST_KEY, JSON.stringify(value));

  return value.movies;
}

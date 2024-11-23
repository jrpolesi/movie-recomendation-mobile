import AsyncStorage from "@react-native-async-storage/async-storage";
import { WATCH_LIST_KEY } from "../storageKeys.js";

export async function addSerie(options = {}) {
  const stringValue = (await AsyncStorage.getItem(WATCH_LIST_KEY)) ?? "{}";

  const value = JSON.parse(stringValue);

  if (value.series) {
    value.series.push(options.serie);
  } else {
    value.series = [options.serie];
  }

  await AsyncStorage.setItem(WATCH_LIST_KEY, JSON.stringify(value));

  return value.series;
}

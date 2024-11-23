import AsyncStorage from "@react-native-async-storage/async-storage";
import { WATCH_LIST_KEY } from "../storageKeys";

export async function removeSerie(options = {}) {
  const stringValue = (await AsyncStorage.getItem(WATCH_LIST_KEY)) ?? "{}";

  const value = JSON.parse(stringValue);

  if (value.series) {
    value.series = value.series.filter(
      (serie) => serie.id !== options.serie.id
    );
  }

  await AsyncStorage.setItem(WATCH_LIST_KEY, JSON.stringify(value));
}

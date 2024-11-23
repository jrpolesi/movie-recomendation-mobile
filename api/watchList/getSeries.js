import AsyncStorage from "@react-native-async-storage/async-storage";
import { WATCH_LIST_KEY } from "../storageKeys";

export async function getSeries() {
  const stringValue = (await AsyncStorage.getItem(WATCH_LIST_KEY)) ?? "{}";

  const value = JSON.parse(stringValue);

  return value.series;
}

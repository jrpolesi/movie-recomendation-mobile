import { WATCH_LIST_KEY } from "../storageKeys";

export function getSeries() {
  const stringValue = localStorage.getItem(WATCH_LIST_KEY) ?? "{}";

  const value = JSON.parse(stringValue);

  return value.series;
}

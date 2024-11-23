import { WATCH_LIST_KEY } from "../storageKeys";

export async function addSerie(options = {}) {
  const stringValue = localStorage.getItem(WATCH_LIST_KEY) ?? "{}";

  const value = JSON.parse(stringValue);

  if (value.series) {
    value.series.push(options.serie);
  } else {
    value.series = [options.serie];
  }

  localStorage.setItem(WATCH_LIST_KEY, JSON.stringify(value));

  return value.series;
}

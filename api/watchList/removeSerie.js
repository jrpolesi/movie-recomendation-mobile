import { WATCH_LIST_KEY } from "../storageKeys";

export async function removeSerie(options = {}) {
  const stringValue = localStorage.getItem(WATCH_LIST_KEY) ?? "{}";

  const value = JSON.parse(stringValue);

  if (value.series) {
    value.series = value.series.filter(
      (serie) => serie.id !== options.serie.id
    );
  }

  localStorage.setItem(WATCH_LIST_KEY, JSON.stringify(value));
}

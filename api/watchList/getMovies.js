import { WATCH_LIST_KEY } from "../storageKeys";

export function getMovies() {
  const stringValue = localStorage.getItem(WATCH_LIST_KEY) ?? "{}";

  const value = JSON.parse(stringValue);

  return value.movies;
}

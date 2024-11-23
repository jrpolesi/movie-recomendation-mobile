import { WATCH_LIST_KEY } from "../storageKeys";

export async function addMovie(options = {}) {
  const stringValue = localStorage.getItem(WATCH_LIST_KEY) ?? "{}";

  const value = JSON.parse(stringValue);

  if (value.movies) {
    value.movies.push(options.movie);
  } else {
    value.movies = [options.movie];
  }

  localStorage.setItem(WATCH_LIST_KEY, JSON.stringify(value));

  return value.movies;
}

import { WATCH_LIST_KEY } from "../storageKeys";

export async function removeMovie(options = {}) {
  const stringValue = localStorage.getItem(WATCH_LIST_KEY) ?? "{}";

  const value = JSON.parse(stringValue);

  if (value.movies) {
    value.movies = value.movies.filter(
      (movie) => movie.id !== options.movie.id
    );
  }

  localStorage.setItem(WATCH_LIST_KEY, JSON.stringify(value));
}

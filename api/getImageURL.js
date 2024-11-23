import { defaultPoster } from "../assets";

export function getImageURL(path, width = 500) {
  if (path) {
    return `https://image.tmdb.org/t/p/w${width}/${path}`;
  }

  return defaultPoster;
}

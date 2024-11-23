export function getImageURL(path, width = 500) {
  if (path) {
    return { uri: `https://image.tmdb.org/t/p/w${width}/${path}` };
  }

  return require("../assets/default-poster.jpg");
}

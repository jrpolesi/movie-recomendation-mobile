import { addMovie } from "./addMovie.js";
import { addSerie } from "./addSerie.js";
import { getMovies } from "./getMovies.js";
import { getSeries } from "./getSeries.js";
import { removeMovie } from "./removeMovie.js";
import { removeSerie } from "./removeSerie.js";

export const watchList = {
  getMovies,
  getSeries,
  addMovie,
  addSerie,
  removeSerie,
  removeMovie,
};

import { addMovie } from "./addMovie";
import { addSerie } from "./addSerie";
import { getMovies } from "./getMovies";
import { getSeries } from "./getSeries";
import { removeMovie } from "./removeMovie";
import { removeSerie } from "./removeSerie";

export const watchList = {
  getMovies,
  getSeries,
  addMovie,
  addSerie,
  removeSerie,
  removeMovie,
};

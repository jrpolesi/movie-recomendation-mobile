import { discover } from "./discover/index.js";
import { genres } from "./genres/index.js";
import { movies } from "./movies/index.js";
import { search } from "./search/index.js";
import { series } from "./series/index.js";
import { watchList } from "./watchList/index.js";

export class TheMovieDB {
  baseURL = "https://api.themoviedb.org/3";

  constructor(apiKey, defaultLanguage = "pt-BR") {
    this.apiKey = apiKey;
    this.defaultLanguage = defaultLanguage;
    this.defaultHeaders = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.apiKey}`,
    };
  }

  discover = {
    getMovies: (...args) => discover.getMovies.call(this, ...args),
    getSeries: (...args) => discover.getSeries.call(this, ...args),
  };

  search = {
    getMovies: (...args) => search.getMovies.call(this, ...args),
    getSeries: (...args) => search.getSeries.call(this, ...args),
  };

  watchList = {
    getMovies: (...args) => watchList.getMovies.call(this, ...args),
    getSeries: (...args) => watchList.getSeries.call(this, ...args),
    addMovie: (...args) => watchList.addMovie.call(this, ...args),
    addSerie: (...args) => watchList.addSerie.call(this, ...args),
    removeMovie: (...args) => watchList.removeMovie.call(this, ...args),
    removeSerie: (...args) => watchList.removeSerie.call(this, ...args),
  };

  genres = {
    getMovieGenres: (...args) => genres.getMovieGenres.call(this, ...args),
    getSerieGenres: (...args) => genres.getSerieGenres.call(this, ...args),
  };

  movies = {
    getMovieDetails: (...args) => movies.getMovieDetails.call(this, ...args),
  };

  series = {
    getSerieDetails: (...args) => series.getSerieDetails.call(this, ...args),
  };
}

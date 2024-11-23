import { useTheMovieDBContext } from "../contexts/index.jsx";
import { useQuery } from "./shared/useQuery.jsx";

export function useFindMovie() {
  const api = useTheMovieDBContext();

  const {
    data: genresData,
    isLoading: isGenresLoading,
    error: genresError,
  } = useQuery(api.genres.getMovieGenres);

  const genresMap = genresData?.genres?.reduce((acc, genre) => {
    acc[genre.id] = genre.name;
    return acc;
  }, {});

  return {
    isLoading: isGenresLoading,
    error: genresError,
    fn: async (query) => {
      const res = await api.search.getMovies({ query });
      const { results } = res.body;

      const movie = results[0];

      if (!movie) {
        return null;
      }

      return {
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        voteAverage: movie.vote_average,
        posterPath: movie.poster_path,
        backdropPath: movie.backdrop_path,
        releaseDate: movie.release_date,
        genres: movie.genre_ids.map((id) => genresMap?.[id]),
      };
    },
  };
}

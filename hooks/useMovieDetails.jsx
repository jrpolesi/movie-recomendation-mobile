import { useTheMovieDBContext } from "../contexts/TheMovieDB.jsx";
import { useQuery } from "./shared/useQuery.jsx";

/**
 *
 * @param {
 *  id: number,
 * } options
 * @returns {{
 *  data: {
 *    id: number,
 *    title: string,
 *    originalTitle: string,
 *    originalLanguage: string,
 *    overview: string,
 *    voteAverage: number,
 *    posterPath: string,
 *    backdropPath: string,
 *    releaseDate: string,
 *    genres: string[],
 *  },
 *  error: Error,
 *  isLoading: boolean,
 * }}
 */
export function useMovieDetails(options) {
  const api = useTheMovieDBContext();

  const { data, isLoading, error } = useQuery(
    api.movies.getMovieDetails,
    options
  );

  return {
    data: {
      id: data?.id,
      title: data?.title,
      originalTitle: data?.original_title,
      originalLanguage: data?.original_language,
      data: data?.original_title,
      overview: data?.overview,
      genres: data?.genres.map((genre) => genre.name),
      posterPath: data?.poster_path,
      releaseDate: data?.release_date,
      voteAverage: data?.vote_average,
    },
    isLoading,
    error,
  };
}

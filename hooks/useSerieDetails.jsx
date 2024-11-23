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
export function useSerieDetails(options) {
  const api = useTheMovieDBContext();

  const { data, isLoading, error } = useQuery(
    api.series.getSerieDetails,
    options
  );

  return {
    data: {
      id: data?.id,
      title: data?.name,
      originalTitle: data?.original_name,
      originalLanguage: data?.original_language,
      overview: data?.overview,
      genres: data?.genres.map((genre) => genre.name),
      posterPath: data?.poster_path,
      releaseDate: data?.first_air_date,
      voteAverage: data?.vote_average,
    },
    isLoading,
    error,
  };
}

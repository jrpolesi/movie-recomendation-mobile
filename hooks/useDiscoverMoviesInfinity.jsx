import { useMemo } from "react";
import { useTheMovieDBContext } from "../contexts/TheMovieDB.jsx";
import { useInfinityQuery } from "./shared/useInfinityQuery.jsx";
import { useQuery } from "./shared/useQuery.jsx";

/**
 *
 * @param {
 *  with_genres: string,
 *  with_watch_providers: string,
 *  release_date.gte: date,
 *  certification.gte: string,
 *  vote_count.gte: number,
 * } options
 * @returns {{
 *  pagination: {
 *    page: number,
 *    totalPages: number,
 *    hasNextPage: boolean,
 *    hasPreviousPage: boolean,
 *    fetchNextPage: () => void,
 *    fetchPreviousPage: () => void,
 *    fetchPage: (page: number) => void,
 *  },
 *  data: {
 *    id: number,
 *    title: string,
 *    overview: string,
 *    voteAverage: number,
 *    posterPath: string,
 *    backdropPath: string,
 *    releaseDate: string,
 *    genres: string[],
 *  }[],
 *  error: Error,
 *  isLoading: boolean,
 * }}
 */
export function useDiscoverMoviesInfinity(options) {
  const api = useTheMovieDBContext();

  const {
    data: genresData,
    isLoading: isGenresLoading,
    error: genresError,
  } = useQuery(api.genres.getMovieGenres);

  const { data, ...rest } = useInfinityQuery(api.discover.getMovies, options);

  const movies = useMemo(() => {
    const genresMap = genresData?.genres?.reduce((acc, genre) => {
      acc[genre.id] = genre.name;
      return acc;
    }, {});

    return data?.map((movie) => ({
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      voteAverage: movie.vote_average,
      posterPath: movie.poster_path,
      backdropPath: movie.backdrop_path,
      releaseDate: movie.release_date,
      genres: movie.genre_ids.map((id) => genresMap?.[id]),
    }));
  }, [data, genresData?.genres]);

  return {
    data: movies,
    isLoading: isGenresLoading ?? rest.isLoading,
    error: genresError ?? rest.error,
    ...rest,
  };
}

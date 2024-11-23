import { useMemo } from "react";
import { useTheMovieDBContext } from "../contexts/TheMovieDB.jsx";
import { usePaginatedQuery } from "./shared/usePaginatedQuery.jsx";
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
export function useDiscoverSeries(options) {
  const api = useTheMovieDBContext();

  const {
    data: genresData,
    isLoading: isGenresLoading,
    error: genresError,
  } = useQuery(api.genres.getSerieGenres);

  const { data, ...rest } = usePaginatedQuery(api.discover.getSeries, options);

  const series = useMemo(() => {
    const genresMap = genresData?.genres?.reduce((acc, genre) => {
      acc[genre.id] = genre.name;
      return acc;
    }, {});

    return data?.map((serie) => ({
      id: serie.id,
      title: serie.name,
      overview: serie.overview,
      voteAverage: serie.vote_average,
      posterPath: serie.poster_path,
      backdropPath: serie.backdrop_path,
      releaseDate: serie.first_air_date,
      genres: serie.genre_ids.map((id) => genresMap?.[id]),
    }));
  }, [data, genresData?.genres]);

  return {
    data: series,
    isLoading: isGenresLoading ?? rest.isLoading,
    error: genresError ?? rest.error,
    ...rest,
  };
}

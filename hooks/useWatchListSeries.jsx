import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { useTheMovieDBContext } from "../contexts";

export function useWatchListSeries() {
  const [series, setSeries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const api = useTheMovieDBContext();

  useFocusEffect(
    useCallback(() => {
      async function fetchMovies() {
        setIsLoading(true);
        const movies = await api.watchList.getSeries();
        setSeries(movies ?? []);
        setIsLoading(false);
      }

      fetchMovies();
    }, [api])
  );

  return {
    data: series,
    isLoading: isLoading,
    updateWatchList: setSeries,
  };
}

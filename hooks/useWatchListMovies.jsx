import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { useTheMovieDBContext } from "../contexts/index.jsx";

export function useWatchListMovies() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const api = useTheMovieDBContext();

  useFocusEffect(
    useCallback(() => {
      async function fetchMovies() {
        setIsLoading(true);
        const movies = await api.watchList.getMovies();
        setMovies(movies ?? []);
        setIsLoading(false);
      }

      fetchMovies();
    }, [api])
  );

  return {
    data: movies,
    isLoading: isLoading,
    updateWatchList: setMovies,
  };
}

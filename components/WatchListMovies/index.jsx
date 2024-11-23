import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { useTheMovieDBContext } from "../../contexts";
import { TitlesList } from "../TitlesList";

export function WatchListMovies({ onPress }) {
  const api = useTheMovieDBContext();
  const [movies, setMovies] = useState([]);

  useFocusEffect(
    useCallback(() => {
      async function fetchMovies() {
        const movies = await api.watchList.getMovies();
        setMovies(movies);
      }

      fetchMovies();
    }, [api])
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {movies?.length ? (
        <TitlesList titles={movies} onPress={onPress} />
      ) : (
        <Text style={styles.emptyWatchList}>
          Sua lista de filmes para assistir está vazia.
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 20,
  },
  emptyWatchList: {
    fontSize: 22,
    margin: 30,
    textAlign: "center",
  },
});

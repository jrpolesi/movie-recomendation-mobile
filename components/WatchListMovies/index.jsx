import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { useTheMovieDBContext } from "../../contexts/index.jsx";
import { useWatchListMovies } from "../../hooks/index.jsx";
import { TitlesList } from "../TitlesList/index.jsx";

export function WatchListMovies({ onPress }) {
  const api = useTheMovieDBContext();

  const { data: movies, updateWatchList } = useWatchListMovies();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {movies?.length ? (
        <TitlesList
          titles={movies}
          onPress={onPress}
          isOnWatchList={(id) => movies.find((movie) => movie.id === id)}
          onAddToWatchList={async (movie) => {
            const updated = await api.watchList.addMovie({ movie });
            updateWatchList(updated);
          }}
          onRemoveFromWatchList={async (movie) => {
            const updated = await api.watchList.removeMovie({ movie });
            updateWatchList(updated);
          }}
        />
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
    gap: 20,
  },
  emptyWatchList: {
    fontSize: 22,
    margin: 30,
    textAlign: "center",
  },
});

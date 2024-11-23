import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { useTheMovieDBContext } from "../../contexts";
import { useWatchListSeries } from "../../hooks";
import { TitlesList } from "../TitlesList";

export function WatchListSeries({ onPress }) {
  const api = useTheMovieDBContext();

  const { data: series, updateWatchList } = useWatchListSeries();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {series?.length ? (
        <TitlesList
          titles={series}
          onPress={onPress}
          isOnWatchList={(id) => series.find((serie) => serie.id === id)}
          onAddToWatchList={async (serie) => {
            const updated = await api.watchList.addSerie({ serie });
            updateWatchList(updated);
          }}
          onRemoveFromWatchList={async (serie) => {
            const updated = await api.watchList.removeSerie({ serie });
            updateWatchList(updated);
          }}
        />
      ) : (
        <Text style={styles.emptyWatchList}>
          Sua lista de séries para assistir está vazia.
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

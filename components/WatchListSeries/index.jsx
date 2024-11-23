import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { useTheMovieDBContext } from "../../contexts";
import { TitlesList } from "../TitlesList";

export function WatchListSeries({ onPress }) {
  const api = useTheMovieDBContext();
  const [series, setSeries] = useState([]);

  useFocusEffect(
    useCallback(() => {
      async function fetchSeries() {
        const series = await api.watchList.getSeries();
        setSeries(series);
      }

      fetchSeries();
    }, [api])
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {series?.length ? (
        <TitlesList titles={series} onPress={onPress} />
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
    alignItems: "center",
    gap: 20,
  },
  emptyWatchList: {
    fontSize: 22,
    margin: 30,
    textAlign: "center",
  },
});

import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";
import { SystemButton, TitlesList } from "../../components/index.jsx";
import { useTheMovieDBContext } from "../../contexts/index.jsx";
import { useDiscoverSeriesInfinity, useWatchListSeries } from "../../hooks/index.jsx";

export function PopularSeriesPage({ navigation }) {
  const api = useTheMovieDBContext();

  const {
    data,
    isLoading,
    pagination: { fetchNextPage },
  } = useDiscoverSeriesInfinity({
    sort_by: "popularity.desc",
  });

  const { data: watchList, updateWatchList } = useWatchListSeries();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.popularListContainer}>
        {data?.length && (
          <TitlesList
            titles={data}
            onPress={(id) => navigation.navigate("Serie", { id })}
            isOnWatchList={(id) => watchList.find((serie) => serie.id === id)}
            onAddToWatchList={async (serie) => {
              const updated = await api.watchList.addSerie({ serie });
              updateWatchList(updated);
            }}
            onRemoveFromWatchList={async (serie) => {
              const updated = await api.watchList.removeSerie({ serie });
              updateWatchList(updated);
            }}
          />
        )}
        {isLoading && <ActivityIndicator size={50} />}
      </View>

      <SystemButton
        disabled={isLoading}
        style={styles.popularShowMoreBtn}
        onPress={fetchNextPage}
      >
        Exibir mais
      </SystemButton>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  popularListContainer: {
    gap: 2,
    flex: 1,
  },
  popularShowMoreBtn: {
    display: "block",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 80,
  },
});

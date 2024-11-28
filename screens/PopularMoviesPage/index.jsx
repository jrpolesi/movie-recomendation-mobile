import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";
import { SystemButton } from "../../components/SystemButton/index.jsx";
import { TitlesList } from "../../components/TitlesList/index.jsx";
import { useTheMovieDBContext } from "../../contexts/index.jsx";
import {
  useDiscoverMoviesInfinity,
  useWatchListMovies,
} from "../../hooks/index.jsx";

export function PopularMoviesPage({ navigation }) {
  const api = useTheMovieDBContext();

  const {
    data,
    isLoading,
    pagination: { fetchNextPage },
  } = useDiscoverMoviesInfinity({
    sort_by: "popularity.desc",
  });

  const { data: watchList, updateWatchList } = useWatchListMovies();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.popularListContainer}>
        {data?.length && (
          <TitlesList
            titles={data}
            onPress={(id) => navigation.navigate("Movie", { id })}
            isOnWatchList={(id) => watchList.find((movie) => movie.id === id)}
            onAddToWatchList={async (movie) => {
              const updated = await api.watchList.addMovie({ movie });
              updateWatchList(updated);
            }}
            onRemoveFromWatchList={async (movie) => {
              const updated = await api.watchList.removeMovie({
                movie,
              });
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

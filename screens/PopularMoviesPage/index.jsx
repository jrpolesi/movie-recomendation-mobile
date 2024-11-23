import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";
import { SystemButton, TitlesList } from "../../components";
import { useDiscoverMoviesInfinity } from "../../hooks";

export function PopularMoviesPage({ navigation }) {
  const {
    data,
    isLoading,
    pagination: { fetchNextPage },
  } = useDiscoverMoviesInfinity({
    sort_by: "popularity.desc",
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.popularListContainer}>
        {data?.length && (
          <TitlesList
            titles={data}
            onPress={(id) => navigation.navigate("Movie", { id })}
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

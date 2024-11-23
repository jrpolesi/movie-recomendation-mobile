import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { TitleDetails } from "../../components";
import { useTheMovieDBContext } from "../../contexts";
import { useSerieDetails } from "../../hooks";

export function SeriePage({ route }) {
  const { id } = route.params;

  const api = useTheMovieDBContext();

  const [watchList, setWatchList] = useState([]);

  useEffect(() => {
    const fetchWatchList = async () => {
      const watchList = await api.watchList.getSeries();
      setWatchList(watchList);
    };

    fetchWatchList();
  }, []);

  const { data, isLoading } = useSerieDetails({ id });

  return (
    <View>
      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator size={50} />
        </View>
      ) : (
        data && (
          <TitleDetails
            {...data}
            isOnWatchList={watchList?.find((movie) => movie.id == id)}
            onAddToWatchList={async () => {
              const updated = await api.watchList.addMovie({ movie: data });
              setWatchList(updated);
            }}
            onRemoveFromWatchList={async () => {
              const updated = await api.watchList.removeMovie({ movie: data });
              setWatchList(updated);
            }}
          />
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { TitleDetails } from "../../components/TitleDetails/index.jsx";
import { useTheMovieDBContext } from "../../contexts/index.jsx";
import { useSerieDetails } from "../../hooks/index.jsx";

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
  }, [api]);

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
            isOnWatchList={watchList?.find((serie) => serie.id == id)}
            onAddToWatchList={async () => {
              const updated = await api.watchList.addSerie({ serie: data });
              setWatchList(updated);
            }}
            onRemoveFromWatchList={async () => {
              const updated = await api.watchList.removeSerie({ serie: data });
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

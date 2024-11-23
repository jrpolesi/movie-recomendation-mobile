import { useTheme } from "@react-navigation/native";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getImageURL } from "../../api";

export function TitleCard({
  genres = [],
  posterPath,
  title,
  releaseDate,
  onPress,
}) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity style={styles.container(colors)} onPress={onPress}>
      <Image
        source={{ uri: getImageURL(posterPath, 400) }}
        style={styles.image}
      />

      <View style={styles.titleCardInfo}>
        {!!genres.length && (
          <Text style={styles.titleCardGenres(colors)}>
            {genres.join(" - ")}
          </Text>
        )}

        <View style={styles.titleCardDetails}>
          <Text style={styles.titleCardTitle}>{title}</Text>

          {releaseDate && (
            <Text style={styles.titleCardReleaseDate(colors)}>
              {releaseDate}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: (colors) => ({
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: colors.background,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    width: 350,
    marginHorizontal: "auto",
  }),
  image: {
    width: "100%",
    height: 200,
  },
  titleCardInfo: {
    paddingTop: 10,
  },
  titleCardGenres: (colors) => ({
    fontSize: 14,
    color: colors.textSecondary,
  }),
  titleCardDetails: {
    marginTop: 8,
  },
  titleCardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  titleCardReleaseDate: (colors) => ({
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  }),
});

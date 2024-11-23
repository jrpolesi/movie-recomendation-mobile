import { useTheme } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { getImageURL } from "../../api";
import { SystemButton } from "../SystemButton";

export function TitleDetails({
  id,
  title,
  posterPath,
  voteAverage,
  genres,
  overview,
  releaseDate,
  originalTitle,
  originalLanguage,
  onAddToWatchList,
  onRemoveFromWatchList,
  isOnWatchList,
}) {
  const { colors } = useTheme();
  const styles = createStyles();

  return (
    <View style={styles.cardContainer}>
      <Text style={styles.upperTitle}>{title}</Text>

      <Image
        style={styles.poster}
        source={{ uri: getImageURL(posterPath, 400) }}
        alt={title}
      />

      <View style={styles.info}>
        <View style={styles.titleHeader}>
          <Text style={styles.upperTitle}>{title}</Text>

          <Text style={[styles.originalInfo, { color: colors.text }]}>
            <Text>{originalTitle}</Text> -
            <Text>{originalLanguage?.toUpperCase()}</Text>
          </Text>
        </View>

        <Text style={[styles.genres, { color: colors.text }]}>
          {genres?.join(" - ")}
        </Text>

        <Text style={[styles.description, { color: colors.text }]}>
          {overview}
        </Text>

        <View style={styles.moreDetails}>
          <Text
            style={[
              styles.vote,
              { backgroundColor: colors.primary, color: colors.background },
            ]}
          >
            {voteAverage?.toFixed(1)}
          </Text>
          <View style={styles.releaseDate}>
            <Text style={{ color: colors.text }}>Lançamento</Text>
            <Text style={{ color: colors.text }}>{releaseDate}</Text>
          </View>
        </View>

        {isOnWatchList ? (
          <SystemButton onPress={() => onRemoveFromWatchList?.(id)}>
            Remover da lista
          </SystemButton>
        ) : (
          <SystemButton onPress={() => onAddToWatchList?.(id)}>
            Ver mais tarde
          </SystemButton>
        )}
      </View>
    </View>
  );
}

const createStyles = () =>
  StyleSheet.create({
    cardContainer: {
      flexDirection: "column",
      gap: 20,
    },
    upperTitle: {
      fontSize: 20,
    },
    poster: {
      width: "100%",
      maxWidth: 400,
      alignSelf: "center",
    },
    titleHeader: {
      flexDirection: "column",
      gap: 8,
    },
    originalInfo: {
      fontStyle: "italic",
      fontSize: 20,
    },
    info: {
      flexDirection: "column",
      alignItems: "flex-start",
      gap: 10,
    },
    genres: {
      color: "gray",
    },
    description: {
      marginTop: 10,
    },
    moreDetails: {
      marginVertical: 20,
      gap: 20,
    },
    vote: {
      justifyContent: "center",
      alignItems: "center",
      width: 40,
      height: 40,
      borderRadius: 50,
    },
    releaseDate: {
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      gap: 8,
    },
  });

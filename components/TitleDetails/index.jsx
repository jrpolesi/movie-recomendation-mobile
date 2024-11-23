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
      <Image
        style={styles.poster}
        source={getImageURL(posterPath, 400)}
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

        <Text style={styles.genres(colors)}>{genres?.join(" - ")}</Text>

        <Text style={styles.description}>{overview}</Text>

        <View style={styles.moreDetails}>
          <View style={styles.vote(colors)}>
            <Text style={styles.voteText(colors)}>
              {voteAverage?.toFixed(1)}
            </Text>
          </View>
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
      gap: 20,
    },
    poster: {
      width: "100%",
      height: 200,
      alignSelf: "center",
    },
    info: {
      paddingHorizontal: 20,
      paddingBottom: 10,
      alignItems: "flex-start",
      gap: 10,
    },
    titleHeader: {
      gap: 4,
    },
    upperTitle: {
      fontSize: 22,
    },
    originalInfo: {
      fontStyle: "italic",
      fontSize: 14,
    },
    genres: (colors) => ({
      color: colors.textSecondary,
      marginTop: 10,
    }),
    description: {
      marginTop: 10,
    },
    moreDetails: {
      flexDirection: "row",
      marginVertical: 20,
      gap: 30,
    },
    vote: (colors) => ({
      justifyContent: "center",
      alignItems: "center",
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: colors.primary,
    }),
    voteText: (colors) => ({
      color: colors.textContrastColor,
      fontSize: 18,
    }),
    releaseDate: {
      justifyContent: "center",
      alignItems: "center",
      gap: 4,
    },
  });

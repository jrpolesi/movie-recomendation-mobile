import { useTheme } from "@react-navigation/native";
import { Alert, Image, Platform, StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { getImageURL } from "../../api/index.js";

export function TitleCard({
  genres = [],
  posterPath,
  title,
  releaseDate,
  onPress,
  isOnWatchList,
  onAddToWatchList,
  onRemoveFromWatchList,
}) {
  const { colors } = useTheme();
  const translateX = useSharedValue(0);
  const isAlertOpen = useSharedValue(false);

  const isIOS = Platform.OS === "ios";

  function handlePanGesture(event) {
    const { translationX } = event;

    translateX.value = translationX > 0 ? 0 : translationX;

    if (!isAlertOpen.value && translationX < -100) {
      isAlertOpen.value = true;

      const alertMessage = isOnWatchList
        ? "Deseja remover este título da sua lista de ver mais tarde?"
        : "Deseja adicionar este título à sua lista de ver mais tarde?";

      Alert.alert("Ver mais tarde", alertMessage, [
        {
          text: "Cancelar",
          onPress: () => (isAlertOpen.value = false),
          style: "cancel",
        },
        {
          text: "Confirmar",
          onPress: () => {
            isAlertOpen.value = false;

            if (isOnWatchList) {
              onRemoveFromWatchList?.();
            } else {
              onAddToWatchList?.();
            }
          },
        },
      ]);
    }
  }

  const pan = Gesture.Pan()
    .onChange(handlePanGesture)
    .onEnd(() => {
      translateX.value = 0;
      isAlertOpen.value = false;
    })
    .runOnJS(true);

  const tap = Gesture.Tap().onEnd(onPress).runOnJS(true);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  }, [translateX.value]);

  const gesture = Gesture.Exclusive(pan, tap);

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[
          styles.container(colors),
          !isIOS && styles.nonIOSContainer,
          animatedStyle,
        ]}
      >
        <Image source={getImageURL(posterPath, 400)} style={styles.image} />

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
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: (colors) => ({
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: colors.background,
    width: "80%",
    alignSelf: "center",
  }),
  nonIOSContainer: {
    elevation: 8,
    shadowColor: "#000000",
    padding: 10,
    borderRadius: 0,
  },
  image: {
    width: "100%",
    height: 200,
  },
  titleCardInfo: {
    padding: 10,
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

import { ScrollView, StyleSheet, View } from "react-native";
import { TitleCard } from "../TitleCard";

export function TitlesList({
  titles,
  onPress,
  isOnWatchList,
  onAddToWatchList,
  onRemoveFromWatchList,
}) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {titles.map((item) => (
        <View key={item.id.toString()}>
          <TitleCard
            {...item}
            onPress={() => onPress(item.id)}
            isOnWatchList={isOnWatchList(item.id)}
            onAddToWatchList={async () => await onAddToWatchList(item)}
            onRemoveFromWatchList={async () =>
              await onRemoveFromWatchList(item)
            }
          />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
  },
});

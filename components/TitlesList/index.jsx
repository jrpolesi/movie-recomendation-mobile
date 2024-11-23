import { StyleSheet, View } from "react-native";
import { TitleCard } from "../TitleCard";

import { ScrollView } from "react-native";

export function TitlesList({ titles, onPress }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {titles.map((item) => (
        <View key={item.id.toString()}>
          <TitleCard {...item} onPress={() => onPress(item.id)} />
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

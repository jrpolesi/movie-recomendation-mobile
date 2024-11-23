import { StyleSheet, View } from "react-native";
import { TitleCard } from "../TitleCard";

import { ScrollView } from "react-native";

export function TitlesList({ titles, linkPrefix, onPress }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {titles.map((item) => (
        <View key={item.id.toString()} style={styles.item}>
          <TitleCard
            {...item}
            linkPrefix={linkPrefix}
            onPress={() => onPress(item.id)}
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
  item: {
    flex: 1,
  },
});

import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { WatchListMovies, WatchListSeries } from "../../components";
import { SystemButton } from "../../components/SystemButton";

const tabs = [
  {
    id: "movies",
    label: "Filmes",
    Component: WatchListMovies,
  },
  {
    id: "series",
    label: "Séries",
    Component: WatchListSeries,
  },
];

export function WatchListPage({ navigation }) {
  const [currentTab, setCurrentTab] = useState(tabs[0]);

  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        {tabs.map((tab) => (
          <SystemButton
            key={tab.id}
            onPress={() => setCurrentTab(tab)}
            style={
              tab.id === currentTab.id
                ? styles.tab
                : [styles.tab, styles.inactiveTab]
            }
          >
            <Text>{tab.label}</Text>
          </SystemButton>
        ))}
      </View>

      {currentTab.Component && (
        <currentTab.Component
          onPress={(id) => {
            if (currentTab.id === "movies") {
              navigation.navigate("Movie", { id });
            } else {
              navigation.navigate("Serie", { id });
            }
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  tab: {
    padding: 10,
    margin: 5,
  },
  inactiveTab: {
    opacity: 0.5,
  },
});

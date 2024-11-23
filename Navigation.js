import { createDrawerNavigator } from "@react-navigation/drawer";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import {
  BotPage,
  MoviePage,
  PopularMoviesPage,
  PopularSeriesPage,
  SeriePage,
  WatchListPage,
} from "./screens/index.jsx";
import { colors } from "./styles/colors.js";

const Drawer = createDrawerNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...colors,
  },
};

export function Navigation() {
  return (
    <NavigationContainer theme={theme}>
      <Drawer.Navigator initialRouteName="Movies">
        <Drawer.Screen
          name="Movies"
          component={PopularMoviesPage}
          options={{
            headerTitle: "Filmes populares",
          }}
        />
        <Drawer.Screen
          name="Movie"
          component={MoviePage}
          options={{
            headerTitle: "Detalhes do filme",
            drawerItemStyle: styles.hideItem,
          }}
        />
        <Drawer.Screen
          name="Series"
          component={PopularSeriesPage}
          options={{
            headerTitle: "Séries populares",
          }}
        />
        <Drawer.Screen
          name="Serie"
          component={SeriePage}
          options={{
            headerTitle: "Detalhes da série",
            drawerItemStyle: styles.hideItem,
          }}
        />
        <Drawer.Screen
          name="Watchlist"
          component={WatchListPage}
          options={{
            headerTitle: "Ver mais tarde",
          }}
        />
        <Drawer.Screen
          name="Bot"
          component={BotPage}
          options={{
            headerTitle: "Movie Bot",
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  hideItem: {
    display: "none",
  },
});

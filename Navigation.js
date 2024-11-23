import { createDrawerNavigator } from "@react-navigation/drawer";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text } from "react-native";
import {
  MoviePage,
  PopularMoviesPage,
  PopularSeriesPage,
  SeriePage,
} from "./screens";
import { colors } from "./styles/colors";

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
          component={() => <Text>Minha lista</Text>}
          options={{
            headerTitle: "Ver mais tarde",
          }}
        />
        <Drawer.Screen
          name="Bot"
          component={() => <Text>Chatbot</Text>}
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

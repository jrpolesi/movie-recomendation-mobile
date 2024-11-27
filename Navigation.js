import Icon from "@expo/vector-icons/FontAwesome6.js";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { ActivityIndicator, StyleSheet } from "react-native";
import { useSessionContext } from "./contexts/index.jsx";
import { useLogout } from "./hooks/index.jsx";
import {
  BotPage,
  LoginPage,
  MoviePage,
  PopularMoviesPage,
  PopularSeriesPage,
  RedirectPage,
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

function CustomDrawerContent(props) {
  const { session } = useSessionContext();
  const { logout, isLoading } = useLogout();

  const isAuthenticaded = !!session?.id;
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      {isAuthenticaded && (
        <DrawerItem
          label="Sair"
          onPress={async () => {
            await logout();
            props?.navigation?.closeDrawer();
          }}
          icon={() =>
            isLoading ? (
              <ActivityIndicator size={15} />
            ) : (
              <Icon size={15} name="arrow-right-from-bracket" />
            )
          }
        />
      )}
    </DrawerContentScrollView>
  );
}

export function Navigation() {
  const { session } = useSessionContext();

  const isAuthenticaded = !!session?.id;

  return (
    <NavigationContainer theme={theme}>
      <Drawer.Navigator
        initialRouteName="Movies"
        drawerContent={CustomDrawerContent}
      >
        {isAuthenticaded ? (
          <>
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
          </>
        ) : (
          <>
            <Drawer.Screen
              name="Login"
              component={LoginPage}
              options={{
                headerTitle: "Login",
                drawerItemStyle: styles.hideItem,
                headerLeftContainerStyle: styles.hideItem,
              }}
            />
            <Drawer.Screen
              name="Redirect"
              component={RedirectPage}
              options={{
                headerTitle: "Redirecionando...",
                drawerItemStyle: styles.hideItem,
                headerLeftContainerStyle: styles.hideItem,
              }}
            />
          </>
        )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  hideItem: {
    display: "none",
  },
});

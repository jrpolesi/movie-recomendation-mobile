import { useTheme } from "@react-navigation/native";
import {
  ActivityIndicator,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SystemButton } from "../../components/index.jsx";
import {
  useCreateSession,
  useRedirectToTheMovieDBLogin,
} from "../../hooks/index.jsx";

export function LoginPage({ route }) {
  const { colors } = useTheme();

  const requestToken = route.params?.requestToken;

  const { isLoading, error } = useCreateSession(requestToken);

  const { redirect, isLoading: isRedirectLoading } =
    useRedirectToTheMovieDBLogin();

  if (requestToken) {
    return (
      <View style={styles.loadingContainer}>
        {isLoading && (
          <View>
            <Text style={styles.text}>
              Aguarde enquanto verificamos seus dados...
            </Text>
            <ActivityIndicator size="large" />
          </View>
        )}

        {error && (
          <View>
            <Text style={styles.text}>Houve um erro ao validar seus dados</Text>
            <Text style={styles.text}>
              {typeof error === "string" ? error : error?.message}
            </Text>
          </View>
        )}
      </View>
    );
  }

  return (
    <View style={styles.loginPage}>
      <Text style={styles.title}>Bem-vindo ao MyMovies!</Text>

      <Text style={styles.text(colors)}>
        Faça login usando sua conta do The Movie Database para acessar
        recomendações personalizadas de filmes e mais.
      </Text>
      <SystemButton isLoading={isRedirectLoading} onPress={redirect}>
        Login
      </SystemButton>
      <View>
        <Text style={styles.text(colors)}>
          Se você não tem uma conta, você pode criar uma no{" "}
        </Text>
        <Pressable
          onPress={() => Linking.openURL("https://www.themoviedb.org/")}
        >
          <Text style={styles.link(colors)}>The Movie Database.</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loginPage: {
    alignItems: "center",
    padding: 20,
    gap: 20,
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: 20,
  },
  title: {
    fontSize: 34,
    margin: 20,
    textAlign: "center",
  },
  text: (colors) => ({
    fontSize: 18,
    color: colors.textSecondary,
    marginTop: 10,
    textAlign: "center",
  }),
  link: (colors) => ({
    fontSize: 18,
    textAlign: "center",
    color: colors.primary,
    marginTop: 3,
  }),
});

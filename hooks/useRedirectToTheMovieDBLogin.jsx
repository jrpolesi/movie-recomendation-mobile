import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useTheMovieDBContext } from "../contexts/index.jsx";

export function useRedirectToTheMovieDBLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigation = useNavigation();

  const api = useTheMovieDBContext();

  async function redirect() {
    setIsLoading(true);

    try {
      const { body } = await api.session.getTempRequestToken();

      const requestToken = body?.request_token;

      if (requestToken) {
        navigation.navigate("Redirect", { requestToken });
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  return { redirect, isLoading, error };
}

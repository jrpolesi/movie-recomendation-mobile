import { createContext, useContext, useEffect, useState } from "react";
import { ActivityIndicator, Platform } from "react-native";
import { TheMovieDB } from "../api";
import { Prompt } from "../components/Prompt";

const TheMovieDBContext = createContext();

export function useTheMovieDBContext() {
  return useContext(TheMovieDBContext);
}

export function TheMovieDBProvider({ children }) {
  const [apiKey, setApiKey] = useState(process.env.EXPO_PUBLIC_API_KEY);
  const [api, setApi] = useState(null);

  useEffect(() => {
    if (!api && apiKey) {
      setApi(new TheMovieDB(apiKey));
    }
  }, [apiKey]);

  if (!apiKey) {
    if (Platform.OS === "web") {
      setApiKey(prompt("Informe a chave da API do The Movie DB"));

      return null;
    }

    return (
      <Prompt
        title="API Key"
        description="Insira sua chave da API The Movie DB para continuar"
        visible={true}
        onSubmit={(key) => setApiKey(key)}
      />
    );
  }

  if (!api) {
    return <ActivityIndicator size={50} />;
  }

  return (
    <TheMovieDBContext.Provider value={api}>
      {children}
    </TheMovieDBContext.Provider>
  );
}

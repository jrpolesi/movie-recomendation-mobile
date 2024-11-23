import { createContext, useContext, useMemo } from "react";
import { TheMovieDB } from "../api";

const TheMovieDBContext = createContext();

export function useTheMovieDBContext() {
  return useContext(TheMovieDBContext);
}

export function TheMovieDBProvider({ children }) {
  const api = useMemo(() => {
    let apiKey = process.env.EXPO_PUBLIC_API_KEY;

    if (!apiKey) {
      apiKey = prompt("Informe a chave da API do The Movie DB");
    }

    return new TheMovieDB(apiKey);
  }, []);

  return (
    <TheMovieDBContext.Provider value={api}>
      {children}
    </TheMovieDBContext.Provider>
  );
}

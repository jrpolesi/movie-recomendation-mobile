import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

const SESSION_KEY = "@movie.session";

const sessionContext = createContext({
  session: undefined,
  saveSession: () => {},
  clearSession: () => {},
});

export function useSessionContext() {
  return useContext(sessionContext);
}

export function SessionProvider({ children }) {
  const [session, setSession] = useState();

  useEffect(() => {
    async function getSessionFromStorage() {
      const sessionString = (await AsyncStorage.getItem(SESSION_KEY)) ?? "null";

      const session = JSON.parse(sessionString) ?? undefined;
      setSession(session);
    }

    if (!session) {
      getSessionFromStorage();
    }
  }, []);

  async function saveSession(session) {
    setSession(session);
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }

  async function clearSession() {
    setSession(undefined);
    await AsyncStorage.removeItem(SESSION_KEY);
  }

  return (
    <sessionContext.Provider
      value={{
        session,
        saveSession,
        clearSession,
      }}
    >
      {children}
    </sessionContext.Provider>
  );
}

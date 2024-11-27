import { useState } from "react";
import { useSessionContext, useTheMovieDBContext } from "../contexts/index.jsx";

export function useLogout() {
  const [isLoading, setIsLoading] = useState(false);
  const api = useTheMovieDBContext();

  const { session, clearSession } = useSessionContext();

  async function logout() {
    setIsLoading(true);
    try {
      const { body } = await api.session.deleteSession({
        sessionId: session.id,
      });

      if (body?.success) {
        clearSession();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return { logout, isLoading };
}

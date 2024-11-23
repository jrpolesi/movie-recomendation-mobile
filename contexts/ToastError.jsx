import { createContext, useContext, useState } from "react";
import { ToastError } from "../components/ToastError";

const toastErrorContext = createContext();

export const useToastErrorContext = () => useContext(toastErrorContext);

export function ToastErrorProvider({ children }) {
  const [error, setError] = useState();

  return (
    <toastErrorContext.Provider value={{ setError }}>
      {children}

      <ToastError error={error} resetError={() => setError(null)} />
    </toastErrorContext.Provider>
  );
}

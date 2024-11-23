import { useEffect, useState } from "react";
import { useToastErrorContext } from "../../contexts";

export function useQuery(queryFn, options, onError) {
  const setToastError = useToastErrorContext();
  const [data, setData] = useState(null);
  const [state, setState] = useState({ isLoading: false, error: null });

  useEffect(() => {
    setState({ isLoading: true, error: null });
    queryFn({ ...options })
      .then(({ body }) => {
        setData(body);
        setState({ isLoading: false, error: null });
      })
      .catch((error) => {
        setState({ isLoading: false, error });
        if (onError) {
          onError(error);
          return;
        }

        setToastError(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(options), queryFn]);

  return {
    data,
    isLoading: state.isLoading,
    error: state.error,
  };
}

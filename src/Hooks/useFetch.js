// hooks
import { useState } from "react";

export default function useFetch() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const getDataByEndpoint = async (url, info) => {
    function infoCheck() {
      if (info) {
        return {
          ...info,
        };
      }
    }
    if (url) {
      try {
        setIsPending(true);
        setError(null);
        const fetchAction = await fetch(url, infoCheck());
        if (!fetchAction.ok) {
          throw new Error("There was a problem with the request");
        } else {
          const jsonData = await fetchAction.json();
          setData(jsonData);
          setIsPending(false);
        }
      } catch (err) {
        setIsPending(false);
        setError(err.message);
      }
    }
  };

  return {
    data,
    error,
    isPending,
    getDataByEndpoint,
  };
}

// hooks
import { useState } from "react";
import useGlobalContext from "./useGlobalContext";

export default function useFetch() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch: contentDispatch } = useGlobalContext();
  const getDataByEndpoint = async (url, info, category) => {
    function infoCheck() {
      console.log(info);
      if (info) {
        return {
          headers: {
            Authorization:
              "563492ad6f9170000100000196bfcf75b7a24fc088452a8c7ebaab01",
          },
        };
      } else {
        return;
      }
    }
    console.log("infocheck" + infoCheck());
    if (url) {
      try {
        setIsPending(true);
        setError(null);
        console.log("before await");
        const fetchAction = await fetch(url, infoCheck());
        console.log("after await");
        if (!fetchAction.ok) {
          throw new Error("There was a problem with the request");
        } else {
          const jsonData = await fetchAction.json();
          console.log(jsonData);
          setData(jsonData);
          setIsPending(false);
          if (category) {
            console.log("cate" + category);
            contentDispatch({ type: "ADD_CATEGORY", payload: category });
          }
        }
      } catch (err) {
        setIsPending(false);
        setError(err.message);
      }
    }
    if (data) {
      contentDispatch({ type: "ADD_DATA", payload: data });
    }
  };
  return {
    data,
    error,
    isPending,
    getDataByEndpoint,
  };
}

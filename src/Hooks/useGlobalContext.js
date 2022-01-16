import { useContext } from "react";
import { globalContext } from "../Context/GlobalContext";

export default function useGlobalContext() {
  const contextData = useContext(globalContext);
  if (contextData === undefined) {
    throw new Error("useGlobalContext() must be used inside index.js");
  }
  return contextData;
}

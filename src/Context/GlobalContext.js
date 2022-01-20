// Context
import { createContext, useEffect, useReducer, useState } from "react";

export const globalContext = createContext();
function stateManager(state, action) {
  switch (action.type) {
    case "ADD_DATA":
      return {
        ...state,
        data: action.payload,
      };
    case "ADD_CATEGORY":
      return {
        ...state,
        category: action.payload,
      };
    default:
      return state;
  }
}
export default function GlobalContext({ children }) {
  const [globalData, dispatch] = useReducer(stateManager, {
    data: null,
    category: null,
  });
  const [isMobileView, setIsMobileView] = useState(false);
  const [isToggleMenuOpened, setIsToggleMenuOpened] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(max-width: 792px)").matches) {
      setIsMobileView(true);
    } else {
      setIsMobileView(false);
    }
  }, []);
  return (
    <globalContext.Provider
      value={{
        isMobileView,
        isToggleMenuOpened,
        setIsToggleMenuOpened,
        ...globalData,
        dispatch,
      }}
    >
      {children}
    </globalContext.Provider>
  );
}

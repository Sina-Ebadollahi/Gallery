// Context
import { createContext, useEffect, useState } from "react";

export const globalContext = createContext();
export default function GlobalContext({ children }) {
  const [isMobileView, setSsMobileView] = useState(false);
  const [isToggleMenuOpened, setIsToggleMenuOpened] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(max-width: 792px)").matches) {
      setSsMobileView(true);
    } else {
      setSsMobileView(false);
    }
  }, []);
  return (
    <globalContext.Provider
      value={{ isMobileView, isToggleMenuOpened, setIsToggleMenuOpened }}
    >
      {children}
    </globalContext.Provider>
  );
}

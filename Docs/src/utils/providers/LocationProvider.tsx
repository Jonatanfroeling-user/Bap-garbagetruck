import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
  useRef,
} from "react";
import { useLocation } from "react-router-dom";
import { routes } from "../../Routes";

type PrevLocaType = {
  currentIndex: number;
  previousIndex: number;
};

const locationContext = createContext<PrevLocaType>(null!);

const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [pathHistory, setPathHistory] = useState<string[]>([]);
  const [context, setContext] = useState<PrevLocaType>({
    currentIndex: 0,
    previousIndex: -1,
  });
  const prevPathRef = useRef<string>("");

  const { hash } = useLocation();

  useEffect(() => {
    if (prevPathRef.current !== hash) {
      prevPathRef.current = hash;
      // No need to memoise more than 2 items
      setPathHistory((previous) => [...previous.slice(-1), hash]);
      const prev = pathHistory[pathHistory.length - 1];

      setContext({
        currentIndex: routes.findIndex((route) => route.path === hash),
        previousIndex:
          (prev && routes.findIndex((route) => route.path === prev)) || -1,
      });
    }
  }, [hash]);

  return (
    <locationContext.Provider value={context}>
      {children}
    </locationContext.Provider>
  );
};

const usePreviousLocation = (): PrevLocaType => useContext(locationContext);

export { LocationProvider, usePreviousLocation, locationContext };

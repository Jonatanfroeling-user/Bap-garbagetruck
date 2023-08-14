import { ReactNode, createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

type PreviewType = string | ReactNode | null;

export type PreviewContextValue = {
  preview: PreviewType;
  setPreview: (content: PreviewType) => void;
};

export const PreviewContext = createContext<PreviewContextValue>(null!);

export const PreviewProvider = ({ children }: { children: ReactNode }) => {
  const [preview, setPreview] = useState<PreviewType>(null);
  const location = useLocation();

  useEffect(() => {
    if (preview) {
      setPreview(null);
    }
  }, [location.pathname]);

  return (
    <PreviewContext.Provider
      value={{
        preview,
        setPreview,
      }}
    >
      {children}
    </PreviewContext.Provider>
  );
};

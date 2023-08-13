import { ReactNode, createContext, useContext, useState } from "react";

export type PreviewContextValue = {
  src: string;
  setSrc: (src: string) => void;
};

export const PreviewContext = createContext<PreviewContextValue>(null!);

export const PreviewProvider = ({ children }: { children: ReactNode }) => {
  const [src, setSrc] = useState<string>("");

  return (
    <PreviewContext.Provider
      value={{
        src,
        setSrc,
      }}
    >
      {children}
    </PreviewContext.Provider>
  );
};

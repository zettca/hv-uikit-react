import { createContext, useContext, useMemo, useState } from "react";
import {
  HvAppShellContext,
  HvAppShellContextValue
} from "@hitachivantara/app-shell-shared";

type DefaultAppContextValue = {
  text: string;
  setText: (text: string) => void;
};

export const DefaultAppContext = createContext<DefaultAppContextValue>({
  text: "Default default-app context value",
  setText: () => {
    // Empty function
  }
});

type DefaultAppProviderProps = {
  children: React.ReactNode;
};

let clickNumber = 0;

const DefaultAppProvider = ({ children }: DefaultAppProviderProps) => {
  const [text, setText] = useState<string>("Initial default-app context value");
  const { menu } = useContext(HvAppShellContext) as HvAppShellContextValue;

  // Just to double-check the usage of the same context
  const customSetText = (value: string) => {
    clickNumber += 1;
    const prefixedText = `[${clickNumber}] ${value}`;
    setText(prefixedText);

    console.info("From App Shell context:", JSON.stringify(menu));
  };

  const value = useMemo(
    () => ({
      text,
      setText: customSetText
    }),
    [customSetText, text]
  );
  return (
    <DefaultAppContext.Provider value={value}>
      {children}
    </DefaultAppContext.Provider>
  );
};

export default DefaultAppProvider;

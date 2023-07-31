import "@/styles/globals.css";
import { SWRConfig } from "swr";
import { useState, useEffect, createContext, useContext } from "react";
import useLocalStorage from "use-local-storage";
import { DarkModeProvider } from "@/components/DarkModeContext";

export const ClientSideContext = createContext(false);

export default function App({ Component, pageProps }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <SWRConfig
      value={{
        fetcher: async (...args) => {
          const response = await fetch(...args);
          if (!response.ok) {
            throw new Error(`Request with ${JSON.stringify(args)} failed.`);
          }
          return await response.json();
        },
      }}
    >
      <ClientSideContext.Provider value={isClient}>
        <DarkModeProvider>
          <Component {...pageProps} />
        </DarkModeProvider>
      </ClientSideContext.Provider>
    </SWRConfig>
  );
}

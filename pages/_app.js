import "@/styles/globals.css";
import { SWRConfig } from "swr";
import { useState, useEffect, createContext } from "react";
import { DarkModeProvider } from "@/components/DarkModeContext";
import { SessionProvider } from "next-auth/react";
import { appWithTranslation } from "next-i18next";
import Cursor from "@/components/Cursor";

export const ClientSideContext = createContext(false);

function App({ Component, pageProps: { session, ...pageProps } }) {
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
      <SessionProvider session={session}>
        <ClientSideContext.Provider value={isClient}>
          <DarkModeProvider>
            <Cursor />
            <Component {...pageProps} />
          </DarkModeProvider>
        </ClientSideContext.Provider>
      </SessionProvider>
    </SWRConfig>
  );
}

export default appWithTranslation(App);

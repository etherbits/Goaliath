import { type AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { dark } from "@clerk/themes";
import { type MutableRefObject, createContext, useRef } from "react";

type Portals = {
  root: MutableRefObject<HTMLDivElement | null>;
};

export const PortalContext = createContext<Portals | null>(null);

const MyApp: AppType = ({ Component, pageProps }) => {
  const portals: Portals = {
    root: useRef(null),
  };

  return (
    <PortalContext.Provider value={portals}>
      <ClerkProvider
        {...pageProps}
        appearance={{
          baseTheme: dark,
          variables: {
            colorPrimary: "#4f46e5",
          },
        }}
      >
        <Component {...pageProps} />
      </ClerkProvider>
      <div ref={portals.root} />
    </PortalContext.Provider>
  );
};

export default api.withTRPC(MyApp);

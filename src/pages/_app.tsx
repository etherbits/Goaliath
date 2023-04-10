import { type AppType } from "next/app";
import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { useRouter } from "next/router";
import { dark } from "@clerk/themes";
import { type MutableRefObject, createContext, useRef } from "react";

const publicPages = ["/sign-in/[[...index]]", "/sign-up/[[...index]]"];

type Portals = {
  root: MutableRefObject<HTMLDivElement | null>;
};

export const PortalContext = createContext<Portals | null>(null);

const MyApp: AppType = ({ Component, pageProps }) => {
  const { pathname } = useRouter();
  const isPublicPage = publicPages.includes(pathname);
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
          {isPublicPage ? (
            <Component {...pageProps} />
          ) : (
            <>
              <SignedIn>
                <Component {...pageProps} />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          )}
      </ClerkProvider>
      <div ref={portals.root} />
    </PortalContext.Provider>
  );
};

export default api.withTRPC(MyApp);

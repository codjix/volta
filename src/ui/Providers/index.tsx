"use client";
import { MantineProvider } from "@mantine/core";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Notifications } from "@mantine/notifications";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { $Session, AuthProvider } from "../Auth";
import { themeProps } from "./theme";

type $Providers = {
  children?: React.ReactNode;
  session: $Session;
  theme: any;
};

export function Providers({ children, theme, session }: $Providers) {
  const mantineProps = {
    defaultColorScheme: theme ?? "auto",
    theme: themeProps,
  };

  return (
    <>
      <AuthProvider session={session}>
        <QueryClientProvider client={new QueryClient()}>
          <MantineProvider {...mantineProps}>
            {children}
            <Notifications />
          </MantineProvider>
        </QueryClientProvider>
      </AuthProvider>
    </>
  );
}

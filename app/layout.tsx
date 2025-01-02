import Head from "next/head";
import { cookies } from "next/headers";
import { ColorSchemeScript } from "@mantine/core";
import { Providers } from "@/ui/Providers";
import { sessionAction } from "@/actions/authActions";
import { Register, Login } from "@/ui/Auth";
import { DashLayout } from "@/ui/Layout";
import "@/styles/globals.scss";

export const metadata = {
  title: "VoltaLink",
  description: "Define and manage custom domains for your local network.",
};

export default async ({ children }: { children: React.ReactNode }) => {
  const cookie = await cookies();
  const token = cookie.get("token")?.value ?? "";
  const session = await sessionAction(token);

  return (
    <html lang="en">
      <Head>
        <ColorSchemeScript />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </Head>
      <body>
        <Providers
          session={session.result}
          theme={cookie.get("color-scheme")?.value}
        >
          <DashLayout normal={session.ok}>
            {!session.ok && session.message == "register" && <Register />}
            {!session.ok && session.message == "Unauthorized" && <Login />}
            {!session.ok &&
              !["register", "Unauthorized"].includes(session.message!) && (
                <>Something went wrong !</>
              )}
            {session.ok && children}
          </DashLayout>
        </Providers>
      </body>
    </html>
  );
};

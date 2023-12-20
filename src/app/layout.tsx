import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";
import NextAuthProvider from "../auth/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Reminder App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`relative font-sans ${inter.variable} bg-primary-100`}
      >
        <TRPCReactProvider cookies={cookies().toString()}>
          <NextAuthProvider>
            {children}
          </NextAuthProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}

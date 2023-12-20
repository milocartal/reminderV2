
import { Suspense } from "react";
import { NavBar } from "~/components";

export const metadata = {
  title: "Reminder Dashboard",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    
  return (
    <div className="relative pl-32">
      <NavBar />
      <Suspense fallback={null}>{children}</Suspense>
    </div>
  );
}
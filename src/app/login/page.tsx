"use client";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ConnectButton } from "~/components";

const Login: NextPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Vérifiez si l'utilisateur est authentifié
    if (status === "authenticated") {
      router.push("/");
      return;
    }
  }, [status, router]);

  return (
    <main className="flex h-screen items-center justify-center gap-2 text-primary-600">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Bienvenue sur Reminder</h1>
          <p className="text-xs">C'est pas ultra beau mais ça a le mérite de marcher (à peu près)</p>
        {session && (
          <p className="text-center text-2xl text-black">
            Logged in as {session.user?.name}
          </p>
        )}

        <ConnectButton type="button" signInOptions="github"/>
      </div>
    </main>
  );
};

export default Login;

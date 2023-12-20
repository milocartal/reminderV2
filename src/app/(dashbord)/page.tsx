"use client";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Reminder } from "~/components";
import { api } from "~/trpc/react";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { data: reminders } = api.reminder.getAll.useQuery();
  useEffect(() => {
    // Vérifiez si l'utilisateur est authentifié
    if (
      (status === "authenticated" && !session) ||
      status === "unauthenticated"
    ) {
      // Si l'utilisateur n'est pas authentifié, redirigez-le vers la page de connexion
      void router.push("/login");
      return;
    }
  });
  if (status === "loading") {
    return <p>Vérification de l'authentification en cours...</p>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start pt-10 text-black">
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
        Dashboard
      </h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
        {reminders?.map((reminder) => (
          <Reminder key={reminder.id} reminder={reminder} />
        ))}
        <Link
          className="flex max-w-xs flex-col gap-4 rounded-xl bg-black/10 p-4 hover:bg-black/20"
          href="/profile"
        >
          <h3 className="text-2xl font-bold">Le Profil →</h3>
          <div className="text-lg">
            va voir ton profil et va pouvoir le modifier.
          </div>
        </Link>
        <Link
          className="flex max-w-xs flex-col gap-4 rounded-xl bg-black/10 p-4 hover:bg-black/20"
          href="/group"
        >
          <h3 className="text-2xl font-bold">Les Grupes →</h3>
          <div className="text-lg">
            On va voir les grupes ouverts et on va pouvoir en créer un.
          </div>
        </Link>
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-center text-2xl text-black">
            {session && <span>Logged in as {session.user?.name}</span>}
          </p>
          <Link
            href={session ? "/api/auth/signout" : "/api/auth/signin"}
            className="rounded-full bg-black/10 px-10 py-3 font-semibold no-underline transition hover:bg-black/20"
          >
            {session ? "Sign out" : "Sign in"}
          </Link>
        </div>
      </div>

    </main>
  );
};

export default Home;

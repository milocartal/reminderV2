"use client";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { CreateReminder, Reminder } from "~/components";
import { api } from "~/trpc/react";

const User: NextPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { data: reminders } = api.reminder.getAll.useQuery();
  useEffect(() => {
    // Vérifiez si l'utilisateur est authentifié
    if (
      (status === "authenticated" && !session) ||
      status === "unauthenticated"
    ) {
      // Si l'utilisateur n'est pas authentifié, redirigez-le vers la page de connexion
      return router.push("/group");
    }
  }, [status, session, router]);

  if (status === "loading") {
    return <p>Vérification de l'authentification en cours...</p>;
  }

  return (
    <main className="flex h-screen flex-col items-start justify-start overflow-y-auto text-black p-4">
      <div className="container flex flex-col items-start justify-start gap-12 px-4 ">
        <h1 className="text-5xl font-extrabold tracking-tight">
          {session?.user?.name}
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          {reminders?.map((reminder) => (
            <Reminder key={reminder.id} reminder={reminder} />
          ))}
        </div>

        <CreateReminder />
      </div>
    </main>
  );
};

export default User;

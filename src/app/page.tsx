import Link from "next/link";

import { CreateReminder, Reminder } from "~/components";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Home() {
  const session = await getServerAuthSession();
  const reminders = await api.reminder.getAll.query();

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

      <CrudShowcase />
    </main>
  );
}

async function CrudShowcase() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const latestPost = await api.reminder.getLatest.query();

  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}

      <CreateReminder />
    </div>
  );
}

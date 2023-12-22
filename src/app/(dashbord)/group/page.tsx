"use client";
import { type NextPage } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { CreateGroup } from "~/components/Group/Group";

import { api } from "~/trpc/react";

const Groups: NextPage = () => {
  const { data: groups } = api.group.getAll.useQuery();

  return (
    <main className="flex min-h-screen flex-col items-start p-6 text-black">
      <h1 className="mb-7 text-5xl font-extrabold tracking-tight">
        Liste des groupes du user
      </h1>
      <Suspense fallback={<p className="text-5xl absolute text-pink-500 z-20">Chargement des resources</p>}>
        {groups?.map((group) => (
          <Link
            key={group.id}
            className="rounded-xl bg-black/10 px-10 py-3 no-underline transition hover:bg-black/20"
            href={`/group/${group.id}`}
          >
            <div>
              <h1 className="text-xl font-semibold">{group.name}</h1>
              <p className="italic">{group.members.length} personne(s) dans le groupe</p>
              <p className="italic">{group.reminders.length} tâche(s) enregistrée(s)</p>
            </div>
          </Link>
        ))}
      </Suspense>
      <CreateGroup/>
    </main>
  );
};

export default Groups;

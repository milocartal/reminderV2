"use client";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Group } from "~/components";
import { api } from "~/trpc/react";

const fetchData = (slug: string) => {
  const temp = api.group.getOne.useQuery({ id: slug });
  return temp;
};

const User: NextPage = () => {
  const params = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const { slug } = params as { slug: string };
  const { data: group, status: groupStatus } = fetchData(slug);

  const deletegroup = api.group.delete.useMutation();

  useEffect(() => {
    // Vérifiez si l'utilisateur est authentifié
    if (
      (status === "authenticated" && !session) ||
      status === "unauthenticated"
    ) {
      // Si l'utilisateur n'est pas authentifié, redirigez-le vers la page de connexion
      return router.push("/login");
    }
    if (groupStatus === "error") {
      console.log("cpt");
      return router.push("/");
    }
  }, [status, session, router, groupStatus]);

  if (groupStatus === "loading") {
    return <p>Vérification de l'authentification en cours...</p>;
    ///kjgqsdhlqkshfdkqbns
  }

  const handleDelete = async () => {
    deletegroup.mutate({ id: slug });
    router.push("/group");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 text-black">
      {group && <Group group={group} />}
      <button
        className="rounded-xl bg-black/10 px-10 py-3 no-underline transition hover:bg-black/20"
        onClick={() => void handleDelete()}
      >
        Supprimer
      </button>
    </main>
  );
};

export default User;

"use client";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Reminder } from "~/components";
import { api } from "~/trpc/react";

const fetchData = (slug: string) => {
  const temp = api.reminder.getOne.useQuery({id: slug});  
  return temp;
}


const User: NextPage = () => {
  const params = useParams();
  const router = useRouter();
  const {data: session, status} = useSession()
  const {slug} = params as {slug: string};
  const {data : reminder, status: reminderStatus} = fetchData(slug);

  const deleteReminder = api.reminder.delete.useMutation();
  const setFinished = api.reminder.setFinished.useMutation();
  
  useEffect(() => {
    // Vérifiez si l'utilisateur est authentifié
    if ((status === 'authenticated' && !session) || status === 'unauthenticated') {
      // Si l'utilisateur n'est pas authentifié, redirigez-le vers la page de connexion
      return router.push('/login');
    }
    if(reminderStatus === 'error'){
      console.log("cpt")
      return router.push('/');
    }

   
  }, [status, session, router, reminderStatus]);

  if (reminderStatus === 'loading') {
    return <p>Vérification de l'authentification en cours...</p>;
  }

  const handleDelete = async () => {
    deleteReminder.mutate({id: slug});
    router.push('/');
  }

  const handleFinish = async () => {
    setFinished.mutate({id: slug, finishedAt: new Date()});
    router.refresh();    
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-black gap-5">
        
      {reminder && <Reminder reminder={reminder}/>}
      <button
        className="rounded-xl bg-black/10 px-10 py-3 no-underline transition hover:bg-black/20"
        onClick={() => void handleFinish()}
      >
        Finir
      </button>
      <button
        className="rounded-xl bg-black/10 px-10 py-3 no-underline transition hover:bg-black/20"
        onClick={() => void handleDelete()}
      >
        Supprimer
      </button>
    </main>
  );
}


export default User;
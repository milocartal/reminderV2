"use client";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


const User: NextPage = () => {
  const router = useRouter();
  const {data: session, status} = useSession()
  useEffect(() => {
    // Vérifiez si l'utilisateur est authentifié
    if ((status === 'authenticated' && !session) || status === 'unauthenticated') {
      // Si l'utilisateur n'est pas authentifié, redirigez-le vers la page de connexion
      return router.push('/group');
    }
  }, [status, session, router]);

  if (status === 'loading') {
    return <p>Vérification de l'authentification en cours...</p>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-black">
        
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          {session?.user?.name}
        </h1>
        <div className="flex flex-col items-center gap-2">

          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-center text-2xl">
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

      </div>
    </main>
  );
}


export default User;
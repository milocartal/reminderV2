
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import { type ButtonComponent } from "./Button.type";
import Link from "next/link";

export const ConnectButton: React.FC<ButtonComponent> = (props) => {
  const { data: session } = useSession();
  if (props.type === "button") {
    return (
      <button
        className="rounded-full bg-black/10 px-10 py-3 font-semibold no-underline transition hover:bg-black/20"
        onClick={session ? () => signOut() : () => signIn(props.signInOptions ?? "")}
      >
        {session ? "Deconnexion" : "Se connecter"}
      </button>
    );
  }
  if (props.type === "link") {
    return (
      <Link
        href={session ? "/api/auth/signout" : "/api/auth/signin"}
        className="rounded-full bg-black/10 px-10 py-3 font-semibold no-underline transition hover:bg-black/20"
      >
        {session ? "Deconnexion out" : "Se connecter"}
      </Link>
    );
  }
  return null;
};
  
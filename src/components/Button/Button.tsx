
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import { type ButtonPrimaryComponent, type ConnectButtonComponent } from "./Button.type";
import Link from "next/link";

export const ConnectButton: React.FC<ConnectButtonComponent> = (props) => {
  const { data: session } = useSession();
  if (props.type === "button") {
    return (
      <button
        className={`rounded-full bg-black/10 px-10 py-3 font-semibold no-underline transition hover:bg-black/20 ${props.style}`}
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
        className={`rounded-full bg-black/10 px-10 py-3 font-semibold no-underline transition hover:bg-black/20 ${props.style}`}
      >
        {session ? "Deconnexion out" : "Se connecter"}
      </Link>
    );
  }
  return null;
};

export const ButtonPrimary: React.FC<ButtonPrimaryComponent> = (props) => {
  return (
    <button
      className={`rounded-full bg-black/10 px-10 py-3 font-semibold no-underline transition hover:bg-black/20 ${props.style}`}
      onClick={props.onPress}
    >
      {props.text}
    </button>
  );
}
  
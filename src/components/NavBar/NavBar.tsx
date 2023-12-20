"use client";

import Link from "next/link";
import { FaHome, FaTasks, FaUserAstronaut } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";

export const NavBar: React.FC = () => {
  return (
    <nav className="absolute top-0 left-0 flex h-screen w-32 flex-col items-center justify-between bg-primary-500 py-4 text-white">
      <div className="flex flex-col gap-4 items-center">
        <Link href={"/"} className="text-lg">
          <FaHome className="m-auto text-4xl" /> Home
        </Link>
        <Link href={"/group"} className="text-lg">
          <FaUserGroup className="m-auto text-3xl" /> Groupes
        </Link>
        <Link href={"/reminder"} className="text-lg">
          <FaTasks className="m-auto text-3xl" /> Tâches
        </Link>
      </div>

      <Link href={"/profile"} className="text-lg">
        <FaUserAstronaut className="m-auto text-3xl" /> Profil
      </Link>
    </nav>
  );
}

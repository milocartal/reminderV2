"use client";

import Image from "next/image";
import Link from "next/link";
import { FaTasks, FaUserAstronaut } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";

export const NavBar: React.FC = () => {
  return (
    <nav className="absolute top-0 left-0 flex h-screen w-32 flex-col items-center justify-between bg-primary-500 py-4 text-primary-100">
      <div className="flex flex-col gap-4 items-center">
        <Link href={"/"} className="text-sm">
          {/*<FaHome className="m-auto text-4xl mb-1" /> Home*/}
          <Image width={100} height={100} src="/favicon_io/android-chrome-512x512.png" alt="Logo" className="mb-1 rounded-lg"/>
        </Link>
        <Link href={"/group"} className="text-sm">
          <FaUserGroup className="m-auto text-4xl mb-1" /> Groupes
        </Link>
        <Link href={"/reminder"} className="text-sm">
          <FaTasks className="m-auto text-4xl mb-1" /> Tâches
        </Link>
      </div>

      <Link href={"/profile"} className="text-sm bg-primary-400 rounded-full p-4">
        <FaUserAstronaut className="m-auto text-4xl mb-1" />
      </Link>
    </nav>
  );
}

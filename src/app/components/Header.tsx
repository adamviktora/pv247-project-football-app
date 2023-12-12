"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export const Header = () => {
  const { data, status } = useSession();

  const isLogedIn = data?.user != undefined;

  return (
    <header
      className={`flex h-24 items-center justify-between bg-black px-12 text-white ${
        isLogedIn ? "bg-black" : "bg-primary-color"
      }`}
    >
      <Link className="text-3xl font-bold hover:text-gray-300" href="/">
        Football Results
      </Link>
      {isLogedIn && (
        <Link
          className="text-3xl font-semibold italic hover:text-gray-300"
          href="/admin"
        >
          Admin mode
        </Link>
      )}
    </header>
  );
};

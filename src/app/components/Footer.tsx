"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const Footer = () => {
  const { data, status } = useSession();
  const router = useRouter();

  const isLogedIn = data?.user != undefined;

  return (
    <footer
      className={`flex h-12 w-full justify-end gap-12  px-4 text-white ${
        isLogedIn ? "bg-black" : "bg-primary-color"
      }`}
    >
      {isLogedIn ? (
        <button
          onClick={() => {
            signOut();
          }}
          className="btn btn-secondary btn-sm my-auto px-8 py-1"
        >
          Log out
        </button>
      ) : (
        <Link
          className="btn btn-secondary btn-sm my-auto px-8 py-1"
          href="/login"
        >
          Admin
        </Link>
      )}
      <span className="my-auto">© 2023 Football Results</span>
    </footer>
  );
};

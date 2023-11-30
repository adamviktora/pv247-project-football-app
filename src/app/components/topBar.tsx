"use client";

import Link from "next/link";
import { useRouter } from "next/router";

const TopBar = ({ isLeaderboard, seasonId  }: { isLeaderboard: boolean, seasonId: string }) => {
  return (
    <div className="w-full bg-secondary-color h-12 flex flex-row justify-between px-12 items-center">
      <div className="w-72 flex flex-row">
      <Link
        className="text-primary-color px-4"
        href="/"
      >
        <svg
          className="w-6 h-6 text-gray-800 "
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 5H1m0 0 4 4M1 5l4-4"
          />
        </svg>
        </Link>
        <span>TBD:TeamCheckbox</span>
      </div>

      <div className="flex flex-row space-x-4">
      <Link
          className={`my-auto  py-1 text-primary-color ${
            isLeaderboard ? "underline" : ""
          } hover:underline `}
          href={`/leaderboard/${seasonId}`}
          >
          Leaderboard
        </Link>
        <Link
          className={`my-auto py-1 text-primary-color ${
            !isLeaderboard ? "underline" : ""
          } hover:underline `}
          href={`/matches/${seasonId}`}
        >
          Matches
        </Link>
      </div>
      <div className="w-72">
        <span>TBD:TeamCheckbox</span>
      </div>
    </div>
  );
};

export default TopBar;

"use client";

import Link from "next/link";
import { useState } from "react";
export default function Home() {
  const [selectedSeason, setSelectedSeason] = useState("2023");
  const [selectedClub, setselectedClub] = useState("Chelsea");

  return (
    <div className="flex flex-col space-y-4 w-80 m-auto">
      <div>
        <label
          htmlFor="seasonSelect"
          className="block mb-2 text-sm font-medium text-primary-color"
        >
          Season
        </label>
        <select
          onChange={(e) => {
            setSelectedSeason(e.target.value);
          }}
          id="seasonSelect"
          className="block w-full p-2 text-sm text-primary-color border border-primary-color rounded-lg bg-secondary-color"
        >
          <option value="2021">2021/2022</option>
          <option value="2022">2022/2023</option>
          <option selected value="2023">
            2023/2024
          </option>
        </select>
      </div>
      <Link
        className="my-auto px-8 py-1 btn btn-sm btn-primary text-white"
        href={`/leaderboard/${selectedSeason}`}
      >
        Show leaderboard
      </Link>
      <Link
        className="my-auto px-8 py-1 btn btn-sm btn-primary text-white"
        href={`/matches/${selectedSeason}`}
      >
        Show matches
      </Link>
      <div>
        <label
          htmlFor="clubSelect"
          className="block mb-2 text-sm font-medium text-primary-color "
        >
          Club
        </label>
        <select
          onChange={(e) => {
            setselectedClub(e.target.value);
          }}
          id="clubSelect"
          className="block w-full p-2 text-sm text-primary-color border border-primary-color rounded-lg bg-secondary-color"
        >
          <option value="chelsea">Chelsea</option>
          <option value="arsenal">Arsenal</option>
          <option selected value="liverpool">
            Liverpool
          </option>
        </select>
      </div>
      <Link
        className="my-auto px-8 py-1 btn btn-sm btn-primary text-white"
        href={`/club/${selectedClub}`}
      >
        Show club details
      </Link>
    </div>
  );
}

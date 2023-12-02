"use client";

import { createClubs } from "@/seeding/club";
import { createClubSeasons } from "@/seeding/clubSeason";

export default function Seeding() {
  return (
    <>
      <button className="btn" onClick={createClubs}>
        Seed clubs
      </button>
      <button className="btn" onClick={createClubSeasons}>
        Seed clubSeasons
      </button>
    </>
  );
}

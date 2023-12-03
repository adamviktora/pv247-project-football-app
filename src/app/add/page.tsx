"use client";

import { createClubs } from "@/seeding/club";
import { createLeagues } from "@/seeding/league";
import { createSeasons } from "@/seeding/season";

export default function AddClub() {
  return (
    <>
      <button className="btn" onClick={createClubs}>
        Seed clubs
      </button>
      <button className="btn" onClick={createLeagues}>
        Seed leagues
      </button>
      <button className="btn" onClick={createSeasons}>
        Seed seasons
      </button>
    </>
  );
}

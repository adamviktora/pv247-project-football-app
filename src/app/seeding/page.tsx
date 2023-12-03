"use client";

import { createClubs } from "@/seeding/club";
import { createClubSeasons } from "@/seeding/clubSeason";
import { createGames } from "@/seeding/game";
import { createLeagues } from "@/seeding/league";
import { createPlayers } from "@/seeding/player";
import { createSeasons } from "@/seeding/season";

export default function Seeding() {
  return (
    <>
      <button className="btn" onClick={createLeagues}>
        Seed leagues
      </button>
      <button className="btn" onClick={createClubs}>
        Seed clubs
      </button>
      <button className="btn" onClick={createClubSeasons}>
        Seed clubSeasons
      </button>
      <button className="btn" onClick={createSeasons}>
        Seed leagueSeasons
      </button>
      <button className="btn" onClick={createPlayers}>
        Seed players
      </button>
      <button className="btn" onClick={createGames}>
        Seed games
      </button>
    </>
  );
}

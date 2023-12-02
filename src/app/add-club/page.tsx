"use client";

import { createClubs } from "@/seeding/club";

export default function AddClub() {
  return (
    <>
      <button className="btn" onClick={createClubs}>
        Seed clubs
      </button>
    </>
  );
}

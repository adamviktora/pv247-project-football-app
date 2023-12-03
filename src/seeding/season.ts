import { add } from "@/fetch-helper/CRUD";
import { LeagueSeasonCreation } from "@/types/creationTypes";
import { LeagueSeason } from "@prisma/client";

const leagueIDs = [
  "5385d98b-332a-4389-951b-0ba513323414",
  "5f5fa1c3-bdbf-4265-9003-88e2c1e357ff",
  "a7663a1c-dbf9-4158-82b3-608cb65f7539",
];

const seasons2023: LeagueSeasonCreation[] = leagueIDs.map((leagueId) => ({
  year: 2023,
  leagueId,
}));

const bundesligaSeasons: LeagueSeasonCreation[] = [
  {
    leagueId: "5f5fa1c3-bdbf-4265-9003-88e2c1e357ff",
    year: 2010,
  },
  {
    leagueId: "5f5fa1c3-bdbf-4265-9003-88e2c1e357ff",
    year: 2009,
  },
];

const plSeasons: LeagueSeasonCreation[] = [
  {
    leagueId: "a7663a1c-dbf9-4158-82b3-608cb65f7539",
    year: 2022,
  },
  {
    leagueId: "a7663a1c-dbf9-4158-82b3-608cb65f7539",
    year: 2021,
  },
];

const serieASeasons: LeagueSeasonCreation[] = [
  {
    leagueId: "5385d98b-332a-4389-951b-0ba513323414",
    year: 1990,
  },
];

const seasons = [
  ...seasons2023,
  ...bundesligaSeasons,
  ...plSeasons,
  ...serieASeasons,
];

export const createSeasons = () => {
  seasons.forEach(async (season) => {
    const created = await add<LeagueSeasonCreation, LeagueSeason>(
      "leagueSeason",
      season,
    );
    console.log(`Created: ${created.year} with id ${created.id}`);
  });
};

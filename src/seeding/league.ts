import { add } from "@/fetch-helper/CRUD";
import { LeagueCreation } from "@/types/creationTypes";
import { League } from "@prisma/client";

const leagues: LeagueCreation[] = [
  { name: "Premier League", countryCode: "ENG" },
  { name: "Bundesliga", countryCode: "GER" },
  { name: "Serie A", countryCode: "ITA" },
];

export const createLeagues = () => {
  leagues.forEach(async (league) => {
    const created = await add<LeagueCreation, League>("league", league);
    console.log(`Created: ${created.name} with id ${created.id}`);
  });
};

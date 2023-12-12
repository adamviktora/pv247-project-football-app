import { add } from "@/fetch-helper/CRUD";
import { LeagueCreation } from "@/types/creationTypes";
import { League } from "@prisma/client";

const leagues: LeagueCreation[] = [
  { name: "Premier League", countryCode: "ENG" },
  { name: "La Liga", countryCode: "ESP" },
  { name: "Bundesliga", countryCode: "GER" },
  { name: "Serie A", countryCode: "ITA" },
  { name: "Ligue 1", countryCode: "FRA" },
  { name: "Primeira Liga", countryCode: "POR" },
  { name: "Eredivisie", countryCode: "NED" },
  { name: "Belgian Pro League", countryCode: "BEL" },
  { name: "Argentine Primera División", countryCode: "ARG" },
];

export const createLeagues = () => {
  leagues.forEach(async (league) => {
    const created = await add<LeagueCreation, League>("league", league);
    console.log(`Created: ${created.name} with id ${created.id}`);
  });
};

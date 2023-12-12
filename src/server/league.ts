import { LeagueCreation } from "@/types/creationTypes";
import { prisma } from "./prisma";

export const getLeagues = async () => {
  return await prisma.league.findMany();
};

export const addLeague = async (league: LeagueCreation) => {
  const sameLeague = await prisma.league.findFirst({
    where: {
      name: league.name,
    },
  });
  if (sameLeague !== null) {
    return null;
  }

  const newLeague = await prisma.league.create({
    data: league,
  });
  return newLeague;
};

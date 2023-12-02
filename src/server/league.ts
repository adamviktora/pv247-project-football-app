import { LeagueCreation } from "@/types/creationTypes";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getLeagues = async () => {
  return await prisma.league.findMany();
};

export const addLeague = async (league: LeagueCreation) => {
  const newLeague = await prisma.league.create({
    data: league,
  });
  return newLeague;
};
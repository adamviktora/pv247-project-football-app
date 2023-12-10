import { LeagueSeasonCreation } from "@/types/creationTypes";
import { LeagueSeason, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getLeagueSeasonsByLeagueId = async (leagueId: string) => {
  const leagueSeasons: LeagueSeason[] = await prisma.leagueSeason.findMany({
    where: {
      leagueId: leagueId,
    },
    orderBy: {
      year: "desc",
    },
  });
  return leagueSeasons;
};

export const addLeagueSeason = async (leagueSeason: LeagueSeasonCreation) => {
  await prisma.league.findFirstOrThrow({
    where: {
      id: leagueSeason.leagueId,
    },
  });

  const sameLeagueSeasons = await prisma.leagueSeason.findMany({
    where: {
      leagueId: leagueSeason.leagueId,
      year: leagueSeason.year,
    },
  });
  if (sameLeagueSeasons.length != 0) {
    return null;
  }

  const newLeagueSeason = await prisma.leagueSeason.create({
    data: leagueSeason,
  });
  return newLeagueSeason;
};

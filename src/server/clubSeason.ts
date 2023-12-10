import { ClubSeasonCreation } from "@/types/creationTypes";
import { Club, ClubSeason, LeagueSeason, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export type ClubSeasonWithClub = ClubSeason & { club: Club };
export type ClubSeasonWithLeagueSeason = ClubSeason & { leagueSeason: LeagueSeason };


export const getClubSeasonsByLeagueSeasonId = async (
  leagueSeasonId: string,
) => {
  const clubSeasons: ClubSeasonWithClub[] = await prisma.clubSeason.findMany({
    where: {
      leagueSeasonId: leagueSeasonId,
    },
    include: {
      club: true,
    },
    orderBy: {
      order: "asc",
    },
  });
  return clubSeasons;
};

export const getClubSeasonsByClub = async (
  clubId: string,
) => {
  const clubSeasons: ClubSeasonWithLeagueSeason[] = await prisma.clubSeason.findMany({
    where: {
      clubId: clubId,
    },
    include: {
      leagueSeason: true,
    },
    orderBy: {
      order: "asc",
    },
  });
  return clubSeasons;
};



export const addClubSeason = async (clubSeason: ClubSeasonCreation) => {
  await prisma.club.findFirstOrThrow({
    where: {
      id: clubSeason.clubId,
    },
  });

  await prisma.leagueSeason.findFirstOrThrow({
    where: {
      id: clubSeason.leagueSeasonId,
    },
  });

  const newClubSeason = await prisma.clubSeason.create({
    data: clubSeason,
  });
  return newClubSeason;
};

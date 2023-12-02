import { ClubSeasonCreation } from "@/types/creationTypes";
import { Club, ClubSeason, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export type ClubSeasonWithClub = ClubSeason & { club: Club };

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

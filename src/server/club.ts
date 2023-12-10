import { ClubCreation } from "@/types/creationTypes";
import { Club, Player, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type ClubDetails = Club & {
  players: Player[];
  clubSeasons: { leagueSeasonId: string; order: number }[];
};

export const getClubs = async () => {
  return await prisma.club.findMany();
};

export const getClubsByLeagueSeasonId = async (leagueSeasonId: string) => {
  const clubs: Club[] = await prisma.club.findMany({
    where: {
      clubSeasons: {
        some: {
          leagueSeasonId: leagueSeasonId,
        },
      },
    },
  });
  return clubs;
};

export const getClubById = async (id: string) => {
  const club: ClubDetails = await prisma.club.findFirstOrThrow({
    where: {
      id: id,
    },
    include: {
      players: true,
      clubSeasons: {
        select: {
          leagueSeasonId: true,
          order: true,
        },
      },
    },
  });
  return club;
};

export const addClub = async (club: ClubCreation) => {
  const sameClubs = await prisma.club.findMany({
    where: {
      name: club.name,
    },
  });
  if (sameClubs.length != 0) {
    return null;
  }

  const newClub = await prisma.club.create({
    data: club,
  });
  return newClub;
};

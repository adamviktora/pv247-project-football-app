import { PlayerCreation } from "@/types/creationTypes";
import { Club, LeagueSeason, Player } from "@prisma/client";
import prisma from "./db";

type PlayerWithSeasons = Player & {
  currentClub: Club;
  playerSeasons: {
    goalCount: number;
    clubSeason: {
      leagueSeason: LeagueSeason;
    };
  }[];
};

export const getPlayerById = async (id: string) => {
  const player: PlayerWithSeasons = await prisma.player.findFirstOrThrow({
    where: {
      id: id,
    },
    include: {
      currentClub: true,
      playerSeasons: {
        where: {
          playerId: id,
        },
        include: {
          clubSeason: {
            include: {
              leagueSeason: true,
            },
          },
        },
      },
    },
  });
  return player;
};

export const getPlayersByClub = async (clubId: string) => {
  const players: Player[] = await prisma.player.findMany({
    where: {
      currentClubId: clubId,
    },
  });
  return players;
};

export const addPlayer = async (player: PlayerCreation) => {
  const newPlayer = await prisma.player.create({
    data: player,
  });
  return newPlayer;
};

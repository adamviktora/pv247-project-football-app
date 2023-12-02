import { PlayerCreation } from "@/types/creationTypes";
import { Club, Player, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type PlayerWithSeasons = Player & {
  currentClub: Club;
  playerSeasons: { goalCount: number; clubSeason: { club: Club } }[];
};

export const getPlayerById = async (id: string) => {
  const player: PlayerWithSeasons = await prisma.player.findFirstOrThrow({
    where: {
      id: id,
    },
    include: {
      currentClub: true,
      playerSeasons: {
        select: {
          goalCount: true,
          clubSeason: {
            select: {
              club: true,
            },
          },
        },
      },
    },
  });
  return player;
};

export const addPlayer = async (player: PlayerCreation) => {
  const newPlayer = await prisma.player.create({
    data: player,
  });
  return newPlayer;
};

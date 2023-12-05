import { GameCreation, GameWithGoalsCreation } from "@/types/creationTypes";
import { Club, Game, Goal, LeagueSeason, PrismaClient } from "@prisma/client";
import { addGoal } from "./goal";

const prisma = new PrismaClient();

export type GameWithClubs = Game & { homeClub: Club; awayClub: Club };
export type GameDetail = GameWithClubs & {
  leagueSeason: LeagueSeason;
  goals: (Goal & {
    player: { id: string; firstName: string; lastName: string };
  })[];
};

export const getGamesByLeagueSeasonId = async (
  leagueSeasonId: string,
  clubId?: string,
) => {
  const games: GameWithClubs[] = await prisma.game.findMany({
    where: {
      leagueSeasonId: leagueSeasonId,
      OR: clubId ? [{ homeClubId: clubId }, { awayClubId: clubId }] : undefined,
    },
    include: {
      homeClub: true,
      awayClub: true,
    },
    orderBy: {
      eventDate: "asc",
    },
  });
  return games;
};

export const getGameDetailById = async (id: string) => {
  const gameDetail: GameDetail = await prisma.game.findFirstOrThrow({
    where: {
      id: id,
    },
    include: {
      leagueSeason: true,
      homeClub: true,
      awayClub: true,
      goals: {
        include: {
          player: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      },
    },
  });
  return gameDetail;
};

export const addGame = async (game: GameCreation) => {
  const newGame = await prisma.game.create({
    data: game,
  });
  return newGame;
};

export const addGameWithGoals = async (game: GameWithGoalsCreation) => {
  if (
    (game.homeClubGoalCount ?? 0) + (game.awayClubGoalCount ?? 0) !==
    game.goals.length
  ) {
    throw new Error(
      "Provided number of goals does not match the overall goal count.",
    );
  }

  if (game.eventDate > new Date()) {
    throw new Error(
      "Cannot add goals to a game which has not been played yet.",
    );
  }

  const { goals, ...gameWithoutGoals } = game;

  const newGame = await prisma.game.create({
    data: gameWithoutGoals,
  });

  goals.forEach((goal) => {
    addGoal({ ...goal, gameId: newGame.id });
  });

  return newGame;
};

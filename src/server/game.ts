import { GameCreation, GameWithGoalsCreation } from "@/types/creationTypes";
import { Club, Game, Goal, LeagueSeason } from "@prisma/client";
import { addGoal } from "./goal";
import { prisma } from "./prisma";

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

  if (
    newGame.homeClubGoalCount === null ||
    newGame.awayClubGoalCount === null
  ) {
    return newGame;
  }

  const homeClubSeason = await prisma.clubSeason.findFirstOrThrow({
    where: {
      clubId: game.homeClubId,
      leagueSeasonId: game.leagueSeasonId,
    },
  });

  const awayClubSeason = await prisma.clubSeason.findFirstOrThrow({
    where: {
      clubId: game.awayClubId,
      leagueSeasonId: newGame.leagueSeasonId,
    },
  });

  const homeClubGameStatus = {
    win: newGame.homeClubGoalCount > newGame.awayClubGoalCount ? 1 : 0,
    draw: newGame.homeClubGoalCount === newGame.awayClubGoalCount ? 1 : 0,
    lost: newGame.homeClubGoalCount < newGame.awayClubGoalCount ? 1 : 0,
  };

  const points = {
    home: homeClubGameStatus.win ? 3 : homeClubGameStatus.draw ? 1 : 0,
    away: homeClubGameStatus.lost ? 3 : homeClubGameStatus.draw ? 1 : 0,
  };

  await prisma.clubSeason.update({
    where: {
      id: homeClubSeason.id,
    },
    data: {
      gamesPlayedCount: homeClubSeason.gamesPlayedCount + 1,
      gamesWonCount: homeClubSeason.gamesWonCount + homeClubGameStatus.win,
      gamesDrawnCount: homeClubSeason.gamesDrawnCount + homeClubGameStatus.draw,
      gamesLostCount: homeClubSeason.gamesLostCount + homeClubGameStatus.lost,
      goalsScoredCount:
        homeClubSeason.goalsScoredCount + newGame.homeClubGoalCount,
      goalsReceivedCount:
        homeClubSeason.goalsReceivedCount + newGame.awayClubGoalCount,
      points: homeClubSeason.points + points.home,
    },
  });

  await prisma.clubSeason.update({
    where: {
      id: awayClubSeason.id,
    },
    data: {
      gamesPlayedCount: awayClubSeason.gamesPlayedCount + 1,
      gamesWonCount: awayClubSeason.gamesWonCount + homeClubGameStatus.lost,
      gamesDrawnCount: awayClubSeason.gamesDrawnCount + homeClubGameStatus.draw,
      gamesLostCount: awayClubSeason.gamesLostCount + homeClubGameStatus.win,
      goalsScoredCount:
        awayClubSeason.goalsScoredCount + newGame.awayClubGoalCount,
      goalsReceivedCount:
        awayClubSeason.goalsReceivedCount + newGame.homeClubGoalCount,
      points: awayClubSeason.points + points.away,
    },
  });

  const allClubSeasons = await prisma.clubSeason.findMany({
    where: {
      leagueSeasonId: newGame.leagueSeasonId,
    },
  });

  const sortedClubSeasons = allClubSeasons
    .sort((a, b) => b.points - a.points)
    .map((item, index) => ({
      ...item,
      order: index + 1,
    }));

  for (const clubSeason of sortedClubSeasons) {
    await prisma.clubSeason.update({
      where: {
        id: clubSeason.id,
      },
      data: {
        order: clubSeason.order,
      },
    });
  }

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

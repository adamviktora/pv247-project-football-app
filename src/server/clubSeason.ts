import {
  ClubSeasonCreation,
  PlayerSeasonCreation,
} from "@/types/creationTypes";
import { Club, ClubSeason, LeagueSeason, Player } from "@prisma/client";
import { prisma } from "./prisma";

export type ClubSeasonWithClub = ClubSeason & { club: Club };
export type ClubSeasonWithLeagueSeason = ClubSeason & {
  leagueSeason: LeagueSeason;
};

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

export const getClubSeasonsByClub = async (clubId: string) => {
  const clubSeasons: ClubSeasonWithLeagueSeason[] =
    await prisma.clubSeason.findMany({
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

  // Create PlayerSeasons for all club's players
  console.log("Creating PlayerSeasons");
  const seasonsPlayers: Player[] = await prisma.player.findMany({
    where: {
      currentClubId: clubSeason.clubId,
    },
  });

  seasonsPlayers.forEach(async (player: Player) => {
    const playerSeason: PlayerSeasonCreation = {
      clubSeasonId: newClubSeason.id,
      playerId: player.id,
      goalCount: 0,
    };

    const newPlayerSeason = await prisma.playerSeason.create({
      data: playerSeason,
    });
  });

  return newClubSeason;
};

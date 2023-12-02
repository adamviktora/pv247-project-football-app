import { add } from "@/fetch-helper/CRUD";
import { ClubSeasonCreation } from "@/types/creationTypes";
import { ClubSeason } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const createClubSeasons = async () => {
    

    const clubSeasons: ClubSeasonCreation[] = [
        {
          clubId: (await prisma.club.findMany({where : {name: {equals: "Arsenal".toString()}}})).at(0)?.id || "",
          leagueSeasonId: "cfe",
          order: 1,
          gamesPlayedCount: 35,
          gamesWonCount: 27,
          gamesDrawnCount: 4,
          gamesLostCount: 4,
          goalsScoredCount: 92,
          goalsReceivedCount: 31,
          points: 85,
        },
        {
            clubId: (await prisma.club.findMany({where : {name: {equals: "Chelsea".toString()}}})).at(0)?.id || "",
            leagueSeasonId: "cfe",
          order: 2,
          gamesPlayedCount: 36,
          gamesWonCount: 25,
          gamesDrawnCount: 6,
          gamesLostCount: 5,
          goalsScoredCount: 83,
          goalsReceivedCount: 42,
          points: 81,
        },
      ];


    clubSeasons.forEach(async (clubSeason) => {
    const created = await add<ClubSeasonCreation, ClubSeason>("clubSeason", clubSeason);
    console.log(`Created clubSeason with id ${created.id}`);
  });
};

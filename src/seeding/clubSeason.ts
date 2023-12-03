import { add } from "@/fetch-helper/CRUD";
import { ClubSeasonCreation } from "@/types/creationTypes";
import { ClubSeason } from "@prisma/client";

export const createClubSeasons = async () => {
  const pl2023id = "35c0fff6-d3e9-49b0-8c5a-b4b2f39006b7";
  const arsenalId = "b373ff57-b7ed-4017-979a-1635b503b289";
  const crystalPalaceId = "beb38b7e-49ee-4fe4-bc75-cd8efef93dd7";

  const clubSeasons: ClubSeasonCreation[] = [
    {
      clubId: arsenalId,
      leagueSeasonId: pl2023id,
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
      clubId: crystalPalaceId,
      leagueSeasonId: pl2023id,
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
    const created = await add<ClubSeasonCreation, ClubSeason>(
      "clubSeason",
      clubSeason,
    );
    console.log(`Created clubSeason with id ${created.id}`);
  });
};

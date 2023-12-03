import { add } from "@/fetch-helper/CRUD";
import { GameCreation, GameWithGoalsCreation } from "@/types/creationTypes";
import { Game } from "@prisma/client";

export const createGames = async () => {
  const pl2023id = "35c0fff6-d3e9-49b0-8c5a-b4b2f39006b7";
  const arsenalId = "b373ff57-b7ed-4017-979a-1635b503b289";
  const crystalPalaceId = "beb38b7e-49ee-4fe4-bc75-cd8efef93dd7";

  const passedGames: GameWithGoalsCreation[] = [
    {
      leagueSeasonId: pl2023id,
      eventDate: new Date(),
      round: 1,
      homeClubId: arsenalId,
      awayClubId: crystalPalaceId,
      homeClubGoalCount: 1,
      awayClubGoalCount: 0,
      goals: [
        {
          minute: 28,
          plusMinute: null,
          isOwnGoal: false,
          isPenalty: false,
          clubScoredId: arsenalId,
          clubReceivedId: crystalPalaceId,
          playerId: "a421f711-18cf-422b-8c4b-a2d2bc6a8777",
        },
      ],
    },
  ];

  const futureGames: GameCreation[] = [
    {
      leagueSeasonId: pl2023id,
      eventDate: new Date(2024, 3, 5),
      round: 2,
      homeClubId: crystalPalaceId,
      awayClubId: arsenalId,
      homeClubGoalCount: null,
      awayClubGoalCount: null,
    },
  ];

  passedGames.forEach(async (game) => {
    const created = await add<GameWithGoalsCreation, Game>("game", game);
    console.log(`Created game with goals with id ${created.id}`);
  });

  futureGames.forEach(async (game) => {
    const created = await add<GameCreation, Game>("game", game);
    console.log(`Created game with id ${created.id}`);
  });
};

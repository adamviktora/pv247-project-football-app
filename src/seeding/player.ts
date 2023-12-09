import { add } from "@/fetch-helper/CRUD";
import { PlayerCreation } from "@/types/creationTypes";
import { Player } from "@prisma/client";

export const createPlayers = async () => {
  const pl2023id = "35c0fff6-d3e9-49b0-8c5a-b4b2f39006b7";
  const arsenalId = "b373ff57-b7ed-4017-979a-1635b503b289";
  const crystalPalaceId = "beb38b7e-49ee-4fe4-bc75-cd8efef93dd7";

  const players: PlayerCreation[] = [
    {
      firstName: "Bukayo",
      lastName: "Saka",
      dateOfBirth: new Date(2001, 8, 5),
      position: PlayerPosition.Forward,
      dressNumber: 7,
      pictureURL:
        "https://cdn.shopify.com/s/files/1/0025/8863/9289/files/11-14_480x480.png?v=1661415004",
      currentClubId: arsenalId,
    },
  ];

  players.forEach(async (player) => {
    const created = await add<PlayerCreation, Player>("player", player);
    console.log(`Created player with id ${created.id}`);
  });
};

export enum PlayerPosition {
  Goalkeeper = "Goalkeeper",
  Defender = "Defender",
  Midfielder = "Midfielder",
  Forward = "Forward",
}

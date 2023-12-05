import { getPlayersByClub } from "@/server/player";
import { Club } from "@prisma/client";
import { PlayerPanel } from "./PlayerPanel";

export const ClubView = async ({ club }: { club: Club }) => {
  const players = await getPlayersByClub(club.id);

  return (
    <div className=" flex flex-col">
      <div className=" flex flex-row items-center justify-between px-48 py-12">
        <div className="flex flex-row items-center space-x-8">
          <img className="max-h-48" src={club.logoURL} alt="|Logo|" />
          <div className="pb-20 text-3xl font-semibold">{club.name}</div>
        </div>
        <div>TBD: Club season table</div>
      </div>
      <div className="px-48 font-semibold">Squad</div>
      <div className="mx-48 mb-12 flex flex-row overflow-x-auto">
        {players.map((player) => (
          <PlayerPanel key={player.id} player={player} />
        ))}
      </div>
    </div>
  );
};

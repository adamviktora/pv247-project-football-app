import { getPlayersByClub } from "@/server/player";
import { Club } from "@prisma/client";
import { PlayerPanel } from "./PlayerPanel";
import TeamSeasons from "./TeamSeasons";

export const ClubView = async ({
  club,
  seasonId,
}: {
  club: Club;
  seasonId?: string;
}) => {
  const players = await getPlayersByClub(club.id);

  return (
    <div className="m-auto flex w-full flex-col px-4 md:w-[48rem] xl:w-2/3">
      <div className=" flex flex-row items-center justify-between pb-4 pt-4 sm:pt-12">
        <div className="flex w-full flex-col items-center justify-between sm:flex-row">
          <div className="ml-2 flex flex-row items-center">
            <img
              className="mr-2 h-32 md:h-48"
              src={club.logoURL}
              alt="|Logo|"
            />
            <div className="text-3xl font-semibold md:pb-20">{club.name}</div>
          </div>

          <TeamSeasons clubId={club.id} />
        </div>
      </div>
      <div className="font-semibold">Squad</div>
      <div className="mb-4 flex flex-row overflow-x-auto md:mb-12">
        {players.map((player) => (
          <PlayerPanel key={player.id} player={player} seasonId={seasonId} />
        ))}
      </div>
    </div>
  );
};

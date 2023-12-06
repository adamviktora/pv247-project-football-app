"use client";

import { GameWithClubs } from "@/server/game";
import { formatDate } from "@/utils/date";
import { useRouter } from "next/navigation";

export const GameRow = ({ game }: { game: GameWithClubs }) => {
  const router = useRouter();

  const openGame = () => {
    router.push(`/game/${game.id}`);
  };

  return (
    <tr
      className="h-12 border-b odd:bg-white even:bg-gray-200 hover:cursor-pointer hover:bg-gray-300"
      onClick={openGame}
    >
      <td className="whitespace-nowrap pl-4 text-right text-xs font-semibold md:pl-8 md:text-sm xl:pl-16 2xl:pl-24">
        {game.homeClub.name}
      </td>
      <td className="px-1 text-center md:px-4 ">
        <div className="flex flex-row">
          <div className="m-0.5 rounded-l-lg  bg-primary-color p-1 pl-5 pr-4 text-xs font-semibold text-white md:text-sm ">
            {game.homeClubGoalCount != undefined ? game.homeClubGoalCount : "-"}
          </div>
          <div className="m-0.5 ml-0  rounded-r-lg bg-primary-color p-1 pl-4 pr-5 text-xs font-semibold text-white md:text-sm">
            {game.awayClubGoalCount != undefined ? game.awayClubGoalCount : "-"}
          </div>
        </div>
      </td>
      <td className="whitespace-nowrap text-left  text-xs font-semibold md:text-sm">
        {game.awayClub.name}
      </td>
      <td className="w-full whitespace-nowrap pl-1 pr-4 text-right text-xs font-semibold md:pl-6 md:pr-8 md:text-sm  xl:pr-16 2xl:pr-24">
        {formatDate(game.eventDate)}
      </td>
    </tr>
  );
};

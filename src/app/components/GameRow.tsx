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
      <td className="whitespace-nowrap pl-4 text-right font-semibold max-md:text-xs sm:pl-16">
        {game.homeClub.name}
      </td>
      <td className="px-1 text-center md:px-4">
        <div className="mx-1 flex flex-row text-base font-semibold text-white md:text-lg">
          <div className="mr-0.5 flex h-8 w-12 items-center justify-center rounded-l-lg bg-primary-color">
            {game.homeClubGoalCount ?? "-"}
          </div>
          <div className="flex h-8 w-12 items-center justify-center rounded-r-lg bg-primary-color">
            {game.awayClubGoalCount ?? "-"}
          </div>
        </div>
      </td>
      <td className="whitespace-nowrap text-left font-semibold max-md:text-xs">
        {game.awayClub.name}
      </td>
      <td className="w-full whitespace-nowrap pr-4 text-right text-xs font-semibold md:text-sm">
        {formatDate(game.eventDate)}
      </td>
    </tr>
  );
};

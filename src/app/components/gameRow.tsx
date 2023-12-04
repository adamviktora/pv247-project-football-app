import { GameWithClubs } from "@/server/game";
import { formatDate } from "@/utils/date";

export const GameRow = ({ game }: { game: GameWithClubs }) => (
  <tr className="h-12 border-b odd:bg-white even:bg-gray-200">
    <td className="whitespace-nowrap pl-16 text-right font-semibold">
      {game.homeClub.name}
    </td>

    <td className="px-4 text-center ">
      <div className="flex flex-row">
        <div className="m-0.5 rounded-l-lg bg-primary-color p-1 pl-5 pr-4 font-semibold text-white ">
          {game.homeClubGoalCount}
        </div>
        <div className="m-0.5 ml-0 rounded-r-lg bg-primary-color p-1 pl-4 pr-5 font-semibold text-white ">
          {game.awayClubGoalCount}
        </div>
      </div>
    </td>
    <td className="whitespace-nowrap text-left font-semibold">
      {game.awayClub.name}
    </td>
    <td className="w-full whitespace-nowrap px-6 pr-16 text-right font-semibold">
      {formatDate(game.eventDate)}
    </td>
  </tr>
);

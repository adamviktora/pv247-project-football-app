import { GameWithClubs } from "@/server/game";

export const GameRow = ({ game }: { game: GameWithClubs }) => {
  const formattedDate = game.eventDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <tr className="odd:bg-white even:bg-gray-200 border-b h-12">
      <td className="font-semibold pl-16 text-right whitespace-nowrap">
        {game.homeClub.name}
      </td>

      <td className="px-4 text-center ">
        <div className="flex flex-row">
          <div className="bg-primary-color font-semibold text-white p-1 rounded-l-lg m-0.5 pl-5 pr-4 ">
            {game.homeClubGoalCount}
          </div>
          <div className="bg-primary-color font-semibold text-white p-1 rounded-r-lg m-0.5 pr-5 pl-4 ml-0 ">
            {game.awayClubGoalCount}
          </div>
        </div>
      </td>
      <td className="text-left font-semibold whitespace-nowrap">{game.awayClub.name}</td>
      <td className="px-6 font-semibold w-full text-right pr-16 whitespace-nowrap">
        {formattedDate}
      </td>
    </tr>
  );
};

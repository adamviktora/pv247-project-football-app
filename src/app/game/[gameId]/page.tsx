import ReturnButton from "@/app/components/ReturnButton";
import { getGameDetailById } from "@/server/game";
import { formatDate } from "@/utils/date";
import ClubCard from "./ClubCard";

const GameDetail = async ({ params }: { params: { gameId: string } }) => {
  const game = await getGameDetailById(params.gameId);

  return (
    <div className="relative w-full">
      <ReturnButton standalone />
      <div className="m-auto flex w-10/12 flex-col pt-8 md:w-[40rem]">
        <div className="flex justify-around pb-6">
          <div>Round {game.round}</div>
          <div>{formatDate(game.eventDate)}</div>
        </div>
        <div className="flex items-center gap-4">
          <ClubCard isHome club={game.homeClub} />
          <div className="flex h-20 w-1/3 items-center justify-center rounded-lg bg-secondary-color text-4xl font-semibold sm:text-5xl">
            {game.homeClubGoalCount} - {game.awayClubGoalCount}
          </div>
          <ClubCard club={game.awayClub} />
        </div>
      </div>
    </div>
  );
};

export default GameDetail;

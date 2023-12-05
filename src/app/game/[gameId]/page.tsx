import ReturnButton from "@/app/components/ReturnButton";
import { getGameDetailById } from "@/server/game";
import { formatDate } from "@/utils/date";
import { Club } from "@prisma/client";
import Link from "next/link";

const clubCard = (club: Club, isHome?: boolean) => (
  <Link
    href={`/club?clubId=${club.id}`}
    className={`flex ${
      isHome ? "flex-row-reverse" : ""
    } w-1/3 items-center gap-4 px-4 py-2 hover:cursor-pointer hover:rounded-lg hover:bg-gray-200`}
  >
    <img className="max-h-14" src={club.logoURL} alt="|Logo|" />
    <div className="text-lg">{club.name}</div>
  </Link>
);

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
          {clubCard(game.homeClub, true)}
          <div className="flex h-20 w-1/3 items-center justify-center rounded-lg bg-secondary-color text-5xl font-semibold">
            {game.homeClubGoalCount} - {game.awayClubGoalCount}
          </div>
          {clubCard(game.awayClub)}
        </div>
      </div>
    </div>
  );
};

export default GameDetail;

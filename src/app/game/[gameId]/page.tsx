import ReturnButton from "@/app/components/ReturnButton";
import { getGameDetailById } from "@/server/game";
import { formatDate } from "@/utils/date";
import Link from "next/link";
import ClubCard from "./ClubCard";

const GameDetail = async ({ params }: { params: { gameId: string } }) => {
  const game = await getGameDetailById(params.gameId);

  const goalsList = (clubId: string) =>
    game.goals
      .filter((goal) => goal.clubScoredId === clubId)
      .map((goal) => (
        <li className="mb-1" key={goal.id}>
          <Link
            href={`/player/${goal.playerId}`}
            className="hover:cursor-pointer hover:underline"
          >
            {goal.player.firstName} {goal.player.lastName.toUpperCase()}
          </Link>{" "}
          {goal.minute}
          {goal.plusMinute && `+${goal.plusMinute}`}&apos;
          {goal.isPenalty && " (P)"}
          {goal.isOwnGoal && " (OG)"}
        </li>
      ));

  return (
    <div className="relative w-full">
      <ReturnButton standalone />
      <div className="m-auto flex w-10/12 flex-col pt-8 md:w-[40rem] lg:w-[56rem]">
        <div className="flex justify-center">
          <div className="flex justify-between pb-6 max-lg:grow lg:w-[40rem]">
            <div className="w-32 text-right">Round {game.round}</div>
            <div className="w-32">{formatDate(game.eventDate)}</div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          <ClubCard isHome club={game.homeClub} />
          <div className="flex h-20 w-1/3 items-center justify-center rounded-lg bg-secondary-color text-4xl font-semibold sm:text-5xl lg:w-[202px]">
            {game.homeClubGoalCount} - {game.awayClubGoalCount}
          </div>
          <ClubCard club={game.awayClub} />
        </div>
      </div>
      <div className="mt-8 flex justify-center text-gray-500 max-sm:justify-around max-sm:text-sm sm:gap-56">
        <ul className="w-36 text-right sm:w-48">
          {goalsList(game.homeClubId)}
        </ul>
        <ul className="w-36 sm:w-48">{goalsList(game.awayClubId)}</ul>
      </div>
    </div>
  );
};

export default GameDetail;

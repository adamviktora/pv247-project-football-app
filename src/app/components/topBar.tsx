import Link from "next/link";
import ReturnButton from "./returnButton";

const TopBar = ({
  isLeaderboard,
  seasonId,
}: {
  isLeaderboard: boolean;
  seasonId: string;
}) => {
  return (
    <div className="w-full bg-secondary-color h-12 flex flex-row justify-between px-12 items-center">
      <div className="w-72 flex flex-row ">
        <ReturnButton />
        <span className="m-auto">TBD:TeamCheckbox</span>
      </div>

      <div className="flex flex-row space-x-4">
        <Link
          className={`my-auto  py-1 text-primary-color ${
            isLeaderboard ? "underline" : ""
          } hover:underline `}
          href={`/leaderboard/${seasonId}`}
        >
          Leaderboard
        </Link>
        <Link
          className={`my-auto py-1 text-primary-color ${
            !isLeaderboard ? "underline" : ""
          } hover:underline `}
          href={`/matches/${seasonId}`}
        >
          Matches
        </Link>
      </div>
      <div className="w-72">
        <span>TBD:TeamCheckbox</span>
      </div>
    </div>
  );
};

export default TopBar;

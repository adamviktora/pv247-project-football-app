import Link from "next/link";
import ReturnButton from "./returnButton";
import SeasonSelect from "./seasonSelect";
import TeamSelect from "./teamSelect";

export enum ParentComponent {
  Leaderboard,
  Matches,
  Team,
}

const TopBar = ({
  parentComponent,
  seasonId,
}: {
  parentComponent: ParentComponent;
  seasonId?: string;
}) => {
  return (
    <div className="w-full bg-secondary-color h-12 flex flex-row justify-between px-12 items-center">
      <div className="w-72 flex flex-row ">
        <ReturnButton />
        {parentComponent != ParentComponent.Team && <SeasonSelect />}
      </div>
      {parentComponent != ParentComponent.Team && (
        <div className="flex flex-row space-x-4">
          <Link
            className={`my-auto  py-1 text-primary-color ${
              parentComponent == ParentComponent.Leaderboard ? "underline" : ""
            } hover:underline `}
            href={`/leaderboard/${seasonId}`}
          >
            Leaderboard
          </Link>
          <Link
            className={`my-auto py-1 text-primary-color ${
              parentComponent == ParentComponent.Matches ? "underline" : ""
            } hover:underline `}
            href={`/matches/${seasonId}`}
          >
            Matches
          </Link>
        </div>
      )}
      <div className="w-72">
        {parentComponent != ParentComponent.Leaderboard && <TeamSelect />}
      </div>
    </div>
  );
};

export default TopBar;

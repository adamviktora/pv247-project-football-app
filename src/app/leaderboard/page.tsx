import { LeaderboardRow } from "@/app/components/leaderboardRow";
import TopBar from "@/app/components/topBar";
import { getClubSeasonsByLeagueSeasonId } from "@/server/clubSeason";
import { getLeagueSeasonsByLeagueId } from "@/server/leagueSeason";
import SeasonOptions from "../components/server-components/SeasonOptions";

const SeasonLeaderboard = async ({
  searchParams,
}: {
  searchParams: { leagueId: string; seasonId: string };
}) => {
  const clubSeasons = await getClubSeasonsByLeagueSeasonId(
    searchParams.seasonId,
  );
  const seasons = await getLeagueSeasonsByLeagueId(searchParams.leagueId);

  return (
    <div className="flex w-full flex-col">
      <TopBar
        leagueId={searchParams.leagueId}
        seasonId={searchParams.seasonId}
        seasonOptions={<SeasonOptions seasons={seasons} />}
      />
      <div className="mx-auto my-9 max-h-96 w-3/4 overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400 ">
          <thead className="sticky top-0 h-9 bg-primary-color text-xs uppercase text-white">
            <tr className="">
              <HeaderCell content="Position" />
              <HeaderCell content="Club" />
              <HeaderCell content="Played" />
              <HeaderCell content="Won" />
              <HeaderCell content="Drawn" />
              <HeaderCell content="Lost" />
              <HeaderCell content="GF" />
              <HeaderCell content="GA" />
              <HeaderCell content="GD" />
              <HeaderCell content="Points" />
            </tr>
          </thead>
          <tbody className="text-black">
            {clubSeasons.map((clubSeason, index) => (
              <LeaderboardRow
                key={index + 1}
                clubSeason={clubSeason}
                leagueId={searchParams.leagueId}
                seasonId={searchParams.seasonId}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const HeaderCell = ({ content }: { content: string }) => {
  return <th className="px-6 text-center">{content}</th>;
};

export default SeasonLeaderboard;

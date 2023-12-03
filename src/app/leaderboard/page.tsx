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
    <div className="w-full flex flex-col">
      <TopBar
        leagueId={searchParams.leagueId}
        seasonId={searchParams.seasonId}
        seasonOptions={<SeasonOptions seasons={seasons} />}
      />
      <div className="overflow-x-auto shadow-md sm:rounded-lg mx-auto w-3/4 my-9 max-h-96">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-white uppercase bg-primary-color sticky top-0 h-9">
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
              <LeaderboardRow key={index + 1} clubSeason={clubSeason} />
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

import { LeaderboardRow } from "@/app/components/LeaderboardRow";
import TopBar from "@/app/components/TopBar";
import { getClubSeasonsByLeagueSeasonId } from "@/server/clubSeason";
import { getLeagueSeasonsByLeagueId } from "@/server/leagueSeason";
import HeaderCell from "../components/HeaderCell";
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
      <div className="mx-auto my-9 max-h-96 w-full overflow-x-auto shadow-md sm:rounded-lg lg:w-[64rem] ">
        <table className="w-full text-left text-xs text-gray-500 md:text-sm ">
          <thead className="sticky h-9 bg-primary-color text-xs uppercase text-white">
            <tr className="">
              <HeaderCell text="Position" textMobile="Pos." />
              <HeaderCell text="Club" />
              <HeaderCell text="Played" />
              <HeaderCell text="Win" textMobile="W" />
              <HeaderCell text="Draw" textMobile="D" />
              <HeaderCell text="Loss" textMobile="L" />
              <HeaderCell text="GF" />
              <HeaderCell text="GA" />
              <HeaderCell text="GD" />
              <HeaderCell text="Points" textMobile="Pts." />
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

export default SeasonLeaderboard;

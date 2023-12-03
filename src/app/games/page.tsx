import TopBar from "@/app/components/topBar";
import { getLeagueSeasonsByLeagueId } from "@/server/leagueSeason";
import SeasonOptions from "../components/server-components/SeasonOptions";

const SeasonGames = async ({
  searchParams,
}: {
  searchParams: { leagueId: string; seasonId: string; clubId: string };
}) => {
  const seasons = await getLeagueSeasonsByLeagueId(searchParams.leagueId);

  return (
    <div className="w-full bg-slate-200 flex flex-col">
      <TopBar
        leagueId={searchParams.leagueId}
        seasonId={searchParams.seasonId}
        clubId={searchParams.clubId}
        seasonOptions={<SeasonOptions seasons={seasons} />}
      />
      <div className="w-full bg-slate-300 h-full">TBD: Games</div>
    </div>
  );
};

export default SeasonGames;

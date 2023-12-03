import TopBar from "@/app/components/topBar";
import { getClubsByLeagueSeasonId } from "@/server/club";
import { getLeagueSeasonsByLeagueId } from "@/server/leagueSeason";
import ClubOptions from "../components/server-components/ClubOptions";
import SeasonOptions from "../components/server-components/SeasonOptions";

const SeasonGames = async ({
  searchParams,
}: {
  searchParams: { leagueId: string; seasonId: string; clubId: string };
}) => {
  const seasons = await getLeagueSeasonsByLeagueId(searchParams.leagueId);
  const clubs = await getClubsByLeagueSeasonId(searchParams.seasonId);

  return (
    <div className="w-full bg-slate-200 flex flex-col">
      <TopBar
        leagueId={searchParams.leagueId}
        seasonId={searchParams.seasonId}
        clubId={searchParams.clubId ?? (clubs.length ? "all" : undefined)}
        seasonOptions={<SeasonOptions seasons={seasons} />}
        clubOptions={<ClubOptions clubs={clubs} />}
      />
      <div className="w-full bg-slate-300 h-full">TBD: Games</div>
    </div>
  );
};

export default SeasonGames;

import { getClubsByLeagueSeasonId } from "@/server/club";
import { getLeagues } from "@/server/league";
import { getLeagueSeasonsByLeagueId } from "@/server/leagueSeason";
import MainMenu from "./components/MainMenu";
import ClubOptions from "./components/server-components/ClubOptions";
import LeagueOptions from "./components/server-components/LeagueOptions";
import SeasonOptions from "./components/server-components/SeasonOptions";

const Home = async ({
  searchParams,
}: {
  searchParams: { leagueId: string; seasonId: string; clubId: string };
}) => {
  const leagues = await getLeagues();
  const leagueId = searchParams.leagueId ?? leagues[0]?.id;

  const seasons = leagueId ? await getLeagueSeasonsByLeagueId(leagueId) : [];
  const seasonId = searchParams.seasonId ?? seasons[0]?.id;

  const clubs = seasonId ? await getClubsByLeagueSeasonId(seasonId) : [];
  const clubId = searchParams.clubId ?? (clubs.length ? "all" : undefined);

  return (
    <div className="flex flex-col space-y-4 w-80 m-auto">
      <MainMenu
        leagueOptions={<LeagueOptions leagues={leagues} />}
        seasonOptions={<SeasonOptions seasons={seasons} />}
        clubOptions={<ClubOptions clubs={clubs} />}
        leagueId={leagueId}
        seasonId={seasonId}
        clubId={clubId}
      />
    </div>
  );
};

export default Home;

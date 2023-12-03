import { getClubsByLeagueSeasonId } from "@/server/club";
import { getLeagues } from "@/server/league";
import { getLeagueSeasonsByLeagueId } from "@/server/leagueSeason";
import MainMenu from "./components/MainMenu";

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

  const leagueOptions = leagues.map((league) => (
    <option key={league.id} value={league.id}>
      {league.name}
    </option>
  ));

  const seasonOptions = seasons.map((season) => (
    <option key={season.id} value={season.id}>
      {season.year}/{(season.year + 1) % 100}
    </option>
  ));

  const clubOptions = [
    <option key={0} value={"all"}>
      All clubs
    </option>,
    ...clubs.map((club) => (
      <option key={club.id} value={club.id}>
        {club.name}
      </option>
    )),
  ];

  return (
    <div className="flex flex-col space-y-4 w-80 m-auto">
      <MainMenu
        leagueOptions={leagueOptions}
        seasonOptions={seasonOptions}
        clubOptions={clubOptions}
        leagueId={leagueId}
        seasonId={seasonId}
        clubId={clubId}
      />
    </div>
  );
};

export default Home;

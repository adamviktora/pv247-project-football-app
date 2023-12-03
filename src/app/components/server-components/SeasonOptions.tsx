import { getLeagueSeasonsByLeagueId } from "@/server/leagueSeason";

const SeasonOptions = async ({
  searchParams,
}: {
  searchParams: { leagueId: string };
}) =>
  (await getLeagueSeasonsByLeagueId(searchParams.leagueId)).map((season) => (
    <option key={season.id} value={season.id}>
      {season.year}/{(season.year + 1) % 100}
    </option>
  ));

export default SeasonOptions;

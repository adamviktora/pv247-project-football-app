import { getLeagues } from "@/server/league";

const LeagueOptions = async () =>
  (await getLeagues()).map((league) => (
    <option key={league.id} value={league.id}>
      {league.name}
    </option>
  ));

export default LeagueOptions;

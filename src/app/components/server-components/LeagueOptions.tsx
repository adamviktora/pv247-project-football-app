import { League } from "@prisma/client";

type LeagueOptionsProps = {
  leagues: League[];
};

const LeagueOptions = ({ leagues }: LeagueOptionsProps) =>
  leagues.map((league) => (
    <option key={league.id} value={league.id}>
      {league.name}
    </option>
  ));

export default LeagueOptions;

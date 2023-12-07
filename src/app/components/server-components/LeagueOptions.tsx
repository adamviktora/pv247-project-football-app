import { League } from "@prisma/client";

type LeagueOptionsProps = {
  leagues: League[];
};

const getFlag = (code: string) =>
  ({
    ENG: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    ESP: "🇪🇸",
    GER: "🇩🇪",
    ITA: "🇮🇹",
    FRA: "🇫🇷",
    POR: "🇵🇹",
    NED: "🇳🇱",
    BEL: "🇧🇪",
    ARG: "🇦🇷",
  })[code];

const LeagueOptions = ({ leagues }: LeagueOptionsProps) =>
  leagues.map((league) => (
    <option key={league.id} value={league.id}>
      {getFlag(league.countryCode)} {league.name}
    </option>
  ));

export default LeagueOptions;

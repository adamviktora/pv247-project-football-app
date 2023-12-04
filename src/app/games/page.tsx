import TopBar from "@/app/components/topBar";
import { getClubsByLeagueSeasonId } from "@/server/club";
import { GameWithClubs } from "@/server/game";
import { getLeagueSeasonsByLeagueId } from "@/server/leagueSeason";
import { GameRow } from "../components/gameRow";
import ClubOptions from "../components/server-components/ClubOptions";
import SeasonOptions from "../components/server-components/SeasonOptions";

const SeasonGames = async ({
  searchParams,
}: {
  searchParams: { leagueId: string; seasonId: string; clubId: string };
}) => {
  const seasons = await getLeagueSeasonsByLeagueId(searchParams.leagueId);
  const clubs = await getClubsByLeagueSeasonId(searchParams.seasonId);

  const games: GameWithClubs[] = [
    {
      id: "TBD1",
      leagueSeasonId: "TBD",
      homeClub: {
        id: "abc1",
        logoURL: "TBD",
        name: "Leicester",
        countryCode: "ENG",
      },
      awayClub: {
        id: "abc2",
        logoURL: "TBD",
        name: "Liverpool",
        countryCode: "ENG",
      },
      homeClubGoalCount: 0,
      awayClubGoalCount: 3,
      round: 36,
      homeClubId: "abc1",
      awayClubId: "abc2",
      eventDate: new Date(2023, 4, 15),
    },

    {
      id: "TBD3",
      leagueSeasonId: "TBD",
      homeClub: {
        id: "abc1",
        logoURL: "TBD",
        name: "Everton",
        countryCode: "ENG",
      },
      awayClub: {
        id: "abc2",
        logoURL: "TBD",
        name: "Manchester City",
        countryCode: "ENG",
      },
      homeClubGoalCount: 2,
      awayClubGoalCount: 0,
      round: 36,
      homeClubId: "abc1",
      awayClubId: "abc2",
      eventDate: new Date(2023, 4, 14),
    },
    {
      id: "TBD4",
      leagueSeasonId: "TBD",
      homeClub: {
        id: "abc1",
        logoURL: "TBD",
        name: "Arsenal",
        countryCode: "ENG",
      },
      awayClub: {
        id: "abc2",
        logoURL: "TBD",
        name: "Brighton",
        countryCode: "ENG",
      },
      homeClubGoalCount: 0,
      awayClubGoalCount: 3,
      round: 36,
      homeClubId: "abc1",
      awayClubId: "abc2",
      eventDate: new Date(2023, 4, 14),
    },
    {
      id: "TBD5",
      leagueSeasonId: "TBD",
      homeClub: {
        id: "abc1",
        logoURL: "TBD",
        name: "Brentford",
        countryCode: "ENG",
      },
      awayClub: {
        id: "abc2",
        logoURL: "TBD",
        name: "West Ham",
        countryCode: "ENG",
      },
      homeClubGoalCount: 2,
      awayClubGoalCount: 0,
      round: 36,
      homeClubId: "abc1",
      awayClubId: "abc2",
      eventDate: new Date(2023, 4, 14),
    },
  ];

  return (
    <div className="flex w-full flex-col">
      <TopBar
        leagueId={searchParams.leagueId}
        seasonId={searchParams.seasonId}
        clubId={searchParams.clubId ?? (clubs.length ? "all" : undefined)}
        seasonOptions={<SeasonOptions seasons={seasons} />}
        clubOptions={<ClubOptions clubs={clubs} />}
      />
      <span className="mx-auto mt-9 w-1/2">Round TBD/TBD</span>
      <div className="mx-auto mb-9 max-h-96 w-1/2 overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400 ">
          <tbody className="text-black">
            {games.map((game, index) => (
              <GameRow key={index + 1} game={game} />
            ))}
          </tbody>
        </table>
      </div>{" "}
    </div>
  );
};

export default SeasonGames;

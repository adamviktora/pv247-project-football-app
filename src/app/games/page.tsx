import TopBar from "@/app/components/TopBar";
import { getClubsByLeagueSeasonId } from "@/server/club";
import { getGamesByLeagueSeasonId } from "@/server/game";
import { getLeagueSeasonsByLeagueId } from "@/server/leagueSeason";
import { GameRow } from "../components/GameRow";
import ClubOptions from "../components/server-components/ClubOptions";
import SeasonOptions from "../components/server-components/SeasonOptions";

const SeasonGames = async ({
  searchParams,
}: {
  searchParams: { leagueId: string; seasonId: string; clubId: string };
}) => {
  const seasons = await getLeagueSeasonsByLeagueId(searchParams.leagueId);
  const clubs = await getClubsByLeagueSeasonId(searchParams.seasonId);
  const games = await getGamesByLeagueSeasonId(searchParams.seasonId);

  return (
    <div className="flex w-full flex-col">
      <TopBar
        leagueId={searchParams.leagueId}
        seasonId={searchParams.seasonId}
        clubId={searchParams.clubId ?? (clubs.length ? "all" : undefined)}
        seasonOptions={<SeasonOptions seasons={seasons} />}
        clubOptions={<ClubOptions clubs={clubs} />}
      />
      <span className="mx-auto mt-9 w-full md:w-2/3 lg:w-1/2">
        Round TBD/TBD
      </span>
      <div className="mx-auto mb-9 max-h-96 w-full overflow-x-auto shadow-md sm:rounded-lg md:w-2/3 lg:w-1/2">
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

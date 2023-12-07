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
      <div className="mx-auto my-9 w-full self-center md:w-[48rem]">
        <span>Round TBD/TBD</span>
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-left text-sm">
            <tbody className="text-black">
              {games.map((game, index) => (
                <GameRow key={index + 1} game={game} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SeasonGames;

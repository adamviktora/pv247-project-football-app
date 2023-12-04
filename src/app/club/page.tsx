import TopBar from "@/app/components/topBar";
import SeasonOptions from "../components/server-components/SeasonOptions";
import ClubOptions from "../components/server-components/ClubOptions";
import { getLeagueSeasonsByLeagueId } from "@/server/leagueSeason";
import { getClubsByLeagueSeasonId } from "@/server/club";
import SeasonClubs from "../components/SeasonClubs";
import { Club, LeagueSeason } from "@prisma/client";

const ClubDetail = async ({
  searchParams,
}: {
  searchParams: { leagueId?: string; seasonId?: string; clubId: string };
}) => {
  var seasons: LeagueSeason[] = [];
  var clubs: Club[] = [];

  if (searchParams.leagueId) {
    seasons = await getLeagueSeasonsByLeagueId(searchParams.leagueId);
  }
  if (searchParams.seasonId) {
    clubs = await getClubsByLeagueSeasonId(searchParams.seasonId);
  }

  // TODO: Fetch team data

  return (
    <div className="flex w-full flex-col ">
      <TopBar
        leagueId={searchParams.leagueId}
        seasonId={searchParams.seasonId}
        clubId={searchParams.clubId}
        seasonOptions={<SeasonOptions seasons={seasons} />}
        clubOptions={<ClubOptions clubs={clubs} />}
      />
      {searchParams.clubId === "all" ? (
        <div className="h-full w-full ">
          <SeasonClubs
            seasonId={searchParams.seasonId || ""}
            leagueId={searchParams.leagueId || ""}
          />
        </div>
      ) : (
        <div className="h-full w-full bg-slate-300">
          TBD: Team with id {searchParams.clubId}
        </div>
      )}
    </div>
  );
};

export default ClubDetail;

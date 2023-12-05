import TopBar from "@/app/components/TopBar";
import { getClubById, getClubsByLeagueSeasonId } from "@/server/club";
import { getLeagueSeasonsByLeagueId } from "@/server/leagueSeason";
import { Club, LeagueSeason } from "@prisma/client";
import { ClubView } from "../components/ClubView";
import SeasonClubs from "../components/SeasonClubs";
import ClubOptions from "../components/server-components/ClubOptions";
import SeasonOptions from "../components/server-components/SeasonOptions";

const ClubDetail = async ({
  searchParams,
}: {
  searchParams: { leagueId?: string; seasonId?: string; clubId: string };
}) => {
  let seasons: LeagueSeason[] = [];
  let clubs: Club[] = [];

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
        <div className="h-full w-full shadow-sm">
          <ClubView club={await getClubById(searchParams.clubId)} />
        </div>
      )}
    </div>
  );
};

export default ClubDetail;

import { LeaderboardRow } from "@/app/components/leaderboardRow";
import TopBar, { ParentComponent } from "@/app/components/topBar";
import { ClubSeasonWithClub } from "@/server/clubSeason";

const SeasonLeaderboard = async ({
  params,
}: {
  params: { seasonId: string };
}) => {
  // const clubs = await getClubSeasonsByLeagueSeasonId("");
  const clubSeasons: ClubSeasonWithClub[] = [
    {
      club: { id: "abc1", logoURL: "TBD", name: "Chelsea", countryCode: "ENG" },
      id: "TBD",
      leagueSeasonId: "TBD",
      clubId: "abc1",
      gamesPlayedCount: 35,
      gamesWonCount: 27,
      gamesDrawnCount: 4,
      gamesLostCount: 4,
      goalsScoredCount: 92,
      goalsReceivedCount: 31,
      order: 1,
      points:85,
    },
    {
      club: { id: "abc2", logoURL: "TBD", name: "Arsenal", countryCode: "EN" },
      id: "TBD",
      leagueSeasonId: "TBD",
      clubId: "abc2",
      gamesPlayedCount: 36,
      gamesWonCount: 25,
      gamesDrawnCount: 6,
      gamesLostCount: 5,
      goalsScoredCount: 83,
      goalsReceivedCount: 42,
      order: 2,
      points:81,
    },
  ];

  return (
    <div className="w-full flex flex-col">
      <TopBar
        parentComponent={ParentComponent.Leaderboard}
        seasonId={params.seasonId}
      />
      <div className="overflow-x-auto shadow-md sm:rounded-lg mx-auto w-3/4 my-9 max-h-96">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-white uppercase bg-primary-color sticky top-0 h-9">
            <tr className="">
              <HeaderCell content="Position" />
              <HeaderCell content="Club" />
              <HeaderCell content="Played" />
              <HeaderCell content="Won" />
              <HeaderCell content="Drawn" />
              <HeaderCell content="Lost" />
              <HeaderCell content="GF" />
              <HeaderCell content="GA" />
              <HeaderCell content="GD" />
              <HeaderCell content="Points" />
            </tr>
          </thead>
          <tbody className="text-black">
            {clubSeasons.map((clubSeason, index) => (
              <LeaderboardRow
                key={index + 1}
                clubSeason={clubSeason}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const HeaderCell = ({ content } : { content : string}) => {
  return (
    <th className="px-6 text-center">{content}</th>
  );
};

export default SeasonLeaderboard;

import LabeledField from "@/app/components/LabledField";
import PlayerSaeasonSelect from "@/app/components/PlayerSeasonSelect";
import ReturnButton from "@/app/components/ReturnButton";
import { getPlayerById } from "@/server/player";
import { calculateAge, formatDate } from "@/utils/date";
import { LeagueSeason } from "@prisma/client";

const PlayerDetail = async ({
  params,
  searchParams,
}: {
  params: { playerId: string };
  searchParams: { playerId: string; seasonId?: string };
}) => {
  const player = await getPlayerById(params.playerId);

  // Use last season if not provided
  if (searchParams.seasonId === undefined) {
    searchParams.seasonId = player.playerSeasons[0].clubSeason.leagueSeason.id;
  }

  const currentClubSeason = player.playerSeasons.filter(
    (playerSeason) =>
      playerSeason.clubSeason.leagueSeason.id == searchParams.seasonId,
  )[0];

  const playerLeagueSeasons: LeagueSeason[] = player.playerSeasons.map(
    (playerSeason) => playerSeason.clubSeason.leagueSeason,
  );

  return (
    <div className="m-auto flex w-full flex-col md:w-[48rem] xl:w-2/3">
      <div className="m-1 md:m-4">
        <ReturnButton />
      </div>
      <div className="flex flex-col justify-between py-1 md:flex-row md:py-12">
        <div className="flex flex-row items-center space-x-2 md:space-x-8">
          <img
            className="p4 max-h-48 rounded-lg border-[10px] border-primary-color bg-white"
            src={player.pictureURL}
            alt="|Player|"
          />
          <div className="flex flex-col space-y-1">
            <div className="flex flex-col">
              <div className="text-sm">Club</div>
              <div className="text-2xl font-semibold">
                {player.firstName} {player.lastName}
              </div>
            </div>
            <LabeledField
              label="Date of birth"
              content={formatDate(player.dateOfBirth)}
            />
            <LabeledField
              label="Age"
              content={calculateAge(player.dateOfBirth).toString()}
            />
            <LabeledField label="Position" content={player.position} />
          </div>
        </div>
        {/* <div className="flex flex-col space-y-4">
          <div>
            <span className="ml-6 md:m-0">Season</span>
            <PlayerSaeasonSelect
              playerId={player.id}
              seasonId={searchParams.seasonId}
              seasons={playerLeagueSeasons}
            />
          </div>
          <div>
            <div className="ml-6 md:m-0">Goals</div>
            <div className="m-auto mb-2 text-center">
              {currentClubSeason !== undefined
                ? currentClubSeason.goalCount
                : "-"}
            </div>
          </div>
        </div> */}
      </div>
      <div className="m-auto flex flex-col space-y-3 px-4 pb-4 md:mx-0 md:pb-12 ">
        <LabeledField label="Current club" content={player.currentClub.name} />
        <img className="w-24" src={player.currentClub.logoURL} alt="|Logo|" />
      </div>
    </div>
  );
};

export default PlayerDetail;

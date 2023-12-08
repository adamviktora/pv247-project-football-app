import LabeledField from "@/app/components/LabledField";
import PlayerSaeasonSelect from "@/app/components/PlayerSeasonSelect";
import ReturnButton from "@/app/components/ReturnButton";
import { getPlayerById } from "@/server/player";
import { calculateAge, formatDate } from "@/utils/date";
import { LeagueSeason } from "@prisma/client";

const PlayerDetail = async ({
  params,
}: {
  params: { playerId: string; seasonId?: string };
}) => {
  const player = await getPlayerById(params.playerId);

  // Use last season if not provided (pop works because seasons are ordered in requests by year)
  if (params.seasonId === undefined) {
    params.seasonId = player.playerSeasons.pop()?.clubSeason.leagueSeason.id;
  }

  const currentClubSeason = player.playerSeasons.filter(
    (playerSeason) =>
      playerSeason.clubSeason.leagueSeason.id == params.seasonId,
  )[0];

  const playerLeagueSeasons: LeagueSeason[] = player.playerSeasons.map(
    (playerSeason) => playerSeason.clubSeason.leagueSeason,
  );

  return (
    <div className=" flex flex-col">
      <div className="m-4">
        <ReturnButton />
      </div>
      <div className=" flex flex-row items-center justify-between px-48 py-12">
        <div className="flex flex-row items-center space-x-8">
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
        <div className="flex flex-col">
          <div>
            <div>
              Season:{" "}
              <PlayerSaeasonSelect
                playerId={player.id}
                seasonId={params.playerId}
                seasons={playerLeagueSeasons}
              />
            </div>
          </div>
          <div>
            Goals:{" "}
            {currentClubSeason !== undefined
              ? currentClubSeason.goalCount
              : "-"}{" "}
          </div>
        </div>
      </div>
      <div className="mx-48 mb-12 flex flex-col space-y-3 px-4">
        <LabeledField label="Current club" content={player.currentClub.name} />
        <img className="w-24" src={player.currentClub.logoURL} alt="|Logo|" />
      </div>
    </div>
  );
};

export default PlayerDetail;

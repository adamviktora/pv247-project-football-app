"use client";

import { Club } from "@prisma/client";
import { useQueryState } from "next-usequerystate";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import LinkButton from "./LinkButton";
import Select from "./Select";

type MainMenuProps = {
  leagueOptions: ReactNode;
  seasonOptions: ReactNode;
  clubOptions: ReactNode;
  clubs: Club[];
  leagueId?: string;
  seasonId?: string;
  clubId?: string;
};

const MainMenu = ({
  leagueOptions,
  seasonOptions,
  clubOptions,
  clubs,
  leagueId,
  seasonId,
  clubId,
}: MainMenuProps) => {
  const router = useRouter();
  const [leagueIdQueryParam, setLeagueIdQueryParam] = useQueryState("leagueId");
  const [seasonIdQueryParam, setSeasonIdQueryParam] = useQueryState("seasonId");
  const [clubIdQueryParam, setClubIdQueryParam] = useQueryState("clubId");

  const selectedLeagueId = leagueIdQueryParam ?? leagueId;
  const selectedSeasonId = seasonIdQueryParam ?? seasonId;
  const selectedClubId = clubIdQueryParam ?? clubId;

  const selectedClub = clubs?.find((club) => club.id === selectedClubId);

  return (
    <>
      <Select
        label="League"
        selectedValue={selectedLeagueId}
        onChange={(e) => {
          setLeagueIdQueryParam(e.target.value);
          setSeasonIdQueryParam(null);
          setClubIdQueryParam(null);
          router.replace(`?leagueId=${e.target.value}`);
        }}
      >
        {leagueOptions}
      </Select>

      {selectedSeasonId ? (
        <Select
          label="Season"
          selectedValue={selectedSeasonId}
          onChange={(e) => {
            setSeasonIdQueryParam(e.target.value);
            setClubIdQueryParam(null);
            router.replace(
              `?leagueId=${selectedLeagueId}&seasonId=${e.target.value}`,
            );
          }}
          disabled={!selectedSeasonId}
        >
          {seasonOptions}
        </Select>
      ) : (
        <div className="text-gray-500">No seasons yet.</div>
      )}

      {clubs.length ? (
        <>
          <LinkButton
            href={`/leaderboard?leagueId=${selectedLeagueId}&seasonId=${selectedSeasonId}`}
          >
            Show leaderboard
          </LinkButton>
          <LinkButton
            href={`/games?leagueId=${selectedLeagueId}&seasonId=${selectedSeasonId}&clubId=${selectedClubId}`}
          >
            Show games{selectedClub && ` of ${selectedClub.name}`}
          </LinkButton>
          <div>
            <Select
              label="Club"
              selectedValue={selectedClubId}
              onChange={(e) => {
                setClubIdQueryParam(e.target.value);
              }}
              disabled={!selectedClubId}
            >
              {clubOptions}
            </Select>
          </div>
          <LinkButton
            href={`/club?leagueId=${selectedLeagueId}&seasonId=${selectedSeasonId}&clubId=${selectedClubId}`}
          >
            Show club details
          </LinkButton>
        </>
      ) : (
        selectedSeasonId && <div className="text-gray-500">No clubs yet.</div>
      )}
    </>
  );
};

export default MainMenu;

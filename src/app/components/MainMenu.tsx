"use client";

import { useQueryState } from "next-usequerystate";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import Label from "./Label";
import LinkButton from "./LinkButton";
import Select from "./Select";

type MainMenuProps = {
  leagueOptions: ReactNode;
  seasonOptions: ReactNode;
  clubOptions: ReactNode;
  leagueId?: string;
  seasonId?: string;
  clubId?: string;
};

const MainMenu = ({
  leagueOptions,
  seasonOptions,
  clubOptions,
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

  return (
    <>
      <div>
        <Label htmlFor="leagueSelect">League</Label>
        <Select
          id="leagueSelect"
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
        <Label htmlFor="seasonSelect">Season</Label>
        <Select
          id="seasonSelect"
          selectedValue={selectedSeasonId}
          onChange={(e) => {
            setSeasonIdQueryParam(e.target.value);
            setClubIdQueryParam(null);
            router.replace(
              `?leagueId=${selectedLeagueId}&seasonId=${e.target.value}`,
            );
          }}
        >
          {seasonOptions}
        </Select>
      </div>
      <LinkButton
        href={`/leaderboard?leagueId=${selectedLeagueId}&seasonId=${selectedSeasonId}`}
      >
        Show leaderboard
      </LinkButton>
      <LinkButton
        href={`/games?leagueId=${selectedLeagueId}&seasonId=${selectedSeasonId}&clubId=${selectedClubId}`}
      >
        Show games
      </LinkButton>
      <div>
        <Label htmlFor="clubSelect">Club</Label>
        <Select
          id="clubSelect"
          selectedValue={selectedClubId}
          onChange={(e) => {
            setClubIdQueryParam(e.target.value);
          }}
        >
          {clubOptions}
        </Select>
      </div>
      <LinkButton href={`/club/${selectedClubId}`}>
        Show club details
      </LinkButton>
    </>
  );
};

export default MainMenu;

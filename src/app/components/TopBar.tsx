"use client";

import { useQueryState } from "next-usequerystate";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";
import { useMediaQuery } from "usehooks-ts";
import ReturnButton from "./ReturnButton";
import Select from "./Select";

type TopBarProps = {
  leagueId?: string;
  seasonId?: string;
  clubId?: string;
  seasonOptions?: ReactNode;
  clubOptions?: ReactNode;
};

const TopBar = ({
  seasonId,
  leagueId,
  clubId,
  seasonOptions,
  clubOptions,
}: TopBarProps) => {
  const isMobile = !useMediaQuery("(min-width: 768px)");

  const router = useRouter();
  const pathname = usePathname();

  const [seasonIdQueryParam, setSeasonIdQueryParam] = useQueryState("seasonId");
  const [clubIdQueryParam, setClubIdQueryParam] = useQueryState("clubId");

  const selectedSeasonId = seasonIdQueryParam ?? seasonId;
  const selectedClubId = clubIdQueryParam ?? clubId;

  const leagueAndSeason = `leagueId=${leagueId}&seasonId=${selectedSeasonId}`;

  return (
    <div className="flex w-full items-center justify-between bg-secondary-color px-12 py-2">
      <div className="flex w-72">
        <ReturnButton />
        <Select
          selectedValue={selectedSeasonId}
          onChange={(e) => {
            setSeasonIdQueryParam(e.target.value);
            setClubIdQueryParam(null);
            router.replace(
              `${pathname}?leagueId=${leagueId}&seasonId=${e.target.value}&clubId=all`,
            );
          }}
        >
          {seasonOptions}
        </Select>
      </div>
      {pathname !== "/club" && !isMobile && (
        <div className="flex space-x-4">
          <Link
            className={`py-1 ${
              pathname === "/leaderboard" ? "underline" : ""
            } hover:underline `}
            href={`/leaderboard?${leagueAndSeason}`}
          >
            Leaderboard
          </Link>
          <Link
            className={`py-1 ${
              pathname === "/games" ? "underline" : ""
            } hover:underline `}
            href={
              `/games?${leagueAndSeason}` +
              (selectedClubId ? `&clubId=${selectedClubId}` : "")
            }
          >
            Games
          </Link>
        </div>
      )}
      <div className="w-72">
        {pathname !== "/leaderboard" && (
          <Select
            selectedValue={selectedClubId}
            onChange={(e) => {
              setClubIdQueryParam(e.target.value);
              router.replace(
                `${pathname}?${leagueAndSeason}&clubId=${e.target.value}`,
              );
            }}
          >
            {clubOptions}
          </Select>
        )}
      </div>
    </div>
  );
};

export default TopBar;

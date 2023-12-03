"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";
import Select from "./Select";
import ReturnButton from "./returnButton";

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
  const router = useRouter();
  const pathname = usePathname();

  const leaugeAndSeason = `leagueId=${leagueId}&seasonId=${seasonId}`;

  return (
    <div className="w-full bg-secondary-color h-12 flex flex-row justify-between px-12 items-center">
      <div className="w-72 flex flex-row ">
        <ReturnButton />
        {pathname !== "/club" && (
          <Select
            selectedValue={seasonId}
            onChange={(e) => {
              router.replace(
                `${pathname}?leagueId=${leagueId}&seasonId=${e.target.value}`,
              );
            }}
          >
            {seasonOptions}
          </Select>
        )}
      </div>
      {pathname !== "/club" && (
        <div className="flex flex-row space-x-4">
          <Link
            className={`my-auto  py-1 text-primary-color ${
              pathname === "/leaderboard" ? "underline" : ""
            } hover:underline `}
            href={`/leaderboard?${leaugeAndSeason}`}
          >
            Leaderboard
          </Link>
          <Link
            className={`my-auto py-1 text-primary-color ${
              pathname === "/games" ? "underline" : ""
            } hover:underline `}
            href={
              `/games?${leaugeAndSeason}` + (clubId ? `&clubId=${clubId}` : "")
            }
          >
            Games
          </Link>
        </div>
      )}
      <div className="w-72">
        {pathname !== "/leaderboard" && (
          <Select
            selectedValue={clubId}
            onChange={(e) => {
              router.replace(
                `${pathname}?${leaugeAndSeason}&clubId=${e.target.value}`,
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

"use client";

import { GameWithClubs } from "@/server/game";
import { formatDate } from "@/utils/date";
import { Club } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const ClubRow = ({
  club,
  seasonId,
  leagueId,
}: {
  club: Club;
  seasonId: string;
  leagueId: string;
}) => {
  const router = useRouter();

  const openClub = () => {
    router.push(
      `/club?leagueId=${leagueId}&seasonId=${seasonId}&clubId=${club.id}`,
    );
  };

  return (
    <tr
      className="h-16 border-b odd:bg-white even:bg-gray-200 hover:bg-gray-400"
      onClick={openClub}
    >
      <td className="whitespace-nowrap px-9 py-3 text-left font-semibold">
        <img className="max-h-16" src={club.logoURL} alt="|Logo|" />
      </td>
      <td className="whitespace-nowrap px-9 py-3 text-right text-xl font-semibold">
        {club.name}
      </td>
    </tr>
  );
};

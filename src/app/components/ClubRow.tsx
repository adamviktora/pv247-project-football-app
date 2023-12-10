"use client";

import { Club } from "@prisma/client";
import { useRouter } from "next/navigation";

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
      className="h-16 border-b odd:bg-white even:bg-gray-200 hover:cursor-pointer hover:bg-gray-300"
      onClick={openClub}
    >
      <td className="w-24 whitespace-nowrap py-3 pl-4 text-left font-semibold md:pl-9">
        <img className="h-16 m-auto " src={club.logoURL} alt="|Logo|" />
      </td>
      <td className="whitespace-nowrap  py-3 pr-4 text-right text-xl font-semibold md:px-9">
        {club.name}
      </td>
    </tr>
  );
};

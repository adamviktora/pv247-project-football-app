"use client";

import { ClubSeasonWithClub } from "@/server/clubSeason";
import { useRouter } from "next/navigation";

export const LeaderboardRow = ({
  clubSeason,
  leagueId,
  seasonId,
}: {
  clubSeason: ClubSeasonWithClub;
  leagueId: string;
  seasonId: string;
}) => {
  const router = useRouter();

  const openClub = () => {
    router.push(
      `/club?leagueId=${leagueId}&seasonId=${seasonId}&clubId=${clubSeason.clubId}`,
    );
  };

  const goalsBalance =
    clubSeason.goalsScoredCount - clubSeason.goalsReceivedCount;

  return (
    <tr className="h-8 border-b  odd:bg-white  even:bg-gray-200 hover:bg-gray-300 ">
      <th className="text-md whitespace-nowrap px-1 text-center font-medium md:px-2 xl:px-6">
        {clubSeason.order}
      </th>
      <td className="px-1 md:px-2 xl:px-6">
        <span
          className="hover:cursor-pointer hover:underline"
          onClick={openClub}
        >
          {clubSeason.club.name}
        </span>
      </td>
      <TableCell content={clubSeason.gamesPlayedCount} />
      <TableCell content={clubSeason.gamesWonCount} />
      <TableCell content={clubSeason.gamesDrawnCount} />
      <TableCell content={clubSeason.gamesLostCount} />
      <TableCell content={clubSeason.goalsScoredCount} />
      <TableCell content={clubSeason.goalsReceivedCount} />
      <TableCell content={goalsBalance} />
      <TableCell content={clubSeason.points} />
    </tr>
  );
};

const TableCell = ({ content }: { content: any }) => {
  return <td className="px-1 text-center md:px-2 xl:px-6 ">{content}</td>;
};

import { ClubSeasonWithClub } from "@/server/clubSeason";

export const LeaderboardRow = ({
  order,
  clubSeason,
}: {
  order: number;
  clubSeason: ClubSeasonWithClub;
}) => {
  const goalsBalance =
    clubSeason.goalsScoredCount - clubSeason.goalsReceivedCount;
  const score = clubSeason.gamesWonCount * 3 + clubSeason.gamesDrawnCount;

  return (
    <tr className="odd:bg-white even:bg-gray-200 border-b h-8">
      <th className="px-6 text-center font-medium  whitespace-nowrap text-md">
        {order}
      </th>
      <td className="px-6">{clubSeason.club.name}</td>
      <TableCell content={clubSeason.gamesPlayedCount} />
      <TableCell content={clubSeason.gamesWonCount} />
      <TableCell content={clubSeason.gamesDrawnCount} />
      <TableCell content={clubSeason.gamesLostCount} />
      <TableCell content={clubSeason.goalsScoredCount} />
      <TableCell content={clubSeason.goalsReceivedCount} />
      <TableCell content={goalsBalance} />
      <TableCell content={score} />
    </tr>
  );
};

const TableCell = ({ content }: { content: any }) => {
  return <td className="px-6 text-center">{content}</td>;
};

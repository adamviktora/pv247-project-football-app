import HeaderCell from "./HeaderCell";
import { getClubSeasonsByClub } from "@/server/clubSeason";

const TeamSeasons = async ({ clubId }: { clubId: string }) => {
  const clubSeasons = await getClubSeasonsByClub(clubId);

  return (
    <div className="max-h-96 w-64 overflow-x-auto shadow-md sm:rounded-lg ">
      <table className="w-full text-left text-xs text-gray-500 md:text-sm ">
        <thead className="sticky h-9 bg-primary-color text-xs uppercase text-white">
          <tr className="">
            <HeaderCell text="Season" />
            <HeaderCell text="Position" />
          </tr>
        </thead>
        <tbody className="text-black">
          {clubSeasons.map((clubSeason, index) => (
            <tr key={clubSeason.id} className="odd:bg-white even:bg-gray-200">
              <td className="px-1 text-center md:px-2 xl:px-6">
                {clubSeason.leagueSeason.year} /{" "}
                {clubSeason.leagueSeason.year + 1}
              </td>
              <td className="px-1 text-center md:px-2 xl:px-6">
                {clubSeason.order}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="h-3 bg-primary-color text-xs uppercase text-white">
          <tr>
            <td></td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default TeamSeasons;

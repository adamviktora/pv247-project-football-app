import HeaderCell from "./HeaderCell";
import { getClubSeasonsByClub } from "@/server/clubSeason";

const TeamSeasons = async ({ clubId }: { clubId: string }) => {
  const clubSeasons = await getClubSeasonsByClub(clubId);

  return (
    <div className="my-4 max-h-36 w-72 overflow-x-auto rounded-lg shadow-md ">
      <table className="w-full text-left  text-sm text-gray-500 ">
        <thead className="sticky top-0 h-9 bg-primary-color text-xs uppercase text-white">
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
        <tfoot className="sticky bottom-0 h-3 bg-primary-color text-xs uppercase text-white">
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

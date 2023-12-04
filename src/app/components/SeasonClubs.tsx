import Link from "next/link";
import { PropsWithChildren } from "react";
import { getClubsByLeagueSeasonId } from "@/server/club";
import { ClubRow } from "./clubRow";



const SeasonClubs = async ({
  seasonId,
  leagueId
  }: {
    seasonId: string,
    leagueId: string,  
  }) => {
    const clubs = await getClubsByLeagueSeasonId(seasonId);

    return (<div className="mx-auto mb-9 max-h-96 w-2/5 overflow-x-auto shadow-md sm:rounded-lg mt-10">
      
        {
          clubs.length === 0 ? 
            <div className="m-auto text-center font-semibold text-4xl p-16">No teams found.</div>
            :
            <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400 ">
          <tbody className="text-black">
            {clubs.map((club, index) => (
              <ClubRow key={1 + index} club={club} seasonId={seasonId} leagueId={leagueId}/>
            ))}
          </tbody>
        </table>
        }
        </div>
      );
}

export default SeasonClubs;


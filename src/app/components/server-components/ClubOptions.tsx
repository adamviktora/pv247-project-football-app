import { getClubsByLeagueSeasonId } from "@/server/club";

const ClubOptions = async ({
  searchParams,
}: {
  searchParams: { seasonId: string };
}) =>
  (await getClubsByLeagueSeasonId(searchParams.seasonId)).map((club) => (
    <option key={club.id} value={club.id}>
      {club.name}
    </option>
  ));

export default ClubOptions;

import { addClub, getClubs, getClubsByLeagueSeasonId } from "@/server/club";
import { ClubCreation } from "@/types/creationTypes";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const leagueSeasonId = req.nextUrl.searchParams.get("leagueSeasonId");

  const clubs =
    leagueSeasonId === null
      ? await getClubs()
      : await getClubsByLeagueSeasonId(leagueSeasonId);

  return Response.json(clubs);
}

export async function POST(req: NextRequest) {
  const club = (await req.json()) as ClubCreation;

  const newClub = await addClub(club);

  return Response.json(newClub);
}

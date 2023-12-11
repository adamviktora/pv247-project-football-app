import { getServerAuthSession } from "@/server/auth";
import {
  addClubSeason,
  getClubSeasonsByLeagueSeasonId,
} from "@/server/clubSeason";
import { ClubSeasonCreation } from "@/types/creationTypes";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const leagueSeasonId = req.nextUrl.searchParams.get("leagueSeasonId");

  if (leagueSeasonId === null) {
    return Response.json(
      { error: "You must specify leagueSeasonId query param." },
      { status: 400 },
    );
  }

  const clubSeasons = await getClubSeasonsByLeagueSeasonId(leagueSeasonId);

  return Response.json(clubSeasons);
}

export async function POST(req: NextRequest) {
  const status = await getServerAuthSession();
  if (!status) {
    return new Response(null, {
      status: 401,
      statusText: "Unauthorized",
    });
  }

  const clubSeason = (await req.json()) as ClubSeasonCreation;

  const newClubSeason = await addClubSeason(clubSeason);

  return Response.json(newClubSeason);
}

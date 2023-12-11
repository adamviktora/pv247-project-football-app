import { getServerAuthSession } from "@/server/auth";
import {
  addLeagueSeason,
  getLeagueSeasonsByLeagueId,
} from "@/server/leagueSeason";
import { LeagueSeasonCreation } from "@/types/creationTypes";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const leagueId = req.nextUrl.searchParams.get("leagueId");

  if (leagueId === null) {
    return Response.json(
      { error: "You must specify leagueId query param." },
      { status: 400 },
    );
  }

  const leagueSeasons = await getLeagueSeasonsByLeagueId(leagueId);

  return Response.json(leagueSeasons);
}

export async function POST(req: NextRequest) {
  const status = await getServerAuthSession();
  if (!status) {
    return new Response(null, {
      status: 401,
      statusText: "Unauthorized",
    });
  }

  const leagueSeason = (await req.json()) as LeagueSeasonCreation;

  const newLeagueSeason = await addLeagueSeason(leagueSeason);

  return Response.json(newLeagueSeason);
}

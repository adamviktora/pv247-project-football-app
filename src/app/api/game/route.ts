import {
  addGame,
  addGameWithGoals,
  getGamesByLeagueSeasonId,
} from "@/server/game";
import { GameCreation, GameWithGoalsCreation } from "@/types/creationTypes";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const leagueSeasonId = searchParams.get("leagueSeasonId");
  const clubId = searchParams.get("clubId");

  if (leagueSeasonId === null) {
    return Response.json(
      { error: "You must specify leagueSeasonId query param." },
      { status: 400 },
    );
  }

  const games = await getGamesByLeagueSeasonId(
    leagueSeasonId,
    clubId ?? undefined,
  );

  return Response.json(games);
}

export async function POST(req: NextRequest) {
  const game = (await req.json()) as GameCreation | GameWithGoalsCreation;

  const newGame =
    "goals" in game ? await addGameWithGoals(game) : await addGame(game);

  return Response.json(newGame);
}

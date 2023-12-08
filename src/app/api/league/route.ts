import { addLeague, getLeagues } from "@/server/league";
import { LeagueCreation } from "@/types/creationTypes";
import { NextRequest } from "next/server";

export async function GET() {
  const leagues = await getLeagues();
  return Response.json(leagues);
}

export async function POST(req: NextRequest) {
  const league = (await req.json()) as LeagueCreation;

  const newLeague = await addLeague(league);

  return Response.json(newLeague);
}

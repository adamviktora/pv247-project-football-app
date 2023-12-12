import { getServerAuthSession } from "@/server/auth";
import { addLeague, getLeagues } from "@/server/league";
import { LeagueCreation } from "@/types/creationTypes";
import { NextRequest } from "next/server";

export async function GET() {
  const leagues = await getLeagues();
  return Response.json(leagues);
}

export async function POST(req: NextRequest) {
  const status = await getServerAuthSession();
  if (!status) {
    return new Response(null, {
      status: 401,
      statusText: "Unauthorized",
    });
  }

  const league = (await req.json()) as LeagueCreation;

  const newLeague = await addLeague(league);

  return Response.json(newLeague);
}

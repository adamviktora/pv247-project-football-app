import { getServerAuthSession } from "@/server/auth";
import { addPlayer } from "@/server/player";
import { PlayerCreation } from "@/types/creationTypes";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const status = await getServerAuthSession();
  if (!status) {
    return new Response(null, {
      status: 401,
      statusText: "Unauthorized",
    });
  }

  const player = (await req.json()) as PlayerCreation;

  const newPlayer = await addPlayer(player);

  return Response.json(newPlayer);
}

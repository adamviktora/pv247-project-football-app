import { addPlayer } from "@/server/player";
import { PlayerCreation } from "@/types/creationTypes";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const player = (await req.json()) as PlayerCreation;

  const newPlayer = addPlayer(player);

  return Response.json(newPlayer);
}

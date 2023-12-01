import { ClubCreation } from "@/types/creationTypes";
import { Club, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const clubs: Club[] = await prisma.club.findMany();
  return clubs;
}

export async function POST(request: Request) {
  const clubCreation = (await request.json()) as ClubCreation;

  const newClub = await prisma.club.create({
    data: clubCreation,
  });

  return Response.json(newClub);
}

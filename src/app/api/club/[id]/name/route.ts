import { getClubNameById } from "@/server/club";

export async function GET({ params }: { params: { id: string } }) {
  const clubName = await getClubNameById(params.id);

  return Response.json(clubName);
}

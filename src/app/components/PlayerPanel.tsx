"use client";

import { Player } from "@prisma/client";
import { useRouter } from "next/navigation";

export const PlayerPanel = ({
  player,
  seasonId,
}: {
  player: Player;
  seasonId?: string;
}) => {
  const router = useRouter();

  const openPlayer = () => {
    if (seasonId === undefined) {
      router.push(`/player/${player.id}`);
    } else {
      router.push(`/player/${player.id}?seasonId=${seasonId}`);
    }
  };

  return (
    <div className="m-4 flex flex-col" onClick={openPlayer}>
      <div className="rounded-t-2xl bg-primary-color pb-3 pt-3 text-center text-3xl font-bold text-white">
        {player.dressNumber}
      </div>
      {/* TODO: Find ideal width suitable for longer names */}
      <div className="bg-secondary-color px-2 pt-0.5 text-center text-sm font-semibold text-primary-color">
        {player.firstName}{" "}
      </div>
      <div className="rounded-b-2xl bg-secondary-color px-2 pb-1 text-center text-sm font-semibold text-primary-color">
        {player.lastName}{" "}
      </div>
    </div>
  );
};

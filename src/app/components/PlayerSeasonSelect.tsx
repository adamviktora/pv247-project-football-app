"use client";

import { PropsWithChildren } from "react";
import Select from "./Select";
import { useRouter } from "next/navigation";
import { LeagueSeason } from "@prisma/client";
import SeasonOptions from "./server-components/SeasonOptions";

const PlayerSaeasonSelect = ({
  playerId,
  seasonId,
  seasons,
}: {
  playerId: string;
  seasonId: string;
  seasons: LeagueSeason[];
}) => {
  const router = useRouter();

  return (
    <Select
      isInline
      selectedValue={seasonId}
      onChange={(e) => {
        router.replace(`/player/${playerId}?seasonId=${seasonId}`);
      }}
    >
      <SeasonOptions seasons={seasons} />
    </Select>
  );
};
export default PlayerSaeasonSelect;

"use client";

import { LeagueSeason } from "@prisma/client";
import { useRouter } from "next/navigation";
import Select from "./Select";
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
    <>
      <Select
        selectedValue={seasonId}
        onChange={(e) => {
          router.replace(`/player/${playerId}?seasonId=${e.target.value}`);
        }}
      >
        {seasons.length == 0 ? (
          <option value="">No seasons</option>
        ) : (
          <SeasonOptions seasons={seasons} />
        )}
      </Select>
    </>
  );
};
export default PlayerSaeasonSelect;

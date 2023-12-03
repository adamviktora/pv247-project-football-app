import { LeagueSeason } from "@prisma/client";

type SeasonOptionsProps = {
  seasons: LeagueSeason[];
};

const SeasonOptions = ({ seasons }: SeasonOptionsProps) =>
  seasons.map((season) => (
    <option key={season.id} value={season.id}>
      {season.year}/{(season.year + 1) % 100}
    </option>
  ));

export default SeasonOptions;

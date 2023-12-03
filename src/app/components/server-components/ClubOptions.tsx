import { Club } from "@prisma/client";

type ClubOptionsProps = {
  clubs: Club[];
};

const ClubOptions = ({ clubs }: ClubOptionsProps) => [
  <option key={0} value={"all"}>
    All clubs
  </option>,
  ...clubs.map((club) => (
    <option key={club.id} value={club.id}>
      {club.name}
    </option>
  )),
];

export default ClubOptions;

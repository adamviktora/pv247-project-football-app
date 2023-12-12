import { Club } from "@prisma/client";

type ClubOptionsProps = {
  clubs: Club[];
  withoutAllClubsOption?: boolean;
};

const ClubOptions = ({ clubs, withoutAllClubsOption }: ClubOptionsProps) => {
  const options = withoutAllClubsOption
    ? []
    : [
        <option key={0} value={"all"}>
          All clubs
        </option>,
      ];

  return [
    ...options,
    ...clubs.map((club) => (
      <option key={club.id} value={club.id}>
        {club.name}
      </option>
    )),
  ];
};

export default ClubOptions;

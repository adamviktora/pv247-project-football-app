import { Club } from "@prisma/client";
import Link from "next/link";

type ClubCardProps = {
  club: Club;
  isHome?: boolean;
};

const ClubCard = ({ club, isHome }: ClubCardProps) => (
  <Link
    href={`/club/${club.id}`}
    className={`flex ${
      isHome ? "flex-row-reverse" : ""
    } w-1/3 items-center gap-4 px-4 py-2 hover:cursor-pointer hover:rounded-lg hover:bg-gray-200`}
  >
    <img className="max-h-14" src={club.logoURL} alt="|Logo|" />
    <div className="sm:text-lg">{club.name}</div>
  </Link>
);

export default ClubCard;

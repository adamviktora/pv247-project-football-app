import { getClubs } from "@/server/club";

export default async function AllClubsPage() {
  const clubs = await getClubs();

  return (
    <>
      <h1>Number of clubs: {clubs.length}</h1>
      <ul>
        {clubs.map((club) => (
          <li key={club.id}>
            <span>{club.name}</span>
            <img
              src={club.logoURL}
              alt={club.name + " logo"}
              style={{ maxWidth: 100, maxHeight: 100 }}
            />
          </li>
        ))}
      </ul>
    </>
  );
}

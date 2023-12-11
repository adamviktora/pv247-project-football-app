import Link from "next/link";

const AdminPage = () => {
  return (
    <div className="flex justify-center">
      <div className="m-6 flex w-48 flex-col gap-4">
        <Link className="btn btn-primary text-white" href="/admin/league/add">
          Add league
        </Link>
        <Link className="btn btn-primary text-white" href="/admin/season/add">
          Add season
        </Link>
        <Link className="btn btn-primary text-white" href="/admin/club/add">
          Add club
        </Link>
        <Link className="btn btn-primary text-white" href="/admin/player/add">
          Add player
        </Link>
        <Link className="btn btn-primary text-white" href="/admin/game/add">
          Add game
        </Link>
      </div>
    </div>
  );
};

export default AdminPage;

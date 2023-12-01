"use client";

import TopBar, { ParentComponent } from "@/app/components/topBar";

const SeasonLeaderboard = ({ params }: { params: { seasonId: string } }) => {
  // TODO: Fetch season leaderboard data

  return (
    <div className="w-full bg-slate-200 flex flex-col">
      <TopBar
        parentComponent={ParentComponent.Leaderboard}
        seasonId={params.seasonId}
      />
      <div className="w-full bg-slate-300 h-full">TBD: Leaderboard</div>
    </div>
  );
};

export default SeasonLeaderboard;

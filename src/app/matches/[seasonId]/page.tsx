"use client";

import TopBar from "@/app/components/topBar";

const SeasonMatches = ({ params }: { params: { seasonId: string } }) => {
  // TODO: Fetch season leaderboard data

  return (
    <div className="w-full bg-slate-200 flex flex-col">
      <TopBar isLeaderboard={false} seasonId={params.seasonId}/>
      <div className="w-full bg-slate-300 h-full">TBD: Matches</div>
    </div>
  );
};

export default SeasonMatches;

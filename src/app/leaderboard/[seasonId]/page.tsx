"use client";

import Link from "next/link";

// import { TodoItem } from '@/components/TodoItem';

const SeasonLeaderboard = ({ params }: { params: { seasonId: string } }) => {
  // TODO: Fetch season data

  return (
    <div className="w-full bg-slate-200 flex flex-col">
      <div className="w-full bg-secondary-color h-12 flex flex-row justify-between px-12 items-center">
        <div className="w-32">
		<svg className="w-6 h-6 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
  </svg>
  
        </div>

        <div className="flex flex-row space-x-4">
          <span className="underline">Leaderboard</span>
          <span>Back</span>
        </div>
        <div className="w-32">
          <span>Verylongxdexdxd</span>
        </div>
      </div>
      <span>Data of season: {params.seasonId}</span>
      <div className="w-full bg-slate-300">a</div>
    </div>
  );
};

export default SeasonLeaderboard;

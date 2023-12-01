import ReturnButton from "@/app/components/returnButton";

const MatchDetail = ({ params }: { params: { matchId: string } }) => {
  // TODO: Fetch match data

  return (
    <div className="w-full bg-slate-200 flex flex-col">
      <ReturnButton />
      <div className="w-full bg-slate-300 h-full">
        TBD: Match with id {params.matchId}
      </div>
    </div>
  );
};

export default MatchDetail;

import ReturnButton from "@/app/components/returnButton";

const PlayerDetail = ({ params }: { params: { playerId: string } }) => {
  // TODO: Fetch player

  return (
    <div className="w-full bg-slate-200 flex flex-col">
      <ReturnButton />
      <div className="w-full bg-slate-300 h-full">
        TBD: Player with id {params.playerId}
      </div>
    </div>
  );
};

export default PlayerDetail;

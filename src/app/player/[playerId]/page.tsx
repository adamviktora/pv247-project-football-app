import ReturnButton from "@/app/components/ReturnButton";

const PlayerDetail = ({ params }: { params: { playerId: string } }) => {
  // TODO: Fetch player

  return (
    <div className="flex w-full flex-col bg-slate-200">
      <ReturnButton standalone />
      <div className="h-full w-full bg-slate-300">
        TBD: Player with id {params.playerId}
      </div>
    </div>
  );
};

export default PlayerDetail;

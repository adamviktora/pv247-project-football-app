import ReturnButton from "@/app/components/returnButton";

const GameDetail = ({ params }: { params: { gameId: string } }) => {
  // TODO: Fetch game data

  return (
    <div className="w-full bg-slate-200 flex flex-col">
      <ReturnButton />
      <div className="w-full bg-slate-300 h-full">
        TBD: Game with id {params.gameId}
      </div>
    </div>
  );
};

export default GameDetail;

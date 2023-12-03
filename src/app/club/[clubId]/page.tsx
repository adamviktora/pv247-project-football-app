import TopBar from "@/app/components/topBar";

const ClubDetail = ({ params }: { params: { clubId: string } }) => {
  // TODO: Fetch team data

  return (
    <div className="w-full bg-slate-200 flex flex-col">
      <TopBar />
      <div className="w-full bg-slate-300 h-full">
        TBD: Team with id {params.clubId}
      </div>
    </div>
  );
};

export default ClubDetail;

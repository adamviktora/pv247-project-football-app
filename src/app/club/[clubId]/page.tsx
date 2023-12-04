import TopBar from "@/app/components/topBar";

const ClubDetail = ({ params }: { params: { clubId: string } }) => {
  // TODO: Fetch team data

  return (
    <div className="flex w-full flex-col bg-slate-200">
      <TopBar />
      <div className="h-full w-full bg-slate-300">
        TBD: Team with id {params.clubId}
      </div>
    </div>
  );
};

export default ClubDetail;

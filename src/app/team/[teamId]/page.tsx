import ReturnButton from "@/app/components/returnButton";
import TopBar, { ParentComponent } from "@/app/components/topBar";

const TeamDetail = ({ params }: { params: { teamId: string } }) => {
  // TODO: Fetch team data

  return (
    <div className="w-full bg-slate-200 flex flex-col">
      <TopBar parentComponent={ParentComponent.Team} />

      <div className="w-full bg-slate-300 h-full">
        TBD: Team with id {params.teamId}
      </div>
    </div>
  );
};

export default TeamDetail;

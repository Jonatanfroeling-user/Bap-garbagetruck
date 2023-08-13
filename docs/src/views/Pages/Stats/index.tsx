import PageLayout from "../../PageLayout";
import StatusItems from "./StatsItems";
import Notifications from "../../../components/notifications/Notifications";

const StatsPage = ({ pathIdx }: { pathIdx: number }) => {
  return (
    <PageLayout pathIndex={pathIdx}>
      <StatusItems />
      <Notifications />
    </PageLayout>
  );
};

export default StatsPage;

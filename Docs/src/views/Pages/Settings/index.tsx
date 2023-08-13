import { useMemo } from "react";

import PageLayout from "../../PageLayout";
import { ItemsList } from "../../../components/List";
import { Settings } from "../../../data/mocks/settings";
import useSelection from "../../../utils/hooks/useSelection";

const SettingsPage = ({ pathIdx }: { pathIdx: number }) => {
  const settingItems = useMemo(() => Settings(), []);

  const { selected, onSelect } = useSelection(settingItems);

  return (
    <PageLayout pathIndex={pathIdx}>
      <ItemsList items={settingItems} onSelect={onSelect} selected={selected} />
    </PageLayout>
  );
};

export default SettingsPage;

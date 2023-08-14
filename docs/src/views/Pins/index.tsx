import { useCallback, useMemo } from "react";

import useSelection from "../../utils/hooks/useSelection";
import { getColorsByType } from "../../utils/helpers";
import { pinsDataList } from "../../__mock_data/pins";

import PageLayout from "../PageLayout";
import { ItemsList } from "../../components/List";
import { ListItemType, PinItemType } from "../../types";
import { usePreview } from "../../utils/hooks/usePreview";

const PinsPage = ({ pathIdx }: { pathIdx: number }) => {
  const pins = useMemo<ListItemType[]>(
    () =>
      pinsDataList.map((pinItem): ListItemType => {
        const { background, outline } = getColorsByType(pinItem.type);
        return {
          onClick: () => pinItem,
          id: pinItem.id,
          background: background,
          outline: outline,
          img: pinItem.iconPath,
          text: pinItem.title,
        };
      }),
    []
  );

  const { selected, onSelect } = useSelection(pins);

  return (
    <PageLayout pathIndex={pathIdx}>
      <ItemsList items={pins} onSelect={onSelect} selected={selected} />
    </PageLayout>
  );
};

export default PinsPage;

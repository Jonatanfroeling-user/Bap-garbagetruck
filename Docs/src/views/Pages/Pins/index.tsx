import { useState, useCallback, useMemo } from "react";

import useSelection from "../../../utils/hooks/useSelection";
import { getColorsByType } from "../../../utils/helpers";
import { pinsDataList } from "../../../data/mocks/pins";

import PageLayout from "../../PageLayout";
import { ItemsList } from "../../../components/List";
import { ListItemType, PinItemType } from "../../../types";

const PinsPage = ({ pathIdx }: { pathIdx: number }) => {
  const onPinClick = useCallback(
    (contact: PinItemType) => console.log("contact clicked", contact),
    []
  );

  const pins = useMemo<ListItemType[]>(
    () =>
      pinsDataList.map((pinItem): ListItemType => {
        const { background, outline } = getColorsByType(pinItem.type);
        return {
          onClick: () => onPinClick(pinItem),
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

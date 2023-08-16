import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import useSelection from "../../utils/hooks/useSelection";
import { getColorsByType } from "../../utils/helpers";
import { pinsDataList } from "../../__mock_data/pins";
import PageLayout from "../PageLayout";
import { ItemsList } from "../../components/List";
import { ListItemType } from "../../types";

const PinsPage = ({ pathIdx }: { pathIdx: number }) => {
  const navigate = useNavigate();

  const onClick = useCallback(
    (type: string) => () => {
      navigate("/home/" + type);
    },
    []
  );

  const pins = useMemo<ListItemType[]>(
    () =>
      pinsDataList.map((pinItem): ListItemType => {
        const { background, outline } = getColorsByType(pinItem.type);
        return {
          onClick: onClick(pinItem.type),
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

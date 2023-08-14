import { useCallback, useEffect, useMemo, useState } from "react";
import uniqid from "uniqid";

import PageLayout from "../PageLayout";
import { ItemsList } from "../../components/List";

import useSelection from "../../utils/hooks/useSelection";
import PrevDarkMode from "./Previews/PrevDarkMode";
import PrevMapDetail from "./Previews/PrevMapDetail";
import { ListItemType } from "../../types";

import iconExit from "../../assets/icon-exit.svg";
import iconBW from "../../assets/icon-bw.svg";
import {
  useGlobals,
  useStoreActions,
  useStoreMap,
} from "../../utils/store/global";
import PrevExit from "./Previews/PrevExit";
import { useSimpleToast } from "../../utils/hooks/useToast";
import PrevMapType from "./Previews/PrevMapType";
import { LuPaintbrush2 } from "react-icons/lu";
import { Text } from "@chakra-ui/react";
import { zoomChart, zoomChartRev } from "../../utils/helpers";

const SettingsPage = ({ pathIdx }: { pathIdx: number }) => {
  const { setGlobalProps, setMapProps } = useStoreActions();
  const { darkMode, driveMode } = useGlobals();
  const { type, currentZoom } = useStoreMap();
  const { toastError } = useSimpleToast();

  const [dark, setDark] = useState(darkMode);
  const [mapType, setMapType] = useState(type);
  const [mapDetail, setMapDetail] = useState<number>(
    // @ts-ignore
    zoomChart[currentZoom]
  );
  const [mode] = useState(driveMode);

  const onToggleDriveMode = useCallback(() => {
    toastError("Stop eerste je wagen voor dat je uit de driver mode kan gaan.");
  }, []);

  const onSetMapType = useCallback(() => {
    setMapType(mapType === "osm" ? "base" : "osm");
  }, [mapType]);

  const onSetMapDetail = useCallback(() => {
    setMapDetail(mapDetail >= 4 ? 1 : mapDetail + 1);
  }, [mapDetail]);

  const onSetDarkMode = useCallback(() => {
    setDark(!dark);
  }, [dark]);

  const settingItems = useMemo<ListItemType[]>(
    () => [
      {
        id: "setting-detail",
        text: "Kaart detail",
        children: (
          <Text cursor="pointer" fontWeight={400}>
            {mapDetail}
          </Text>
        ),
        preview: <PrevMapDetail />,
        background: "primary",
        onClick: onSetMapDetail,
      },
      {
        id: "setting-type",
        text: "Type Kaart",
        children: <LuPaintbrush2 color="black" />,
        preview: <PrevMapType />,
        background: "white",
        onClick: onSetMapType,
      },
      {
        id: "setting-darkmode",
        img: iconBW,
        text: "Thema",
        preview: <PrevDarkMode />,
        background: "black",
        onClick: onSetDarkMode,
      },
      {
        id: "setting-exit",
        img: iconExit,
        text: "Exit ",
        preview: <PrevExit />,
        background: "primary",
        onClick: onToggleDriveMode,
      },
    ],
    [dark, mapType, mapDetail, mode]
  );

  const { selected, onSelect } = useSelection(settingItems);

  useEffect(() => {
    setGlobalProps({ darkMode: dark, driveMode: mode });
    setMapProps({
      type: mapType,
      currentZoom: zoomChartRev[mapDetail],
    });
  }, [dark, mapType, mapDetail, mode]);

  return (
    <PageLayout pathIndex={pathIdx}>
      <ItemsList items={settingItems} onSelect={onSelect} selected={selected} />
    </PageLayout>
  );
};

export default SettingsPage;

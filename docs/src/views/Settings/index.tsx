import { useCallback, useMemo, useState } from "react";
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
import { BiColorFill } from "react-icons/bi";

const SettingsPage = ({ pathIdx }: { pathIdx: number }) => {
  const { setDarkMode, toggleDriveMode, setMapProps } = useStoreActions();
  const { isDriving } = useGlobals();
  const { type } = useStoreMap();

  const { toastError, toastSuccess } = useSimpleToast();

  const onToggleDriveMode = useCallback(() => {
    if (isDriving) {
      toastError(
        "Stop eerste je wagen voor dat je uit de driver mode kan gaan."
      );
    } else {
      toggleDriveMode();
    }
  }, [isDriving]);

  const onToggleDarkMode = useCallback(() => {
    setDarkMode();
  }, []);

  const onToggleMapType = useCallback(() => {
    setMapProps({ type: type === "osm" ? "base" : "osm" });
  }, [type]);

  const settingItems = useMemo<ListItemType[]>(
    () => [
      {
        id: uniqid(),
        text: "Kaart detail",
        children: <PrevMapDetail />,
        background: "primary",
      },
      {
        id: uniqid(),
        text: "Type Kaart",
        children: <BiColorFill />,
        preview: <PrevMapType />,
        background: "white",
        onClick: onToggleMapType,
      },
      {
        id: uniqid(),
        img: iconBW,
        text: "Thema",
        preview: <PrevDarkMode />,
        background: "black",
        onClick: onToggleDarkMode,
      },
      {
        id: uniqid(),
        type: "obstacle",
        img: iconExit,
        text: "Exit ",
        preview: <PrevExit />,
        background: "primary",
        onClick: onToggleDriveMode,
      },
    ],
    []
  );

  const { selected, onSelect } = useSelection(settingItems);

  return (
    <PageLayout pathIndex={pathIdx}>
      <ItemsList items={settingItems} onSelect={onSelect} selected={selected} />
    </PageLayout>
  );
};

export default SettingsPage;

import uniqid from "uniqid";

import iconExit from "../../assets/icon-exit.svg";

import iconBW from "../../assets/icon-bw.svg";

import { ListItemType } from "../../types";
import PageDetailCounter from "../../views/Pages/Settings/PageDetail";

const dommyOnClick = () => console.log("clicked");
export const Settings = (): ListItemType[] => {
  return [
    {
      id: uniqid(),
      // icon: iconBW,
      text: "Kaart detail",
      children: <PageDetailCounter />,
      background: "primary",
      onClick: dommyOnClick,
    },
    {
      id: uniqid(),
      img: iconBW,
      text: "Dark Mode",
      background: "black",
      onClick: dommyOnClick,
    },
    {
      id: uniqid(),
      type: "obstacle",
      img: iconExit,
      text: "Exit ",
      background: "primary",
      onClick: dommyOnClick,
    },
  ];
};

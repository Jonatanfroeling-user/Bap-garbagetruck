import uniqid from "uniqid";

import iconBags from "../../assets/icon-bags.svg";

import iconCone from "../../assets/icon-cone.svg";

import { PinItemType } from "../../types";

export const pinsDataList: PinItemType[] = [
  {
    id: uniqid(),
    type: "resource",
    iconPath: iconBags,
    title: "Pakketje",
  },
  {
    id: uniqid(),
    type: "obstacle",
    iconPath: iconCone,
    title: "Obstakel",
  },
];

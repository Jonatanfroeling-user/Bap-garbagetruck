import iconDefault from "../../src/assets/avatars/default.png";
import iconOrange from "../../src/assets/avatars/orange.png";
import iconPurple from "../../src/assets/avatars/purple.png";
import iconRed from "../../src/assets/avatars/red.png";
import iconYellow from "../../src/assets/avatars/yellow.png";

import {
  ItemSizeType,
  UserRoleType,
  ItemSizesArray,
  ActionType,
  UserColorsType,
} from "../types";

type ArrayRemoveType = number | string;

export type zoomLevelType = 1 | 2 | 3 | 4;
export type zoomLevelRevType = 13 | 15 | 16 | 18;

export const zoomLevelsRev: zoomLevelRevType[] = [13, 15, 16, 18];

export const zoomChart = Object.fromEntries(
  zoomLevelsRev.map((i, idx) => [i, idx + 1])
);
export const zoomChartRev = Object.fromEntries(
  zoomLevelsRev.map((i, idx) => [idx + 1, i])
);

export const arrayRemove = (
  array: ArrayRemoveType[],
  item: ArrayRemoveType
): ArrayRemoveType[] => {
  const idx = array.indexOf(item);
  if (idx !== -1) array.splice(idx, 1);
  return array;
};

export const getColorByRole = (type: UserRoleType) => {
  switch (type) {
    case "driver":
      return "primary_green";
    case "admin":
      return "primary";
    default:
      return "white";
  }
};

export const getColorsByContact = (
  type: string,
  role?: UserRoleType
): Record<string, string> => {
  switch (type) {
    case "user":
      const color = role ? getColorByRole(role) : "";
      return {
        background: "transparent",
        outline: color,
      };
    case "depot":
      return {
        background: "primary",
        outline: "white",
      };
    default:
      return {
        background: "",
        outline: "",
      };
  }
};

export const getColorsByType = (type: ActionType): Record<string, string> => {
  switch (type) {
    case "obstacle":
      return {
        background: "orange",
        outline: "white",
      };
    case "resource":
      return {
        background: "green",
        outline: "white",
      };
    default:
      return {
        background: "",
        outline: "",
      };
  }
};

export const userIconTable = {
  red: iconRed,
  yellow: iconYellow,
  purple: iconPurple,
  orange: iconOrange,
  green: iconDefault,
};

export const getUserIconByColor = (col?: UserColorsType) => {
  return col ? userIconTable[col] : userIconTable;
};

const itemSizes: Record<ItemSizeType, ItemSizesArray> & {
  default: ItemSizesArray;
} = {
  1: ["20px", 20, "sm"],
  2: ["35px", 35, "md"],
  3: ["50px", 50, "xl"],
  4: ["90px", 90, "2xl"],
  5: ["150px", 150, "4xl"],
  default: ["35px", 35, "md"],
};

export const getItemSize = (s: ItemSizeType): string => itemSizes[s][0];

export const getItemSizeArray = (s: ItemSizeType): ItemSizesArray =>
  itemSizes[s];

export const userTokenToColor = (token: string): string => {
  // Hash the token to a number
  let hash = 0;
  for (let i = 0; i < token.length; i++) {
    hash = token.charCodeAt(i) + ((hash << 5) - hash);
  }

  const r = (hash & 0xff0000) >> 16;
  const g = (hash & 0x00ff00) >> 8;
  const b = hash & 0x0000ff;

  const color = `#${((1 << 24) | (r << 16) | (g << 8) | b)
    .toString(16)
    .slice(1)}`;
  return color;
};

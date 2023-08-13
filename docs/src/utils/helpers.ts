import {
  ItemSizeType,
  UserRoleType,
  ItemSizesArray,
  ActionType,
} from "../types";

type ArrayRemoveType = number | string;

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

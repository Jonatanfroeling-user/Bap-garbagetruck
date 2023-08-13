import { Concrete, ListItemType, ItemTypes } from "../types";

type allItemTypes = ItemTypes["UserRoleType"] &
  ItemTypes["ActionType"] &
  ItemTypes["ContactType"];

const itemTypeOrders: any | Concrete<allItemTypes> = {
  admin: 0,
  driver: 0,
  obstacle: 0,
  resource: 0,
  roadblock: 0,
  depot: 10,
  user: 0,
};
export const sortItemsByType = (items: ListItemType[]) => {
  return items.sort(
    (a, b) =>
      (a.type ? itemTypeOrders[a.type] : 0) -
      (b.type ? itemTypeOrders[b.type] : 0)
  );
};

import { StateItemType } from "../../types";
import { RouteIcon } from "../../components/icons/Route";
import { TruckIcon } from "../../components/icons/Truck";

const onStatClick = () => "";

export const statusDataList: StateItemType[] = [
  {
    icon: RouteIcon,
    heading: "Route",
    percentage: 74,
    color: "primary_green",
    onClick: onStatClick,
  },
  {
    icon: TruckIcon,
    heading: "Lading",
    percentage: 46,
    color: "primary_orange",
    onClick: onStatClick,
  },
];

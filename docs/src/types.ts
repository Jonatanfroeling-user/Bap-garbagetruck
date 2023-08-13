import { ReactNode } from "react";
import { IconType } from "react-icons/lib";
import { ComponentWithAs, IconProps } from "@chakra-ui/react";
// helpers
export type PickSingle<T, K extends keyof T> = T[K];
export type Concrete<Type> = {
  [Property in keyof Type]-?: Type[Property];
};

// interfaces
export type ItemTypes = {
  UserRoleType: "admin" | "driver" | undefined;
  ActionType: "obstacle" | "resource" | "roadblock";
  ContactType: "depot" | "user";
  Notifcation: "warning" | "error" | "info";
};

// global type arrays
export type ItemSizesArray = [string, number, string];
export type ItemSizeString = "sm" | "md" | "lg" | "xl" | "xxl";

export type ItemSizeType = 1 | 2 | 3 | 4 | 5;

export type UserRoleType = "admin" | "driver" | undefined;
export type ActionType = "obstacle" | "resource" | "roadblock";

// specific global types
export type ContactType = {
  id: string;
  name: string;
  type: "depot" | "user";
  role?: UserRoleType;
  avatar?: string;
  icon?: IconType;
  phone?: string;
};

export type HeaderItemType = {
  path: string;
  icon: JSX.Element;
  isSelected: boolean;
};

export type ListItemType = {
  id: string;
  text: string;
  type?: string;
  outline?: string;
  background?: string;
  icon?: IconType;
  // background image
  img?: string;
  // render full component
  children?: ReactNode;
  onClick: () => void;
};

export type StateItemType = {
  color?: string;
  icon: ComponentWithAs<"svg", IconProps>;
  heading: string;
  percentage: number;
  onClick: () => void;
};

export type NotificationType = {
  title: string;
  type: ItemTypes["Notifcation"];
  onClick: () => void;
};

export type PinItemType = {
  id: string;
  iconPath: string;
  type: ActionType;
  title: string;
};

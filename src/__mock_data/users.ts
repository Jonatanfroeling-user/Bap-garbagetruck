import uniqid from "uniqid";

import { ContactType } from "../types";
import { HiHome } from "react-icons/hi";

import Hendrick from "../assets/__mock_users/hendrick.png";
import Stefaan from "../assets/__mock_users/stefaan.png";
import Yossef from "../assets/__mock_users/yussef.png";
import Rizzo from "../assets/__mock_users/rizzo.png";
import Lissa from "../assets/__mock_users/lissa.png";
import Bruno from "../assets/__mock_users/bruno.png";

import iconGreen from "../../src/assets/avatars/default.png";
import iconOrange from "../../src/assets/avatars/orange.png";
import iconPurple from "../../src/assets/avatars/purple.png";
import iconRed from "../../src/assets/avatars/red.png";
import iconYellow from "../../src/assets/avatars/yellow.png";

export const contactsList: ContactType[] = [
  {
    id: uniqid(),
    name: "DEPOT - Ronse",
    type: "depot",
    phone: "055330042",
    icon: HiHome,
  },
  {
    id: uniqid(),
    name: "Stefaan .V",
    phone: "0473228642",
    type: "user",
    role: "admin",
    truckIcon: iconYellow,
    avatar: Stefaan,
    color: "yellow",
    isSelectableForDemo: true,
  },
  {
    id: uniqid(),
    name: "Yossef",
    phone: "0473228642",
    type: "user",
    avatar: Yossef,
    truckIcon: iconOrange,
    color: "orange",
    isSelectableForDemo: true,
  },
  {
    id: uniqid(),
    name: "Rizzo",
    phone: "0473228642",
    type: "user",
    avatar: Rizzo,
    truckIcon: iconRed,
    color: "red",
    isSelectableForDemo: true,
  },
  {
    id: uniqid(),
    name: "Hendrick",
    role: "driver",
    phone: "0473228642",
    type: "user",
    truckIcon: iconGreen,
    avatar: Hendrick,
    color: "green",
    isSelectableForDemo: true,
  },

  {
    id: uniqid(),
    name: "Lissa",
    role: "driver",
    phone: "0473228642",
    type: "user",
    truckIcon: iconPurple,
    avatar: Lissa,
    color: "purple",
    isSelectableForDemo: true,
  },
  {
    id: uniqid(),
    name: "Bruno",
    phone: "0473228642",
    type: "user",
    avatar: Bruno,
    // sorry bruno..
    isSelectableForDemo: false,
  },
];

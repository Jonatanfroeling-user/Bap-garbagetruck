import uniqid from "uniqid";

import { ContactType } from "../../types";

import avatar from "../../assets/logo.png";
import { IoIosStats } from "react-icons/io";

export const contactsList: ContactType[] = [
  {
    id: uniqid(),
    name: "DEPOT - Ronse",
    type: "depot",
    phone: "055330042",
    icon: IoIosStats,
  },
  {
    id: uniqid(),
    name: "Stefaan .V",
    phone: "0473228642",
    type: "user",
    role: "admin",
    avatar: avatar,
  },
  {
    id: uniqid(),
    name: "Yossef",
    phone: "0473228642",
    type: "user",
    avatar: avatar,
  },
  {
    id: uniqid(),
    name: "Rizzo",
    phone: "0473228642",
    type: "user",
    avatar: avatar,
  },
  {
    id: uniqid(),
    name: "Hendrick",
    role: "driver",
    phone: "0473228642",
    type: "user",
    avatar: avatar,
  },
];

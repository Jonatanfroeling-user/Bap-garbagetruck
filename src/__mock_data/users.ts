import uniqid from "uniqid";

import { ContactType } from "../types";
import { HiHome } from "react-icons/hi";

import Hendrick from "../assets/__mock_users/hendrick.png";
import Stefaan from "../assets/__mock_users/stefaan.png";
import Yossef from "../assets/__mock_users/yussef.png";
import Rizzo from "../assets/__mock_users/rizzo.png";
import Lissa from "../assets/__mock_users/lissa.png";
import Bruno from "../assets/__mock_users/bruno.png";

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
    avatar: Stefaan,
  },
  {
    id: uniqid(),
    name: "Yossef",
    phone: "0473228642",
    type: "user",
    avatar: Yossef,
  },
  {
    id: uniqid(),
    name: "Rizzo",
    phone: "0473228642",
    type: "user",
    avatar: Rizzo,
  },
  {
    id: uniqid(),
    name: "Hendrick",
    role: "driver",
    phone: "0473228642",
    type: "user",
    avatar: Hendrick,
  },

  {
    id: uniqid(),
    name: "Lissa",
    role: "driver",
    phone: "0473228642",
    type: "user",
    avatar: Lissa,
  },
  {
    id: uniqid(),
    name: "Bruno",
    phone: "0473228642",
    type: "user",
    avatar: Bruno,
  },
];

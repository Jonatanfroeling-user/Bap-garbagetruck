import { useMemo } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import HomePage from "./views/Pages/Home";
import PinsPage from "./views/Pages/Pins";
import ContactPage from "./views/Pages/Contact";
import SettingsPage from "./views/Pages/Settings";
import StatsPage from "./views/Pages/Stats";

import LogoIcon from "./components/Logo";
import { AiFillStar } from "react-icons/ai";
import { HiUsers } from "react-icons/hi";
import { FaMapPin } from "react-icons/fa";
import { IoIosStats } from "react-icons/io";

import { AnimatePresence } from "framer-motion";

export type RouteItemType = {
  path: string;
  icon: JSX.Element;
  element: ({ pathIdx }: { pathIdx: number }) => JSX.Element;
};

export const routes: RouteItemType[] = [
  {
    path: "/pins",
    icon: <FaMapPin size={40} />,
    element: PinsPage,
  },
  {
    path: "/contact",
    icon: <HiUsers size={40} />,
    element: ContactPage,
  },
  {
    path: "/home",
    icon: <LogoIcon size={6} />,
    element: HomePage,
  },
  {
    path: "/instellingen",
    icon: <AiFillStar size={50} />,
    element: SettingsPage,
  },
  {
    path: "/info",
    icon: <IoIosStats size={40} />,
    element: StatsPage,
  },
];

const Router = () => {
  const location = useLocation();

  const routeItems = useMemo(
    () => (
      <>
        {routes.map(({ path, element: Element }, index) => (
          <Route
            key={`route-${path}`}
            path={path}
            element={<Element pathIdx={index} />}
          />
        ))}
      </>
    ),
    []
  );

  return (
    <AnimatePresence>
      <Routes location={location} key={location.hash}>
        {routeItems}
        <Route path="*" element={<Navigate replace to="/home" />} />
      </Routes>
    </AnimatePresence>
  );
};

export default Router;

import { useMemo } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import HomePage from "./views/Home";
import PinsPage from "./views/Pins";
import ContactPage from "./views/Contact";
import SettingsPage from "./views/Settings";
import StatsPage from "./views/Stats";

import LogoIcon from "./components/Logo";
import { AiFillStar } from "react-icons/ai";
import { HiUsers } from "react-icons/hi";
import { FaMapPin } from "react-icons/fa";
import { IoIosStats } from "react-icons/io";

import { AnimatePresence } from "framer-motion";
import LoginPage from "./views/Login";
import { useCurrentPath } from "./utils/hooks/useCurrentPath";
import { useAuth } from "./utils/store/global";

export type RouteItemType = {
  path: string;
  icon: JSX.Element;
  element: ({ pathIdx }: { pathIdx: number }) => JSX.Element;
  requirePreview?: true;
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
    path: "/home/:pinType?",
    icon: <LogoIcon size={6} />,
    element: HomePage,
  },
  {
    path: "/instellingen",
    icon: <AiFillStar size={50} />,
    element: SettingsPage,
    requirePreview: true,
  },
  {
    path: "/info",
    icon: <IoIosStats size={40} />,
    element: StatsPage,
    requirePreview: true,
  },
];

const Router = () => {
  const location = useLocation();
  const { isLoggedIn } = useAuth();
  const { currentPath } = useCurrentPath();

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
      <Routes location={location} key={currentPath}>
        {isLoggedIn ? (
          <>
            {routeItems}
            <Route path="*" element={<Navigate replace to="/home" />} />
          </>
        ) : (
          <Route path="*" element={<LoginPage />} />
        )}
      </Routes>
    </AnimatePresence>
  );
};

export default Router;

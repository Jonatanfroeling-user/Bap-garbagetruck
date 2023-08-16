import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { ContactType } from "../../types";

type RouteStoreType = {
  done: number;
  todo: number;
  route: any;
  currentStreet: object | null;
};

type GlobalProps = {
  driveMode: boolean;
  isDriving: boolean;
  customNavigation: boolean;
  hideHeader: boolean;
  darkMode: boolean;
};

type MapProps = {
  type: "osm" | "base";
  currentZoom: number;
  center: [number, number];
  maxZoom: number;
  minZoom: number;
};
type GlobalStoreType = {
  global: GlobalProps;
  user: {
    isLoggedIn: boolean;
    user: ContactType | null;
  };
  map: MapProps;
  route: RouteStoreType;
  actions: {
    setAuthState: (authState: boolean, user: ContactType) => void;
    setMapProps: (props: Partial<MapProps>) => void;
    setGlobalProps: (props: Partial<GlobalProps>) => void;
    setRouteProps: (props: Partial<RouteStoreType>) => void;
  };
};

export const useGlobalStore = create<GlobalStoreType>()(
  devtools(
    immer((set) => ({
      global: {
        driveMode: true,
        isDriving: true,
        customNavigation: false,
        hideHeader: false,
        darkMode: false,
      },
      map: {
        type: "base",
        currentZoom: 18,
        center: [50.746, 3.63],
        maxZoom: 18,
        minZoom: 13,
      },
      user: {
        isLoggedIn: false,
        user: null,
      },
      route: {
        done: 0,
        todo: 199,
        route: {},
        currentStreet: null,
      },
      actions: {
        setAuthState: (loginState: boolean, user: ContactType) =>
          set(
            (state) => {
              state.user.isLoggedIn = loginState;
              state.user.user = loginState ? user : null;
            },
            false,
            "setAuthState"
          ),
        setMapProps: (props: Partial<MapProps>) =>
          Object.values(props).some((i) => i !== undefined) &&
          set(
            (state) => {
              for (let [k, v] of Object.entries(props)) {
                // @ts-ignore
                state.map[k as keyof typeof props] = v;
              }
            },
            false,
            "setMapProps"
          ),
        setRouteProps: (props: Partial<RouteStoreType>) =>
          Object.values(props).some((i) => i !== undefined) &&
          set(
            (state) => {
              for (let [k, v] of Object.entries(props)) {
                state.route[k as keyof typeof props] = v;
              }
            },
            false,
            "setRouteProps"
          ),
        setGlobalProps: (props: Partial<GlobalProps>) =>
          Object.values(props).some((i) => i !== undefined) &&
          set(
            (state) => {
              for (let [k, v] of Object.entries(props)) {
                state.global[k as keyof typeof props] = v;
              }
            },
            false,
            "setGlobalProps"
          ),
      },
    })),
    { name: "global store" }
  )
);

export const useStoreActions = () => useGlobalStore((s) => s.actions);

export const useAuth = () => useGlobalStore((s) => s.user);
export const useStoreMap = () => useGlobalStore((s) => s.map);
export const useRoute = () => useGlobalStore((s) => s.route);
export const useGlobals = () => useGlobalStore((s) => s.global);

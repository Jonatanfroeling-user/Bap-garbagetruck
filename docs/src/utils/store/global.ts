import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

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
    color: string | null;
    icon: string | null;
  };
  map: MapProps;
  theme: {
    darkMode: boolean;
  };
  route: RouteStoreType;
  actions: {
    setAuthState: (authState: boolean, icon: string) => void;
    setMapProps: (props: Partial<MapProps>) => void;
    setDarkMode: (darkMode?: boolean) => void;
    toggleDriveMode: () => void;
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
      },
      map: {
        type: "base",
        currentZoom: 5,
        center: [50.746, 3.63],
        maxZoom: 17,
        minZoom: 13,
      },
      user: {
        isLoggedIn: false,
        color: null,
        icon: null,
      },
      route: {
        done: 0,
        todo: 199,
        route: {},
        currentStreet: null,
      },
      theme: {
        darkMode: false,
      },
      actions: {
        setAuthState: (loginState: boolean, icon: string) =>
          set(
            (state) => {
              state.user.isLoggedIn = loginState;
              state.user.icon = loginState ? icon : null;
            },
            false,
            "setAuthState"
          ),

        setDarkMode: (darkMode?: boolean) =>
          set(
            (state) => {
              state.theme.darkMode =
                darkMode !== undefined ? darkMode : !state.theme.darkMode;
            },
            false,
            "setDarkMode"
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
        toggleDriveMode: () =>
          set(
            (state) => {
              state.global.driveMode = !state.global.driveMode;
            },
            false,
            "toggleDriveMode"
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
export const useStoreTheme = () => useGlobalStore((s) => s.theme);
export const useGlobals = () => useGlobalStore((s) => s.global);

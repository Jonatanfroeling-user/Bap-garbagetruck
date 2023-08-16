import L from "leaflet";
import locationData from "../../../__mock_data/route/route-locations.json";
import routeData from "../../../__mock_data/route/streets-data.json";

import faalbackIcon from "../../../assets/avatars/red.png";

// @ts-ignore
import { initWithMap } from "./functionality.min.js";
import { contactsList } from "../../../__mock_data/users";
import { ContactType } from "../../../types";
// L_NO_TOUCH = true;
// L_DISABLE_3D = true;

const iniMapFunctions = (
  Map: any,
  openModal: (name: string, data: unknown) => void,
  currentUser: ContactType
) => {
  const otherUsers = contactsList.filter(
    (i) => i.name !== currentUser.name && i.isSelectableForDemo
  );

  window._progress = {
    total: 0,
  };
  // @ts-ignore
  window._users = {};

  for (let { name } of Object.values(routeData)) {
    window._progress[name] = 0;
  }

  // @ts-ignore
  window._mapFunctions = {} as any;

  window._mapFunctions.createMarker = (
    id: string,
    street: any,
    coords: any,
    color = currentUser.color || "#5197fe",
    width = 8
  ) => {
    if (typeof coords[0] !== "object") {
      coords = [coords];
    }
    const marker = L.polyline(coords, {
      bubblingMouseEvents: true,
      color: [color] as any,
      fill: false,
      fillOpacity: 0,
      fillRule: "evenodd",
      lineCap: "round",
      lineJoin: "round",
      noClip: false,
      opacity: 0.5,
      smoothFactor: 1.0,
      stroke: true,
      weight: width,
    }).addTo(Map);
    marker.on("click", function (e) {
      window._mapFunctions.promptSendRequest(id, street);
    });
    return marker;
  };
  window._mapFunctions.promptSendRequest = (id: string, street: any) =>
    openModal("promptSendRequest", { wayId: id, street: street });

  window._mapFunctions.promptRecieveRequest = (
    wayId: any,
    street: any,
    to: any
  ) =>
    openModal("promptRecieveRequest", {
      wayId: wayId,
      street: street,
      to: to,
    });

  window._mapFunctions.sendTransferRequest = (data: any) =>
    openModal("sendTransferRequest", data);

  initWithMap(
    Map,
    locationData,
    routeData,
    currentUser,
    faalbackIcon,
    otherUsers
  );
};

export { iniMapFunctions };

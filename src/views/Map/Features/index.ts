import L from "leaflet";
import locationData from "../../../__mock_data/route/route-locations.json";
import routeData from "../../../__mock_data/route/streets-data.json";

import iconTruckB from "../../../assets/avatars/red.png";

// @ts-ignore
import { initWithMap } from "./functionality.min.js";
// L_NO_TOUCH = true;
// L_DISABLE_3D = true;

const iniMapFunctions = (
  Map: any,
  openModal: (name: string, data: unknown) => void,
  iconA: string
) => {
  // window._MAP = Map;

  L.Marker.prototype.options.icon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png", //"https://pngimg.com/uploads/dot/small/dot_PNG29.png"
  });

  window._progress = {
    total: 0,
  };

  window._users = {
    currentUser: null,
    otherUser: null,
  };
  for (let { name } of Object.values(routeData)) {
    window._progress[name] = 0;
  }

  window._mapFunctions = {
    createMarker: (id: string, coords: any, color = "#5197fe", width = 8) => {
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
        window._mapFunctions.promptSendRequest(id);
      });
      return marker;
    },
    promptSendRequest: (data: any) => openModal("promptSendRequest", data),
    promptRecieveRequest: (data: any) =>
      openModal("promptRecieveRequest", data),
    sendTransferRequest: (data: any) => openModal("sendTransferRequest", data),
  };

  initWithMap(Map, locationData, routeData, iconA, iconTruckB);
};

export { iniMapFunctions };

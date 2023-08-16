import {
  Fragment,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import L from "leaflet";
import { MapContainer, Marker } from "react-leaflet";
import { useStoreMap } from "../../utils/store/global";
import { Box } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";

import iconBags from "../../assets/icon-bags.svg";
import iconCone from "../../assets/icon-cone.svg";

const getIcon = (type: string) => {
  if (type === "obstacle") {
    return new L.Icon({
      iconUrl: iconCone,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    });
  } else {
    return new L.Icon({
      iconUrl: iconBags,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    });
  }
};

const allPins: ReactNode[] = [];

const MapWrapper = ({ children }: { children: ReactNode }) => {
  const { pinType } = useParams();
  const { currentZoom, center, maxZoom, minZoom } = useStoreMap();

  const navigate = useNavigate();

  useEffect(() => {
    if (pinType && window._users?.currentUser?.position) {
      const icon = getIcon(pinType);

      allPins.push(
        (
          <Marker
            icon={icon}
            position={window._users.currentUser.position as [number, number]}
            draggable
          >
            <Box
              className={
                "custom-marker" + pinType === "obstacle" ? "danger" : "info"
              }
            ></Box>
          </Marker>
        ) as any
      );
      window.location.hash = window.location.hash.replace("/" + pinType, "");
      // navigate("home");
    }
  }, [pinType]);

  return (
    <Box pos="fixed" w="100vw" h="100vh" top="0" left={0}>
      <MapContainer
        center={center as L.LatLngExpression}
        zoom={currentZoom}
        maxZoom={maxZoom}
        minZoom={minZoom}
        dragging={!L.Browser.mobile}
      >
        {children}
        {allPins.map((i, idx) => (
          <Fragment key={`react)marker-map-pin-${idx}`}>{i}</Fragment>
        ))}
      </MapContainer>
    </Box>
  );
};

export default MapWrapper;

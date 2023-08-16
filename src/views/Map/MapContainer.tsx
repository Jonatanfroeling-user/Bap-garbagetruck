import { ReactNode } from "react";
import L from "leaflet";
import { MapContainer } from "react-leaflet";
import { useStoreMap } from "../../utils/store/global";
import { Box } from "@chakra-ui/react";

const MapWrapper = ({ children }: { children: ReactNode }) => {
  const { currentZoom, center, maxZoom, minZoom } = useStoreMap();

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
      </MapContainer>
    </Box>
  );
};

export default MapWrapper;

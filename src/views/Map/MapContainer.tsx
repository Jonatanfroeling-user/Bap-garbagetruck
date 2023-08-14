import { ReactNode } from "react";
import L from "leaflet";
import { MapContainer } from "react-leaflet";
import { useStoreMap } from "../../utils/store/global";

const MapWrapper = ({ children }: { children: ReactNode }) => {
  const { currentZoom, center, maxZoom, minZoom } = useStoreMap();

  return (
    <>
      <MapContainer
        center={center as L.LatLngExpression}
        zoom={currentZoom}
        maxZoom={maxZoom}
        minZoom={minZoom}
        dragging={!L.Browser.mobile}
      >
        {children}
      </MapContainer>
    </>
  );
};

export default MapWrapper;

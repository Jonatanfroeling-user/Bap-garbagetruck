import { useCallback, useEffect, useState } from "react";
import L from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import Route from "./Route";

// attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
type MapUrlType = { id: string; url: string };

const getMapUrl = (id: string): MapUrlType => {
  let current = "";
  switch (id) {
    case "offline":
      current = "../../data/tiles/{z}/{x}/{y}.png";
      break;
    case "osm":
      current = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
      break;
    case "base":
      current = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png";
      break;

    default:
      return getMapUrl("base");
  }
  return {
    id: id,
    url: current,
  };
};

const navigatorIconById = (id: string): string => {
  switch (id) {
    case "dot":
      return "https://pngimg.com/uploads/dot/small/dot_PNG29.png";
    default:
      return "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png";
  }
};

const Map = () => {
  //const map = useMap()
  const position = [50.746, 3.63] as L.LatLngExpression;
  const [mapUrl, setMapUrl] = useState<MapUrlType>(getMapUrl("base"));
  const [navigatorIcon, setNavigatorIcon] = useState<string>(
    navigatorIconById("")
  );

  const changeMapUrl = (url: string) => {
    setMapUrl(getMapUrl(url));
  };

  window.addEventListener("keydown", (e) => {
    if (e.key === "a") changeMapUrl(mapUrl.id === "base" ? "osm" : "base");
  });

  return (
    <MapContainer
      center={position}
      zoom={14}
      maxZoom={17}
      minZoom={13}
      dragging={!L.Browser.mobile}
    >
      <TileLayer
        attribution={`Data by \u0026copy; \u003ca target="_blank" href="http://openstreetmap.org"\u003eOpenStreetMap\u003c/a\u003e, under \u003ca target="_blank" href="http://www.openstreetmap.org/copyright"\u003eODbL\u003c/a\u003e.`}
        url={mapUrl.url}
      />
      <Route />
    </MapContainer>
  );
};

export default Map;

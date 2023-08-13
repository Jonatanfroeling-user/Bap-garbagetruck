import { useEffect, useMemo } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";
import routeData from "../../../data/route.json";

L.Marker.prototype.options.icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png", //"https://pngimg.com/uploads/dot/small/dot_PNG29.png"
});

function createMarker(
  id: number,
  coords: any[],
  color: string = "#097ffe70",
  width: number = 12
) {
  const marker = L.polyline(coords, {
    bubblingMouseEvents: true,
    color: color,
    dashArray: undefined,
    dashOffset: undefined,
    fill: false,
    fillOpacity: 0,
    fillRule: "evenodd",
    lineCap: "round",
    lineJoin: "round",
    noClip: false,
    opacity: 1,
    smoothFactor: 1.0,
    stroke: true,
    weight: width,
  });

  // marker.on('click', function (e) {
  //     console.info('1 - click', id, e.target)
  // });
  return marker;
}

export default function Route() {
  const map = useMap();
  const waypoints = useMemo(
    () => routeData.map((i) => L.latLng(i[0], i[1])),
    []
  );

  useEffect(() => {
    if (!waypoints || !waypoints.length) return;
    createMarker(3423423, waypoints).addTo(map);
  }, [map, waypoints]);

  return <></>;
}

import { useEffect, useMemo } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";
import routeData from '../../../data/route.json'


L.Marker.prototype.options.icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png"//"https://pngimg.com/uploads/dot/small/dot_PNG29.png"
});



// function createMarker(id, coords, color = '#00ff00', width = 12) {
//   const marker = L.polyline(
//       coords, {
//           "bubblingMouseEvents": true,
//           "color": [color],
//           "dashArray": null,
//           "dashOffset": null,
//           "fill": false,
//           "fillOpacity": 0,
//           "fillRule": "evenodd",
//           "lineCap": "round",
//           "lineJoin": "round",
//           "noClip": false,
//           "opacity": 0.3,
//           "smoothFactor": 1.0,
//           "stroke": true,
//           "weight": width
//       }
//   ).addTo(MAP);


//   marker.on('click', function (e) {
//       console.info('1 - click', id, e.target)
//   });
//   return marker
// }

export default function Routing() {
  const map = useMap();
  const waypoints = useMemo(()=>routeData.map(i=>L.latLng(i[0], i[1])), [])

  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
      waypoints: waypoints,
      routeWhileDragging: false
    }).addTo(map);

    try {
      return () => map.removeControl(routingControl);

    } catch(e){
      return
    }
  }, [map]);

  return <></>;
}

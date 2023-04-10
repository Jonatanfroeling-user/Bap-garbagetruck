import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import Route from "./Route";
import { useState } from "react";

//        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'

function toggleOfflineMap(url){
  return
  if(url=="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png") return"../../data/tiles/{z}/{x}/{y}.png"
  else return "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
}


export default function Map() {
  //const map = useMap()
  const position = [50.746, 3.63];
  const [mapUrl, setMapUrl] = useState("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")


  document.body.addEventListener('click', (e)=>{
    setMapUrl(toggleOfflineMap(mapUrl))
    console.log('url', mapUrl)
  })

  return (
    <MapContainer center={position} zoom={13} style={{ height: "100vh" }}>
      <TileLayer
        attribution={`Data by \u0026copy; \u003ca target=\"_blank\" href=\"http://openstreetmap.org\"\u003eOpenStreetMap\u003c/a\u003e, under \u003ca target=\"_blank\" href=\"http://www.openstreetmap.org/copyright\"\u003eODbL\u003c/a\u003e.`}

        url={mapUrl} //"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Route />
    </MapContainer>
  );
}
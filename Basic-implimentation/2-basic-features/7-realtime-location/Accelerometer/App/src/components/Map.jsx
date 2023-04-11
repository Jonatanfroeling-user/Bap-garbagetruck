/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap,Marker,Popup } from 'react-leaflet'


const MapRonse = ({ location }) => {
  return (
    <MapContainer center={[51.58533, 3.66728]} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={location}>
        <Popup>
          I am the truck
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapRonse;
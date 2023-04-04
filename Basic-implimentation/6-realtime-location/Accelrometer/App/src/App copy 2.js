/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef,useCallback } from 'react';
import io from 'socket.io-client';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const App = () => {
  const [location, setLocation] = useState([51.58533, 3.66728]);
  const socketRef = useRef(null);
  const [change, setChange]=useState(0)


  const handleData = useCallback((data) => {
    setChange(change+data.x);
    console.log(change, data.x);
  }, []);



  useEffect(() => {
    socketRef.current = io('ws://192.168.0.222:8000',{
      cors: {
        origin: "*",
      }});
    socketRef.current.on('data', (data) => {
      //setLocation([location[0] + data.x * 10, location[1] + data.y * 10]);
      //setLocation([location[0], location[1] + data.z * 100]);
      //console.log('-', location[0], data.x)
      handleData(data)


    });

    return () => {
      console.log('disconnected.')
      socketRef.current.disconnect();
    };
  }, []);

  return (
    // <MapContainer center={[51.58533, 3.66728]} zoom={16}>
    //   <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    //   <Marker position={location}>
    //     <Popup>Truck</Popup>
    //   </Marker>
    // </MapContainer>
    <h1>{(change*1000).toFixed(10)}</h1>
  );
};

export default App;
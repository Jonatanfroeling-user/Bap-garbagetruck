import React, { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import Canvas from './components/Canvas';
import MapRonse from './components/Map';

const App = () => {
  const [location, setLocation] = useState([500,500]);//[51.58533, 3.66728]
  const socketRef = useRef(null);
  console.log('refresh')

  // init connction to socket
  useEffect(() => {
    console.log('connecting');
    socketRef.current = io('ws://192.168.0.222:8000');

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  // update location on data recieve
  useEffect(() => {
    if (!socketRef.current) return;

    const handleData = (data) => {
      console.log('--- 1', location.map(i=>i.toFixed(5)));
      setLocation([location[0]+data.x*1500000, location[1]+data.y*1500000]);//+data.y*100]);
    };

    socketRef.current.on('data', handleData);
    return () => {
      socketRef.current.off('data', handleData);
    };
  }, [location]);

  return (
    // <MapRonse location={location} />
    <Canvas location={location} />

  );
};

export default App;
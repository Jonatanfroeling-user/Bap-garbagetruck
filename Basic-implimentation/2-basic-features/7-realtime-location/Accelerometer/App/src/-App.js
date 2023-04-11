import React, { useState, useEffect, useRef, useCallback } from 'react';
import io from 'socket.io-client';
import Test from './components/Test';
import Test2 from './components/Test2';

const App = () => {
  const [location, setLocation] = useState([51.58533, 3.66728]);
  const [change, setChange] = useState(0);
  const [connectionStatus, setConnectionStatus]=useState(false)
  const socketRef = useRef(null);
  const testRef = useRef(null);


  console.log("re",change)

  const handleData = useCallback((data) => {
    console.log(change + data.x)
  }, []);

  console.log('udpatesocket')
  socketRef.current = io('ws://192.168.0.222:8000', {
    cors: {
      origin: '*',
    },
  });


  socketRef.current.on('data', (data)=>{
    document.getElementById('noinoi').innerHTML = (data.x*1000).toFixed(7)
  });




  return (
    <>
    <h1 id='noinoi'>hoi</h1>

    </>
  );
};

export default App;

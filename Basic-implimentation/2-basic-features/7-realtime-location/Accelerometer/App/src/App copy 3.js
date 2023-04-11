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
    setChange((prevChange) => prevChange + data.x);
  }, []);

  const connectSocket = useCallback(() => {
    console.log('udpatesocket')
    socketRef.current = io('ws://192.168.0.222:8000', {
      cors: {
        origin: '*',
      },
    });
    socketRef.current.on('data', handleData);
  }, []);

  useEffect(() => {
    if(!connectionStatus){
      console.log('reconnecting....')
      connectSocket();
      setConnectionStatus(true)
    }
    // return () => {
    //   if (socketRef.current) {
    //     socketRef.current.disconnect();
    //   }
    // };
  }, [connectSocket]);

  useEffect(() => {
    if (testRef.current) {
      testRef.current.updateData(change);
    }
  }, [change]);

  return (
    <>
      <Test2 data={change}/>
      {/* <Test ref={testRef} data={change} /> */}
    </>
  );
};

export default App;

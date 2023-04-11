import React from 'react';


const Truck = ({ location }) => {
  return (
    <div className="chat">
      {JSON.stringify(location)}
    </div>
  );
};

export default Truck;
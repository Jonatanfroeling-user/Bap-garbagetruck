type user = {
  name: string;
  color?: string;
  user?: any;
  route?: any;
  destinations?: any;
  id?: string;
  truck?: any;
  done?: any;
  position?: [number, number];
  currentDestination?: any;
  pendingActions?: any;
};

interface Window {
  _MAP: any;
  _progress: {
    total: number;
    [key: string]: number;
  };
  _users: {
    currentUser: user;
    otherUser: user;
    [key: string]: user;
  };
  //   L: LType;

  // declare custom fucntion to handle map interactions between .tsx and .js
  _mapFunctions: {
    createMarker: (
      id: string,
      coords: [number, number],
      color = "#00ff00",
      width = 8
    ) => void;
    promptSendRequest: (id: string) => void;
    promptRecieveRequest: (data: any, name: string) => void;
    sendTransferRequest: (
      from: string,
      to: string,
      wayId: string,
      wayStreetName: string,
      fullStreet: boolean
    ) => void;
  };
}

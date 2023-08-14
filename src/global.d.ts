interface Window {
  _MAP: any;
  _progress: {
    total: number;
    [key: string]: number;
  };
  _users: {
    currentUser: any;
    otherUser: any;
  };
  //   L: LType;

  // declare custom fucntion to heasally handle map interactions between .tsx and .js
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
    ) => voic;
  };
}

// truck driver
// every trip a new instance is made as a user can be assigned a driver with a route
class DriverClass {
  constructor(id, user, route) {
    route.initUser(user);

    this.user = user;
    this.route = route;
    this.destinations = [...this.route.lookupNodes.values()].flat();
    this.id = id;

    this.truck = getIcon(ronseCenter);
    this.done = false;

    this.position = this.truck.getLatLng();
    this.currentDestination = null;

    this.pendingActions = new Map();
  }
  async init(useDataSet = false) {
    this.destinations = await loadJsonData(
      "../data/RealTimeLocation/intermediated.json"
    );
  }
  // move will be real life location tracking so this system will be compleatly different
  move() {
    if (this.done || !this.destinations.length) return;
    this.position = this.destinations.next();

    if (
      !this.position ||
      this.position.current === this.destinations.length - 1
    ) {
      this.destinations.length = 0;
      this.done = true;
      return;
    }

    this.truck.setLatLng(this.position);
  }
  getPos() {
    return this.truck.getLatLng();
  }

  // transfer: 2 - get request from other user via server
  recieveTransferRequest(request) {
    let action;

    // select whole street or not
    if (request.street) {
      action = () =>
        this.route.addStreet(request.name, request.data, this.user, true);

      // only select part
    } else {
      action = () =>
        // dd(request);
        this.route.addStreet(
          request.data.name,
          [request.data],
          this.user,
          true
        );
    }
    this.pendingActions.set(request.id, action);

    // // info("5 - user2 - recieve req", request);
    dom.promptRecieveRequest(request);
  }

  // transfer: 1 - send request via server
  // also add action to remove street from own emmory as a pending action
  sendTransferRequest(event) {
    // filter data
    const form = new FormData(event.target);

    const requestBody = {
      from: form.get("user-to"),
      to: form.get("user-from"),
      id: form.get("way-id"),
      name: form.get("way-street"),
      street: !!form.get("way-select-all"),
      routeId: this.route.id,
    };
    let action = () => null;

    // select whole street or not
    if (requestBody.street) {
      if (!this.route.lookupStreet.has(requestBody.name))
        return log("Cannot request transfering an unknown street");
      action = () => {
        const current = this.destinations.current;
        const coordsToDelete = this.route.removeStreet(requestBody.name);
        const strCoords = coordsToDelete.map((i) => String(i));

        this.destinations = this.destinations.filter(
          (coord) => !strCoords.includes(String(coord))
        );

        this.destinations.current = current;
      };
      // only select part
    } else {
      if (!this.route.lookupPart.has(String(requestBody.id))) {
        return log("Cannot request transfering an unknown part");
      }

      action = () => {
        const current = this.destinations.current;
        const coordsToDelete = this.route.removeStreet(requestBody.name);
        const strCoords = coordsToDelete.map((i) => String(i));

        this.destinations = this.destinations.filter(
          (coord) => !strCoords.includes(String(coord))
        );

        this.destinations.current = current;

        // const coordsToDelete = this.route.removePart(requestBody.id);

        // const first = this.destinations.findIndex(
        //   (coord) => coord === coordsToDelete[0]
        // );

        // this.destinations.splice(first, coordsToDelete.length - 1);

        // const last =  this.destinations.findIndex(coord => coord === coordsToDelete[coordsToDelete.length -1])
        // const strCoords = coordsToDelete.map((i) => String(i));
        // for(let i=0;i<this.destinations.length;i++) {
        //   if(strCoords.includes(String(this.destinations[i]))) {
        //     // remove item, with modifying the array only once
        //   }
        // }
        // this.destinations = this.destinations.filter(
        //   (coord) => !strCoords.includes(String(coord))
        // );
      };
    }
    this.pendingActions.set(requestBody.id, action);
    offlineServer.handleTransferRequest(requestBody);
  }

  // transfer: 3 - sending server response
  sendTransferResponse(accepted, id) {
    const response = {
      code: accepted ? 1 : 0,
      message: "",
      id: id,
    };
    if (accepted) {
      this.done = false;
      this.destinations.push(...this.pendingActions.get(id)());
    }
    this.pendingActions.delete(id);
    offlineServer.handleTransferResponse(response);
  }

  // transfer: 4 - recieve server response
  recieveTransferResponse(response) {
    const { id, code } = response;
    if (code) {
      this.pendingActions.get(id)();
    } else log("Request declined!");

    // clear peding actions cache
    this.pendingActions.delete(id);
  }
}

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

  recieveTransferRequest(request) {
    let action;

    if (request.street) {
      action = () =>
        this.route.addStreet(request.name, request.data, this.user, true);
    } else {
      action = () =>
        this.route.addStreet(
          request.data.name,
          [request.data],
          this.user,
          true
        );
    }
    this.pendingActions.set(request.id, action);

    dom.promptRecieveRequest(request);
  }

  sendTransferRequest(event) {
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
      };
    }
    this.pendingActions.set(requestBody.id, action);
    offlineServer.handleTransferRequest(requestBody);
  }

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

  recieveTransferResponse(response) {
    const { id, code } = response;
    if (code) {
      this.pendingActions.get(id)();
    } else log("Request declined!");

    this.pendingActions.delete(id);
  }
}

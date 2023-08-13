const Grid = new GridClass();
const offlineServer = new ServerClass();
// need to be gloabl scope as they require each other
// normally tis would just be a request send to a server
let dom, currentUser;
let otherUser = {};

async function main() {
  await offlineServer.boot();
  // init routes for users
  // normally inited on each different device seperately
  currentUser = offlineServer.assignRoute("louis", "route-1");
  otherUser = offlineServer.assignRoute("ahmed", "route-empty");

  currentUser.route.initMarkers();

  dom = new HtmlOutClass();

  const allc = [...currentUser.route.lookupNodes.values()].flat();
  Grid.init(allc);
  await currentUser.init();

  while (!currentUser.done) {
    await sleep(0.00001);
    currentUser.route.getGobalStats();
    currentUser.move();
    otherUser.move();

    Grid.checkPointsInRadius(currentUser.getPos());
  }
}

document.onload = main();

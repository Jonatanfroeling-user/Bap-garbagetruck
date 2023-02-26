const Grid = new GridClass()

// need to be gloabl scope as they require each other
// normally tis would just be a request send to a server
let dom, offlineServer;

// active user
let currentUser = null
let otherUser = null



async function main() {
  offlineServer = new ServerClass()
  await offlineServer.boot()
  // init routes for users
  // normally inited on each different device seperately
  currentUser = offlineServer.assignRoute('louis', 'route1')
  otherUser = offlineServer.assignRoute('ahmed', 'route2')

  currentUser.route.initMarkers()
  otherUser.route.initMarkers()
  
  dom = new HtmlOutClass()
  dom.createUserSelect(offlineServer.users)

  // settup of grid, saves all points to values
  // in order for the grid to check them
  // note: this shouold be done for each seprate device of course
  const allc = [...currentUser.route.lookupNodes.values(), ...otherUser.route.lookupNodes.values()].flat()
  Grid.init(allc)

  let stop = 0
  while(!currentUser.done && !otherUser.done) {
    if(stop++ > 10000) return log('exit loop')
    await sleep(0.05)
    currentUser.move()
    otherUser.move()

    Grid.checkPointsInRadius(currentUser.getPos())
    Grid.checkPointsInRadius(otherUser.getPos())


  }



  console.time('route')
  //Route.getGobalStats()
  console.timeEnd('route')
}


document.onload = main()

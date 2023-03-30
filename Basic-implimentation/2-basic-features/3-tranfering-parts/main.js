const Grid = new GridClass()
const offlineServer = new ServerClass()
// need to be gloabl scope as they require each other
// normally tis would just be a request send to a server
let dom, currentUser, otherUser;



async function main() {
  console.time('route')
  await offlineServer.boot()
  // init routes for users
  // normally inited on each different device seperately
  currentUser = offlineServer.assignRoute('louis', 'route-1')
  otherUser = offlineServer.assignRoute('ahmed', 'route-2')

  currentUser.route.initMarkers()
  otherUser.route.initMarkers()
  
  dom = new HtmlOutClass()

  // settup of grid, saves all points to values
  // in order for the grid to check them
  // note: this shouold be done for each seprate device of course
  const allc = [...currentUser.route.lookupNodes.values(), ...otherUser.route.lookupNodes.values()].flat()
  Grid.init(allc)
  console.timeEnd('route')

  return console.info('!--not actively driving for testing for testing purpuses--!')

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

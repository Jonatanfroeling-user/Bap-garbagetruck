


/** MAIN **/
const Grid = new GridClass()
const Route = new RouteClass()
const driverX = new DriverClass()


async function main() {

  const raw = await loadJsonData('ronse-StreetParts-276.json')

  // iterates all streets
  for (let content of Object.values(raw)) {
    Route.addStreet(content.name, content.parts)
  }
  Route.init()
  const allc = [...Route.reverseLookup.values()].flat()
  Grid.init(allc)

  driverX.addDestinations(allc.map(i=>i.coords))



  console.time('route')
  while(!driverX.done){
    await sleep(0.1)
    driverX.move()
    Grid.checkPointsInRadius(driverX.getPos())
    //if (driverX.destinations.length % 33 == 0) Route.getGobalStats()
  }
  //Route.getGobalStats()
  console.timeEnd('route')
}


main()

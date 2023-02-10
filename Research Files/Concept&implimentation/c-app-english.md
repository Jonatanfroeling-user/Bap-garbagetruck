# Technical
The platform consists of 3 parts:
- truck driver app (mobile/touchpad) 
- an admin app that can assign routes to a drivers profile. Also an overview of all active routes with trucks
- a CRUD api that calculates and provides routing and data



Flow

login
The login is done via email (or Addeco).
Only an admin can assign you as "driver", giving you access to extra information such as:
extra info on the map with tips, communication and live tracking overview of other drivers.

There is a map and a dropwdowm menu including a profile with e.g. language settings.
Below the map (or as a popup) there is an input visible with "start route".

On a working day, you will get a request popup from an admin to start a route. 
If you accept it, you will also see a code at the bottom. This is the ID of your route.
Should something happen that prevents you from continuing your route, you can transfer your route to e.g. a colleague, using that ID.







## Map
Map is made up of a grid. 
``` js
    const detail = 10
    const grid = new Map()


    // function to create names for endpoints
    function convertName(x, y) {
        return `grid-${x};${y}`
    }



    // create an empty grid on scale of 'detail'
    for (let x = 0; x < mapSize; x++) {
        for (let y = 0; y < mapSize; y++) {
            if(x%detail==0 && y%detail==0) {
                grid.set(convertName(x, y), [])
            }
        }
    }

```

Each `street endpoint` (beginning or end of a street) is assigned to a particular point in the `grid`.
Each point is assigned to the closest point of the grid. There can be multiple endpoints for a gived gridpoint.


``` js
    // raw data
    const rawDataEndpoints = [{x,y},...]
    let lookrange = 50


    // distance between points
    function distance(a, b) {
        let dx = a.x - b.x;
        let dy = a.y - b.y;
        return Math.sqrt(dx * dx + dy * dy);
    }


    // street end or begining, technically also each possible conncetion to a side street
    class Endpoint {
        constructor(raw, gridpoint, distanceToPoint)
            this.visited = false
            // ...
    }



    // gets closest gridpoint in a square area.
    // the "lookrange" does not have to be a large number, thougho to small numbers will result in dysfunctional system
    // Why square? less computing than constantly calculating distances from each point
    function setClosestGridPoint(_x, _y, prev=null){
        const payload = []

        // iterate all points in a specific range
        for (let x = -lookrange; x < lookrange; x++) {
            for (let y = -lookrange; y < lookrange; y++) {
                // if an area extension is present: don't check the previously checked area, only validate the new area

                if(x%detail==0 && y%detail==0) {
                    const dis = distance({x, y}, {_x, _y})
                    // compare distance
                    if(dis < lasstdistance) {
                        if(pts.length) payload = [{x, y}, {_x, _y}, dis]
                    }
                }
            }
        }
        // update value of grid
        const [raw, pt, dis] = payload
        grid.get(convertName(pt.x, pt.y)).push(new Endpoint(raw, pt, dis))
    }
    


    // iterate and assign all raw data points
    for(let raw of rawDataEndpoints){
        setClosestGridPoint(raw.x,raw.y)
    }   

```

If there is a modification to the route, or the route needs to be recalculated.
We can make use of the `grid` by relocating the current position to the next nearest endpoint of the route (currently not incalculating the right of way and such).
We can apply the TSP algorithm to all points in a certain radius.
This radius can be increased in case no points are found.

``` js
    const currentPosition = {x,y}
    const target = Endpoint(...)
    let roadsToGo = 21

    // validaytes if goal is reached
    function finished(){
        return roadsToGo <= 0
    }


    // Extended variation of: "setClosestGridPoint"
    // looks
    function getNewTarget(prev=null){
        // resulting endpoint
        const payload = []
        // search area's
        const rx = lookrange+Math.floor(currentPosition.x)
        const ry = lookrange+Math.floor(currentPosition.y)
        // last calculated distance
        let lastdistance = Infinity

        // iterate all points in a specific range
        for (let x = -rx; x < rx; x++) {
            for (let y = -ry; y < ry; y++) {
                // if an area extension is present: don't check the previously checked area, only validate the new area
                const isoutofprevBox = prevArea ? !!((x>prev.x || x<-prev.x) && (y>prev.y || y<-prev.y)) : true

                if(isoutofprevBox && x%detail==0 && y%detail==0) {
                    const dis = distance({x, y}, currentPosition)
                    // compare distance
                    if(dis < lastdistance) {
                        // check if point is already visited or not
                        const pts = grid.get(convertName(x, y)).filter(i=>!i.visited)
                        // require validation of driving
                        // ..
                        if(pts.length) payload = [{x, y}]
                    }
                }
            }
        }
        // if no results where found in the current area
        if(payload.length=0) {
            // re-iterate the same funciton but giving the parameters of the current radius,
            return getNewTarget({x: rx, y: ry})
        }

        return payload
    }

    // if rached target, assign new target
    if(distance(currentPosition, target) <= 1) {
        target.checked = true
        roadsToGo--
        if(!finished()) target = getNewTarget()
    }


```
Conclusion:
The reasoning of using a grid and not just the endpoints themselves it that it takes exponentially more computing to calcualte
the distance from ech endpoint to each endpoints, with a grid you can filter only near points.
Example: 
having 20 endpoints, it would take 20^20 calculations to find the closest endpoint to posisiton x.
But using a grid, we can iterate all gridpoints in a area and so only need to calculate the distance of maybe 4^4 endpoints.


This results in a very simple and fast relocation system, where the size of the map of amount of endpoints don't have a direct impact on the performace.
This method can be improved with multiple methods and algorithms and is therefpre very scalable to possible future development.
// a street node point
class StreetNode {
    constructor(coords, partId, street, inbetweenIdx = 0) {
        this.coords = coords
        this.partId = partId
        this.id = JSON.stringify(coords)
        this.x = coords[0]
        this.y = coords[1]

        this.street = street
        this.checked = false
        // ref to grid
        this.gridPoint = null
        // can be filtered to maximize performance
        this.inbetweenIdx = inbetweenIdx
    }
    setChecked() {
        this.checked = true
        this.street.displayStats()
    }
    isDone() {
        return !!this.checked
    }
    // some streets share the same coordinate
    addDuplicateStreet(name) {
        this.streets.push(name)
    }
}


// a street part exists out of multiple nodes
class StreetPart {
    constructor(nodes, id, street) {
        this.nodes = nodes
        this.partId = id
        this.street = street

        this.rawNodes = [...nodes.values()].map(i => i.coords)
        this.finished = false
    }
}


// a street exists out of multiple street parts
class Street {
    constructor(name, statElm) {
        this.element = statElm
        this.name = name
        this.parts = new Map()
        this.nodes = []
        this.max = 0
        this.progress = 0
    }
    addPart(nodes, partId) {
        this.parts.set(this.parts.size, new StreetPart(nodes, partId, this))
        this.max += nodes.size
        this.nodes.push(...nodes.values())
    }

    displayStats() {
        this.progress = this.nodes.filter(i => i.checked).length
        this.element.innerHTML = `${this.name} - &#09; ${Math.round((this.progress/this.max)*100)}% - ${this.progress}/${this.max} ${this.progress === this.max ? "-----DONE" : ''}`
    }
}

// truck driver
class DriverClass {
    constructor(id, targets) {
        this.id = id
        this.targets = targets
        this.destinations = []
        this.done = false

        this.checkedCoords = new Set()

        this.truck = getIcon(ronseCenter)
    }
    addDestinations(routes){
        this.destinations = routes
    }
    move(){
        this.truck.setLatLng(this.destinations.shift());
        if(!this.destinations.length) this.done = true
    }
    getPos() {
        return this.truck.getLatLng()
    }
}

// stats
class StatisticsClass {
    constructor(){
        this.parentElement = document.createElement('div')
        this.parentElement.id = "stats"
        document.body.appendChild(this.parentElement)

    }
    create(){
        const statsElm = document.createElement('p')
        statsElm.id = "stat-elm-"+this.parentElement.childNodes.length
        this.parentElement.appendChild(statsElm)
        return statsElm
    }
}


class GridCell {
    constructor(coords, id){
        this.coords = coords
        this.id = id
        this.checked = false
    }
}


// grid class
class GridClass {
    constructor() {
        this.grid = new Map();
        this.searchRange = 0.000001; // 1 meter
        this.cellSize = this.searchRange * 10; // 10 meters

        this.searchRadius = this.cellSize * 30

        // Calculate the number of cells within the radius
        this.cellsInRadius = Math.ceil(this.searchRadius / this.cellSize);

        //this.visual = L.circle(ronseCenter, this.searchRadius).addTo(MAP)
        //this.marker = new L.marker(ronseCenter).addTo(MAP)
       // this.tile = new L.rectangle(ronseArea, {color: 'orange',fillColor: '#f80',fillOpacity: 0.3}).addTo(MAP);
    }
    toCellCoord(x, y){
        return JSON.stringify([toFixed(x,4),toFixed(y,4)])
    }
    init(nodes) {
        nodes.forEach(p => {
            let y = Math.floor((p.y + 90) / this.cellSize); // i
            // log(p.y, (p.y + 90), y)
            // exit()
            let x = Math.floor((p.x + 180) / this.cellSize); // j
            const id = toCoordId(x,y)
            if(this.grid.has(id)) {
                this.grid.set(id, [...this.grid.get(id), p])
            } else {
                this.grid.set(id, [p])
            }
        });


    }

    checkPointsInRadius(position) {
        //this.visual.setLatLng(Object.values(position))


        // Get the coordinates of the cell containing the given coordinates
        const cellX = Math.floor((position.lat + 180) / this.cellSize);
        const cellY = Math.floor((position.lng + 90) / this.cellSize);




        // function yy(a){
        //     return +String(a).split('').splice(1,50).join('')/100000
        // }
        // const xx = (a)=> +String(a).split('').splice(3,50).join('')/100000 + 50

        // const area = [[xx(cellX-this.cellsInRadius),yy(cellY-this.cellsInRadius)],[xx(cellX+this.cellsInRadius), yy(cellY+this.cellsInRadius)]]
        // this.tile = new L.rectangle(area, {color: 'orange',fillColor: '#f80',fillOpacity: 0.3}).addTo(MAP);


        // Iterate through the grid points in the cells within the radius
        for (let x = cellX - this.cellsInRadius; x <= cellX + this.cellsInRadius; x++) {
            for (let y = cellY - this.cellsInRadius; y <= cellY + this.cellsInRadius; y++) {

                let cells = this.grid.get(toCoordId(x,y))
                if(cells) cells.forEach(node=>{
                    if(!node.checked) node.setChecked()
                })
            }
        }

    }
}


// overview of all data, basically all data related to the roads
class RouteClass {
    constructor(){
        this.streetsMap=new Map()
        // store all streets by coordinates. 
        // Used for reversed lookup the road by coordinates
        this.reverseLookup=new Map()
        this.done=0
        this.todo=100
        this.statistics = new StatisticsClass()

    }
    init() {
        // adds streets routes
        this.streetsMap.forEach(street => {
            street.parts.forEach(p => {
                createMarker(p.street.name, p.rawNodes, `hsl(${randint(0,360)},${50}%, ${50}%, 0.5)`, 5)
            })
        })

        this.streetsMap.forEach(s => s.displayStats())
    }
    // mechanism convertign all json data into objects
    // note: all nodes are only created once and share the reference to their street
    addStreet(name, parts) {
        const statsElm = this.statistics.create()
        const street = new Street(name, statsElm)

        for (let rawPart of parts) {
            const {
                coords,
                id
            } = rawPart

            const _part = []
            // add in between waypoints
            coords.reduce((t, c) => {
                if (t) {
                    _part.push(...getIntermediate(t, c))
                    _part.push(c)
                }
                return c
            })

            const nodes = new Map([..._part.map(i => [JSON.stringify(i), new StreetNode(i, id, street)])])
            street.addPart(nodes, id)

            nodes.forEach((k, v) => {
                if (this.reverseLookup.has(v)) {
                    this.reverseLookup.set(v, [...this.reverseLookup.get(v), k])
                } else this.reverseLookup.set(v, [k])
            })
        }

        this.streetsMap.set(name, street)
    }
    // intis state, required for stats
    initStats() {
        this.streetsMap.forEach(s => s.displayStats())
    }
    // updates node state 
    check(id) {
        this.reverseLookup.get(id)?.forEach(n => {
            n.setDone(true)
        })
    }
    // logs current state of route
    getGobalStats() {
        const r = [...this.reverseLookup.values()].flat()
        const val = r.filter(i => i.checked).length / r.length
        console.info("Current percentage of route:", val.toFixed(2))
    }
}
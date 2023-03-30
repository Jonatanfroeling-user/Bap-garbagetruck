// a street node point
class StreetNode {
    constructor(coords, partId, street) {
        this.coords = coords
        this.partId = partId
        this.street = street
        this.x = coords[0]
        this.y = coords[1]


        this.checked = false
    }
    setChecked() {
        if(this.checked)return
        this.checked = true
        this.street.displayStats()
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

// grid cell, contains nodes
class GridCell {
    constructor(nodes){
        this.nodes = nodes
        this.checked = false
    }
}


// grid class
class GridClass {
    constructor() {
        this.cells = new Map();
    }
    toCellCoord(x, y){
        return JSON.stringify(toFixed(x,5)+';'+toFixed(y,5))
    }
    init(nodes) {
        // create temporary grid
        const tempGrid = {}
        nodes.forEach(p => {
            const id = this.toCellCoord(p.x,p.y)
            tempGrid[id] = tempGrid.hasOwnProperty(id) ? [...tempGrid[id], p] : [p]
        });

        // create grid cells with temporary grid
        for(let [key,vals] of Object.entries(tempGrid)){
            this.cells.set(key, new GridCell(vals))
        }
    }

    checkPointsInRadius(position) {
        const id = this.toCellCoord(position.lat,position.lng)

        const cell = this.cells.get(id)
        if(cell && !cell.checked) {
            cell.nodes.forEach(node=>node.setChecked())
            cell.checked = true
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
            street.displayStats()
        })
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
            // add in between waypoints between every 't' and 'c' point
            coords.reduce((t, c) => {
                if (t) {
                    _part.push(...getIntermediate(t, c))
                    _part.push(c)
                }
                return c
            })



            const nodes = new Map([..._part.map(i => [JSON.stringify(i), new StreetNode(i, id, street)])])
            street.addPart(nodes, id)
            // iterate nodes, might be duplicates (connecting street endpoints) so need to store as arrays
            // on the other hand, maybe duplciate values could be shared by a street, but we can't remove them from a street as a street with 1 node could be gone
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
    // logs current state of route
    getGobalStats() {
        const r = [...this.reverseLookup.values()].flat()
        const val = r.filter(i => i.checked).length / r.length
        console.info("Current percentage of route:", val.toFixed(2))
    }
}
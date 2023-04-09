/** Street & nodes */
// a street node point
class StreetNode {
    constructor(id, partId, coords, street) {
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
// it also contains the SVG leaflet marker item, and the user
class StreetPart {
    constructor(partId, nodes, street) {
        //this.id = id
        this.nodes = nodes
        this.partId = partId
        this.street = street
        this.rawNodes = [...nodes.values()].map(i => i.coords)

        this.marker = null
        this.finished = false
    }

    setMarker(){
        this.marker = createMarker(String(this.partId), this.rawNodes, this.street.user.color)
    }
    removeMarker(){
        MAP.removeLayer(this.marker)
        //return [String(this.partId), this.rawNodes]
    }
}

// a street exists out of multiple street parts
class Street {
    constructor(name, rawParts, statElm) {
        this.element = statElm
        this.name = name
        this.parts = new Map()
        this.rawParts = rawParts
        this.nodes = []
        this.max = 0
        this.progress = 0
    }
    addPart(nodes, partId) {
        this.parts.set(this.parts.size, new StreetPart(partId, nodes, this))
        this.max += nodes.size
        this.nodes.push(...nodes.values())

        return this.parts.get(this.parts.size -1)
    }
    // adds user to all parts
    setUser(user){
        this.user = user
    }

    displayStats() {
        this.progress = this.nodes.filter(i => i.checked).length
        this.element.innerHTML = `${this.name} - &#09; ${Math.round((this.progress/this.max)*100)}% - ${this.progress}/${this.max} ${this.progress === this.max ? "-----DONE" : ''}`
    }

    getRaw(){
        return this.rawParts
    }
}

// overview of all data, basically all data related to the roads
class RouteClass {
    constructor(id, user=null) {
        this.id = id
        // reverse lookup by street name
        this.lookupStreet=new Map()
        // store all streets by coordinates. 
        // Used for reversed lookup the road by coordinates
        this.lookupNodes=new Map()
        // reverse lookup part of street in case of switching it to another user
        this.lookupPart=new Map()

        this.done=0
        this.todo=100
        this.statistics = new StatisticsClass()

        if(user) this.initUser(user)
    }

    // adds user to all streets
    initUser(user){
        if(!user) user = this.user
        if(!user) return log('No user found to assign')
        this.lookupStreet.forEach(s => s.setUser(user))
    }

    // creates leaflet markers
    initMarkers() {
        // adds streets routes
        this.lookupStreet.forEach(street => {
            street.parts.forEach(p => {
                if(!p.marker) p.setMarker()
            })
            street.displayStats()
        })
    }

    // mechanism convertign all json data into objects
    // note: all nodes are only created once and share the reference to their street
    addStreet(name, parts, user=null, initMarker) {
        const street = this.lookupStreet.get(name) || new Street(name, parts, this.statistics.create())

        // iterate all parts
        // then add each part to a street
        for (let rawPart of parts) {
            const subdevided = this.subDevidePart(rawPart.coords)

            const nodes = new Map([...subdevided.map(i => [JSON.stringify(i), new StreetNode(JSON.stringify(i),rawPart.id, i, street)])])
            const part = street.addPart(nodes, rawPart.id)


            // adds parts to street and saves it to this route for possible reverse lookup
            this.lookupPart.set(String(rawPart.id), part)
            // iterate nodes, might be duplicates (connecting street endpoints) so need to store as arrays
            // on the other hand, maybe duplciate values could be shared by a street, but we can't remove them from a street as a street with 1 node could be gone
            nodes.forEach((k, v) => {
                if (this.lookupNodes.has(v)) {
                    this.lookupNodes.set(v, [...this.lookupNodes.get(v), k])
                } else this.lookupNodes.set(v, [k])
            })
        }

        if(user) street.setUser(user)
        if(!this.lookupStreet.has(name)) this.lookupStreet.set(name, street)

        if(initMarker) {
            this.initMarkers()
        }
    }

    // removes street from memory
    removeStreet(name){
        const street = this.lookupStreet.get(name)
        if(!street) return log('cannot remove street as route deos not contain it: '+name)
        street.parts.forEach(part=>{
            this.removePart(part.partId)
        })
        this.lookupStreet.delete(name)
    }

    // removes part from memory
    removePart(id){
        const part = this.lookupPart.get(id)
        if(!part) return log('Cant delete part that is not here')
        part.nodes.forEach(node=>{
            this.lookupNodes.delete(node.id)
        })
        part.removeMarker()
        this.lookupPart.delete(part.partId)
    }
    
    subDevidePart(coords){
        const response = []
        // add in between waypoints between every 't' and 'c' point
        coords.reduce((t, c) => {
            if (t) {
                response.push(...getIntermediate(t, c))
                response.push(c)
            }
            return c
        })
        return response
    }
    // intis state, required for stats
    initStats() {
        this.lookupStreet.forEach(s => s.displayStats())
    }
    // logs current state of route
    getGobalStats() {
        const r = [...this.lookupNodes.values()].flat()
        const val = r.filter(i => i.checked).length / r.length
        console.info("Current percentage of route:", val.toFixed(2))
    }
}



/** Grid */
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
        // create temporary gridf
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
        if(!position||!position.lat)return info('no position', position)
        const id = this.toCellCoord(position.lat,position.lng)

        const cell = this.cells.get(id)
        if(cell && !cell.checked) {
            cell.nodes.forEach(node=>node.setChecked())
            cell.checked = true
        }
    }
}

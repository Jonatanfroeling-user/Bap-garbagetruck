/** Street & nodes */
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
// it also contains the SVG leaflet marker item, and the user
class StreetPart {
    constructor(nodes, id, street) {
        this.nodes = nodes
        this.partId = id
        this.street = street
        this.rawNodes = [...nodes.values()].map(i => i.coords)

        this.user = null
        this.marker = null
        this.finished = false
    }
    addUser(user){
        this.user = user
    }
    addMarker(){
        this.marker = createMarker(String(this.partId), this.rawNodes, this.user.color)
    }
    removeMarker(){
        MAP.removeLayer(this.marker)
        //return [String(this.partId), this.rawNodes]
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
        this.parts.set(this.parts.size, new StreetPart(nodes,partId, this))
        this.max += nodes.size
        this.nodes.push(...nodes.values())

        return this.parts.get(this.parts.size -1)
    }

    displayStats() {
        this.progress = this.nodes.filter(i => i.checked).length
        this.element.innerHTML = `${this.name} - &#09; ${Math.round((this.progress/this.max)*100)}% - ${this.progress}/${this.max} ${this.progress === this.max ? "-----DONE" : ''}`
    }
}

// truck driver
// every trip a new instance is made as a user can be assigned a driver with a route
class DriverClass {
    constructor(id, user, route) {
        route.user = user

        this.user = user
        this.route = route
        this.destinations = [...this.route.lookupNodes.values()].flat()

        
        this.id = id

        this.truck = getIcon(ronseCenter)
        this.done = false


        this.checkedCoords = new Set()

        this.position = this.truck.getLatLng()
        this.currentDestination = null
    }
    // move will be real life location tracking so this system will be compleatly different
    move(){
        if(this.done)return info('done.. :)')
        this.position = this.destinations.next()
        if(this.position.current === this.destinations.length-1) this.done = true

        this.truck.setLatLng(this.position.coords);
    }
    getPos() {
        return this.truck.getLatLng()
    }
    responseMsg(msg,code=0){
        return {code: code, message:msg}
    }
    recieveTransferRequest(partId, streetName, partData){
        log(3, partId, streetName, partData)
        // has that part
        if(this.route.lookupPart.has(String(partId))) {
            return this.responseMsg('Already has part', 1)
        }
        // has that street
        if(this.route.lookupStreet.has(streetName)) {
            return this.responseMsg('has street', 2)
        }
        // new street
        this.route.addStreet(streetName, [partData])
        //this.route.lookupPart.get(String(partId))
        const newPart=otherUser.route.lookupPart.get(partId)
        newPart.addUser(this.user)
        newPart.addMarker()

        //const marker = createMarker(partId, partData.coords, this.user.color)

        //GridCell.lookupPart(partId).marker = createMarker()
        return this.responseMsg('Succes', 0)
    }
    sendTransferRequest(id, targetUser){
        const part = this.route.lookupPart.get(String(id))
        if(!part) return log('User does own the part requested to send')
        const res = offlineServer.handleStreetTransfer(id, part.street.name, targetUser)
        if(res.code >0) return log('Error tranfering:', res.message)
        log('succes tranfering:', res.message)

        part.removeMarker()
        return true
    }
}

// overview of all data, basically all data related to the roads
class RouteClass {
    constructor() {
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
    }

    // adds user
    initUser(user){
        this.lookupPart.forEach(s => s.addUser(user))

    }

    // creates leaflet markers
    initMarkers() {
        // adds streets routes
        this.lookupStreet.forEach(street => {
            street.parts.forEach(p => {
                if(!p.marker) p.addMarker()
            })
            street.displayStats()
        })
    }

    // mechanism convertign all json data into objects
    // note: all nodes are only created once and share the reference to their street
    addStreet(name, parts) {
        const statsElm = this.statistics.create()
        const street = this.lookupStreet.get(name) || new Street(name, statsElm)

        // iterate all parts
        // then add each part to a street
        for (let rawPart of parts) {
            const _part = this.subDevidePart(rawPart.coords)

            const nodes = new Map([..._part.map(i => [JSON.stringify(i), new StreetNode(i, rawPart.id, street)])])
            // adds parts to street and saves it to this route for possible reverse lookup
            this.lookupPart.set(String(rawPart.id), street.addPart(nodes, rawPart.id))
            // iterate nodes, might be duplicates (connecting street endpoints) so need to store as arrays
            // on the other hand, maybe duplciate values could be shared by a street, but we can't remove them from a street as a street with 1 node could be gone
            nodes.forEach((k, v) => {
                if (this.lookupNodes.has(v)) {
                    this.lookupNodes.set(v, [...this.lookupNodes.get(v), k])
                } else this.lookupNodes.set(v, [k])
            })
        }

        if(!this.lookupStreet.has(name)) this.lookupStreet.set(name, street)
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

// statistics, html preview
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

/** Server/ fake-api */
// object serving as server for users
class ServerClass {
    constructor(){
        this.users ={
            pol:{name: 'pol', color:"#a47", activeRoute: null},
            ahmed:{name: 'ahmed', color:"#4a7", activeRoute: null},
            louis:{name: 'louis', color:"#47a", activeRoute: null},
            bram:{name: 'bram', color:"#93f", activeRoute: null},
            annelies:{name: 'annelies', color:"#f7a", activeRoute: null},
        }

        this.routes = new Map()
        this.activeDrivers = new Map()
        this.rawParts = new Map()
    }
    // as routes are still generated, this workaround lets you add them
    // normally the server (or local) would contain all routes as static data
    async boot(){
        const rawJsonData = await loadJsonData();
        const route1 = new RouteClass()
        const route2 = new RouteClass()

        // iterates all streets
        // for testing purposes devide all streets in twoo different routes
        Object.values(rawJsonData).forEach((content, idx)=>{
            if(idx%2==0) route1.addStreet(content.name, content.parts)
            else route2.addStreet(content.name, content.parts)
            for(let i of content.parts){
                this.rawParts.set(String(i.id), i)
            }
        })


        this.routes.set('route1', route1)
        this.routes.set('route2', route2)
    }

    // assing routes, would be normally done in beginning of day or on request or by admin
    assignRoute(userId, routeId){
        const route = this.routes.get(routeId)
        const user = this.users[userId]

        user.activeRoute = routeId
        this.activeDrivers.set(userId, routeId)
        route.initUser(user)


        // reutrn new driver, should be done local somehow, maytbe just ahcgen name of this function
        return new DriverClass(
            String(Math.random()), 
            user, 
            route
        )
    }

    // request to transfer a road to another user
    // can be a whole street or part of a street
    handleStreetTransfer(id, streetName, targetUser=''){
        log(2, id)

        return otherUser.recieveTransferRequest(id, streetName, this.rawParts.get(String(id)))
    }
}

/** cerated and handles html popup forms and such */
// note: currently also handles requests
class HtmlOutClass {
    constructor(){
        const container = document.getElementById('prompt_form_transfer');

        this.form={
            parent: container.parentElement,
            container: container,

            userFrom: container.querySelector("input[name='user-from']"),
            userTo: container.querySelector("select[name='user-to']"),
            wayStreet: container.querySelector("input[name='way-street']"),
            wayId: container.querySelector("input[name='way-id']"),

            error: container.querySelector(".alert.alert-danger"),
            btnCancel: container.querySelector("button#transfer_close"),
        }
        // event
        this.form.container.addEventListener('submit', (e)=>{
            e.preventDefault();
            this.handleFormSubmit()
        })
        
        // set input to current user
        this.form.userTo.value = currentUser.user.name


        // set close button event
        this.form.btnCancel.addEventListener('click', (event)=>{
            this.form.parent.classList.add('hide')
        })
    }


    handleFormSubmit(event){
        const data = new FormData(this.form.container )
        const targetUser = data.get('user-to')
        const id = data.get('way-id')
        if(!id)return info('no street selected')
        log(1, id)
        //Object.fromEntries([...a])

        currentUser.sendTransferRequest(id, targetUser)
        this.form.parent.classList.add('hide')
    }

    // open user select form
    promptRequest(id){
        const data=currentUser.route.lookupPart.get(id)
        if(!data) return warn('448: Current user does not contain street part: '+id)
        for(let [name, info] of Object.entries(offlineServer.users).filter(i=>i[1].activeRoute)){
            if(name === currentUser.user.name) continue
            this.form.userTo.innerHTML += `<option>${name}</option>`
        }
        this.form.userFrom.value=currentUser.user.name
        this.form.wayId.value = id
        this.form.wayStreet.value = data.street.name

        this.form.parent.classList.remove('hide')
    }

    createUserSelect(users){
        return
        for(let [name, info] of Object.entries(users)){
            this.form.userSelect.innerHTML += `<option>${name}</option>`
        }
        this.userTo.innerHTML+= `<option value="${value}">${text||value}</option>`

    }
}

// truck driver
// every trip a new instance is made as a user can be assigned a driver with a route
class DriverClass {
    constructor(id, user, route) {
        route.initUser(user)

        this.user = user
        this.route = route
        this.destinations = [...this.route.lookupNodes.values()].flat()
        this.id = id

        this.truck = getIcon(ronseCenter)
        this.done = false


        this.position = this.truck.getLatLng()
        this.currentDestination = null

        this.pendingActions = new Map()
    }
    // move will be real life location tracking so this system will be compleatly different
    move(){
        if(this.done)return info('done.. :)')
        this.position = this.destinations.next()
        if(!this.position) {
            this.done = true
            return
        }
        if(this.position.current === this.destinations.length-1) this.done = true

        this.truck.setLatLng(this.position.coords);
    }
    getPos() {
        return this.truck.getLatLng()
    }


    // transfer: 2 - get request from other user via server
    recieveTransferRequest(request){
        let action;

        // select whole street or not
        if(request.street){
            action = ()=>{
                this.route.addStreet(request.name, request.data, this.user, true)
            }
        // only select part
        } else {
            action = ()=>{
                dd(request)
                this.route.addStreet(request.data.name, [request.data], this.user, true)
            }
        }
        this.pendingActions.set(request.id, action)
        info('5 - user2 - recieve req', request)
        dom.promptRecieveRequest(request)
    }

    // transfer: 1 - send request via server
    // also add action to remove street from own emmory as a pending action
    sendTransferRequest(event){
        // filter data
        const form = new FormData(event.target)

        const requestBody = {
            from: form.get('user-to'),
            to: form.get('user-from'),

            id: form.get('way-id'),
            name: form.get('way-street'),

            street: !!form.get('way-select-all'),
            routeId: this.route.id
        }
        let action=()=>null;


        // select whole street or not
        if(requestBody.street){
            if(!this.route.lookupStreet.has(requestBody.name)) return log('Cannot request transfering an unknown street')
            action = ()=>{
                this.route.removeStreet(requestBody.name)
            }
        // only select part
        } else {
            if(!this.route.lookupPart.has(String(requestBody.id))) return log('Cannot request transfering an unknown part')
            action = ()=>{
                this.route.removePart(requestBody.id)
            }
        }
        info('3 - user1 - send req', requestBody)
        this.pendingActions.set(requestBody.id, action)
        
        offlineServer.handleTransferRequest(requestBody)
    }

    // transfer: 3 - sending server response 
    sendTransferResponse(accepted, id){
        const response = {
            code: accepted ? 1 : 0,
            message: '',
            id: id
        }
        if(accepted) this.pendingActions.get(id)()
        this.pendingActions.delete(id)
        info('7 - user2 - send resp', response)
        offlineServer.handleTransferResponse(response)
    }

    // transfer: 4 - recieve server response 
    recieveTransferResponse(response){
        const {id, code} = response
        if(code) {
            this.pendingActions.get(id)()
            log('Request accepted!')
        }
        else log('Request declined!')

        info('9 - user1 - ... ', response)
        // clear peding actions cache
        this.pendingActions.delete(id) 
    }
}
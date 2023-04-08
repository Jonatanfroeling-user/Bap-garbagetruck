
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
        // need ot be raw, as full routes can not be usd locally bcs of object refferences
        this.rawRoutes = new Map()
        this.rawStreets = new Map()
        this.rawParts = new Map()
    }

    // as routes are still generated, this workaround lets you add them
    // normally the server (or local) would contain all routes as static data
    async boot(){
        const rawJsonData = await loadJsonData();


        // iterates all streets
        Object.values(rawJsonData).forEach((street, idx)=>{
            this.rawStreets.set(street.name, street.parts)
            for(let i of street.parts){
                this.rawParts.set(String(i.id), i)
            }
        })

        const route1 = {}

        this.rawStreets.forEach((street, name)=>{
            route1[name] = street
        })

        this.rawRoutes.set('route-1', route1)
    }

    getRawRoute(id){
        return this.rawRoutes.get(id)
    }

    // assing routes, would be normally done in beginning of day or on request or by admin
    assignRoute(userId, routeId){
        const user = JSON.copy(this.users[userId])
        const route = new RouteClass(routeId, user)
        this.users[userId].activeRoute = routeId

        for(let [name, raw] of Object.entries(this.rawRoutes.get(routeId))){
            route.addStreet(name, raw, user)
        }


        // reutrn new driver, should be done local somehow, maytbe just ahcgen name of this function
        return new DriverClass(
            userId+Math.random(), 
            user, 
            route
        )
    }

     // transfer: 1 - send request to other user
     // adds raw data with request
     // future update maybe only send data if user accepts, then start download
    handleTransferRequest(request){
        let data;
        //street
        if(request.street){
            data = this.rawStreets.get(request.name)
        // part
        } else {
            data = this.rawParts.get(request.id)
        }
        const response = {...request, data:JSON.copy(data)}

        info('6 - server - send req', response)

        otherUser.recieveTransferRequest(response)
    }

    handleTransferResponse(response){
        info('9 - server - resp', response)
        currentUser.recieveTransferResponse(response)
    }
}

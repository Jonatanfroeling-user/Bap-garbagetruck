# Techisch
Het platform bestaat uit 3 delen:
- een app voor de bestuurder (mobile/touchpad) 
- een admin app die routes kan toewijzen aan een baald profiel, met een overzicht van alle actieve routes
- een CRUD api die routes berekend of aangeeft



## Flow

### login
De login gebeurd via email (of Addeco).
Enkel een admin kan je toewijzen als "bestuurder", waarbij je toegang hebt tot extra informatie zoals:
extra info op de kaart met tips, communicatie en live tracking overzicht van andere bestuurders.

Er is een kaart en een dropwdowm menu met oa. een profiel met bv. taal instellingen.
Onder de kaart (of als popup) is er een input zichbaar met "start route".

Op een werkdag zul je een aanvraag popup krijgen van een admin om een route te starten. 
Als je deze aanvaard zul je onderaan ook een code zien. Dit is de ID vanm je route.
Moest iets voorkomen dat er voor zocht dat jij niet in staat bent je route te continueren, kun je je route overdragen aan bv. een collega, met die ID.







## Kaart
Kaart is opgemaakt uit een grid. 
``` js
    const detail = 10
    const grid = new Map()


    // function to create names for endpoints
    function convertName(x, y){
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

Iedere `straat-endpoint` (begin of einde van een straat) wordt aan een bepaald punt in het `grid` toegekend.

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
    // the "lookrange" does not have to be a large number, altho to small numbers will result in disfunctional system
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
        const [raw, pt, dis]= payload
        grid.get(convertName(pt.x, pt.y)).push(new Endpoint(raw, pt, dis))
        // const n = convertName(pt.x, pt.y)
        // const point = grid.get(n)
        // point.push(new Endpoint(raw, pt, dis))
    }
    


    // iterate and assign all raw data points
    for(let raw of rawDataEndpoints){
        setClosestGridPoint(raw.x,raw.y)
    }   

```

Als er een aanpassing is aan de route, of de route moet met andere woorder herberekend worden,
kunnen we de de punten uit het `grid` gebruiken.

We kunnen hier het TSP algoritme op toepassen, op alle punten in een bepaalde radius.
Deze radius kunne we vergroten in geval dat er geen punter gevonden worden.

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
        const payload = []
        const rx = lookrange+Math.floor(currentPosition.x)
        const ry = lookrange+Math.floor(currentPosition.y)

        // iterate all points in a specific range
        for (let x = -rx; x < rx; x++) {
            for (let y = -ry; y < ry; y++) {
                // if an area extension is present: don't check the previously checked area, only validate the new area
                const isoutofprevBox = prevArea ? !!((x>prev.x || x<-prev.x) && (y>prev.y || y<-prev.y)) : true

                if(isoutofprevBox && x%detail==0 && y%detail==0) {
                    const dis = distance({x, y}, currentPosition)
                    // compare distance
                    if(dis < lasstdistance) {
                        // check if point is already visited or not
                        const pts = grid.get(convertName(x, y)).filter(i=>!i.visited)
                        // require validation if street is going in right way of driving
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
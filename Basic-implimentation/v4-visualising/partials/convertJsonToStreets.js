

/** filters raw data into a street with sub-parts **/
async function rawDataToStreetData(){
    const fetched = await fetch('../../data/ronse-allStreets-146.json')
    const raw = await fetched.json()

    const allStreets = {}
    const converted = new Map()

    // iterates all streets
    for(let rawStreet of raw.features) {
        const rawcoords = rawStreet.geometry.coordinates.map(i=>i.reverse())
        const {name, junction} = rawStreet.properties
        if(!rawcoords.length || junction) continue
        // const coords = []

        // // add in between waypoints
        // rawcoords.reduce((t,c)=>{
        //     if(t){
        //         coords.push(c)
        //         coords.push(...getIntermediate(t,c))
        //     }
        //     return c
        // },null)
        
        // adds ndoes to street or inits new street
        if(converted.has(name)) converted.set(name, [...converted.get(name),rawcoords])
        else converted.set(name, [rawcoords])

    }

    // creates streets with all their parts
    for(let [name, parts] of converted.entries()){
        allStreets[name] = parts
    }
    document.body.innerHTML = JSON.stringify(allStreets)
}


rawDataToStreetData()

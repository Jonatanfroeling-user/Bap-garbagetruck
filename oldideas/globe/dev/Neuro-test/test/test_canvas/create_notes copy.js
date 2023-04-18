
function genNotes() {
    const res = []
    // notes amount. ! currently needs to be rootable/sqrt
    const amt = 9
    // how many links to other notes each note has
    const links = 2



    const notes = range(amt).map(i=>{
        return {title: "t_"+randstr(8), linked:[]}
    })
    notes.forEach(n => {
        const _notes = JSON.copy(notes)
        for(let _ of range(links))
            n.linked.push(_notes.splice(randint(_notes.length-1), 1)[0].title)
    });
    
    /** preview notes */
    const preview = JSON.copy(notes)
    const size = 100
    const outerPadding = 100
    const innerPadding = 0

    const width = window.outerWidth-outerPadding*2
    const height = (window.outerHeight-size)-outerPadding*2
    const spaceX = width/amt+innerPadding// - size - size/2
    const spaceY = height/amt+innerPadding//2 - size - size/2
    
    const sqAmt = floor(sqrt(amt))
    let idx = 0
    const mx = outerPadding+sqAmt*size + sqAmt*spaceX
    const my = outerPadding+sqAmt*size + sqAmt*spaceY


    ctx.lineWidth = 5

    // set cubes position
    for(let x of range(sqAmt)) {
        for(let y of range(sqAmt)) {
            const i = preview[idx]
            const ni = notes[idx]
            idx++

            i.x = outerPadding+x*size + x*spaceX
            i.y = outerPadding+y*size + y*spaceY

            ni.x  = mapNum(i.x+spaceX+size-outerPadding, 0, mx, 0, 1)
            ni.y  = mapNum(i.y+spaceY+size-outerPadding, 0, my, 0, 1)

            // ni.x  = mapNum(x, 0, sqAmt, 0, 1)
            // ni.y  = mapNum(y, 0, sqAmt, 0, 1)

            //log(i.x, ni.x, i.x+spaceX+size-outerPadding, spaceX+size)
        }
    }
    //draw
    const _notes = preview.map(Object.values)
    for(let i of _notes) {
        const cl = COLORS.random()

        square(i[2]-size/2, i[3]-size/2, size, null, cl)
        for(let l of i[1]) {
            const n = _notes.filter(i=>i[0]==l)[0]
            line(i[2], i[3], n[2], n[3], cl)
        }

    }

    
    const ovl= document.createElement('textarea')
    ovl.value = JSON.stringify(notes)
    document.body.appendChild(ovl)
    return notes
}

genNotes()
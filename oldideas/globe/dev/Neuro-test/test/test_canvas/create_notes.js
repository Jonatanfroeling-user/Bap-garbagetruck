const words = (()=> {
    const w= `this question has today been forgotten. Even though in our time we deem it progressive to give our approval to 'metaphysics' again, it is held that we have been exempted from the exertions of a newly rekindled  Tij ooala. Yet the question we are touching upon is notjust a n y question. It is one which provided a stimulus for the researches of Plato and Aristotle, only to subside from then on as a theme for actual investigation What these two men achieved was to persist through many alterations and 'retouchings' down to the logic of Hegel. And what they wrested with the utmost intellectual effort from the phenomena, fragmentary and incipient though it was, has long since become trivialized.
    Not only that On the basis of the Greeks initial contributions towards an Interpretation of Being, a dogma has been developed which not only declares the question about the meaning of Being to be superfluous but sanctions its complete neglect. It is said that 'Being' is the most universal and the emptiest of concepts. As such it resists every attempt at definition. Nor does this most universal and hence indefinable concept require any definition, for everyone uses it constantly and already understands what he means by it. In this way, that which tP'- ancient philosophers found continually disturbing as something obscure and hidden has taken on a clarity and self-evidence such that if anyone continues to ask about it he is charged with an error of method.
    At the beginning of our investigation it is not possible to give a detailed account of the presuppositions and prejudices which are constantly reimplanting and fostering the belief that an inquiry into Being is unneces- sary. They are rooted in ancient ontology itself, and it will not be possible to interpret that ontology adequately until the question of Being has been clarified and answered and taken as a clue-at least, if we are to have regard for the soil from which the basic ontological concepts developed, and if we are to see whether the categories have been demonstrated in a way that is appropriate and complete. We shall therefore carry the dis cussion of these presuppositions only to the point at which the necessity for restating the question about the meaning of Being become plain. There are three such presuppositions.`.split(' ').map(i=>i.toLocaleLowerCase().split('').filter(j=>/\w/.test(j)).join(''))

    const w2 = []
    for(let i of w) if(!w2.includes(i)) w2.push(i)
    return w2
})()

// notes amount. ! currently needs to be rootable/sqrt
const AMOUNT = 9
// how many LINKS to other notes each note has
const LINKS = 8




const usedCombos = []

 function* genId(idx) {
    while(idx<= AMOUNT){
        const idLength = 8
        const id = str(idx)
        yield range0(idLength-id.length).join('')+id
        idx++;
    }
}
const idIterator = genId(0)

function genDescription(l=length) {
    let res = []

    function genNum() {
        res = range0(l).map(i=>randint(words.length-1)).join(',')
    }   
    genNum()

    
    let tries = 0
    while(usedCombos.includes(res)) {
        genNum()
        if(tries>AMOUNT) {
            l++
            tries = 0
        }
    }
    return res.split(',').map(i=>words[i]).join(' ')
}

// "nodes": [{
//     "id": "950642",
//     "user": "mbostock",
//     "description": "Force-Directed Graph"
// }],
// "links": [{
//     "source": "950642",
//     "target": "4062045"
// }]
function genNotes() {
    const ids = []

    // gen nodes
    const _nodes = range(AMOUNT).map(i=>{
        const id = idIterator.next().value
        ids.push(id)
        return {"id": id, "description": genDescription(12) }
    })

    const _links = range(AMOUNT).map(i=>{
        const id = ids.random()
        const id2 = (()=>{
            let i = ids.random()
            while(id == i) i = ids.random()
            return i
        })()
        return {"source": id, "target": id2 }
    })

    const res = {"nodes": _nodes, "links": _links}


    
    const ovl= document.createElement('textarea')
    ovl.value = JSON.stringify(res)
    document.body.appendChild(ovl)
}

genNotes()

const raw = [{"street_a":[    
    [300, 300],
    [380, 520],
    [500, 580],
]},{"street_b":[
    [520, 580],
    [580, 640],
    [680, 550],
]}
]

const ROUTES={}
const steps=8
const routed = [...(raw.map(i=>Object.values(i).flat())).flat()]
const centerpt=[300, 300]
// ctx.invert()




function getDis(a, b) {
    return Math.hypot(b[0] - a[0], b[1] - a[1])
}

function getPosTo(src, targ, dis) {
    const dx = targ[0] - src[0];
    const dy = targ[1] - src[1];
    let angle = Math.atan2(dy, dx)

    return [src[0] + dis * Math.cos(angle), src[1] + dis * Math.sin(angle)]
}

function getMid(a, b) {
    return getPosTo(a, b, getDis(a, b) / 2)
}

function subdevide() {
    mids.reduce((t, c) => {
        if (t) mids.push(getMid(t, c))
        return c

    }, null)
}



function getIntermediate(a,b){
    const res=[]
    let dis=Infinity
    let c=null
    let tracker=0

    while(dis>steps){
        if(tracker>1000)return exitting()
        c=getPosTo(a,b,tracker)
        dis=getDis(c,b)
        tracker+=steps
        res.push(c)
    }
    return res
}

// add points every x-steps
function main(){
    for(let croute of raw){
        let lastNode=null
        const name=Object.keys(croute).first()
        const routeNodes=[]

        for(let targetNode of Object.values(croute).flat()){
            if(lastNode){
                let dis=Infinity
                let c=null
                let tracker=0

                while(dis>steps){
                    if(tracker>1000)return exitting()
                    c=getPosTo(lastNode,targetNode,tracker)
                    dis=getDis(c,targetNode)
                    tracker+=steps
                    routeNodes.push(c)
                }
            }
            lastNode=targetNode
        }
        ROUTES[name]={
            midpoints:routeNodes,
            keypoints:Object.values(croute).flat()
        }
    }
}

//subdevide()




function draw(){
    for(let [id,vals] of Object.entries(ROUTES)){
        const {midpoints, keypoints}=vals
        midpoints.forEach(i => point(...i, 5, "blue"))
        keypoints.forEach(i => markPoint(...i, 20, {stroke:"red"}))
        fillText(id, ...keypoints.first(), "black", 30)
    }
}


function tellPos(p){
    clear()
    draw()
    point(p.pageX,p.pageY,10, "red")
    const pts=getIntermediate(centerpt, [p.pageX,p.pageY])
    pts.forEach(i=>point(...i,5,"green"))
    fillText(pts.length,p.pageX,p.pageY)

}
main()
addEventListener('mousemove', tellPos, false);


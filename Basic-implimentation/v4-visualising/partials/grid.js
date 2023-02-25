
function getDis(ax, ay, bx, by) {
    return Math.hypot(bx - ax, by - ay)
}

// actal data
const ronseCenter = [50.76, 3.57]
const ronseArea = [
    [50.7518, 3.6283],
    [50.7331, 3.5873]
]
// compatibility vars for actual data
const [[x1,y1],[x2,y2]]=ronseArea
const enlargement = 20000

// args
const area = {
    x:getDis(x2,y2,x1,y2) * enlargement,
    y:getDis(x2,y2,x2,y1) * enlargement
}

const areaCenter={
    x:Xmid,y:Ymid
}
const detail = 100
const areaSize = {
    x:400,y:300

}



// const ShowGridByArea=()=>{
//     const totalWidth = area.x
//     const totalHeight = area.y
//     const columns = totalWidth/detail;
//     const rows = totalHeight/detail;
//     const center = {
//         x: area.x/2,
//         y: area.y/2
//     }
//     log(2, center, area)

    
//     //let leftEdge = center.x - (totalWidth / 2); 
//     let topEdge = center.y - (totalHeight / 2);
    
//     for (let r = 0; r <= rows; r++) {
//         let leftEdge = center.x - (totalWidth / 2);
//         for (let c = 0; c <= columns; c++) {
    
//             rect(leftEdge,
//                 topEdge,
//                 leftEdge + detail,
//                 topEdge + detail, 'green')
//             fillText((leftEdge/enlargement).toFixed(5)+' ,  '+(topEdge/enlargement).toFixed(5),leftEdge+detail/8, topEdge+detail/2)
    
//             leftEdge += detail;
//             //gridcells.push(cell);
//         }
//         topEdge += detail;
//     }
// }

const ShowGridByCenter=()=>{
    const center = areaCenter

    const totalWidth = center.x 
    const totalHeight = center.y
    const columns = totalWidth/detail;
    const rows = totalHeight/detail;

    
    //let leftEdge = center.x - (totalWidth / 2); 
    let topEdge = center.y - (totalHeight / 2);
    
    for (let r = 0; r <= rows; r++) {
        let leftEdge = center.x - (totalWidth / 2);
        for (let c = 0; c <= columns; c++) {
            rect(leftEdge,
                topEdge,
                leftEdge + detail,
                topEdge + detail, 'green')
            fillText((leftEdge/enlargement).toFixed(5)+' ,  '+(topEdge/enlargement).toFixed(5),leftEdge+detail/8, topEdge+detail/2)
    
            leftEdge += detail;
            //gridcells.push(cell);
        }
        topEdge += detail;
    }
}


ShowGridByCenter()





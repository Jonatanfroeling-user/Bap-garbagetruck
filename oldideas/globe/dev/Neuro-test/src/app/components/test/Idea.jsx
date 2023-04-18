import React from "react"


import * as dir_data from '../../db/dir.min.json'

const {log}=console
function sortData(){
    window.dd = dir_data
    let stop = 0


    function searchDepth(d){
        stop++
        if(stop>9999) return log("too much")
        if(d.contents) {
            const res = []
            for(let i of d.contents) res.push(searchDepth(i))
            return res
        }  
        return d
    }
    const sorted = []
    for(let i of dir_data.default) sorted.push(searchDepth(i))
    return sorted
}


function convert(n){
    return (
        <>
        <text
            position-z={-180}
            rotation={rotation}
            {...opts}
            text={text}
            font={fonts[opts.font]}
            anchorX="center"
            anchorY="middle"
            ></text>
        </>
    )
}

// + https://codesandbox.io/s/alligatordemoreact-three-fiber-0zlu6?file=/src/components/Environment/index.js

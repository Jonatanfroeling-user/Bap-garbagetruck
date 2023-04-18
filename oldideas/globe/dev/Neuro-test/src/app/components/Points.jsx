import React, { } from "react";
import { BufferAttribute } from "three";
//import Line from "./Line";
import {pts_origin, pts_try1} from './db_pts'

const { log } = console

function DataPoints() {
    const bufferPts1 = new BufferAttribute(new Float32Array(pts_origin.flat()), 3)
    const bufferPts2 = new BufferAttribute(new Float32Array(pts_try1.flat()), 3)



    return (
        <>
        <points>
            <bufferGeometry>
                <bufferAttribute attach={"attributes-position"} {...bufferPts1} />
            </bufferGeometry>
            <pointsMaterial
                size={0.1}
                threshold={0.1}
                color={0xff00ff}
                sizeAttenuation={true}
            />
        </points>
        <points>
            <bufferGeometry>
                <bufferAttribute attach={"attributes-position"} {...bufferPts2} />
            </bufferGeometry>
            <pointsMaterial
                size={0.1}
                threshold={0.1}
                color={0x00ffaa}
                sizeAttenuation={true}
            />
            </points>
            {/* <Line defaultStart={[-100, -100, 0]} defaultEnd={[0, 100, 0]} />
            <Line defaultStart={[0, 100, 0]} defaultEnd={[100, -100, 0]} /> */}
        </>
    );
}

export default DataPoints
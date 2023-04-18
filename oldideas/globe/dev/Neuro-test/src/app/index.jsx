
import React from 'react'
import { Leva } from 'leva'
import { Canvas, extend, } from '@react-three/fiber'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import Content from './CanvasContent';
import CameraControls from './Camera/cameraBasic';



extend({ OrbitControls });


/** app */
const App= ()=> {
  return (
    <>
      <Leva flat={true} oneLineLabel={true} />
      <Canvas linear={false} shadows={false} style={{ background: "black" }}>
        <CameraControls />
        <Content />
      </Canvas>
    </>
  )
}

export default App
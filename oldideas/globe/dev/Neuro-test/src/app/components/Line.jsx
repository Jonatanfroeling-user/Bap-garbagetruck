
// const Line = ({ start, end, color="hotpink"})=> {
//     console.log(start, end , color)
//     const ref = useRef()
//     useLayoutEffect(()=>{
//         ref.current.geometry.setFromPoints([start, end].map(p=>new Vector3(...p)))
//     }, [start, end])
//     return (
//         <line ref={ref}>
//             <bufferGeometry />
//             <lineBasicMaterial color={color} />
//         </line>
//     )
// }

import * as THREE from 'three'
import React, { useRef, useEffect, useState, useCallback, useContext, useMemo } from 'react'
//import { useThree } from '../lib/react-three-fiber'
//import { useControls } from '../hooks/useControls'

function useHover(stopPropagation = true) {
  const [hovered, setHover] = useState(false)
  const hover = useCallback(e => {
    if (stopPropagation) e.stopPropagation()
    setHover(true)
  }, [])
  const unhover = useCallback(e => {
    if (stopPropagation) e.stopPropagation()
    setHover(false)
  }, [])
  const [bind] = useState(() => ({ onPointerOver: hover, onPointerOut: unhover }))
  return [bind, hovered]
}

function useDrag(onDrag, onEnd) {
  const [active, setActive] = useState(false)
  const [, toggle] = useContext(camContext)

  const down = useCallback(e => {
    setActive(true)
    toggle(false)
    e.stopPropagation()
    e.target.setPointerCapture(e.pointerId)
  }, [])

  const up = useCallback(e => {
    setActive(false)
    toggle(true)
    e.stopPropagation()
    e.target.releasePointerCapture(e.pointerId)
    if (onEnd) onEnd()
  }, [])

  const activeRef = useRef()
  useEffect(() => void (activeRef.current = active))
  const move = useCallback(event => {
    if (activeRef.current) {
      event.stopPropagation()
      onDrag(event.unprojectedPoint)
    }
  }, [])

  const [bind] = useState(() => ({ onPointerDown: down, onPointerUp: up, onPointerMove: move }))
  return bind
}

function EndPoint({ position, onDrag, onEnd }) {
  let [bindHover, hovered] = useHover(false)
  let bindDrag = useDrag(onDrag, onEnd)

  /*const [active, setActive] = useState(true)
  if (!active) bindDrag = undefined
  if (!active) bindHover = undefined
  useEffect(() => void setTimeout(() => console.log('________inactive') || setActive(false), 2000), [])
  useEffect(() => void setTimeout(() => console.log('________active!!') || setActive(true), 6000), [])*/

  return (
    <mesh position={position} {...bindDrag} {...bindHover} onClick={e => console.log(e)}>
      <sphereBufferGeometry attach="geometry" args={[7.5, 16, 16]} />
      <meshBasicMaterial attach="material" color={hovered ? 'hotpink' : 'white'} />
    </mesh>
  )
}

function Line({ defaultStart, defaultEnd }) {
  const [start, setStart] = useState(defaultStart)
  const [end, setEnd] = useState(defaultEnd)
  const vertices = useMemo(() => [start, end].map(v => new THREE.Vector3(...v)), [start, end])
  const update = useCallback(self => ((self.verticesNeedUpdate = true), self.computeBoundingSphere()), [])
  return (
    <>
      <line>
        <geometry attach="geometry" vertices={vertices} onUpdate={update} />
        <lineBasicMaterial attach="material" color="white" />
      </line>
      <EndPoint position={start} onDrag={v => setStart(v.toArray())} />
      <EndPoint position={end} onDrag={v => setEnd(v.toArray())} />
    </>
  )
}

const camContext = React.createContext()

// function Controls({ children }) {
//   const api = useState(true)
//   const { size, camera } = useThree()
//   const controls = useControls()

//   return (
//     <>
//       <group>
//         <orbitControls ref={controls} args={[camera, size.width, size.height]} enableDamping dampingFactor={0.1} rotateSpeed={0.1} />
//         <camContext.Provider value={api}>{children}</camContext.Provider>
//       </group>
//     </>
//   )
// }


export default Line
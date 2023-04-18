import React from "react";


const Sphere = (props)=>  {
  return (
    <mesh visible userData={{ test: "hello" }} position={[0, 0, 0]} castShadow>
      <sphereGeometry attach="geometry" args={[1, 16, 16]} />
      <meshStandardMaterial
        attach="material"
        color={props.color||"white"}
        transparent
        roughness={0.1}
        metalness={0.1}
        opacity={0.5}
      />
    </mesh>
  );
}

export default Sphere
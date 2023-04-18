import React from "react";
// Geometry
function GroundPlane() {
  return (
    <mesh receiveShadow rotation={[5, 0, 0]} position={[0, -1, 0]}>
      <planeBufferGeometry attach="geometry" args={[500, 500]} />
      <meshStandardMaterial attach="material" color="white" />
    </mesh>
  );
}
function BackDrop() {
  return (
    <mesh receiveShadow position={[0, -10, -5]}>
      <planeBufferGeometry attach="geometry" args={[900, 500]} />
      <meshStandardMaterial attach="material" color="white" />
    </mesh>
  );
}

export {
    GroundPlane,
    BackDrop
}
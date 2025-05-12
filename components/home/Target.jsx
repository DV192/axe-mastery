import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Gltf } from "@react-three/drei";
import { RigidBody, vec3 } from "@react-three/rapier";
import { degToRad } from "three/src/math/MathUtils";

const Target = () => {
  const rigidBodyRef = useRef();

  useFrame((state) => {
    if (rigidBodyRef.current) {
      rigidBodyRef.current.setTranslation(
        vec3({ x: 20, y: Math.sin(state.clock.elapsedTime * 2) * 2, z: 0 }),
      )
    }
  });

  return (
    <>
      <group position={[20, -1, 0]}>
        <RigidBody ref={rigidBodyRef} name="target" colliders="hull" type="kinematicPosition">
          <Gltf
            src="/models/Ancient Ruins target.glb"
            rotation-y={degToRad(-90)}
            position-x={0}
            position-y={1}
            scale={3}
          />
        </RigidBody>
      </group>
    </>
  )
}

export default Target
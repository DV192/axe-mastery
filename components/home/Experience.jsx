import { useRef } from "react";
import { CameraControls, Environment, Grid, PerspectiveCamera } from "@react-three/drei";

import { GradientSky } from "./GradientSky";

const Experience = () => {
  const controls = useRef();

  return (
    <>
      <CameraControls ref={controls} />
      <GradientSky />
      <Environment preset="sunset" environmentIntensity={0.3} />
      <Grid
        position-y={-10}
        infiniteGrid
        sectionColor={"#999"}
        cellColor={"#555"}
        fadeStrength={5}
      />
      <directionalLight
        position={[30, 15, 30]}
        castShadow
        intensity={1}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.005}
      >
        <PerspectiveCamera
          attach={"shadow-camera"}
          near={10}
          far={50}
          fov={80}
        />
      </directionalLight>

      <group>
        <mesh position-x={10}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color={"orange"}
            emissive={"orange"}
            emissiveIntensity={8}
          />
        </mesh>
      </group>
    </>
  )
}

export default Experience
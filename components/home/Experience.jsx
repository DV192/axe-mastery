import { useEffect, useRef } from "react";
import { CameraControls, Environment, Grid, PerspectiveCamera } from "@react-three/drei";

import { GradientSky } from "./GradientSky";
import AxeController from "./AxeController";
import Target from "./Target";
import { VFXParticles } from "wawa-vfx";
import Balloons from "./Balloons";
import Walls from "./Walls";
import { useGame } from "@/hooks/useGame";

const Experience = () => {
  const controls = useRef();
  const axeLaunched = useGame((state) => state.axeLaunched);

  useEffect(() => {
    if(axeLaunched) {
      controls.current.setLookAt(10, 0, 30, 10, 0, 0, true);
    } else {
      controls.current.setLookAt(-0.1, 0, 0, 0, 0, 0, true);
    }
  }, [axeLaunched]);

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

      <AxeController />
      <Target />
      <Balloons />
      <Walls />

      <VFXParticles 
        name="sparks"
        settings={{
          fadeAlpha: [0, 1],
          fadeSize: [0, 0],
          gravity: [0, -10, 0],
          intensity: 8,
          nbParticles: 100000,
          renderMode: "billboard"
        }}
      />
    </>
  )
}

export default Experience
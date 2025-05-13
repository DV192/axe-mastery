import { useEffect, useRef } from "react";
import { CameraControls, Environment, Grid, PerspectiveCamera, useGLTF } from "@react-three/drei";

import { GradientSky } from "./GradientSky";
import AxeController from "./AxeController";
import Target from "./Target";
import { VFXEmitter, VFXParticles } from "wawa-vfx";
import Balloons from "./Balloons";
import Walls from "./Walls";
import { useGame } from "@/hooks/useGame";
import AncientRuins from "./AncientRuins";

const Experience = () => {
  const controls = useRef();
  const axeLaunched = useGame((state) => state.axeLaunched);
  const firstGame = useGame((state) => state.firstGame);
  const throws = useGame((state) => state.throws);
  const { nodes } = useGLTF("models/Axe Small Applied.glb");

  useEffect(() => {
    if (firstGame) {
      controls.current.setLookAt(-15, -5, 20, 10, 0, 0, true);
    } else if (axeLaunched || throws === 0) {
      if (window.innerWidth < 1024) {
        controls.current.setLookAt(-10, 10, 40, 10, 0, 0, true);
      } else {
        controls.current.setLookAt(10, 0, 30, 10, 0, 0, true);
      }
    } else {
      controls.current.setLookAt(-0.1, 0, 0, 0, 0, 0, true);
    }
  }, [axeLaunched, firstGame, throws]);

  return (
    <>
      <CameraControls
        ref={controls}
        mouseButtons={{
          left: 0,
          middle: 0,
          right: 0,
        }}
        touches={{
          one: 0,
          two: 0,
          three: 0,
        }}
      />
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
      <AncientRuins />

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
      <VFXParticles
        name="stars"
        geometry={<circleGeometry args={[0.1, 20]} />}
        settings={{
          fadeAlpha: [0.5, 0.5],
          fadeSize: [0.5, 0.5],
          gravity: [0, 0.2, 0],
          intensity: 5,
          nbParticles: 5000,
          renderMode: "billboard",
        }}
      />
      <VFXEmitter
        emitter="stars"
        settings={{
          duration: 10,
          delay: 0,
          nbParticles: 5000,
          spawnMode: "time",
          loop: true,
          startPositionMin: [-20, -20, -20],
          startPositionMax: [20, 20, 20],
          startRotationMin: [0, 0, 0],
          startRotationMax: [0, 0, 0],
          particlesLifetime: [4, 10],
          speed: [0, 0.2],
          directionMin: [-1, -1, -1],
          directionMax: [1, 1, 1],
          rotationSpeedMin: [0, 0, 0],
          rotationSpeedMax: [0, 0, 0],
          colorStart: ["#ffffff", "#b7b0e3", "pink"],
          size: [0.01, 0.05],
        }}
      />

      <VFXParticles
        name="axes"
        geometry={<primitive object={nodes.Axe_small.geometry} />}
        settings={{
          fadeAlpha: [0, 0],
          fadeSize: [0, 1],
          intensity: 2,
          nbParticles: 200,
          renderMode: "mesh",
        }}
      />
    </>
  )
}

export default Experience
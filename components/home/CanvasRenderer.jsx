import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Loader, OrbitControls, PositionalAudio, Stats, useGLTF } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Perf } from "r3f-perf";

import Experience from "./Experience";
import { Physics } from "@react-three/rapier";

useGLTF.preload("models/balloon_modified.glb");
useGLTF.preload("models/Axe Small Applied.glb");
useGLTF.preload("models/Axe Small.glb");
useGLTF.preload("models/AncientRuins-v1.glb");
useGLTF.preload("models/Ancient Ruins target.glb");

const CanvasRenderer = () => {
  const debug = true;
  const physicsDebug = false;

  return (
    <div className="w-full h-full fixed inset-0">
      <Canvas shadows camera={{ position: [0, 0.5, 10], fov: 50 }}>
        {debug && (
          <>
            <Stats />
            <Perf />
            {/* <OrbitControls
              makeDefault
              enableZoom={false}
              enablePan={false}
            /> */}
          </>
        )}

        <color attach="background" args={["#111"]} />

        <Suspense fallback={null}>
          <Physics debug={physicsDebug} colliders={false}>
            <Experience />
          </Physics>
        </Suspense>

        <EffectComposer>
          <Bloom mipmapBlur intensity={0.5} luminanceThreshold={1.5} />
        </EffectComposer>

        <Preloader />
      </Canvas>

      <Loader />
    </div>
  )
}

export default CanvasRenderer

export const AUDIOS = {
  pop: "sfxs/balloon-pop-48030.mp3",
  impact: "sfxs/cinematic-hit-159487-cut.mp3",
  throw: "sfxs/axe-slash-1-106748-cut.mp3",
};

const Preloader = () => {
  return Object.values(AUDIOS).map((audio) => (
    <PositionalAudio key={audio} url={audio} loop={false} autoplay={false} />
  ));
};
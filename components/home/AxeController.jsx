import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Gltf, PositionalAudio } from "@react-three/drei"
import { quat, RigidBody } from "@react-three/rapier"
import { VFXEmitter } from "wawa-vfx";

import { useGame } from "@/hooks/useGame";
import { AUDIOS } from "./CanvasRenderer";

const AxeController = () => {
  const rigidBodyRef = useRef();
  const axeLaunched = useGame(state => state.axeLaunched);
  const launchAxe = useGame(state => state.launchAxe);
  const onTargetHit = useGame(state => state.onTargetHit);
  const [impact, setImpact] = useState(false);
  const sfxThrow = useRef();
  const sfxHit = useRef();

  useEffect(() => {
    const onPointerUp = () => {
      launchAxe();
    }

    window.addEventListener('pointerup', onPointerUp);

    return () => {
      window.removeEventListener('pointerup', onPointerUp);
    }
  }, []);

  useEffect(() => {
    if (axeLaunched) {
      rigidBodyRef.current.setBodyType(0);
      rigidBodyRef.current.setRotation(quat(0, 0, 0, 1), true);
      rigidBodyRef.current.setLinvel({ x: 0, y: 0, z: 0 });
      rigidBodyRef.current.setAngvel({ x: 0, y: 0, z: 0 });
      rigidBodyRef.current.applyImpulse({ x: 1, y: 0.5, z: 0 }, true);
      rigidBodyRef.current.applyTorqueImpulse({ x: 0, y: 0, z: -0.2 }, true);
      sfxThrow.current.play();
    } else {
      rigidBodyRef.current.setBodyType(2);
      setImpact(false);
    }
  }, [axeLaunched]);

  useEffect(() => {
    if (impact) {
      onTargetHit();
    }
  }, [impact]);

  useFrame((state, delta) => {
    if (rigidBodyRef.current && !axeLaunched) {
      rigidBodyRef.current.setRotation(quat(0, 0, 0, 1), true);
      rigidBodyRef.current.setTranslation({
        x: 1,
        y: -0.2 + state.pointer.y * 0.5,
        z: state.pointer.x * 0.5
      });
      rigidBodyRef.current.setLinvel({ x: 0, y: 0, z: 0 });
      rigidBodyRef.current.setAngvel({ x: 0, y: 0, z: 0 });
    }
  });

  const onIntersectionEnter = (e) => {
    if (e.other.rigidBodyObject.name === "target") {
      rigidBodyRef.current.setBodyType(2);
      rigidBodyRef.current.setRotation(quat(0, 0, 0, 1), true);
      rigidBodyRef.current.setLinvel({ x: 0, y: 0, z: 0 });
      rigidBodyRef.current.setAngvel({ x: 0, y: 0, z: 0 });
      setImpact(rigidBodyRef.current.translation());
      sfxHit.current.stop();
      sfxHit.current.play();
    }
  }

  return (
    <>
      <RigidBody
        ref={rigidBodyRef}
        name="axe"
        colliders="hull"
        type="kinematicPosition"
        sensor
        onIntersectionEnter={onIntersectionEnter}
      >
        <PositionalAudio
          ref={sfxThrow}
          autoplay={false}
          url={AUDIOS.throw}
          loop={false}
          distance={50}
        />

        <Gltf src="/models/Axe Small.glb" position-y={-0.3} />

        {axeLaunched && !impact && (
          <group>
            <VFXEmitter
              position-y={-0.3}
              emitter="axes"
              settings={{
                loop: true,
                spawnMode: "time",
                nbParticles: 80,
                particlesLifetime: [1, 1],
                duration: 0.5,
                size: [1, 1],
                startPositionMin: [0, 0, 0],
                startPositionMax: [0, 0, 0],
                directionMin: [0, 0, 0],
                directionMax: [0, 0, 0],
                startRotationMin: [0, 0, 0],
                startRotationMax: [0, 0, 0],
                speed: [0.1, 2],
                colorStart: ["#424242"],
              }}
            />
          </group>
        )}
      </RigidBody>

      <PositionalAudio
        url={AUDIOS.impact}
        autoplay={false}
        ref={sfxHit}
        loop={false}
        distance={10}
      />

      {impact && (
        <group position={[impact.x, impact.y, impact.z]}>
          <VFXEmitter
            emitter="sparks"
            settings={{
              spawnMode: "burst",
              nbParticles: 8000,
              duration: 1,
              size: [0.01, 0.62],
              startPositionMin: [0, 0, 0],
              startPositionMax: [0, 0, 0],
              directionMin: [-1, -1, -1],
              directionMax: [1, 1, 1],
              rotationSpeedMin: [-1, -1, -10],
              rotationSpeedMax: [1, 1, 10],
              speed: [0.1, 10],
              particlesLifetime: [0.1, 1],
              colorStart: ["orange", "orangered"],
            }}
          />
        </group>
      )}
    </>
  )
}

export default AxeController
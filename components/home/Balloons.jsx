import { useCallback, useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { ConvexHullCollider, RigidBody } from "@react-three/rapier";
import { VFXEmitter } from "wawa-vfx";
import { randFloat } from "three/src/math/MathUtils";

import { balloonMaterials, useGame } from "@/hooks/useGame";

const Balloons = () => {
  const balloons = useGame(state => state.balloons);

  return balloons.map(balloon => (
    <Balloon key={balloon.id} {...balloon} />
  ))
}

export default Balloons

const Balloon = ({ position, color }) => {
  const { nodes, materials } = useGLTF("/models/balloon_modified.glb");
  const rigidBodyRef = useRef();
  const [exploded, setExploded] = useState(false);
  const onBalloonHit = useGame(state => state.onBalloonHit);

  const onIntersectionEnter = useCallback((e) => {
    if (e.other.rigidBodyObject.name === "axe") {
      setExploded(true);
    }
  }, []);

  useEffect(() => {
    if (rigidBodyRef.current) {
      rigidBodyRef.current.applyTorqueImpulse({
        x: Math.random() * 0.05,
        y: Math.random() * 0.05,
        z: Math.random() * 0.05,
      }, true);
    }
  }, []);

  useEffect(() => {
    if (exploded) {
      onBalloonHit();
    }
  }, [exploded]);

  useFrame(() => {
    if (rigidBodyRef.current && !exploded) {
      const curTranslation = rigidBodyRef.current.translation();
      if (curTranslation.y > 20) {
        curTranslation.y = randFloat(-20, -15);
        rigidBodyRef.current.setLinvel({
          x: 0,
          y: 0,
          z: 0,
        });
        rigidBodyRef.current.setAngvel({
          x: 0,
          y: 0,
          z: 0,
        });
        rigidBodyRef.current.applyTorqueImpulse(
          {
            x: Math.random() * 0.05,
            y: Math.random() * 0.05,
            z: Math.random() * 0.05,
          },
          true
        );
      }
      rigidBodyRef.current.setTranslation(curTranslation, true);
    }
  });

  return (
    <>
      <RigidBody
        ref={rigidBodyRef}
        position={position}
        type="dynamic"
        gravityScale={-0.1}
        mass={0.1}
        linearDamping={0.2}
        angularDamping={0.2}
        restitution={1}
        onIntersectionEnter={onIntersectionEnter}
      >
        <group dispose={null} visible={!exploded} scale={3}>
          <ConvexHullCollider args={[nodes.Balloon.geometry.attributes.position.array]} />
          <mesh geometry={nodes.Balloon.geometry} material={balloonMaterials[color]} />
          <mesh geometry={nodes.Logo.geometry} material={materials.Logo} />
          <mesh geometry={nodes.String.geometry} material={balloonMaterials[color]} />
        </group>

        {exploded && (
          <>
            <VFXEmitter
              emitter="sparks"
              settings={{
                loop: false,
                spawnMode: "burst",
                nbParticles: 100,
                duration: 1,
                size: [0.05, 0.3],
                startPositionMin: [-0.1, -0.1, -0.1],
                startPositionMax: [0.1, 0.1, 0.1],
                directionMin: [-0.1, 0, -0.1],
                directionMax: [0.1, 0.5, 0.1],
                rotationSpeedMin: [-1, -1, -10],
                rotationSpeedMax: [1, 1, 10],
                speed: [1, 7],
                colorStart: [color],
                particlesLifetime: [0.1, 1],
              }}
            />
          </>
        )}
      </RigidBody>
    </>
  )
}
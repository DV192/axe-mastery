import { CuboidCollider, RigidBody } from "@react-three/rapier";

const Walls = () => {
  return (
    <>
      <RigidBody type="fixed" position-z={-1}>
        <CuboidCollider args={[100, 100, 0.1]} />
      </RigidBody>
      <RigidBody type="fixed" position-z={1}>
        <CuboidCollider args={[100, 100, 0.1]} />
      </RigidBody>
    </>
  )
}

export default Walls
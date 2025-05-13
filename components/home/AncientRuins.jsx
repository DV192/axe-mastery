import { Gltf } from "@react-three/drei"
import { degToRad } from "three/src/math/MathUtils"

const AncientRuins = () => {
  return (
    <>
      <Gltf
        src="/models/AncientRuins-v1.glb"
        castShadow
        receiveShadow
        scale={3}
        rotation-y={degToRad(-90)}
        position-y={-8}
        position-x={10}
      />
    </>
  )
}

export default AncientRuins
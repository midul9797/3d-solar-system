import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Mesh } from "three";
import { setClosed, setPlanet } from "../redux/features/planetSlice";

export default function Sun() {
  const sunRef = useRef<Mesh>(null!);
  const dispatch = useDispatch();

  const [hovered, hover] = useState(false);
  const [sun] = useTexture(["/assets/sun.jpg"]);
  const toggleSun = () => {
    dispatch(setPlanet("sun"));
    dispatch(setClosed(false));
  };
  useFrame(() => {
    sunRef.current.rotation.y -= 0.002;
  });
  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);
  return (
    <mesh
      position={[0, 0, 0]}
      ref={sunRef}
      onClick={toggleSun}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
    >
      <icosahedronGeometry args={[4, 16]}></icosahedronGeometry>
      <meshPhongMaterial
        map={sun}
        emissiveMap={sun}
        emissiveIntensity={0.6}
        emissive={0xffffff}
      />
      <pointLight intensity={3000}></pointLight>
    </mesh>
  );
}

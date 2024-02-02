import { Stars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";

export default function AnimatedStars() {
  const starsRef = useRef<Mesh>(null!);

  useFrame(() => {
    starsRef.current.rotation.x += 0.0001;
    starsRef.current.rotation.y += 0.0001;
    starsRef.current.rotation.z += 0.0001;
  });
  return (
    <mesh ref={starsRef}>
      <Stars></Stars>
    </mesh>
  );
}

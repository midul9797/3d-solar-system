import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Mesh } from "three";
import { setClosed, setPlanet } from "../redux/features/planetSlice";

export default function Moon() {
  const dispatch = useDispatch();
  const [hovered, hover] = useState(false);
  const moonRef = useRef<Mesh>(null!);
  const [moon] = useTexture(["/assets/moon.jpg"]);
  const xAxis = 5;
  const speed = 1;
  const toggleMoon = () => {
    dispatch(setPlanet("moon"));
    dispatch(setClosed(false));
  };
  useFrame(({ clock }) => {
    moonRef.current.position.x =
      Math.sin(clock.getElapsedTime() * speed) * xAxis;
    moonRef.current.position.z =
      Math.cos(clock.getElapsedTime() * speed) * xAxis;
    moonRef.current.rotation.y += 0.002;
  });
  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);
  return (
    <mesh
      position={[xAxis, 0, 0]}
      ref={moonRef}
      castShadow
      receiveShadow
      onClick={toggleMoon}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
    >
      <icosahedronGeometry args={[0.7, 16]}></icosahedronGeometry>
      <meshPhongMaterial
        map={moon}
        emissiveMap={moon}
        emissive={0xffffff}
        emissiveIntensity={0.05}
      />
    </mesh>
  );
}

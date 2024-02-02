import { useEffect, useRef, useState } from "react";
import map from "/assets/jupiter.jpg";
import { useFrame, useLoader } from "@react-three/fiber";
import { Mesh, TextureLoader } from "three";
import { useDispatch } from "react-redux";
import { setClosed, setPlanet } from "../redux/features/planetSlice";

export default function Jupiter() {
  const dispatch = useDispatch();
  const [hovered, hover] = useState(false);
  const jupiterRef = useRef<Mesh>(null!);
  const toggleJupiter = () => {
    dispatch(setPlanet("jupiter"));
    dispatch(setClosed(false));
  };

  const [jupiterMap] = useLoader(TextureLoader, [map]);

  const xAxis = 45;
  const speed = 0.03;
  useFrame(({ clock }) => {
    jupiterRef.current.position.x =
      Math.sin(clock.getElapsedTime() * speed) * xAxis;
    jupiterRef.current.position.z =
      Math.cos(clock.getElapsedTime() * speed) * xAxis;
    jupiterRef.current.rotation.y += 0.02;
    // tweenLogic();
  });
  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

  return (
    <mesh
      ref={jupiterRef}
      receiveShadow
      position={[xAxis, 0, 0]}
      onClick={toggleJupiter}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
    >
      <icosahedronGeometry args={[3, 16]}></icosahedronGeometry>
      <meshStandardMaterial map={jupiterMap} opacity={0.5} />
    </mesh>
  );
}

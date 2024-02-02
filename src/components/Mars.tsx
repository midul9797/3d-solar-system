import { useEffect, useRef, useState } from "react";
import map from "/assets/mars.jpg";
import { useFrame, useLoader } from "@react-three/fiber";
import { Mesh, TextureLoader } from "three";
import { useDispatch } from "react-redux";
import { setClosed, setPlanet } from "../redux/features/planetSlice";

export default function Mars() {
  const dispatch = useDispatch();
  const [hovered, hover] = useState(false);
  const marsRef = useRef<Mesh>(null!);
  const toggleMars = () => {
    dispatch(setPlanet("mars"));
    dispatch(setClosed(false));
  };

  const [marsMap] = useLoader(TextureLoader, [map]);

  const xAxis = 35;
  const speed = 0.04;
  useFrame(({ clock }) => {
    marsRef.current.position.x =
      Math.sin(clock.getElapsedTime() * speed) * xAxis;
    marsRef.current.position.z =
      Math.cos(clock.getElapsedTime() * speed) * xAxis;
    marsRef.current.rotation.y += 0.02;
    // tweenLogic();
  });
  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

  return (
    <mesh
      ref={marsRef}
      receiveShadow
      position={[xAxis, 0, 0]}
      onClick={toggleMars}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
    >
      <icosahedronGeometry args={[1, 16]}></icosahedronGeometry>
      <meshStandardMaterial map={marsMap} opacity={0.5} />
    </mesh>
  );
}

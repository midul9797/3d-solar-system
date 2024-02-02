import { useEffect, useRef, useState } from "react";
import map from "/assets/uranus.jpg";
import { useFrame, useLoader } from "@react-three/fiber";
import { Mesh, TextureLoader } from "three";
import { useDispatch } from "react-redux";
import { setClosed, setPlanet } from "../redux/features/planetSlice";
export default function Uranus() {
  const dispatch = useDispatch();

  const [hovered, hover] = useState(false);

  const uranusRef = useRef<Mesh>(null!);
  const toggleUranus = () => {
    dispatch(setPlanet("uranus"));
    dispatch(setClosed(false));
  };

  const [uranusMap] = useLoader(TextureLoader, [map]);

  const xAxis = 65;
  const speed = 0.01;
  useFrame(({ clock }) => {
    uranusRef.current.position.x =
      Math.sin(clock.getElapsedTime() * speed) * xAxis;
    uranusRef.current.position.z =
      Math.cos(clock.getElapsedTime() * speed) * xAxis;
    uranusRef.current.rotation.y += 0.02;
    // tweenLogic();
  });
  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

  return (
    <mesh
      ref={uranusRef}
      receiveShadow
      position={[xAxis, 0, 0]}
      onClick={toggleUranus}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
    >
      <icosahedronGeometry args={[1, 16]}></icosahedronGeometry>
      <meshStandardMaterial map={uranusMap} />
    </mesh>
  );
}

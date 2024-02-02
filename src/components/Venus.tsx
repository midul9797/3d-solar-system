import { useEffect, useRef, useState } from "react";
import map from "/assets/venus.jpg";
import { useFrame, useLoader } from "@react-three/fiber";
import { Mesh, TextureLoader } from "three";
import { useDispatch } from "react-redux";
import { setClosed, setPlanet } from "../redux/features/planetSlice";

export default function Venus() {
  const [hovered, hover] = useState(false);
  const dispatch = useDispatch();

  const venusRef = useRef<Mesh>(null!);
  const toggleVenus = () => {
    dispatch(setPlanet("venus"));
    dispatch(setClosed(false));
  };

  const [venusMap] = useLoader(TextureLoader, [map]);

  const xAxis = 15;
  const speed = 0.08;
  useFrame(({ clock }) => {
    venusRef.current.position.x =
      Math.sin(clock.getElapsedTime() * speed) * xAxis;
    venusRef.current.position.z =
      Math.cos(clock.getElapsedTime() * speed) * xAxis;
    venusRef.current.rotation.y += 0.02;
    // tweenLogic();
  });
  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

  return (
    <mesh
      ref={venusRef}
      receiveShadow
      position={[xAxis, 0, 0]}
      onClick={toggleVenus}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
    >
      <icosahedronGeometry args={[2, 16]}></icosahedronGeometry>
      <meshStandardMaterial map={venusMap} opacity={0.5} />
    </mesh>
  );
}

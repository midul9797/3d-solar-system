import { useEffect, useRef, useState } from "react";
import map from "/assets/neptune.jpg";
import { useFrame, useLoader } from "@react-three/fiber";
import { Mesh, TextureLoader } from "three";
import { useDispatch } from "react-redux";
import { setClosed, setPlanet } from "../redux/features/planetSlice";

export default function Neptune() {
  const dispatch = useDispatch();
  const [hovered, hover] = useState(false);

  const neptuneRef = useRef<Mesh>(null!);
  const toggleNeptune = () => {
    dispatch(setPlanet("neptune"));
    dispatch(setClosed(false));
  };

  const [neptuneMap] = useLoader(TextureLoader, [map]);

  const xAxis = 70;
  const speed = 0.1;
  useFrame(({ clock }) => {
    neptuneRef.current.position.x =
      Math.sin(clock.getElapsedTime() * speed) * xAxis;
    neptuneRef.current.position.z =
      Math.cos(clock.getElapsedTime() * speed) * xAxis;
    neptuneRef.current.rotation.y += 0.02;
  });
  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

  return (
    <mesh
      ref={neptuneRef}
      receiveShadow
      position={[xAxis, 0, 0]}
      onClick={toggleNeptune}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
    >
      <icosahedronGeometry args={[1, 16]}></icosahedronGeometry>
      <meshStandardMaterial map={neptuneMap} opacity={0.5} />
    </mesh>
  );
}

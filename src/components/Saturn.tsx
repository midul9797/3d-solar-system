import { useEffect, useRef, useState } from "react";
import map from "/assets/saturn.jpg";
import { useFrame, useLoader } from "@react-three/fiber";
import { Group, TextureLoader } from "three";
import { useDispatch } from "react-redux";
import { setClosed, setPlanet } from "../redux/features/planetSlice";
import ringMap from "/assets/saturn_ring_alpha.png";
export default function Saturn() {
  const dispatch = useDispatch();
  const [hovered, hover] = useState(false);

  const saturnRingRef = useRef<Group>(null!);

  const toggleSaturn = () => {
    dispatch(setPlanet("saturn"));
    dispatch(setClosed(false));
  };

  const [saturnMap, saturnRingMap] = useLoader(TextureLoader, [map, ringMap]);
  saturnRingMap.rotation = Math.PI / 2;
  const xAxis = 57;
  const speed = 0.05;
  useFrame(({ clock }) => {
    saturnRingRef.current.position.x =
      Math.sin(clock.getElapsedTime() * speed) * xAxis;
    saturnRingRef.current.position.z =
      Math.cos(clock.getElapsedTime() * speed) * xAxis;
  });
  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

  return (
    <group position={[xAxis, 0, 0]} ref={saturnRingRef}>
      <mesh
        receiveShadow
        onClick={toggleSaturn}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
      >
        <icosahedronGeometry args={[2.5, 16]}></icosahedronGeometry>
        <meshStandardMaterial map={saturnMap} />
      </mesh>
      <mesh rotation-x={Math.PI / 2} position={[0, 0, 0]}>
        <torusGeometry args={[5.3, 0.5, 2.5, 100]} />
        <meshBasicMaterial map={saturnRingMap} opacity={0.5} />
      </mesh>
    </group>
  );
}

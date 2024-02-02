import { useEffect, useRef, useState } from "react";
import DayMap from "/assets/earth_daymap.jpg";
import DisplacementMap from "/assets/earth_displacementmap.jpg";
import NormalMap from "/assets/earth_normal.jpg";
import SpecularMap from "/assets/earth_specular.jpg";
import LightMap from "/assets/earth_nightmap.jpg";
import CloudMap from "/assets/earth_clouds.jpg";
import { useFrame, useLoader } from "@react-three/fiber";
import { Group, Mesh, TextureLoader } from "three";
import { useDispatch } from "react-redux";
import { setClosed, setPlanet } from "../redux/features/planetSlice";
import Moon from "./Moon";
export default function Earth() {
  const dispatch = useDispatch();
  const [hovered, hover] = useState(false);
  const earthRef = useRef<Group>(null!);
  const earthMoonRef = useRef<Group>(null!);
  const cloudRef = useRef<Mesh>(null!);
  const toggleEarth = () => {
    dispatch(setPlanet("earth"));
    dispatch(setClosed(false));
  };

  const [
    earthMap,
    earthNormalMap,
    earthSpec,
    earthDisplacement,
    earthLight,
    earthCloud,
  ] = useLoader(TextureLoader, [
    DayMap,
    NormalMap,
    SpecularMap,
    DisplacementMap,
    LightMap,
    CloudMap,
  ]);

  const xAxis = 27;
  const speed = 0.06;
  useFrame(({ clock }) => {
    earthMoonRef.current.position.x =
      Math.sin(clock.getElapsedTime() * speed) * xAxis;
    earthMoonRef.current.position.z =
      Math.cos(clock.getElapsedTime() * speed) * xAxis;
    earthRef.current.rotation.y += 0.02;
    cloudRef.current.rotation.y += 0.025;
    // tweenLogic();
  });
  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

  return (
    <group position={[xAxis, 0, 0]} ref={earthMoonRef}>
      <group ref={earthRef} castShadow>
        <mesh ref={cloudRef}>
          <icosahedronGeometry args={[2, 16]}></icosahedronGeometry>
          <meshStandardMaterial map={earthCloud} opacity={0.5} />
        </mesh>

        <mesh
          onClick={toggleEarth}
          onPointerOver={() => hover(true)}
          onPointerOut={() => hover(false)}
        >
          <icosahedronGeometry args={[2, 16]}></icosahedronGeometry>
          <meshPhongMaterial
            normalMap={earthNormalMap}
            specularMap={earthSpec}
            map={earthMap}
            displacementMap={earthDisplacement}
            displacementScale={0.05}
            emissiveMap={earthLight}
            emissive={0xffffff}
            emissiveIntensity={1.5}
          ></meshPhongMaterial>
        </mesh>
      </group>
      <Moon></Moon>
    </group>
  );
}

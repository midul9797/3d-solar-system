import { OrbitControls } from "@react-three/drei";
import AnimatedStars from "./AnimatedStars";
import Earth from "./Earth";
import Jupiter from "./Jupiter";
import Mars from "./Mars";
import Mercury from "./Mercury";
import Neptune from "./Neptune";
import Saturn from "./Saturn";
import Sun from "./Sun";
import Uranus from "./Uranus";
import Venus from "./Venus";
import CameraPosition from "../helpers/CameraPosition";

export default function Scene() {
  return (
    <>
      <CameraPosition event="mousedown" />
      <OrbitControls></OrbitControls>

      {/* <directionalLight
        color={"0xffffff"}
        position={[-2, 0.15, 1.5]}
        intensity={5}
        castShadow
      ></directionalLight> */}

      <AnimatedStars></AnimatedStars>
      <Sun></Sun>
      <Mercury />
      <Venus></Venus>
      <Earth></Earth>
      <Mars></Mars>
      <Jupiter />
      <Saturn />
      <Uranus />
      <Neptune />
    </>
  );
}

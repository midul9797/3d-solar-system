import { useEffect, useRef, useState } from "react";
import map from "/assets/mercury.jpg";
import { useFrame, useLoader } from "@react-three/fiber";
import { Mesh, TextureLoader } from "three";
// import * as THREE from "three";
// import * as TWEEN from "@tweenjs/tween.js";
import { useDispatch } from "react-redux";
import { setClosed, setPlanet } from "../redux/features/planetSlice";

export default function Mercury() {
  // const { camera } = useThree();
  const dispatch = useDispatch();
  const [hovered, hover] = useState(false);

  // const [cameraPosition, setCameraPosition] = useState(
  //   new THREE.Vector3(16, 8.5, 19.5)
  // );

  // const [cameraTarget, setCameraTarget] = useState(new THREE.Vector3(0, 0, 0));
  const mercuryRef = useRef<Mesh>(null!);
  const toggleMercury = () => {
    dispatch(setPlanet("mercury"));
    dispatch(setClosed(false));
  };

  // const tweenLogic = useCallback(() => {
  //   TWEEN.update();

  //   const mercuryPositionRef = mercuryRef.current.position;

  //   if (followingMercury) {
  //     const cameraTargetPosition = new THREE.Vector3(
  //       mercuryPositionRef.x + 10,
  //       mercuryPositionRef.y + 2,
  //       mercuryPositionRef.z + 5
  //     );
  //     //Tween for camera position
  //     new TWEEN.Tween(cameraPosition)
  //       .to(cameraTargetPosition, 100)
  //       .easing(TWEEN.Easing.Quadratic.Out)
  //       .onUpdate(() => {
  //         setCameraPosition(cameraPosition);
  //       })
  //       .start();

  //     //Tween for camera targeting
  //     new TWEEN.Tween(cameraTarget)
  //       .to(mercuryPositionRef, 100)
  //       .easing(TWEEN.Easing.Quadratic.Out)
  //       .onUpdate(() => {
  //         setCameraTarget(cameraTarget);
  //       })
  //       .start();
  //   } else {
  //     const originalCameraPosition = new THREE.Vector3(16, 8.5, 19.5);
  //     const originalCameraTarget = new THREE.Vector3(0, 0, 0);
  //     //Tween to original position
  //     new TWEEN.Tween(cameraPosition)
  //       .to(originalCameraPosition, 1000)
  //       .easing(TWEEN.Easing.Quadratic.Out)
  //       .onUpdate(() => {
  //         setCameraPosition(cameraPosition);
  //       })
  //       .start();
  //     //Tween to original target
  //     new TWEEN.Tween(cameraTarget)
  //       .to(originalCameraTarget, 1000)
  //       .easing(TWEEN.Easing.Quadratic.Out)
  //       .onUpdate(() => {
  //         setCameraTarget(cameraTarget);
  //       })
  //       .start();
  //   }
  //   camera.lookAt(cameraTarget);
  //   camera.position.copy(cameraPosition);
  //   camera.updateProjectionMatrix();
  // }, [cameraPosition, cameraTarget, followingMercury, camera]);

  const [mercuryMap] = useLoader(TextureLoader, [map]);

  const xAxis = 10;
  const speed = 0.1;
  useFrame(({ clock }) => {
    mercuryRef.current.position.x =
      Math.sin(clock.getElapsedTime() * speed) * xAxis;
    mercuryRef.current.position.z =
      Math.cos(clock.getElapsedTime() * speed) * xAxis;
    mercuryRef.current.rotation.y += 0.02;
    // tweenLogic();
  });
  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

  return (
    <mesh
      ref={mercuryRef}
      receiveShadow
      position={[xAxis, 0, 0]}
      onClick={toggleMercury}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
    >
      <icosahedronGeometry args={[1, 16]}></icosahedronGeometry>
      <meshStandardMaterial map={mercuryMap} opacity={0.5} />
    </mesh>
  );
}

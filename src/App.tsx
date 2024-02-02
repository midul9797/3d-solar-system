import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import Scene from "./components/Scene";
import { useDispatch } from "react-redux";
import { setClosed, setPlanet } from "./redux/features/planetSlice";
import { useAppSelector } from "./redux/hooks";
import { motion } from "framer-motion";
import data from "../public/assets/data.json";
function App() {
  const dispatch = useDispatch();
  const { planet, closed } = useAppSelector((state) => state.planet);
  const planetDetails = data.find((p) => p.name === planet);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const setWindowDimensions = () => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  };
  useEffect(() => {
    window.addEventListener("resize", setWindowDimensions);
    return () => {
      window.removeEventListener("resize", setWindowDimensions);
    };
  }, []);

  return (
    <div style={{ position: "relative" }}>
      {!closed && planet !== "" && planetDetails && (
        <div
          style={{
            width: windowWidth,
            height: windowHeight,
            overflowX: "hidden",
            position: "absolute",
            top: 0,
            left: 0,
            background: "rgb(0 0 0 / 50%)",

            zIndex: 2,
            color: "white",
            fontWeight: "bold",
            lineHeight: "45px",
            letterSpacing: "6px",
            backdropFilter: "blur(5px)",
          }}
        >
          <motion.div
            key={planet + "1"}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div
              style={{
                textAlign: "center",
                paddingTop: "40px",
                fontSize: "2.8vw",
                display: "flex",
                width: "100%",
                justifyContent: "flex-end",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <h1 style={{ width: "100%", textAlign: "center" }}>
                  {planetDetails?.name.toUpperCase()}
                </h1>
                <span
                  style={{
                    padding: "0 30px 0 0",
                    cursor: "pointer",
                    fontSize: "4vw",
                  }}
                  onClick={() => {
                    dispatch(setClosed(true));
                    dispatch(setPlanet(""));
                  }}
                >
                  X
                </span>
              </div>
            </div>
            <br />
            <p
              style={{
                textAlign: "justify",
                padding: "4vw",
                color: "#ffffffc9",
                fontSize: innerWidth > 800 ? "1.8vw" : "2.5vw",
              }}
            >
              {planetDetails?.details}
            </p>
          </motion.div>
        </div>
      )}
      <Canvas
        shadows
        style={{
          width: windowWidth,
          height: windowHeight,
          position: "absolute",
          zIndex: 1,
        }}
        camera={{
          fov: 65,
          near: 0.1,
          far: 1000,
          position: [-63.66, 18.78, -17.65],
        }}
      >
        <color attach="background" args={["black"]}></color>
        <Scene />
      </Canvas>
    </div>
  );
}

export default App;

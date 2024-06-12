import styled from "styled-components";
import * as THREE from "three";
import { animated } from "@react-spring/three";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import img from "../assets/transparent-logo.png";
import { useRef } from "react";

function LogoThree() {
  return (
    <Styled>
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <Logo />
        <ambientLight intensity={0.6} />
        <CenterRotate />
        <RightRotate />
        <LeftRotate />
      </Canvas>
    </Styled>
  );
}

function Logo() {
  const texture = useLoader(THREE.TextureLoader, img);

  // Get the aspect ratio of the image
  const aspectRatio = texture.image.width / texture.image.height;
  const height = 4; // Adjust the height as needed
  const width = height * aspectRatio; // Calculate width based on aspect ratio

  return (
    <animated.mesh position={[0, 0, 0]}>
      <planeGeometry attach="geometry" args={[width, height]} />
      <meshStandardMaterial
        attach="material"
        map={texture}
        transparent={true}
        alphaTest={0.5}
        roughness={0.3} // Lower roughness for more reflectivity
        metalness={0.9} // Higher metalness for more reflectivity
      />
    </animated.mesh>
  );
}

function CenterRotate() {
  const lightRef = useRef();
  const sphereRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const x = 1.2 * Math.cos(t); // multiply by radius, increment by starting position
    const z = 3 * Math.sin(t);
    if (sphereRef.current) {
      lightRef.current.position.set(x, 0, z);
      sphereRef.current.position.set(x, 0, z);
    }
  });

  return (
    <>
      <pointLight ref={lightRef} intensity={3} distance={5} decay={1} />
      <mesh ref={sphereRef}>
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshStandardMaterial color="#d8b771" roughness={0.3} metalness={0.2} />
      </mesh>
    </>
  );
}

function RightRotate() {
  const lightRef = useRef();
  const sphereRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const x = 1.3 + 0.3 * Math.cos(t);
    const y = 1.2 + 0.4 * Math.cos(t);
    const z = 2 * Math.sin(t);
    if (lightRef.current && sphereRef.current) {
      lightRef.current.position.set(x, y, z);
      sphereRef.current.position.set(x, y, z);
    }
  });

  return (
    <>
      <pointLight ref={lightRef} intensity={3} distance={5} decay={1} />
      <mesh ref={sphereRef}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial color="#d8b771" roughness={0.3} metalness={0.2} />
      </mesh>
    </>
  );
}

function LeftRotate() {
  const lightRef = useRef();
  const sphereRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const x = -1.3 + 0.3 * Math.cos(t);
    const y = -1.2 + 0.4 * Math.cos(t);
    const z = 2 * Math.sin(-t);
    if (lightRef.current && sphereRef.current) {
      lightRef.current.position.set(x, y, z);
      sphereRef.current.position.set(x, y, z);
    }
  });

  return (
    <>
      <pointLight ref={lightRef} intensity={3} distance={5} decay={1} />
      <mesh ref={sphereRef}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial color="#d8b771" roughness={0.3} metalness={0.2} />
      </mesh>
    </>
  );
}

const Styled = styled.div`
  width: 100%;
  height: 100vh;
`;

export default LogoThree;

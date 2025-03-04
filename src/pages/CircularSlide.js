"use client";

import * as THREE from "three";
import { Canvas, useThree } from "@react-three/fiber";
import { useSpring, a } from "@react-spring/three";
import { useEffect, useState } from "react";
import styled from "styled-components";

// is not used at the moment
// place inside of <Canvas /> to use
function CameraController() {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(0, 0, 10);
    camera.lookAt(0, 0, 0);
  }, [camera]);
  return null;
}

export default function CircularSlide() {
  const numBulbs = 7; // Number of bulbs
  const radius = 3;

  // activeBulb indicates which lightbulb should be in the center of the view.
  const [activeBulb, setActiveBulb] = useState(0);

  // Compute rotationOffset so that the active lightbulb (with index activeBulb) is at angle π/2
  // gets recalculated when state activeBulb changes
  const rotationOffset = Math.PI / 2 - (activeBulb / numBulbs) * 2 * Math.PI;

  const nextBulb = () => {
    setActiveBulb((prev) => (prev + 1) % numBulbs);
  };

  const prevBulb = () => {
    setActiveBulb((prev) => (numBulbs + (prev - 1)) % numBulbs);
  };

  useEffect(() => {
    console.log(rotationOffset);
  }, [rotationOffset]);

  // Compute target positions for each bulb based on the current rotationOffset.
  const bulbPositions = Array.from({ length: numBulbs }, (_, i) => {
    const angle = (i / numBulbs) * 2 * Math.PI + rotationOffset;
    return [Math.cos(angle) * radius, 0, Math.sin(angle) * radius];
  });

  return (
    <Styled>
      <div className="buttons">
        <button onClick={nextBulb}>Prev Lightbulb</button>
        <button onClick={prevBulb}>Next Lightbulb</button>
      </div>
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.6} />
        {bulbPositions.map((pos, index) => {
          // Use a different color for the last (red) lightbulb.
          const color =
            index === bulbPositions.length - 1 ? "#f00e65" : "#d8b771";
          return (
            <AnimatedLightBulb key={index} targetPosition={pos} color={color} />
          );
        })}
      </Canvas>
    </Styled>
  );
}

// This component uses a spring to animate its position to the target position.
function AnimatedLightBulb({ targetPosition, color }) {
  const { position } = useSpring({
    // When targetPosition changes, the spring will animate the position
    position: targetPosition,
    config: { tension: 170, friction: 26 },
  });

  return (
    <a.group position={position}>
      <pointLight intensity={3} distance={5} decay={1} />
      <mesh>
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.2} />
      </mesh>
    </a.group>
  );
}

const Styled = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;

  .buttons {
    position: absolute;
    top: 20;
    left: 20;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    z-index: 2;
  }
`;

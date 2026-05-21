"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, Environment } from "@react-three/drei";
import { EffectComposer, Bloom, Noise, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

// A dummy box that can be replaced by actual models loaded via useModelLoader
const Box = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="royalblue" roughness={0.2} metalness={0.8} />
    </mesh>
  );
};

interface SceneProps {
  children?: React.ReactNode;
  cameraPosition?: [number, number, number];
}

export const Scene = ({ children, cameraPosition = [0, 0, 5] }: SceneProps) => {
  return (
    <div className="h-screen w-full overflow-hidden bg-black fixed top-0 left-0 -z-10">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={cameraPosition} fov={45} />
        
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={2} color="#ffffff" />
        
        {children || <Box />}
        
        <Environment preset="city" />

        {/* Post-Processing Layer for cinematic aesthetic */}
        <EffectComposer disableNormalPass multisampling={4}>
          <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} />
          <Noise opacity={0.03} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

"use client";

import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollCameraProps {
  lookAtTarget?: [number, number, number];
  startZ?: number;
  endZ?: number;
}

/**
 * ScrollCamera
 * Modifies the camera position based on scroll progress.
 * Must be used inside <Canvas>.
 */
export const ScrollCamera = ({ lookAtTarget = [0, 0, 0], startZ = 5, endZ = 10 }: ScrollCameraProps) => {
  const { camera } = useThree();

  useEffect(() => {
    // Initial position
    camera.position.z = startZ;

    const ctx = gsap.context(() => {
      // Create a global scroll trigger that updates camera z
      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1, // Smooth scrubbing
        onUpdate: (self) => {
          // Linearly interpolate between startZ and endZ
          const currentZ = startZ + (endZ - startZ) * self.progress;
          camera.position.z = currentZ;
          camera.lookAt(...lookAtTarget);
        },
      });
    });

    return () => ctx.revert();
  }, [camera, startZ, endZ, lookAtTarget]);

  return null;
};

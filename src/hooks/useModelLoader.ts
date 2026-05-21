import { useGLTF } from '@react-three/drei';
import { useEffect } from 'react';

/**
 * useModelLoader
 * A global caching loader for GLTF/GLB models.
 * Preloads the model into memory.
 */
export function useModelLoader(url: string) {
  // Leverage drei's useGLTF which internally uses useLoader and caches
  const gltf = useGLTF(url);

  useEffect(() => {
    // Optional: Traverse and apply global settings (like shadows)
    if (gltf && gltf.scene) {
      gltf.scene.traverse((child: any) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          // You can also apply environment map intensity here
          if (child.material) {
            child.material.envMapIntensity = 1.2;
          }
        }
      });
    }
  }, [gltf]);

  return gltf;
}

// Preload utility for global usage
export const preloadModel = (url: string) => {
  useGLTF.preload(url);
};

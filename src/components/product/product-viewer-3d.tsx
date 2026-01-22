"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Skeleton } from '../ui/skeleton';

interface ProductViewer3DProps {
  glbUrl: string;
}

export default function ProductViewer3D({ glbUrl }: ProductViewer3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef<HTMLDivElement>(null);
  const cleanupRef = useRef<() => void>(() => {});

  useEffect(() => {
    if (!mountRef.current || !loadingRef.current) return;

    const currentMount = mountRef.current;
    const currentLoading = loadingRef.current;
    let frameId: number;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(50, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 2;
    controls.maxDistance = 10;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const loader = new GLTFLoader();
    loader.load(
      glbUrl,
      (gltf) => {
        const model = gltf.scene;
        
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);
        
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2.5 / maxDim;
        model.scale.set(scale, scale, scale);

        scene.add(model);
        if (currentLoading) {
            currentLoading.style.display = 'none';
        }
      },
      undefined,
      (error) => {
        console.error('An error happened while loading the model:', error);
        if(currentLoading) {
            currentLoading.innerText = 'Failed to load model.';
        }
      }
    );

    const handleResize = () => {
      if (!currentMount) return;
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    cleanupRef.current = () => {
      window.removeEventListener('resize', handleResize);
      if (frameId) cancelAnimationFrame(frameId);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else if (object.material) {
            object.material.dispose();
          }
        }
      });
    };
    
    return () => {
      cleanupRef.current();
    }
  }, [glbUrl]);
  
  useEffect(() => {
    return () => {
      cleanupRef.current();
    }
  }, []);

  return (
    <div className="relative h-full w-full">
      <div ref={mountRef} className="h-full w-full" />
      <div ref={loadingRef} className="absolute inset-0 flex items-center justify-center bg-transparent">
        <Skeleton className="h-full w-full rounded-lg" />
      </div>
    </div>
  );
}

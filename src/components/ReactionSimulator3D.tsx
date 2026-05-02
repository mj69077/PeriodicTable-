/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Float, Stars, Text, FloatProps } from '@react-three/drei';
import * as THREE from 'three';
import { PeriodicElement } from '../store/useElementStore';
import { motion, AnimatePresence } from 'motion/react';

interface AtomVisualProps {
  position: [number, number, number];
  color: string;
  size: number;
  label: string;
  isReacting: boolean;
  targetPos?: [number, number, number];
}

function FloatingAtom({ position, color, size, label, isReacting, targetPos }: AtomVisualProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    if (isReacting && targetPos) {
      // Move towards center
      meshRef.current.position.lerp(new THREE.Vector3(...targetPos), 0.05);
      meshRef.current.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.05);
    } else {
      meshRef.current.position.lerp(new THREE.Vector3(...position), 0.05);
      meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.05);
    }
  });

  return (
    <group>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.8}
        />
        <Text
          position={[0, size + 0.5, 0]}
          fontSize={0.4}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </Text>
      </mesh>
    </group>
  );
}

function ReactionEffect({ active }: { active: boolean }) {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const pts = new Float32Array(300 * 3);
    for (let i = 0; i < 300; i++) {
      pts[i * 3] = (Math.random() - 0.5) * 2;
      pts[i * 3 + 1] = (Math.random() - 0.5) * 2;
      pts[i * 3 + 2] = (Math.random() - 0.5) * 2;
    }
    return pts;
  }, []);

  useFrame((state) => {
    if (!particlesRef.current || !active) return;
    particlesRef.current.rotation.y += 0.05;
    particlesRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 10) * 0.2);
  });

  if (!active) return null;

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          count={particles.length / 3} 
          array={particles} 
          itemSize={3} 
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.05} 
        color="#ffcc00" 
        transparent 
        opacity={0.8} 
        blending={THREE.AdditiveBlending} 
      />
    </points>
  );
}

export default function ReactionSimulator3D({ 
  element1, 
  element2, 
  isReacting,
  onFinish
}: { 
  element1: PeriodicElement | null; 
  element2: PeriodicElement | null;
  isReacting: boolean;
  onFinish?: () => void;
}) {
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (isReacting) {
      setShowResult(false);
      const timer = setTimeout(() => {
        setShowResult(true);
        onFinish?.();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isReacting]);

  return (
    <div className="w-full h-full min-h-[400px] relative rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4444ff" />

        <group>
          {element1 && (
            <FloatingAtom 
              position={[-4, 0, 0]} 
              color="#3b82f6" 
              size={0.8} 
              label={element1.symbol}
              isReacting={isReacting}
              targetPos={[0, 0, 0]}
            />
          )}

          {element2 && (
            <FloatingAtom 
              position={[4, 0, 0]} 
              color="#ef4444" 
              size={0.8} 
              label={element2.symbol}
              isReacting={isReacting}
              targetPos={[0, 0, 0]}
            />
          )}

          <ReactionEffect active={isReacting && !showResult} />

          {showResult && (
            <Float speed={5} rotationIntensity={2} floatIntensity={2}>
              <mesh>
                <octahedronGeometry args={[1.2, 0]} />
                <meshStandardMaterial 
                  color="#10b981" 
                  emissive="#10b981" 
                  emissiveIntensity={1} 
                  wireframe
                />
              </mesh>
              <Text
                position={[0, 2, 0]}
                fontSize={0.6}
                color="#10b981"
                fontStyle="italic"
              >
                REACTION COMPLETED
              </Text>
            </Float>
          )}
        </group>

        <OrbitControls enablePan={false} maxDistance={20} minDistance={5} />
      </Canvas>

      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        {!element1 && !element2 && (
          <div className="text-slate-500 text-sm font-bold uppercase tracking-widest animate-pulse">
            Select Elements to Begin
          </div>
        )}
      </div>

      <div className="absolute bottom-4 left-6 flex gap-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500" />
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{element1?.name || '---'}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{element2?.name || '---'}</span>
        </div>
      </div>
    </div>
  );
}

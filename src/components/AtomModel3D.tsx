/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Float, Sphere, Trail } from '@react-three/drei';
import * as THREE from 'three';
import { PeriodicElement } from '../store/useElementStore';

interface ElectronProps {
  radius: number;
  speed: number;
  offset: number;
  color: string;
}

function Electron({ radius, speed, offset, color }: ElectronProps) {
  const ref = useRef<THREE.Group>(null);
  const electronRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime() * speed + offset;
    ref.current.rotation.y = t;
  });

  return (
    <group ref={ref}>
      <mesh ref={electronRef} position={[radius, 0, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={2} 
        />
        <pointLight intensity={0.5} distance={1} color={color} />
      </mesh>
    </group>
  );
}

function Nucleus({ protons, neutrons }: { protons: number, neutrons: number }) {
  const particles = useMemo(() => {
    const pts = [];
    const count = protons + neutrons;
    // Simple sphere packing for the nucleus
    for (let i = 0; i < count; i++) {
       const phi = Math.acos(-1 + (2 * i) / count);
       const theta = Math.sqrt(count * Math.PI) * phi;
       const r = 0.25 * Math.pow(count, 1/3); // Radius depends on particle count
       
       pts.push({
         position: [
           r * Math.cos(theta) * Math.sin(phi),
           r * Math.sin(theta) * Math.sin(phi),
           r * Math.cos(phi)
         ] as [number, number, number],
         type: i < protons ? 'proton' : 'neutron'
       });
    }
    return pts;
  }, [protons, neutrons]);

  return (
    <group>
      {particles.map((p, i) => (
        <mesh key={i} position={p.position}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial 
            color={p.type === 'proton' ? '#ff4d4d' : '#4d79ff'} 
            roughness={0.3}
            metalness={0.2}
          />
        </mesh>
      ))}
      <pointLight intensity={2} distance={5} color="#ffffff" />
    </group>
  );
}

function Shell({ radius, electronCount, color }: { radius: number, electronCount: number, color: string }) {
  return (
    <group>
      {/* Orbit Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.005, 16, 100]} />
        <meshBasicMaterial color={color} transparent opacity={0.2} />
      </mesh>
      
      {/* Electrons */}
      {Array.from({ length: electronCount }).map((_, i) => (
        <Electron 
          key={i} 
          radius={radius} 
          speed={1 / (radius * radius) * 2} // Kepler's-ish law
          offset={(i * Math.PI * 2) / electronCount}
          color={color}
        />
      ))}
    </group>
  );
}

// Function to calculate electron shells based on atomic number
const getShells = (atomicNumber: number): number[] => {
  const shells = [];
  let remaining = atomicNumber;
  const limits = [2, 8, 18, 32, 32, 18, 8]; // Bohr model capacities
  
  for (const limit of limits) {
    if (remaining <= 0) break;
    const electrons = Math.min(remaining, limit);
    shells.push(electrons);
    remaining -= electrons;
  }
  return shells;
};

export default function AtomModel3D({ element }: { element: PeriodicElement }) {
  const shells = useMemo(() => getShells(element.atomicNumber), [element.atomicNumber]);
  const protons = element.atomicNumber;
  const neutrons = Math.round(parseFloat(element.atomicMass)) - protons || protons;

  return (
    <div className="w-full h-[400px] bg-slate-950 rounded-3xl overflow-hidden relative border border-slate-800 shadow-2xl">
      <div className="absolute top-4 left-6 z-10">
        <h4 className="text-white font-black text-xl tracking-tighter flex items-center gap-2">
          {element.name} <span className="text-slate-500 text-sm font-medium">Visualization</span>
        </h4>
        <div className="flex gap-4 mt-1">
          <span className="text-[10px] uppercase font-bold text-red-500 tracking-widest flex items-center gap-1">
             <div className="w-1.5 h-1.5 rounded-full bg-red-500" /> {protons} Protons
          </span>
          <span className="text-[10px] uppercase font-bold text-blue-500 tracking-widest flex items-center gap-1">
             <div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> {neutrons} Neutrons
          </span>
          <span className="text-[10px] uppercase font-bold text-emerald-500 tracking-widest flex items-center gap-1">
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> {element.atomicNumber} Electrons
          </span>
        </div>
      </div>

      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={40} />
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
          <group scale={1.2}>
            <Nucleus protons={protons} neutrons={neutrons} />
            {shells.map((count, i) => (
              <Shell 
                key={i} 
                radius={(i + 1) * 1.5} 
                electronCount={count} 
                color={i === shells.length - 1 ? "#10b981" : "#3b82f6"} 
              />
            ))}
          </group>
        </Float>

        <OrbitControls 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.5}
          maxDistance={25}
          minDistance={5}
        />
      </Canvas>
      
      <div className="absolute bottom-4 right-6 text-[10px] text-slate-500 font-bold uppercase tracking-widest pointer-events-none">
        BOER MODEL • INTERACTIVE 3D
      </div>
    </div>
  );
}

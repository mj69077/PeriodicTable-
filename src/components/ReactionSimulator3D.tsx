/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Text, MeshDistortMaterial, Sphere, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'motion/react';
import { useElementStore } from '../store/useElementStore';
import { ALL_ELEMENTS } from '../data/elements';
import { CATEGORY_COLORS, cn } from '../lib/utils';
import { Play, RotateCcw, Zap, Sparkles } from 'lucide-react';

function Atom({ position, color, symbol, isReacting }: { position: [number, number, number], color: string, symbol: string, isReacting: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.5;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
      
      if (isReacting) {
        // Move towards center if reacting
        meshRef.current.position.lerp(new THREE.Vector3(0, 0, 0), 0.05);
      }
    }
  });

  return (
    <group position={position}>
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <mesh ref={meshRef}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <MeshDistortMaterial 
            color={color} 
            speed={2} 
            distort={0.4} 
            radius={1}
            emissive={color}
            emissiveIntensity={0.2}
          />
        </mesh>
        <Text
          position={[0, 0, 0.6]}
          fontSize={0.3}
          color="white"
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf"
          anchorX="center"
          anchorY="middle"
        >
          {symbol}
        </Text>
      </Float>
    </group>
  );
}

function ReactionEffect({ active }: { active: boolean }) {
  const particlesRef = useRef<THREE.Points>(null);
  
  const count = 100;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 5;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current && active) {
      const time = state.clock.getElapsedTime();
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        particlesRef.current.geometry.attributes.position.array[i3 + 1] += Math.sin(time + i) * 0.01;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
      particlesRef.current.rotation.y += 0.01;
    }
  });

  if (!active) return null;

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#60a5fa" transparent opacity={0.6} blending={THREE.AdditiveBlending} />
    </points>
  );
}

export default function ReactionSimulator3D() {
  const { addXP } = useElementStore();
  const [selectedAtoms, setSelectedAtoms] = useState<any[]>([]);
  const [isReacting, setIsReacting] = useState(false);
  const [reactionResult, setReactionResult] = useState<string | null>(null);

  const elements = ALL_ELEMENTS.filter(e => ['H', 'O', 'Na', 'Cl', 'C', 'Mg'].includes(e.symbol));

  const handleSelect = (el: any) => {
    if (selectedAtoms.length < 2) {
      setSelectedAtoms([...selectedAtoms, { ...el, position: selectedAtoms.length === 0 ? [-2, 0, 0] : [2, 0, 0] }]);
    }
  };

  const startReaction = () => {
    if (selectedAtoms.length === 2) {
      setIsReacting(true);
      setTimeout(() => {
        const symbols = selectedAtoms.map(a => a.symbol).sort().join('');
        let result = "Mixture";
        if (symbols === "ClO" || symbols === "OCl") result = "Unstable Catalyst";
        if (symbols === "ClNa") result = "NaCl (Salt)";
        if (symbols === "HO") result = "H₂O (Water)";
        if (symbols === "CO") result = "CO₂ (Dry Ice)";
        
        setReactionResult(result);
        addXP(25);
      }, 2000);
    }
  };

  const reset = () => {
    setSelectedAtoms([]);
    setIsReacting(false);
    setReactionResult(null);
  };

  return (
    <div className="h-full flex flex-col bg-slate-900 overflow-hidden relative">
      {/* 3D Canvas */}
      <div className="flex-1 w-full bg-gradient-to-b from-slate-950 to-slate-900">
        <Canvas shadows gl={{ antialias: true }}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} castShadow />
          <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
          
          <OrbitControls enableZoom={false} enablePan={false} />

          {selectedAtoms.map((atom, i) => (
            <Atom 
              key={`${atom.symbol}-${i}`} 
              position={atom.position} 
              color={CATEGORY_COLORS[atom.category as keyof typeof CATEGORY_COLORS] || '#ffffff'} 
              symbol={atom.symbol}
              isReacting={isReacting}
            />
          ))}

          <ReactionEffect active={isReacting && !reactionResult} />
          
          <Environment preset="city" />
        </Canvas>
      </div>

      {/* Overlay UI */}
      <div className="absolute inset-0 pointer-events-none flex flex-col p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-black text-white tracking-widest uppercase">Atom Lab 3D</h2>
            <div className="flex gap-2 mt-2">
              <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded text-[9px] font-bold uppercase tracking-widest">Physics Enabled</span>
              <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded text-[9px] font-bold uppercase tracking-widest">Real-time</span>
            </div>
          </div>
          <button 
            onClick={reset}
            className="p-3 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 text-white pointer-events-auto hover:bg-white/10 transition-colors"
          >
            <RotateCcw size={18} />
          </button>
        </div>

        <AnimatePresence>
          {reactionResult && (
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-auto"
            >
              <div className="w-48 h-48 bg-blue-500/20 backdrop-blur-xl rounded-full border border-blue-400/30 flex flex-col items-center justify-center p-8 shadow-[0_0_50px_rgba(59,130,246,0.3)]">
                <Sparkles className="text-blue-400 mb-2 animate-pulse" />
                <h3 className="text-white font-black text-2xl leading-tight">{reactionResult}</h3>
                <span className="text-blue-300 text-[10px] font-bold uppercase mt-1">Bond Successful</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-auto pointer-events-auto">
          {selectedAtoms.length === 2 && !isReacting && (
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              onClick={startReaction}
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black shadow-2xl shadow-blue-500/40 mb-6 flex items-center justify-center gap-3 active:scale-95 transition-transform"
            >
              <Zap size={20} className="fill-current" />
              START REACTION (+25 XP)
            </motion.button>
          )}

          <div className="bg-white/5 backdrop-blur-xl rounded-[2rem] p-6 border border-white/10">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-2">Select Elements to React</h4>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
              {elements.map(el => (
                <button
                  key={el.atomicNumber}
                  onClick={() => handleSelect(el)}
                  disabled={selectedAtoms.length >= 2 || isReacting}
                  className={cn(
                    "w-14 h-14 shrink-0 rounded-xl flex flex-col items-center justify-center border-2 transition-all active:scale-90",
                    selectedAtoms.some(a => a.symbol === el.symbol) 
                      ? "bg-blue-600 border-blue-400 text-white shadow-[0_0_20px_rgba(59,130,246,0.5)]" 
                      : "bg-white/5 border-white/10 text-white hover:border-white/30"
                  )}
                >
                  <span className="text-lg font-black">{el.symbol}</span>
                  <span className="text-[7px] font-bold opacity-60">{el.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

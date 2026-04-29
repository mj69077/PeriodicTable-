/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';

export default function AtomModel() {
  return (
    <div className="relative w-48 h-48 flex items-center justify-center">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* Nucleus with Glow */}
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff5a5f" stopOpacity="1" />
            <stop offset="100%" stopColor="#ff5a5f" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* Orbit Rings */}
        <ellipse cx="100" cy="100" rx="70" ry="25" fill="none" stroke="#c0d8ff" strokeWidth="1.5" transform="rotate(30 100 100)" opacity="0.4" />
        <ellipse cx="100" cy="100" rx="70" ry="25" fill="none" stroke="#c0d8ff" strokeWidth="1.5" transform="rotate(-30 100 100)" opacity="0.4" />
        <ellipse cx="100" cy="100" rx="70" ry="25" fill="none" stroke="#c0d8ff" strokeWidth="1.5" transform="rotate(90 100 100)" opacity="0.4" />

        {/* Nucleus */}
        <circle cx="100" cy="100" r="14" fill="#ff5a5f" className="drop-shadow-[0_0_8px_rgba(255,90,95,0.6)]" />
        <circle cx="96" cy="96" r="4" fill="white" fillOpacity="0.3" />

        {/* Electrons (Animated) */}
        <motion.circle
          r="4"
          fill="#3b82f6"
          animate={{
            cx: [100 + 70 * Math.cos(0), 100 + 70 * Math.cos(2*Math.PI)],
            cy: [100 + 25 * Math.sin(0), 100 + 25 * Math.sin(2*Math.PI)],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "100px 100px", rotate: "30deg" }}
        />
        <motion.circle
          r="4"
          fill="#3b82f6"
          animate={{
            cx: [100 + 70 * Math.cos(Math.PI), 100 + 70 * Math.cos(3*Math.PI)],
            cy: [100 + 25 * Math.sin(Math.PI), 100 + 25 * Math.sin(3*Math.PI)],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "100px 100px", rotate: "-30deg" }}
        />
        <motion.circle
          r="4"
          fill="#3b82f6"
          animate={{
            cx: [100 + 70 * Math.cos(Math.PI/2), 100 + 70 * Math.cos(2.5*Math.PI)],
            cy: [100 + 25 * Math.sin(Math.PI/2), 100 + 25 * Math.sin(2.5*Math.PI)],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "100px 100px", rotate: "90deg" }}
        />
      </svg>
    </div>
  );
}

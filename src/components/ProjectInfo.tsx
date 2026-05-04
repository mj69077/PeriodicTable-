/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Box, Code2, Layout, Cpu, Globe, FolderTree, Terminal } from 'lucide-react';

export default function ProjectInfo() {
  const techStack = [
    { name: 'React 18', icon: <Box size={16} />, desc: 'Core UI Framework' },
    { name: 'Vite', icon: <Cpu size={16} />, desc: 'Build Tool & Dev Server' },
    { name: 'Tailwind CSS', icon: <Globe size={16} />, desc: 'Utility-first Styling' },
    { name: 'Zustand', icon: <Database size={16} />, desc: 'State Management' },
    { name: 'Framer Motion', icon: <Layout size={16} />, desc: 'Layout Animations' },
    { name: 'Lucide React', icon: <Code2 size={16} />, desc: 'Iconography' },
  ];

  const fileStructure = [
    { name: 'src/components', desc: 'UI Modules (Lab, Quiz, Table)' },
    { name: 'src/store', desc: 'Global State (User progress, XP)' },
    { name: 'src/services', desc: 'AI & Data fetching logic' },
    { name: 'src/data', desc: 'Chemical element databases' },
    { name: 'src/lib', desc: 'Utility functions & helpers' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Tech Stack Grid */}
      <div className="grid grid-cols-2 gap-3">
        {techStack.map((tech, i) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-1 text-blue-500">
              {tech.icon}
              <span className="text-xs font-black uppercase tracking-wider">{tech.name}</span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium">{tech.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Directory Structure */}
      <div className="bg-slate-900 rounded-[2rem] p-6 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Terminal size={80} />
        </div>
        
        <div className="flex items-center gap-3 mb-4">
          <FolderTree className="text-blue-400" size={20} />
          <h3 className="text-sm font-bold uppercase tracking-widest">Project Structure</h3>
        </div>

        <div className="space-y-3 relative z-10">
          {fileStructure.map((dir) => (
            <div key={dir.name} className="flex flex-col">
              <code className="text-xs text-blue-300 font-mono">/{dir.name}</code>
              <span className="text-[10px] text-slate-400">{dir.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Deployment Note */}
      <div className="p-6 bg-blue-50/50 rounded-2xl border border-blue-100">
        <h4 className="text-xs font-bold text-blue-800 uppercase tracking-widest mb-2">Build Command</h4>
        <div className="bg-slate-800 p-3 rounded-xl font-mono text-[10px] text-blue-200">
          npm run build
        </div>
        <p className="mt-3 text-[10px] text-blue-600 leading-relaxed font-medium">
          Targeting production-ready artifacts in the /dist folder for containerized deployment.
        </p>
      </div>
    </div>
  );
}

import { Database } from 'lucide-react';

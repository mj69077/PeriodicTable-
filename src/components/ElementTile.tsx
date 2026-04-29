/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { PeriodicElement, useElementStore } from '../store/useElementStore';
import { cn, CATEGORY_COLORS } from '../lib/utils';

interface ElementTileProps {
  element: PeriodicElement;
}

export default function ElementTile({ element }: ElementTileProps) {
  const { selectedElement, setSelectedElement, heatmapProperty } = useElementStore();
  const isSelected = selectedElement?.atomicNumber === element.atomicNumber;

  const getHeatmapColor = () => {
    if (!heatmapProperty) return CATEGORY_COLORS[element.category] || '#f3f4f6';
    const val = element[heatmapProperty];
    if (val === null) return '#e2e8f0';

    let normalized = 0;
    if (heatmapProperty === 'electronegativity') normalized = (val - 0.7) / (4.0 - 0.7);
    if (heatmapProperty === 'atomicRadius') normalized = (val - 30) / (300 - 30);
    if (heatmapProperty === 'ionizationEnergy') normalized = (val - 300) / (2500 - 300);
    if (heatmapProperty === 'meltingPoint') normalized = val / 4000;
    if (heatmapProperty === 'density') normalized = val / 23;

    const blue = [192, 216, 255]; 
    const orange = [255, 120, 80]; 
    
    const r = Math.round(blue[0] + (orange[0] - blue[0]) * Math.max(0, Math.min(1, normalized)));
    const g = Math.round(blue[1] + (orange[1] - blue[1]) * Math.max(0, Math.min(1, normalized)));
    const b = Math.round(blue[2] + (orange[2] - blue[2]) * Math.max(0, Math.min(1, normalized)));
    
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05, translateY: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setSelectedElement(element)}
      className={cn(
        "relative flex flex-col justify-between items-center p-2 rounded-xl transition-all duration-300",
        isSelected 
          ? "bg-white ring-2 ring-blue-500 shadow-xl z-20 scale-105" 
          : "shadow-sm border border-white/40"
      )}
      style={{ 
        backgroundColor: isSelected ? '#ffffff' : getHeatmapColor(),
        gridColumn: element.x,
        gridRow: element.y,
        width: 70,
        height: 70
      }}
    >
      <span className="absolute top-1 left-1.5 text-[10px] font-medium text-gray-500">
        {element.atomicNumber}
      </span>
      <span className={cn(
        "text-2xl font-bold mt-2",
        "text-gray-800"
      )}>
        {element.symbol}
      </span>
      <span className="text-[10px] text-gray-500 truncate w-full text-center px-0.5">
        {element.name}
      </span>
    </motion.button>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { ALL_ELEMENTS } from '../data/elements';
import ElementTile from './ElementTile';
import { useElementStore } from '../store/useElementStore';

export default function PeriodicTable() {
  const { searchQuery, activeTab, favorites } = useElementStore();

  const filteredElements = ALL_ELEMENTS.filter(element => {
    const matchesSearch = 
      element.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      element.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      element.atomicNumber.toString().includes(searchQuery);

    return matchesSearch;
  });

  return (
    <div className="relative w-full overflow-x-auto pb-4 custom-scrollbar">
      <div 
        className="grid gap-1 sm:gap-2 min-w-max p-4"
        style={{ 
          gridTemplateColumns: 'repeat(18, minmax(40px, 70px))',
          gridTemplateRows: 'repeat(10, minmax(40px, 70px))',
        }}
      >
        <AnimatePresence mode="popLayout">
          {filteredElements.map((element) => (
            <motion.div
              layout
              key={element.atomicNumber}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              style={{ gridColumn: element.x, gridRow: element.y }}
              className="w-12 h-12 sm:w-16 sm:h-16 lg:w-[70px] lg:h-[70px]"
            >
              <ElementTile element={element} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

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
    <div className="relative w-full h-full overflow-hidden flex flex-col">
      <div className="flex-1 overflow-auto custom-scrollbar p-1 sm:p-4">
        <div 
          className="grid gap-0.5 sm:gap-1.5 md:gap-2"
          style={{ 
            gridTemplateColumns: 'repeat(18, minmax(24px, 1fr))',
            gridTemplateRows: 'repeat(10, minmax(28px, 1fr))',
            maxWidth: '1200px',
            margin: '0 auto',
            minWidth: 'fit-content'
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
                className="w-full h-full"
              >
                <ElementTile element={element} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Search as SearchIcon } from 'lucide-react';
import { useElementStore } from '../store/useElementStore';

export default function SearchBar() {
  const { searchQuery, setSearchQuery } = useElementStore();

  return (
    <div className="relative w-full max-w-xs">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <SearchIcon className="h-4 w-4 text-gray-400" />
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-3 py-2 bg-slate-100 border-none rounded-full text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}

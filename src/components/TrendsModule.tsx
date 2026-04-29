/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { useElementStore } from '../store/useElementStore';
import { ALL_ELEMENTS } from '../data/elements';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid 
} from 'recharts';
import { CATEGORY_COLORS } from '../lib/utils';

export default function TrendsModule() {
  const { compareList, clearComparison, heatmapProperty, setHeatmapProperty } = useElementStore();
  const compareElements = ALL_ELEMENTS.filter(e => compareList.includes(e.atomicNumber));

  const radarData = [
    { subject: 'Electronegativity', fullMark: 4 },
    { subject: 'Atomic Radius', fullMark: 300 },
    { subject: 'Ionization Energy', fullMark: 2500 },
    { subject: 'Density', fullMark: 25 },
    { subject: 'Melting Point', fullMark: 4000 },
  ].map(axis => {
    const entry: any = { subject: axis.subject };
    compareElements.forEach(el => {
      let val = 0;
      if (axis.subject === 'Electronegativity') val = el.electronegativity || 0;
      if (axis.subject === 'Atomic Radius') val = el.atomicRadius || 0;
      if (axis.subject === 'Ionization Energy') val = el.ionizationEnergy || 0;
      if (axis.subject === 'Density') val = el.density || 0;
      if (axis.subject === 'Melting Point') val = el.meltingPoint || 0;
      entry[el.symbol] = val;
    });
    return entry;
  });

  const chartData = ALL_ELEMENTS.slice(0, 30).map(e => ({
    name: e.symbol,
    val: e[heatmapProperty || 'electronegativity'] || 0
  }));

  return (
    <div className="p-6 h-full overflow-y-auto custom-scrollbar">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Trends & Analytics</h2>
        <select 
          className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-600 outline-none shadow-sm"
          value={heatmapProperty || ''}
          onChange={(e) => setHeatmapProperty(e.target.value as any || null)}
        >
          <option value="">Table Heatmap Off</option>
          <option value="electronegativity">Electronegativity</option>
          <option value="atomicRadius">Atomic Radius</option>
          <option value="ionizationEnergy">Ionization Energy</option>
          <option value="meltingPoint">Melting Point</option>
          <option value="density">Density</option>
        </select>
      </div>

      {compareList.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white/50 backdrop-blur-md p-6 rounded-3xl border border-white shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Radar Comparison</h3>
              <button 
                onClick={clearComparison}
                className="text-[10px] bg-slate-100 px-2 py-1 rounded-md text-slate-500 font-bold hover:bg-slate-200"
              >
                Clear
              </button>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#64748b' }} />
                  {compareElements.map((el, i) => (
                    <Radar
                      key={el.atomicNumber}
                      name={el.name}
                      dataKey={el.symbol}
                      stroke={CATEGORY_COLORS[el.category]}
                      fill={CATEGORY_COLORS[el.category]}
                      fillOpacity={0.5}
                    />
                  ))}
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white/50 backdrop-blur-md p-6 rounded-3xl border border-white shadow-sm">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Property Overview</h3>
            <div className="space-y-4">
              {compareElements.map(el => (
                <div key={el.atomicNumber} className="flex items-center gap-4 p-3 bg-white rounded-2xl border border-slate-50 shadow-sm">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-slate-800" style={{ backgroundColor: CATEGORY_COLORS[el.category] }}>
                    {el.symbol}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-bold text-slate-700">{el.name}</span>
                      <span className="text-slate-400 uppercase font-bold text-[9px]">{el.category}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                       <span className="text-[10px] text-slate-500">Radius: {el.atomicRadius}pm</span>
                       <span className="text-[10px] text-slate-500">EN: {el.electronegativity}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white/40 p-12 rounded-3xl border border-dashed border-slate-200 text-center mb-8 flex flex-col items-center">
          <p className="text-slate-400 italic text-sm">Select elements in the table and click 'Compare' to start side-by-side analysis.</p>
        </div>
      )}

      {/* Chart Section */}
      <div className="bg-white/50 backdrop-blur-md p-6 rounded-3xl border border-white shadow-sm h-[350px]">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Trend Chart (First 30 Elements)</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#94a3b8' }} />
            <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} />
            <Tooltip 
              contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '10px' }}
            />
            <Line 
              type="monotone" 
              dataKey="val" 
              stroke="#3b82f6" 
              strokeWidth={3} 
              dot={{ fill: '#3b82f6', r: 4 }} 
              activeDot={{ r: 6, strokeWidth: 0 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

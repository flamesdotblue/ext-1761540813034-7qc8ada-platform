import { FILTER_ENUMS, useAtlasStore } from './store';
import { Filter, Flame, RefreshCw } from 'lucide-react';

export default function FiltersPanel() {
  const { filters, setFilter, resetFilters } = useAtlasStore();
  return (
    <div className="w-full bg-white/5 border border-white/10 rounded-xl p-3 md:p-4">
      <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
        <div className="flex items-center gap-2 text-white/70 text-sm">
          <Filter className="size-4" /> Filters
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 flex-1">
          <Select label="Sector" value={filters.sector} options={FILTER_ENUMS.sectors} onChange={(v) => setFilter('sector', v)} />
          <Select label="Chain" value={filters.chain} options={FILTER_ENUMS.chains} onChange={(v) => setFilter('chain', v)} />
          <Select label="Risk" value={filters.risk} options={FILTER_ENUMS.risks} onChange={(v) => setFilter('risk', v)} />
          <Select label="Time" value={filters.time} options={FILTER_ENUMS.times} onChange={(v) => setFilter('time', v)} />
          <Select label="Heatmap" value={filters.heatmap} options={['perf','vol','headline','arpi','mcap']} onChange={(v) => setFilter('heatmap', v)} />
          <div className="col-span-2 sm:col-span-3 lg:col-span-2 flex">
            <input
              className="w-full bg-black/40 border border-white/10 rounded-md px-3 text-sm h-9 outline-none focus:ring-2 ring-cyan-500/40"
              placeholder="Search assets..."
              value={filters.query}
              onChange={(e) => setFilter('query', e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <button onClick={resetFilters} className="inline-flex items-center gap-2 text-xs px-3 h-9 rounded-md border border-white/10 bg-white/5 hover:bg-white/10">
            <RefreshCw className="size-3.5" /> Reset
          </button>
          <div className="hidden md:flex items-center gap-2 text-xs text-white/60">
            <Flame className="size-3.5 text-amber-400" /> Signals: Headline momentum, Unusual flow, ARPI deltas
          </div>
        </div>
      </div>
    </div>
  );
}

function Select({ label, value, options, onChange }) {
  return (
    <label className="w-full text-xs text-white/60">
      <span className="sr-only">{label}</span>
      <select
        className="w-full bg-black/40 border border-white/10 rounded-md px-3 h-9 text-sm outline-none focus:ring-2 ring-cyan-500/40 appearance-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

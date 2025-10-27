import { create } from 'zustand';

const sectors = ['Layer1', 'DeFi', 'Gaming', 'AI', 'Infra'];
const chains = ['Ethereum', 'Solana', 'Arbitrum', 'Base', 'BNB'];
const risks = ['A', 'B', 'C', 'D'];

// mock asset universe
function makeAssets() {
  const base = [
    { symbol: 'BTCUSDT', name: 'Bitcoin', sector: 'Layer1', chain: 'Bitcoin', risk: 'A', mcap: 1000, perf: 2.4, vol: 18, headline: 65, arpi: 0.82 },
    { symbol: 'ETHUSDT', name: 'Ethereum', sector: 'Layer1', chain: 'Ethereum', risk: 'A', mcap: 450, perf: 1.2, vol: 22, headline: 58, arpi: 0.77 },
    { symbol: 'SOLUSDT', name: 'Solana', sector: 'Layer1', chain: 'Solana', risk: 'A', mcap: 90, perf: 4.5, vol: 36, headline: 72, arpi: 0.69 },
    { symbol: 'ARBUSDT', name: 'Arbitrum', sector: 'Infra', chain: 'Arbitrum', risk: 'B', mcap: 16, perf: -0.8, vol: 44, headline: 41, arpi: 0.58 },
    { symbol: 'UNIUSDT', name: 'Uniswap', sector: 'DeFi', chain: 'Ethereum', risk: 'B', mcap: 7, perf: 3.2, vol: 30, headline: 38, arpi: 0.61 },
    { symbol: 'APEUSDT', name: 'ApeCoin', sector: 'Gaming', chain: 'Ethereum', risk: 'C', mcap: 2, perf: -1.6, vol: 62, headline: 29, arpi: 0.43 },
    { symbol: 'JTOUSDT', name: 'Jito', sector: 'DeFi', chain: 'Solana', risk: 'B', mcap: 1.1, perf: 5.9, vol: 55, headline: 47, arpi: 0.52 },
    { symbol: 'WUSDT', name: 'Wormhole', sector: 'Infra', chain: 'Solana', risk: 'C', mcap: 0.9, perf: 8.1, vol: 70, headline: 76, arpi: 0.66 },
    { symbol: 'PYTHUSDT', name: 'Pyth', sector: 'Infra', chain: 'Solana', risk: 'B', mcap: 3.4, perf: 2.1, vol: 40, headline: 59, arpi: 0.57 },
    { symbol: 'WLDUSDT', name: 'Worldcoin', sector: 'AI', chain: 'Ethereum', risk: 'C', mcap: 4.5, perf: -3.1, vol: 48, headline: 83, arpi: 0.62 },
  ];
  // add synthetic small caps
  for (let i = 0; i < 90; i++) {
    const s = sectors[Math.floor(Math.random() * sectors.length)];
    const c = chains[Math.floor(Math.random() * chains.length)];
    const r = risks[Math.floor(Math.random() * risks.length)];
    base.push({
      symbol: `ASSET${i}`,
      name: `Asset ${i}`,
      sector: s,
      chain: c,
      risk: r,
      mcap: Math.max(0.05, Number((Math.random() * 5).toFixed(2))),
      perf: Number(((Math.random() - 0.5) * 10).toFixed(2)),
      vol: Math.floor(15 + Math.random() * 80),
      headline: Math.floor(Math.random() * 100),
      arpi: Number(Math.max(0.2, Math.min(0.95, Math.random())).toFixed(2)),
    });
  }
  return base;
}

export const useAtlasStore = create((set, get) => ({
  assets: makeAssets(),
  filters: {
    sector: 'All',
    chain: 'All',
    risk: 'All',
    query: '',
    heatmap: 'perf', // perf | vol | headline | arpi | mcap
    time: '24H',
  },
  selectedAsset: null,
  setFilter: (k, v) => set((s) => ({ filters: { ...s.filters, [k]: v } })),
  resetFilters: () => set({ filters: { sector: 'All', chain: 'All', risk: 'All', query: '', heatmap: 'perf', time: '24H' } }),
  selectAsset: (asset) => set({ selectedAsset: asset }),
  closeTradeFlow: () => set({ selectedAsset: null }),
  filteredAssets: () => {
    const { assets, filters } = get();
    return assets.filter((a) => {
      if (filters.sector !== 'All' && a.sector !== filters.sector) return false;
      if (filters.chain !== 'All' && a.chain !== filters.chain) return false;
      if (filters.risk !== 'All' && a.risk !== filters.risk) return false;
      if (filters.query && !(`${a.name} ${a.symbol}`.toLowerCase().includes(filters.query.toLowerCase()))) return false;
      return true;
    });
  },
}));

export const FILTER_ENUMS = { sectors: ['All', ...sectors], chains: ['All', ...chains], risks: ['All', ...risks], times: ['1H', '24H', '7D', '30D'] };

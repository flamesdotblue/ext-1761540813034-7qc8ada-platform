import { X, ArrowRight, Bell, BarChart2, Newspaper, Activity } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useAtlasStore } from './store';

function tvEmbedUrl(symbol = 'BINANCE:BTCUSDT') {
  const params = new URLSearchParams({
    symbol,
    interval: '60',
    hide_side_toolbar: 'true',
    hide_top_toolbar: 'true',
    theme: 'dark',
    style: '1',
    locale: 'en',
    allow_symbol_change: 'true',
    save_image: 'false',
    widgetbar: 'false',
    studies: '',
  });
  return `https://s.tradingview.com/widgetembed/?${params.toString()}`;
}

export default function TradeFlowView({ open, onClose }) {
  const asset = useAtlasStore((s) => s.selectedAsset);
  const ref = useRef(null);

  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose?.(); }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div aria-hidden={!open} className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`}>
      <div
        className={`absolute inset-0 bg-black/60 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      <div
        ref={ref}
        className={`absolute right-0 top-0 h-full w-full md:w-[520px] bg-neutral-950 border-l border-white/10 transition-transform duration-300 ease-out ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="min-w-0">
            <div className="text-sm text-white/60">Trade Flow View</div>
            <div className="font-semibold truncate">{asset?.name ?? '—'}</div>
          </div>
          <button onClick={onClose} className="rounded-md p-2 hover:bg-white/10">
            <X className="size-5" />
          </button>
        </div>

        <div className="h-[260px] md:h-[300px] border-b border-white/10">
          <iframe title="chart" className="w-full h-full" src={tvEmbedUrl(`BINANCE:${asset?.symbol || 'BTCUSDT'}`)} />
        </div>

        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-300px-57px)] md:h-[calc(100%-300px-57px)]">
          <div className="grid grid-cols-2 gap-3">
            <Card title="Liquidity & Venues" icon={<BarChart2 className="size-4" />}> 
              <div className="text-xs text-white/70">Top venues (mock):</div>
              <ul className="mt-1 text-xs space-y-1 text-white/80">
                <li>Binance • Depth ±2%: ${(Math.random()*100).toFixed(1)}M</li>
                <li>OKX • Depth ±2%: ${(Math.random()*40).toFixed(1)}M</li>
                <li>Jupiter • Best route slippage: {Math.max(0.02, Math.random()).toFixed(2)}%</li>
              </ul>
            </Card>
            <Card title="ARPI Overlay" icon={<Activity className="size-4" />}> 
              <div className="text-xs text-white/70">ARPI score</div>
              <div className="mt-1 text-2xl font-semibold bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
                {asset?.arpi ?? '—'}
              </div>
              <div className="text-xs text-white/60">Delta 24H: {((Math.random()-0.5)*0.2).toFixed(2)}</div>
            </Card>
          </div>

          <Card title="News & Twitter Pulse" icon={<Newspaper className="size-4" />}>
            <ul className="text-sm space-y-2">
              <PulseItem title={`${asset?.name || 'Asset'} sees ${Math.abs(asset?.perf||0)}% ${asset?.perf>0?'gain':'drop'} amid flows`} />
              <PulseItem title={`Traders watch ${asset?.name || 'asset'} liquidity spreads tighten on majors`} />
              <PulseItem title={`Headline momentum: ${(asset?.headline||0)} — chatter rising past 24H`} />
            </ul>
          </Card>

          <div className="flex items-center gap-2">
            <button className="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-md bg-white text-black text-sm font-medium hover:bg-white/90">
              Route to swap <ArrowRight className="size-4" />
            </button>
            <button className="inline-flex items-center gap-2 h-10 px-3 rounded-md border border-white/10 text-sm hover:bg-white/10">
              <Bell className="size-4" /> Alert me
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ title, icon, children }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-3">
      <div className="flex items-center gap-2 text-xs text-white/70 mb-2">{icon}{title}</div>
      {children}
    </div>
  );
}

function PulseItem({ title }) {
  return (
    <li className="flex items-start gap-2">
      <span className="mt-1 size-1.5 rounded-full bg-emerald-400" />
      <span className="text-white/80">{title}</span>
    </li>
  );
}
